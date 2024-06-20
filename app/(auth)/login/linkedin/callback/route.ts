import { cookies } from 'next/headers';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies().get('linkedin_oauth_state')?.value ?? null;

  console.log(`url: ${url}`);
  console.log(`code: ${code}`);
  console.log(`state: ${state}`);
  console.log(`storedState: ${storedState}`);

  return new Response(null, { status: 400 });
}
