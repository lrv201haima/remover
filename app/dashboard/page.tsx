import Link from 'next/link';

const mockUser = {
  name: '张三',
  email: 'zhangsan@example.com',
  picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan',
  credits: 156,
  subscription: {
    plan: 'Pro 年付',
    status: 'active',
    renewDate: '2027-04-15',
  },
  usageHistory: [
    { date: '2026-04-15', count: 3, type: '抠图' },
    { date: '2026-04-14', count: 5, type: '抠图' },
    { date: '2026-04-13', count: 2, type: '抠图' },
    { date: '2026-04-12', count: 8, type: '抠图' },
    { date: '2026-04-10', count: 1, type: '抠图' },
    { date: '2026-04-09', count: 4, type: '抠图' },
    { date: '2026-04-08', count: 6, type: '抠图' },
  ],
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-900">HAIMA Remover</Link>
          <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900">定价方案</Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* User Info */}
        <div className="mb-8 flex items-center gap-4 rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <img
            src={mockUser.picture}
            alt={mockUser.name}
            className="h-16 w-16 rounded-full border-2 border-slate-200"
          />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{mockUser.name}</h1>
            <p className="text-slate-500">{mockUser.email}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {/* Credits */}
          <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-700 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-brand-100">剩余 Credits</span>
              <span className="text-2xl">💎</span>
            </div>
            <div className="mt-2 text-4xl font-bold">{mockUser.credits}</div>
            <p className="mt-1 text-sm text-brand-100">次处理可用</p>
            <Link
              href="/order"
              className="mt-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/30 transition"
            >
              充值 Credits →
            </Link>
          </div>

          {/* Subscription */}
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">当前订阅</span>
              <span className="text-2xl">📦</span>
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{mockUser.subscription.plan}</div>
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                {mockUser.subscription.status === 'active' ? '● 生效中' : '已过期'}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-500">续费日期：{mockUser.subscription.renewDate}</p>
            <Link
              href="/pricing"
              className="mt-4 inline-block rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              管理订阅 →
            </Link>
          </div>

          {/* Monthly Usage */}
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">本月使用</span>
              <span className="text-2xl">📊</span>
            </div>
            <div className="mt-2 text-4xl font-bold text-slate-900">
              {mockUser.usageHistory.reduce((sum, h) => sum + h.count, 0)}
              <span className="ml-2 text-lg font-normal text-slate-400">次</span>
            </div>
            <div className="mt-3 w-full rounded-full bg-slate-100 h-2">
              <div
                className="h-2 rounded-full bg-brand-500"
                style={{ width: `${Math.min((mockUser.usageHistory.reduce((sum, h) => sum + h.count, 0) / 200) * 100, 100)}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-slate-500">本月额度 200 次，已用 {Math.round((mockUser.usageHistory.reduce((sum, h) => sum + h.count, 0) / 200) * 100)}%</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <Link
            href="/"
            className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border border-slate-200 hover:shadow-md hover:border-brand-300 transition group"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-xl group-hover:bg-brand-200 transition">
              🖼️
            </div>
            <div>
              <p className="font-semibold text-slate-900">开始抠图</p>
              <p className="text-sm text-slate-500">上传图片，立即处理</p>
            </div>
          </Link>
          <Link
            href="/order"
            className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border border-slate-200 hover:shadow-md hover:border-brand-300 transition group"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-xl group-hover:bg-amber-200 transition">
              💳
            </div>
            <div>
              <p className="font-semibold text-slate-900">购买 Credits</p>
              <p className="text-sm text-slate-500">¥19 起，永久有效</p>
            </div>
          </Link>
        </div>

        {/* Usage History */}
        <div className="rounded-3xl bg-white shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">使用记录</h2>
            <span className="text-sm text-slate-500">最近 7 天</span>
          </div>
          <div className="divide-y divide-slate-50">
            {mockUser.usageHistory.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-sm">
                    📷
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{item.type}</p>
                    <p className="text-xs text-slate-400">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-slate-700">-{item.count} Credits</span>
                  <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">成功</span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 px-6 py-4 text-center">
            <button className="text-sm text-brand-600 hover:text-brand-700 font-medium">
              查看全部记录 →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
