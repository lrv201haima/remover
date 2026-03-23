import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HAIMA Imagine Background Remover – Remove Background from Images Online',
  description:
    'Remove image backgrounds instantly online with HAIMA Imagine Background Remover. Upload JPG, PNG, or WebP and download a transparent PNG in seconds.',
  keywords: [
    'image background remover',
    'remove background from image',
    'transparent background maker',
    'remove white background from image',
    'remove background from jpg',
  ],
  openGraph: {
    title: 'HAIMA Imagine Background Remover',
    description:
      'Upload JPG, PNG, or WebP and download a transparent PNG in seconds.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
