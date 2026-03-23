import { NextRequest } from 'next/server';
import { errorMessage, validateImageFile } from '@/lib/remove-bg';

export const runtime = 'nodejs';

function jsonError(code: string, status: number) {
  return Response.json(
    {
      success: false,
      code,
      message: errorMessage(code),
    },
    { status },
  );
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.REMOVE_BG_API_KEY;
  if (!apiKey) {
    return jsonError('MISSING_API_KEY', 500);
  }

  const formData = await request.formData();
  const imageFile = formData.get('image_file');

  if (!(imageFile instanceof File)) {
    return jsonError('EMPTY_FILE', 400);
  }

  const validationCode = validateImageFile(imageFile);
  if (validationCode) {
    return jsonError(validationCode, validationCode === 'FILE_TOO_LARGE' ? 413 : 400);
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
    cache: 'no-store',
  });

  if (!response.ok) {
    const upstreamText = await response.text();
    return Response.json(
      {
        success: false,
        code: 'REMOVE_BG_FAILED',
        message: upstreamText || 'Failed to remove background. Please try again.',
      },
      { status: response.status },
    );
  }

  const arrayBuffer = await response.arrayBuffer();
  return new Response(arrayBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': 'inline; filename="removed-background.png"',
      'Cache-Control': 'no-store',
    },
  });
}
