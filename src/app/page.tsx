'use client'

import Link from 'next/link'
import { ChevronDown, Star, Wifi, ArrowRight, CheckCircle2, Building2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { useLang } from '@/context/LanguageContext'

const STAYS = [
  { name: '애월 오션 빌라', region: '제주', score: 9.8, price: '148,000', tag: '오션뷰', wifi: '500Mbps', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80' },
  { name: '설악 포레스트 하우스', region: '강원', score: 9.6, price: '98,000', tag: '산속', wifi: '300Mbps', img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80' },
  { name: '여수 하버뷰 레지던스', region: '전남', score: 9.4, price: '128,000', tag: '항구뷰', wifi: '400Mbps', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80' },
]

export default function HomePage() {
  const { tr } = useLang()

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navbar transparent />

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=85" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-6 pb-24">
          <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-3">{tr('hero_badge')}</p>
          <h1 className="text-7xl md:text-9xl font-black text-white leading-none mb-5 tracking-tight">{tr('hero_title')}</h1>
          <p className="text-xl md:text-2xl text-white/90 font-light mb-2">{tr('hero_sub')}</p>
          <p className="text-white/50 text-sm mb-10">{tr('hero_desc')}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/about" className="bg-teal-500 text-white font-bold px-8 py-4 rounded-full hover:bg-teal-400 transition-all hover:-translate-y-0.5 shadow-lg shadow-teal-500/30">
              {tr('hero_cta1')}
            </Link>
            <Link href="/stay" className="bg-white/15 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-full border border-white/30 hover:bg-white/25 transition-all">
              {tr('hero_cta2')}
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-1">
          <span className="text-xs tracking-widest">SCROLL</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-gray-900 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[['2,700+','검증된 워케이션 공간'],['360만','국내 프리랜서·1인사업자'],['9.4','평균 만족도'],['7개','커버리지 지역']].map(([v,l]) => (
            <div key={l}>
              <p className="text-3xl font-black text-white mb-1">{v}</p>
              <p className="text-sm text-gray-400">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── About Preview ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-teal-500 text-xs font-bold tracking-widest uppercase mb-4">{tr('about_badge')}</p>
            <h2 className="text-4xl font-black text-gray-900 mb-5 leading-tight">{tr('about_title')}</h2>
            <p className="text-gray-500 leading-relaxed mb-6 text-sm">{tr('about_desc')}</p>
            <div className="space-y-3">
              {[['about_q1','about_a1'],['about_q2','about_a2'],['about_q3','about_a3']].map(([q,a]) => (
                <div key={q} className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-400 flex items-center justify-center text-xs mt-0.5 shrink-0">✗</span>
                  <div>
                    <p className="text-gray-400 text-sm line-through">{tr(q)}</p>
                    <p className="text-gray-800 text-sm font-medium flex items-center gap-1.5 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />{tr(a)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about" className="inline-flex items-center gap-2 mt-8 text-teal-600 font-bold text-sm hover:gap-3 transition-all">
              {tr('about_badge')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=800&q=80" alt="" className="w-full h-[420px] object-cover rounded-3xl shadow-2xl" />
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-4 w-40">
              <p className="text-3xl font-black text-teal-500">9.4</p>
              <div className="flex gap-0.5 my-1">{[...Array(5)].map((_,i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}</div>
              <p className="text-xs text-gray-500">평균 만족도</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stay Preview ── */}
      <section className="py-24 px-6 bg-[#111]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-3">{tr('stay_badge')}</p>
              <h2 className="text-4xl font-black text-white">{tr('stay_title')}</h2>
            </div>
            <Link href="/stay" className="text-teal-400 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              {tr('stay_view_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {STAYS.map(s => (
              <Link href="/stay" key={s.name} className="group rounded-3xl overflow-hidden cursor-pointer relative block">
                <img src={s.img} alt={s.name} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4"><span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">{s.tag}</span></div>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/15 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" /><span className="text-white text-xs font-bold">{s.score}</span>
                </div>
                <div className="absolute bottom-0 p-5">
                  <p className="text-white/60 text-xs">{s.region}</p>
                  <h3 className="text-white font-bold">{s.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-white/50 text-xs flex items-center gap-1"><Wifi className="w-3 h-3" />{s.wifi}</span>
                    <span className="text-white font-black text-sm">₩{s.price}<span className="text-white/50 font-normal text-xs">/박</span></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 서비스 그리드 ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-3">모든 서비스</h2>
            <p className="text-gray-400 text-sm">하나의 플랫폼에서 워케이션의 모든 것을</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { href:'/about', label:tr('nav_about'), color:'bg-teal-500', img:'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=70' },
              { href:'/stay', label:tr('nav_stay'), color:'bg-blue-500', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=70' },
              { href:'/activities', label:tr('nav_activities'), color:'bg-orange-500', img:'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=70' },
              { href:'/workspace', label:tr('nav_workspace'), color:'bg-purple-500', img:'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=70' },
              { href:'/growth', label:tr('nav_growth'), color:'bg-green-500', img:'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=400&q=70' },
              { href:'/cruise', label:tr('nav_cruise'), color:'bg-cyan-500', img:'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=400&q=70' },
              { href:'/language', label:tr('nav_language'), color:'bg-rose-500', img:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=70' },
              { href:'/stay', label:'AI 매칭', color:'bg-amber-500', img:'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=400&q=70' },
            ].map(s => (
              <Link key={s.label} href={s.href} className="group relative rounded-2xl overflow-hidden h-40 cursor-pointer">
                <img src={s.img} alt={s.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className={`${s.color} text-white text-xs font-black px-2 py-0.5 rounded-full`}>{s.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
