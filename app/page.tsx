'use client';

import Link from 'next/link';
import { GoogleSignIn } from '@/components/google-sign-in';
import { UploadTool } from '@/components/upload-tool';

const faqItems = [
  {
    question: 'HAIMA Background Remover 免费吗？',
    answer: '是的免费试用。注册即送 30 Credits，月付 ¥9 起可享受 200 次无水印处理。',
  },
  {
    question: '支持哪些文件格式？',
    answer: '支持 JPG、PNG、WebP，最大 10MB。',
  },
  {
    question: '下载的图片会有水印吗？',
    answer: '免费用户和未登录用户下载的图片会带有 "haima.imagine" 水印。登录后消耗 Credits 下载无水印高清图。',
  },
  {
    question: '我的图片会被存储吗？',
    answer: '不会。图片在请求生命周期内处理后直接返回浏览器，不做任何持久化存储。',
  },
  {
    question: '如何获得更多处理次数？',
    answer: '登录后在个人中心可购买 Credit 充值包（¥19 起），或升级 Pro 订阅（¥9/月，200 次额度）。Credits 永久有效。',
  },
];

const useCases = [
  '电商产品图抠图，干净白底',
  '简历、证件照换底色',
  'Logo、品牌资产透明背景',
  'PPT、社交媒体封面快速去背景',
];

export default function HomePage() {
  return (
    <main>
      {/* 导航栏 */}
      <div className="flex justify-between items-center px-6 py-3 border-b border-slate-100 bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <span className="text-lg font-bold text-slate-900">HAIMA Remover</span>
          <nav className="hidden md:flex items-center gap-4 text-sm text-slate-600">
            <Link href="/pricing" className="hover:text-slate-900">定价</Link>
            <Link href="/faq" className="hover:text-slate-900">常见问题</Link>
            <Link href="/dashboard" className="hover:text-slate-900">个人中心</Link>
          </nav>
        </div>
        <GoogleSignIn />
      </div>

      {/* Hero */}
      <section className="hero-grid relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-gradient-to-br from-blue-100 via-white to-violet-100" />
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                AI 驱动 · 去除背景 · 透明 PNG
              </div>
              <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
                HAIMA Imagine Background Remover
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                几秒去除图片背景，即时下载透明 PNG。注册即送 30 Credits，无水印高清输出。
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">JPG / PNG / WebP</span>
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">最大 10MB</span>
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">秒级处理</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/pricing"
                  className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  查看定价方案
                </Link>
              </div>
            </div>

            {/* 示意图 */}
            <div className="rounded-[2rem] border border-white/60 bg-white/80 p-4 shadow-soft backdrop-blur">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-orange-100 via-pink-100 to-blue-100 p-4">
                  <div className="rounded-2xl bg-white/70 p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    原图
                  </div>
                  <div className="mt-4 flex aspect-[4/5] items-end justify-center rounded-2xl overflow-hidden">
                    <img src="/example/beach_beauty_orig.jpg" alt="原图" className="w-full h-full object-cover rounded-2xl" />
                  </div>
                </div>
                <div className="checkerboard overflow-hidden rounded-3xl border border-slate-200 p-4">
                  <div className="rounded-2xl bg-white/80 p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    去除背景
                  </div>
                  <div className="mt-4 flex aspect-[4/5] items-end justify-center rounded-2xl overflow-hidden">
                    <img src="/example/beach_beauty_nobg.png" alt="去除背景" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-3 text-sm font-medium text-slate-600">
                <span className="rounded-full bg-slate-100 px-3 py-1">上传</span>
                <span>→</span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">透明 PNG</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 上传工具 */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20">
        <UploadTool />
      </section>

      {/* 功能介绍 */}
      <section className="mx-auto max-w-7xl px-6 pb-8 md:px-8 md:pb-12">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: '快速在线处理',
              text: '上传图片，秒级返回透明 PNG。无需下载软件，无需注册即可试用。',
            },
            {
              title: '高清无水印输出',
              text: '登录用户下载无水印高清图片，适合电商、品牌设计等正式场景。',
            },
            {
              title: 'Credits 永不过期',
              text: '购买的 Credits 永久有效，按需使用，没有月度浪费。',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-14">
        <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-slate-950">如何使用</h2>
            <div className="mt-6 space-y-5">
              {[
                '上传 JPG、PNG 或 WebP 格式图片',
                'AI 自动识别主体，一键去除背景',
                '下载透明 PNG，立即使用',
                '登录解锁更多次数和无水印下载',
              ].map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-slate-600">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-950">适用场景</h2>
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

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-950">常见问题</h2>
          <p className="mt-4 text-slate-600">
            关于定价、功能、隐私的常见疑问
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
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-center">
            <p className="text-slate-600">还有更多问题？</p>
            <Link href="/pricing" className="mt-2 inline-block text-brand-600 hover:underline">
              查看完整定价 FAQ →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} HAIMA Imagine Background Remover</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/pricing" className="transition hover:text-slate-900">定价</Link>
            <Link href="/faq" className="transition hover:text-slate-900">常见问题</Link>
            <Link href="/dashboard" className="transition hover:text-slate-900">个人中心</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
