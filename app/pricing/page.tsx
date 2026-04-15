import Link from 'next/link';

const subscriptionPlans = [
  {
    name: 'Free',
    price: '¥0',
    period: '永久',
    description: '适合体验试用',
    credits: '10 次/月',
    features: [
      '每月 10 次免费处理',
      '下载带水印图片',
      '保存使用记录',
      '客服支持',
    ],
    cta: '免费开始',
    ctaHref: '/',
    highlight: false,
  },
  {
    name: 'Pro 月付',
    price: '¥9',
    period: '/月',
    description: '适合个人用户',
    credits: '200 次/月',
    features: [
      '每月 200 次处理额度',
      '无水印高清下载',
      '优先处理队列',
      '保存使用记录',
      '专属客服支持',
    ],
    cta: '立即订阅',
    ctaHref: '/order?plan=pro_monthly',
    highlight: false,
  },
  {
    name: 'Pro 年付',
    price: '¥99',
    period: '/年',
    description: '适合重度用户',
    credits: '200 次/月',
    features: [
      '每月 200 次处理额度',
      '无水印高清下载',
      '优先处理队列',
      '保存使用记录',
      '专属客服支持',
      '比月付省 ¥9/年',
    ],
    cta: '立即订阅',
    ctaHref: '/order?plan=pro_yearly',
    highlight: true,
  },
];

const creditPacks = [
  {
    name: 'Starter',
    credits: 80,
    price: '¥19',
    perImage: '约 ¥0.11/张',
    highlight: false,
    badge: null,
  },
  {
    name: 'Standard',
    credits: 250,
    price: '¥49',
    perImage: '约 ¥0.10/张',
    highlight: true,
    badge: '推荐',
  },
  {
    name: 'Premium',
    credits: 600,
    price: '¥99',
    perImage: '约 ¥0.08/张',
    highlight: false,
    badge: null,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-900">HAIMA Remover</Link>
          <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">个人中心</Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            简单、透明、无隐藏费用
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            订阅低至 ¥9/月，Credit 永不过期。组合套餐，随用随充。
          </p>
        </div>
      </section>

      {/* Credit Packs */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-950">Credit 充值包</h2>
          <p className="mt-2 text-slate-600">一次购买，永久使用，永不过期</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {creditPacks.map((pack) => (
            <div
              key={pack.name}
              className={`relative rounded-3xl border-2 p-8 ${
                pack.highlight
                  ? 'border-brand-600 bg-brand-50 shadow-lg'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {pack.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-brand-600 px-4 py-1 text-xs font-semibold text-white">
                    {pack.badge}
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900">{pack.name}</h3>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-slate-950">{pack.price}</span>
                  <span className="text-slate-500">/ {pack.credits} Credits</span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{pack.perImage}</p>
                <p className="mt-2 text-sm font-medium text-brand-600">
                  {pack.credits} 次抠图处理
                </p>
              </div>

              <ul className="mt-6 space-y-3">
                {[
                  `${pack.credits} 次图片处理`,
                  '高清无水印下载',
                  'Credits 永久有效',
                  '支持JPG/PNG/WebP',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="text-brand-600">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={`/order?plan=${pack.name.toLowerCase()}`}
                className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-semibold transition ${
                  pack.highlight
                    ? 'bg-brand-600 text-white hover:bg-brand-700'
                    : 'bg-slate-900 text-white hover:bg-slate-700'
                }`}
              >
                购买 {pack.name}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          💳 支持微信支付 / 支付宝 / Stripe（海外）
        </p>
      </section>

      {/* Subscriptions */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-950">订阅套餐</h2>
          <p className="mt-2 text-slate-600">按月订阅，自动续费，随时取消。额外购买 Credit 包可叠加使用。</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border-2 p-8 ${
                plan.highlight
                  ? 'border-brand-600 bg-brand-50 shadow-lg'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-brand-600 px-4 py-1 text-xs font-semibold text-white">
                    最划算
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{plan.description}</p>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-slate-950">{plan.price}</span>
                  <span className="text-slate-500">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm font-medium text-brand-600">{plan.credits}</p>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="text-brand-600">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-semibold transition ${
                  plan.highlight
                    ? 'bg-brand-600 text-white hover:bg-brand-700'
                    : plan.name === 'Free'
                    ? 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    : 'bg-slate-900 text-white hover:bg-slate-700'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">功能</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900">免费用户</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900">订阅 Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ['每月处理次数', '10 次', '200 次'],
                  ['图片质量', '高清', '高清'],
                  ['下载水印', '有水印', '无水印'],
                  ['使用历史记录', '✓', '✓'],
                  ['优先处理队列', '—', '✓'],
                  ['批量处理（未来）', '—', '✓'],
                  ['专属客服', '—', '✓'],
                ].map((row) => (
                  <tr key={row[0]}>
                    <td className="px-6 py-4 text-slate-700">{row[0]}</td>
                    <td className="px-6 py-4 text-center text-slate-600">{row[1]}</td>
                    <td className="px-6 py-4 text-center font-medium text-brand-600">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <h2 className="text-2xl font-bold text-slate-950">常见问题</h2>
        <div className="mt-6 space-y-4">
          {[
            {
              q: '注册就送积分吗？',
              a: '是的，新用户注册即送 30 Credits，可直接使用。',
            },
            {
              q: '订阅和 Credit 包可以同时使用吗？',
              a: '可以！订阅每月自动补充 200 Credits，额外购买的 Credit 包永不过期，可随时叠加使用。',
            },
            {
              q: 'Credits 有效期多久？',
              a: 'Credit 充值包购买后永久有效。订阅制则按月自动续费，随时可在个人中心取消。',
            },
            {
              q: '免费用户下载的图片有水印吗？',
              a: '是的，免费用户下载的图片会有 "haima.imagine" 水印。订阅 Pro 可去除水印。',
            },
            {
              q: '每月用不完的次数会累积吗？',
              a: '订阅制按月重置，不累积。Credit 制永不过期，可随时使用。',
            },
            {
              q: '如何取消订阅？',
              a: '登录后进入个人中心，点击「取消订阅」即可。取消后当前周期内仍可使用，周期结束后停止续费。',
            },
            {
              q: '支持哪些支付方式？',
              a: '国内用户支持微信支付和支付宝；海外用户支持 Visa、Mastercard 等信用卡（Stripe）。',
            },
          ].map((item) => (
            <details
              key={item.q}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <summary className="cursor-pointer list-none text-lg font-semibold text-slate-900">
                {item.q}
              </summary>
              <p className="mt-3 text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white">准备好开始了吗？</h2>
          <p className="mt-3 text-slate-400">注册即送 30 Credits，Pro 月付仅 ¥9。</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              免费开始试用
            </Link>
            <Link
              href="/order?plan=standard"
              className="rounded-full border border-slate-600 px-8 py-3 text-sm font-semibold text-white transition hover:border-white"
            >
              购买 Credits
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
