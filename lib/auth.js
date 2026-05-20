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
  // Hardcoded check for default mock users to avoid any crypto runtime bugs on Vercel
  if (storedHash === 'mock-admin-hash' && password === 'adminpassword') return true;
  if (storedHash === 'mock-student-hash' && password === 'studentpassword') return true;

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

const defaultUsers = [
  {
    id: 'admin-id',
    name: 'Administrator',
    email: 'admin@darknet.com',
    password: 'mock-admin-hash',
    role: 'ADMIN',
    createdAt: new Date().toISOString()
  },
  {
    id: 'student-id',
    name: 'Alex Mercer',
    email: 'student@darknet.com',
    password: 'mock-student-hash',
    role: 'STUDENT',
    createdAt: new Date().toISOString()
  }
];

// 3. User Database Helpers
export async function getUsers() {
  let persistentUsers = [];
  const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  // Try Vercel KV / Upstash Database first (for live production)
  if (redisUrl && redisToken) {
    try {
      const res = await fetch(`${redisUrl}/get/darknet_users`, {
        headers: { Authorization: `Bearer ${redisToken}` },
        cache: 'no-store'
      });
      const data = await res.json();
      if (data && data.result) {
        persistentUsers = JSON.parse(data.result);
      }
    } catch (err) {
      console.error("Redis KV Read Error:", err.message);
    }
  } else {
    // Local fallback for development
    try {
      const data = await fs.readFile(USERS_FILE, 'utf8');
      persistentUsers = JSON.parse(data);
    } catch {
      // File doesn't exist yet, which is fine
    }
  }

  return [...defaultUsers, ...persistentUsers, ...inMemoryUsers];
}

export async function saveUsers(users) {
  // Filter out default mock users from persisting
  const customUsers = users.filter(u => u.id !== 'admin-id' && u.id !== 'student-id');
  const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  
  // Try Vercel KV / Upstash Database first
  if (redisUrl && redisToken) {
    try {
      await fetch(`${redisUrl}/set/darknet_users`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${redisToken}`,
          'Content-Type': 'application/json'
        },
        // Redis REST API expects the value to be sent directly in the body
        body: JSON.stringify(JSON.stringify(customUsers)) 
      });
      return; // Success!
    } catch (err) {
      console.error("Redis KV Write Error:", err.message);
    }
  }

  // Local/Memory fallback
  try {
    await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
    await fs.writeFile(USERS_FILE, JSON.stringify(customUsers, null, 2));
  } catch (err) {
    console.warn("Filesystem read-only. Keeping registered users in memory temporarily:", err.message);
    inMemoryUsers = customUsers;
  }
}
