'use client';

import { useMemo, useRef, useState } from 'react';

const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function UploadTool() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [resultUrl, setResultUrl] = useState<string>('');

  const previewUrl = useMemo(() => {
    if (!file) return '';
    return URL.createObjectURL(file);
  }, [file]);

  const validateFile = (candidate: File) => {
    if (!ACCEPTED_TYPES.includes(candidate.type)) {
      return 'Unsupported file format. Please upload JPG, PNG, or WebP.';
    }
    if (candidate.size === 0) {
      return 'Please upload a valid image file.';
    }
    if (candidate.size > MAX_SIZE) {
      return 'File is too large. Max size is 10MB.';
    }
    return '';
  };

  const assignFile = (candidate: File | null) => {
    if (!candidate) return;
    const validationError = validateFile(candidate);
    if (validationError) {
      setError(validationError);
      setFile(null);
      setResultUrl('');
      return;
    }
    setError('');
    setResultUrl('');
    setFile(candidate);
  };

  const onSubmit = async () => {
    if (!file) {
      setError('Please upload a valid image file.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image_file', file);

      const response = await fetch('/api/remove-background', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = (await response.json()) as { message?: string };
          throw new Error(data.message || 'Failed to remove background. Please try again.');
        }
        throw new Error('Failed to remove background. Please try again.');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setResultUrl('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:p-8">
      <div
        className={`rounded-2xl border-2 border-dashed p-8 text-center transition ${
          isDragging ? 'border-brand-500 bg-brand-50' : 'border-slate-300 bg-slate-50'
        }`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          assignFile(event.dataTransfer.files?.[0] ?? null);
        }}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-2xl text-white">
          ✦
        </div>
        <h3 className="text-xl font-semibold text-slate-900">Upload an image to remove the background</h3>
        <p className="mt-2 text-sm text-slate-600">
          Supports JPG, PNG, and WebP. Max size: 10MB. No signup required.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Upload Image
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!file || isLoading}
            className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? 'Removing Background...' : 'Remove Background'}
          </button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(event) => assignFile(event.target.files?.[0] ?? null)}
        />
      </div>

      {file && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          Selected file: <span className="font-medium text-slate-900">{file.name}</span>
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Original Image</h4>
          </div>
          <div className="checkerboard flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewUrl} alt="Original upload preview" className="h-full w-full object-contain" />
            ) : (
              <p className="px-6 text-center text-sm text-slate-500">Your uploaded image preview will appear here.</p>
            )}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Background Removed</h4>
            {resultUrl && (
              <a
                href={resultUrl}
                download="removed-background.png"
                className="rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-700"
              >
                Download PNG
              </a>
            )}
          </div>
          <div className="checkerboard flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {resultUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={resultUrl} alt="Background removed result" className="h-full w-full object-contain" />
            ) : (
              <p className="px-6 text-center text-sm text-slate-500">
                The transparent PNG result will appear here after processing.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
