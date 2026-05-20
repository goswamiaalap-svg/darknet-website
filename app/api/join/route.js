import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'join-requests.json');

async function ensureDataFile() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
  if (!existsSync(DATA_FILE)) {
    await writeFile(DATA_FILE, JSON.stringify([], null, 2));
  }
}

let inMemoryRequests = [];

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newRequest = {
      id: Date.now(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    try {
      await ensureDataFile();
      // Read existing requests
      const raw = await readFile(DATA_FILE, 'utf-8');
      const requests = JSON.parse(raw);
      requests.push(newRequest);
      // Save back
      await writeFile(DATA_FILE, JSON.stringify(requests, null, 2));
    } catch (fileError) {
      console.warn('Filesystem read-only (Serverless). Storing join request in memory:', fileError.message);
      inMemoryRequests.push(newRequest);
    }

    return new Response(JSON.stringify({ success: true, data: newRequest }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in Join Protocol:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
