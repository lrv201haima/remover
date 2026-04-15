import Link from 'next/link';

const creditPacks = [
  {
    id: 'starter',
    name: 'Starter',
    credits: 80,
    price: '¥19',
    perImage: '约 ¥0.11/张',
    badge: null,
    highlight: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    credits: 250,
    price: '¥49',
    perImage: '约 ¥0.10/张',
    badge: '推荐',
    highlight: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    credits: 600,
    price: '¥99',
    perImage: '约 ¥0.08/张',
    badge: null,
    highlight: false,
  },
];

const subscriptionPlans = [
  {
    id: 'pro_monthly',
    name: 'Pro 月付',
    price: '¥9',
    period: '/月',
    credits: '200 次/月',
    features: ['每月 200 次处理额度', '无水印高清下载', '优先处理队列'],
    highlight: false,
  },
  {
    id: 'pro_yearly',
    name: 'Pro 年付',
    price: '¥99',
    period: '/年',
    credits: '200 次/月',
    features: ['每月 200 次处理额度', '无水印高清下载', '优先处理队列', '比月付省 ¥9'],
    highlight: true,
  },
];

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-900">HAIMA Remover</Link>
          <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">个人中心</Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-950">选择适合您的方案</h1>
          <p className="mt-2 text-slate-600">Credits 永久有效 · 订阅随时取消</p>
        </div>

        {/* Credit Packs */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">💎 Credit 充值包</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {creditPacks.map((pack) => (
              <div
                key={pack.id}
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
                    '支持 JPG/PNG/WebP',
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="text-brand-600 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 space-y-3">
                  {/* WeChat Pay */}
                  <button className="w-full rounded-2xl border-2 border-slate-200 bg-white py-3 text-sm font-semibold text-slate-800 hover:border-green-500 hover:bg-green-50 transition flex items-center justify-center gap-2">
                    <span className="text-base">💚</span>
                    微信支付
                  </button>
                  {/* Alipay */}
                  <button className="w-full rounded-2xl border-2 border-slate-200 bg-white py-3 text-sm font-semibold text-slate-800 hover:border-blue-500 hover:bg-blue-50 transition flex items-center justify-center gap-2">
                    <span className="text-base">💙</span>
                    支付宝
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscriptions */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-6">📦 订阅套餐</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
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
                  <div className="mt-4 flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-slate-950">{plan.price}</span>
                    <span className="text-slate-500">{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-brand-600">{plan.credits}</p>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="text-brand-600 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 space-y-3">
                  <button className="w-full rounded-2xl border-2 border-slate-200 bg-white py-3 text-sm font-semibold text-slate-800 hover:border-green-500 hover:bg-green-50 transition flex items-center justify-center gap-2">
                    <span className="text-base">💚</span>
                    微信支付
                  </button>
                  <button className="w-full rounded-2xl border-2 border-slate-200 bg-white py-3 text-sm font-semibold text-slate-800 hover:border-blue-500 hover:bg-blue-50 transition flex items-center justify-center gap-2">
                    <span className="text-base">💙</span>
                    支付宝
                  </button>
                </div>

                <p className="mt-4 text-center text-xs text-slate-400">
                  订阅后自动续费，可随时取消
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods Note */}
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500 mb-4">💳 更多支付方式（海外用户）</p>
          <div className="flex items-center justify-center gap-4">
            <button className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
              💳 Visa / Mastercard
            </button>
            <button className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
              🍎 Apple Pay
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-400">
          <span className="flex items-center gap-1">🔒 交易安全</span>
          <span className="flex items-center gap-1">📧 7×24h 客服</span>
          <span className="flex items-center gap-1">✅ 永久有效 Credits</span>
        </div>
      </div>
    </main>
  );
}
