type Env = {
  REMOVE_BG_API_KEY?: string;
};

type PagesContext<E = Record<string, unknown>> = {
  request: Request;
  env: E;
};

const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST,OPTIONS',
      'access-control-allow-headers': 'Content-Type',
    },
  });
}

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST,OPTIONS',
      'access-control-allow-headers': 'Content-Type',
    },
  });
};

export const onRequestPost = async ({ request, env }: PagesContext<Env>) => {
  const apiKey = env.REMOVE_BG_API_KEY;

  if (!apiKey) {
    return json({ success: false, code: 'MISSING_API_KEY', message: 'Server is missing REMOVE_BG_API_KEY.' }, 500);
  }

  const formData = await request.formData();
  const imageFile = formData.get('image_file');

  if (!(imageFile instanceof File)) {
    return json({ success: false, code: 'EMPTY_FILE', message: 'Please upload a valid image file.' }, 400);
  }

  if (!ACCEPTED_TYPES.includes(imageFile.type)) {
    return json({ success: false, code: 'INVALID_FILE_TYPE', message: 'Unsupported file format. Please upload JPG, PNG, or WebP.' }, 400);
  }

  if (imageFile.size === 0) {
    return json({ success: false, code: 'EMPTY_FILE', message: 'Please upload a valid image file.' }, 400);
  }

  if (imageFile.size > MAX_SIZE) {
    return json({ success: false, code: 'FILE_TOO_LARGE', message: 'Image must be smaller than 10MB.' }, 413);
  }

  const upstreamFormData = new FormData();
  upstreamFormData.append('image_file', imageFile, imageFile.name);
  upstreamFormData.append('size', 'auto');

  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': apiKey,
    },
    body: upstreamFormData,
  });

  if (!response.ok) {
    const upstreamText = await response.text();
    return json(
      {
        success: false,
        code: 'REMOVE_BG_FAILED',
        message: upstreamText || 'Failed to remove background. Please try again.',
      },
      response.status,
    );
  }

  const arrayBuffer = await response.arrayBuffer();
  return new Response(arrayBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': 'inline; filename="removed-background.png"',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
