import { getUploadUrl } from '~/server/aws/getUploadUrl';

export const prerender = false;

export async function POST({ request }) {
  const { filename, contentType } = await request.json();

  if (!filename || !contentType) {
    return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
  }

  const { uploadUrl, publicUrl } = await getUploadUrl(filename, contentType);

  return new Response(JSON.stringify({ uploadUrl, publicUrl }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
