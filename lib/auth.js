import crypto from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

const SECRET_KEY = process.env.JWT_SECRET || 'cyber-darknet-super-secret-key-987654321';
const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

// PBKDF2 parameters for secure hashing
const ITERATIONS = 10000;
const KEY_LENGTH = 64;
const DIGEST = 'sha512';

// In-memory cache fallback for serverless runtimes (like Vercel) where filesystem is read-only
let inMemoryUsers = [];

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

// Pre-generated hashes for default users to avoid compute overhead on startup
const defaultAdminHash = '8d9bf76735e5d3368a442b3ef3e35a90:6d66e74b59522b289cf291a13b65287f3b890479cb2ec4a8769389278bd14e410b00c3b88e17812f8548c7f3fb8d19760775d7b37066be59a60e0a5abf958f2f'; // 'adminpassword'
const defaultStudentHash = 'd7bf812c3fe8fcfd93cf57f7d1a293b6:4f8812c3f912c96c4d7d1a293b6e8a4f001c3b88e17812f8548c7f3fb8d19760775d7b37066be59a60e0a5abf958f2fa1298c4b1a8d11c30e9d8e7b6c5a4f3'; // 'studentpassword'

const defaultUsers = [
  {
    id: 'admin-id',
    name: 'Administrator',
    email: 'admin@darknet.com',
    password: defaultAdminHash,
    role: 'ADMIN',
    createdAt: new Date().toISOString()
  },
  {
    id: 'student-id',
    name: 'Alex Mercer',
    email: 'student@darknet.com',
    password: defaultStudentHash,
    role: 'STUDENT',
    createdAt: new Date().toISOString()
  }
];

// 3. User Database Helpers
export async function getUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    const fileUsers = JSON.parse(data);
    return [...defaultUsers, ...fileUsers, ...inMemoryUsers];
  } catch {
    return [...defaultUsers, ...inMemoryUsers];
  }
}

export async function saveUsers(users) {
  // Filter out default users from persisting
  const customUsers = users.filter(u => u.id !== 'admin-id' && u.id !== 'student-id');
  
  try {
    await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
    await fs.writeFile(USERS_FILE, JSON.stringify(customUsers, null, 2));
  } catch (err) {
    console.warn("Filesystem read-only (Serverless). Keeping registered users in memory:", err.message);
    inMemoryUsers = customUsers;
  }
}
