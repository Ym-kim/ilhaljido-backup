import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-dark text-white/40 px-6 lg:px-[6%] py-14">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-7 h-7 rounded-[8px] bg-gradient-to-br from-brand-mid to-brand flex items-center justify-center text-white text-xs font-black">일</span>
              <span className="text-white text-base font-black tracking-tight">일할지도</span>
            </div>
            <p className="text-sm leading-relaxed">
              일하며 성장하며 여행하는 새로운 방식.<br />
              1인 기업가·프리랜서를 위한 AI 워케이션 플랫폼.
            </p>
          </div>
          <div>
            <h4 className="text-white/55 text-xs font-bold tracking-widest uppercase mb-4">프로그램</h4>
            <ul className="space-y-2 text-sm list-none">
              {['성장 캠프', '힐링·휴식', '네트워킹', '해외 연계'].map(t => (
                <li key={t}><Link href="/programs" className="text-white/38 hover:text-white/80 no-underline transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white/55 text-xs font-bold tracking-widest uppercase mb-4">문의</h4>
            <ul className="space-y-2 text-sm list-none">
              <li className="text-white/38">wakation@email.com</li>
              <li><Link href="/apply" className="text-white/38 hover:text-white/80 no-underline transition-colors">신청하기</Link></li>
              <li><a href="#faq" className="text-white/38 hover:text-white/80 no-underline transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between gap-2 text-xs">
          <span>© 2026 일할지도 (Wakation)</span>
          <span>AI 기반 워케이션 통합 플랫폼</span>
        </div>
      </div>
    </footer>
  )
}
