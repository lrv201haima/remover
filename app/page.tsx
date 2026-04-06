import { UploadTool } from '@/components/upload-tool';
import { GoogleSignIn } from '@/components/google-sign-in';

const faqItems = [
  {
    question: 'Is HAIMA Imagine Background Remover free to use?',
    answer:
      'Yes. The MVP is designed as a lightweight online tool that lets visitors try background removal instantly before any future pricing or packaging decisions.',
  },
  {
    question: 'Which file types are supported?',
    answer: 'You can upload JPG, PNG, or WebP images up to 10MB.',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No. The current version is built for fast SEO traffic conversion, so users can start without signing up.',
  },
  {
    question: 'Will my image be stored?',
    answer:
      'No persistent image storage is included in this MVP. Files are processed in-memory during the request lifecycle and returned directly to the browser.',
  },
];

const useCases = [
  'Product photo background cleanup for ecommerce listings',
  'Portrait background removal for resumes and profile photos',
  'Transparent PNG creation for logos and brand assets',
  'Quick cutouts for presentations, thumbnails, and social posts',
];

export default function HomePage() {
  return (
    <main>
      <div className="flex justify-end px-6 py-3 border-b border-slate-100 bg-white/80 backdrop-blur">
        <GoogleSignIn />
      </div>

      <section className="hero-grid relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-gradient-to-br from-blue-100 via-white to-violet-100" />
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                AI tool for instant transparent PNGs
              </div>
              <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
                HAIMA Imagine Background Remover
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                Remove backgrounds from images online in seconds. Upload JPG, PNG, or WebP files and
                download a clean transparent PNG without installing any software.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">No signup required</span>
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">JPG / PNG / WebP</span>
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">Download transparent PNG</span>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/60 bg-white/80 p-4 shadow-soft backdrop-blur">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-orange-100 via-pink-100 to-blue-100 p-4">
                  <div className="rounded-2xl bg-white/70 p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Before
                  </div>
                  <div className="mt-4 flex aspect-[4/5] items-end justify-center rounded-2xl bg-gradient-to-b from-orange-300 via-pink-200 to-blue-300 p-4">
                    <div className="h-52 w-36 rounded-t-[999px] rounded-b-[2rem] bg-slate-900 shadow-2xl" />
                  </div>
                </div>
                <div className="checkerboard overflow-hidden rounded-3xl border border-slate-200 p-4">
                  <div className="rounded-2xl bg-white/80 p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    After
                  </div>
                  <div className="mt-4 flex aspect-[4/5] items-end justify-center rounded-2xl p-4">
                    <div className="h-52 w-36 rounded-t-[999px] rounded-b-[2rem] bg-slate-950 shadow-2xl" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-3 text-sm font-medium text-slate-600">
                <span className="rounded-full bg-slate-100 px-3 py-1">Fast</span>
                <span>→</span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">Transparent PNG</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20">
        <UploadTool />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8 md:px-8 md:pb-12">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Fast online workflow',
              text: 'Visitors can upload an image and get a result in one short flow designed for search traffic conversion.',
            },
            {
              title: 'Clean transparent output',
              text: 'The core MVP focuses on returning a downloadable transparent PNG that works for common design and ecommerce tasks.',
            },
            {
              title: 'No clutter, no account wall',
              text: 'This release removes friction: no signup, no dashboard, and no unnecessary steps before the download.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-14">
        <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-slate-950">How it works</h2>
            <div className="mt-6 space-y-5">
              {[
                'Upload a JPG, PNG, or WebP image from your browser.',
                'Upload a JPG, PNG, or WebP image from your browser.',
                'Launch the SEO landing page instantly on Cloudflare Pages.',
                'Add a dedicated background-removal API deployment in the next step.',
              ].map((step, index) => (
                <div key={step} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-slate-600">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-950">Best use cases</h2>
            <ul className="mt-6 space-y-4">
              {useCases.map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 px-4 py-4 text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-950">Frequently asked questions</h2>
          <p className="mt-4 text-slate-600">
            Everything a first-time visitor needs to understand before uploading an image.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {faqItems.map((item) => (
            <details key={item.question} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <summary className="cursor-pointer list-none text-lg font-semibold text-slate-900">
                {item.question}
              </summary>
              <p className="mt-4 leading-7 text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} HAIMA Imagine Background Remover</p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="transition hover:text-slate-900">
              Privacy
            </a>
            <a href="#" className="transition hover:text-slate-900">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
