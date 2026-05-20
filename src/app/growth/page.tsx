'use client'
import Navbar from '@/components/Navbar'
import { useLang } from '@/context/LanguageContext'

const CAMPS = [
  { num:'01', title:'AI 활용 스킬업', desc:'업무 자동화, 콘텐츠 제작, 리서치, 문서화를 위한 Claude·GPT 실무 활용' },
  { num:'02', title:'AI 디자인 스킬업', desc:'상세페이지, 카드뉴스, 배너, 브랜드 이미지 제작 실습' },
  { num:'03', title:'AI 마케팅 자동화', desc:'광고문구, 블로그, 숏폼, 이메일, 고객응대 자동화 설계' },
  { num:'04', title:'영어 스킬업', desc:'해외 비즈니스, 고객응대, 소싱, 커뮤니케이션 실전 영어' },
  { num:'05', title:'일본어 스킬업', desc:'Qoo10 Japan, 일본 시장조사, 현지 소통을 위한 실전 일본어' },
  { num:'06', title:'글로벌 셀링 실전', desc:'아마존, Qoo10, 쇼피, 일본·중국 시장조사 기반 판매전략' },
]

export default function GrowthPage() {
  const { tr } = useLang()
  return (
    <div className="min-h-screen bg-[#111]">
      <Navbar />
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-3">{tr('growth_badge')}</p>
          <h1 className="text-5xl md:text-6xl font-black text-white">{tr('growth_title')}</h1>
          <p className="text-white/60 mt-3 max-w-xl">{tr('growth_desc')}</p>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAMPS.map(c => (
            <div key={c.num} className="group bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-teal-500/40 transition-all cursor-pointer">
              <span className="text-teal-400/50 text-xs font-black tracking-widest">{c.num}</span>
              <h3 className="text-white font-black text-lg mt-4 mb-3 group-hover:text-teal-400 transition-colors">{c.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
