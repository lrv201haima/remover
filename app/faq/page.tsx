import Link from 'next/link';

const faqSections = [
  {
    title: '关于Credits',
    items: [
      {
        q: '什么是 Credits？',
        a: 'Credits 是 HAIMA Remover 的虚拟点数，每处理一张图片消耗 1 个 Credits。购买后永久有效，不会过期。',
      },
      {
        q: '注册就送 Credits 吗？',
        a: '是的！新用户注册即送 30 Credits，可以直接体验抠图功能。',
      },
      {
        q: 'Credits 会过期吗？',
        a: '购买的 Credit 包永不过期，可以随时使用。订阅制则是按月自动补充额度，取消后不再续费。',
      },
      {
        q: '用不完的 Credits 可以退款吗？',
        a: '由于 Credits 是虚拟商品，购买后无法退款，请根据实际需求选择合适的套餐。',
      },
    ],
  },
  {
    title: '关于订阅',
    items: [
      {
        q: '订阅和 Credit 包可以同时使用吗？',
        a: '可以！订阅每月自动补充 200 Credits，额外购买的 Credit 包永不过期，可随时叠加使用。例如您购买了 250 Credits 的 Standard 包，同时订阅了 Pro 月付，两者的额度可以一起使用。',
      },
      {
        q: '如何取消订阅？',
        a: '登录后进入「个人中心」，点击「管理订阅」→「取消订阅」即可。取消后当前订阅周期内仍可正常使用，周期结束后停止续费。',
      },
      {
        q: '订阅的次数用不完会累积到下个月吗？',
        a: '不会。订阅制的每月 200 次额度按月重置，不累积。Credit 包则永不过期，可以持续使用。',
      },
      {
        q: '订阅可以开发票吗？',
        a: '可以。请联系客服（support@haima.space），提供您的账号和发票抬头信息。',
      },
    ],
  },
  {
    title: '关于水印',
    items: [
      {
        q: '免费用户下载的图片有水印吗？',
        a: '是的，免费用户和未登录用户下载的图片会带有 "haima.imagine" 水印。升级 Pro 订阅或购买 Credit 包后，下载的图片均无水印。',
      },
      {
        q: '水印可以去除吗？',
        a: '购买任意付费方案（订阅或 Credit 包）后，所有下载的图片均无水印。',
      },
    ],
  },
  {
    title: '关于图片处理',
    items: [
      {
        q: '支持哪些图片格式？',
        a: '支持 JPG/JPEG、PNG、WebP 格式。建议上传 PNG 格式以获得最佳效果。',
      },
      {
        q: '图片大小有限制吗？',
        a: '单张图片最大支持 10MB。建议图片分辨率在 4000×4000 像素以内。',
      },
      {
        q: '我的图片会被保存吗？',
        a: '不会！您的图片在处理完成后会直接从服务器内存返回给您，不会被存储在任何地方。处理完成后即销毁。',
      },
      {
        q: '处理速度怎么样？',
        a: '通常在 3-5 秒内完成处理，高峰期可能稍慢一些。Pro 订阅用户享有优先处理队列。',
      },
    ],
  },
  {
    title: '支付相关',
    items: [
      {
        q: '支持哪些支付方式？',
        a: '国内用户支持微信支付和支付宝；海外用户支持 Visa、Mastercard、American Express 等信用卡，以及 Apple Pay。',
      },
      {
        q: '支付安全吗？',
        a: '所有支付均通过第三方支付平台（微信支付、支付宝、Stripe）处理，我们不会存储您的银行卡或支付密码信息。',
      },
      {
        q: '购买后多久到账？',
        a: '微信/支付宝支付：付款成功后 Credits 即时到账；信用卡支付（Stripe）：付款成功后 1-5 分钟内到账。',
      },
      {
        q: '可以退款吗？',
        a: '由于 Credits 是虚拟商品且即时到账，概不接受退款。请根据实际需求选择合适的套餐。如有质量问题请联系客服。',
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-900">HAIMA Remover</Link>
          <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900">定价方案</Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-950">常见问题</h1>
          <p className="mt-3 text-lg text-slate-600">
            有其他问题？<a href="mailto:support@haima.space" className="text-brand-600 hover:underline">联系我们</a>
          </p>
        </div>

        <div className="space-y-12">
          {faqSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold text-slate-900 mb-6">{section.title}</h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <details
                    key={item.q}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm group"
                  >
                    <summary className="cursor-pointer list-none text-lg font-semibold text-slate-900 group-hover:text-brand-600 transition">
                      {item.q}
                    </summary>
                    <p className="mt-4 leading-7 text-slate-600">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">仍有疑问？</h2>
          <p className="mt-3 text-slate-400">
            我们的客服团队随时为您解答
          </p>
          <a
            href="mailto:support@haima.space"
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition"
          >
            联系客服
          </a>
        </div>
      </div>
    </main>
  );
}
