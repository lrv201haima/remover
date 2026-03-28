export interface Env {
  REMOVE_BG_API_KEY: string;
}

const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405);
    }

    const apiKey = env.REMOVE_BG_API_KEY;
    if (!apiKey) {
      return json({ error: 'REMOVE_BG_API_KEY is not set' }, 500);
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return json({ error: 'Failed to parse form data' }, 400);
    }

    const imageFile = formData.get('image_file');
    if (!(imageFile instanceof File)) {
      return json({ error: 'No image_file provided' }, 400);
    }

    if (!ACCEPTED_TYPES.includes(imageFile.type)) {
      return json({ error: 'Unsupported file format. Please upload JPG, PNG, or WebP.' }, 400);
    }

    if (imageFile.size === 0) {
      return json({ error: 'Empty file' }, 400);
    }

    if (imageFile.size > MAX_SIZE) {
      return json({ error: 'File too large. Max size is 10MB.' }, 413);
    }

    // Forward to remove.bg
    const upstreamFormData = new FormData();
    upstreamFormData.append('image_file', imageFile, imageFile.name);
    upstreamFormData.append('size', 'auto');

    let upstreamResponse: Response;
    try {
      upstreamResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: { 'X-Api-Key': apiKey },
        body: upstreamFormData,
      });
    } catch (err) {
      return json({ error: 'Failed to reach remove.bg service' }, 502);
    }

    if (!upstreamResponse.ok) {
      const upstreamText = await upstreamResponse.text();
      return json(
        { error: 'Background removal failed', detail: upstreamText },
        upstreamResponse.status
      );
    }

    const arrayBuffer = await upstreamResponse.arrayBuffer();
    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'inline; filename="removed-background.png"',
        'Cache-Control': 'no-store',
        ...corsHeaders,
      },
    });
  },
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}
