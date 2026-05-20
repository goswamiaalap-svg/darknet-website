import { readFileSync, existsSync } from 'fs';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get('f');
  
  const files = {
    'ctf': 'C:\\Users\\AALAP GOSWAMI\\.gemini\\antigravity\\brain\\8e20b969-f515-46af-9499-af63108f5c52\\event_ctf_1779203147144.png',
    'workshop': 'C:\\Users\\AALAP GOSWAMI\\.gemini\\antigravity\\brain\\8e20b969-f515-46af-9499-af63108f5c52\\event_workshop_1779203163627.png',
    'city': 'C:\\Users\\AALAP GOSWAMI\\.gemini\\antigravity\\brain\\8e20b969-f515-46af-9499-af63108f5c52\\chapter_city_1779203179140.png'
  };

  if (!files[file] || !existsSync(files[file])) {
    return new Response('Image not found', { status: 404 });
  }
  
  try {
    const buffer = readFileSync(files[file]);
    return new Response(buffer, {
      status: 200,
      headers: { 
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400'
      }
    });
  } catch (error) {
    return new Response('Error loading image', { status: 500 });
  }
}
