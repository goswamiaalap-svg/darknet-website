export async function POST() {
  // Clear the cookie by setting Max-Age=0
  const cookieString = 'token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0;';
  
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': cookieString
    },
  });
}
