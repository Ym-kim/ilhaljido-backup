'use client'
import Navbar from '@/components/Navbar'
import { useLang } from '@/context/LanguageContext'
import { BookOpen, Globe, Users, Star } from 'lucide-react'

const PROGRAMS = [
  {
    name: '필리핀 세부 어학연수', country: '필리핀', level: '초~중급', duration: '4주~', price: '2,800,000',
    tags: ['1:1 수업', '워케이션 포함', '숙소 제공'],
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: '일본 도쿄 비즈니스 일본어', country: '일본', level: '초~고급', duration: '2주~', price: '3,500,000',
    tags: ['비즈니스 특화', 'Qoo10 연계', '현지 기업 방문'],
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: '몰타 영어 집중 과정', country: '몰타', level: '중~고급', duration: '2주~', price: '4,200,000',
    tags: ['유럽 생활', '소수 정예', '비즈니스 영어'],
    img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: '캐나다 밴쿠버 영어 연수', country: '캐나다', level: '전 레벨', duration: '4주~', price: '5,800,000',
    tags: ['북미 영어', '취업 연계', '액티비티 포함'],
    img: 'https://images.unsplash.com/photo-1560814304-4f05b62af116?auto=format&fit=crop&w=800&q=80',
  },
]

const FEATURES = [
  { icon: <BookOpen className="w-6 h-6" />, title: '일하면서 배운다', desc: '오전 수업 + 오후 원격업무. 언어 실력과 소득을 동시에' },
  { icon: <Globe className="w-6 h-6" />, title: '현지 몰입 환경', desc: '교실 밖 실전 언어 환경에서 빠르게 실력 향상' },
  { icon: <Users className="w-6 h-6" />, title: '한국인 커뮤니티', desc: '같은 목적의 한국 워케이셔너들과 함께 성장' },
]

export default function LanguagePage() {
  const { tr } = useLang()
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-3">{tr('lang_badge')}</p>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">{tr('lang_title')}</h1>
          <p className="text-white/60 mt-3 max-w-xl">{tr('lang_desc')}</p>
        </div>
      </section>

      {/* 특징 3가지 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-gray-50 rounded-2xl p-7">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-4">{f.icon}</div>
              <h3 className="font-black text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 프로그램 목록 */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-10">추천 어학연수 프로그램</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {PROGRAMS.map(p => (
              <div key={p.name} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-52 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">{p.country}</span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-white text-xs font-bold">{p.level}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-black text-gray-900 text-lg mb-2">{p.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{p.duration}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags.map(tag => (
                      <span key={tag} className="bg-rose-50 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-gray-900">₩{p.price}</span>
                      <span className="text-sm text-gray-400"> ~</span>
                    </div>
                    <button className="bg-rose-500 text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-rose-400 transition-colors">
                      신청하기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
