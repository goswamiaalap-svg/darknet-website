import crypto from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

const SECRET_KEY = process.env.JWT_SECRET || 'cyber-darknet-super-secret-key-987654321';
const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

// PBKDF2 parameters for secure hashing
const ITERATIONS = 10000;
const KEY_LENGTH = 64;
const DIGEST = 'sha512';

// 1. Password Hashing Utilities
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  try {
    const [salt, hash] = storedHash.split(':');
    if (!salt || !hash) return false;
    const verifyHash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
    return hash === verifyHash;
  } catch {
    return false;
  }
}

// 2. Token Utilities (Base64url Encoded JWT-like tokens)
export function signToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  // Token expires in 24 hours
  const body = Buffer.from(JSON.stringify({
    ...payload,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
  })).toString('base64url');
  
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(`${header}.${body}`)
    .digest('base64url');
    
  return `${header}.${body}.${signature}`;
}

export function verifyToken(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  
  const [header, body, signature] = parts;
  const expectedSignature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(`${header}.${body}`)
    .digest('base64url');
    
  if (signature !== expectedSignature) return null;
  
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() / 1000 > payload.exp) return null; // Expired
    return payload;
  } catch {
    return null;
  }
}

// 3. User Database Helpers
export async function getUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    // If file doesn't exist, create it with default Admin and Student users
    const defaultUsers = [
      {
        id: 'admin-id',
        name: 'Administrator',
        email: 'admin@darknet.com',
        password: hashPassword('adminpassword'),
        role: 'ADMIN',
        createdAt: new Date().toISOString()
      },
      {
        id: 'student-id',
        name: 'Alex Mercer',
        email: 'student@darknet.com',
        password: hashPassword('studentpassword'),
        role: 'STUDENT',
        createdAt: new Date().toISOString()
      }
    ];
    await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
    await fs.writeFile(USERS_FILE, JSON.stringify(defaultUsers, null, 2));
    return defaultUsers;
  }
}

export async function saveUsers(users) {
  await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}
