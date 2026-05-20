'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { useLang } from '@/context/LanguageContext'
import { Star, Wifi, CheckCircle2, MapPin } from 'lucide-react'

const ASIA = [
  { name: '제주 애월 오션 빌라', country: '한국', region: '제주', score: 9.8, price: '148,000', tag: '오션뷰', wifi: '500Mbps', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80' },
  { name: '강원 설악 포레스트', country: '한국', region: '강원', score: 9.6, price: '98,000', tag: '산속', wifi: '300Mbps', img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80' },
  { name: '여수 하버뷰 레지던스', country: '한국', region: '전남', score: 9.4, price: '128,000', tag: '항구뷰', wifi: '400Mbps', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80' },
  { name: '발리 우붓 코리빙', country: '인도네시아', region: '발리', score: 9.7, price: '65,000', tag: '정글뷰', wifi: '200Mbps', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80' },
  { name: '치앙마이 님만 코워킹', country: '태국', region: '치앙마이', score: 9.5, price: '42,000', tag: '도심', wifi: '500Mbps', img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80' },
  { name: '다낭 오션 리조트', country: '베트남', region: '다낭', score: 9.3, price: '58,000', tag: '해변', wifi: '300Mbps', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80' },
]

const OCEANIA = [
  { name: '시드니 서큘러키 오피스', country: '호주', region: '시드니', score: 9.6, price: '185,000', tag: '항구뷰', wifi: '1Gbps', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80' },
  { name: '멜버른 CBD 코워킹', country: '호주', region: '멜버른', score: 9.4, price: '162,000', tag: '도심', wifi: '500Mbps', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
  { name: '바이런베이 비치 빌라', country: '호주', region: 'NSW', score: 9.7, price: '210,000', tag: '오션뷰', wifi: '300Mbps', img: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80' },
  { name: '오클랜드 하버 레지던스', country: '뉴질랜드', region: '오클랜드', score: 9.5, price: '175,000', tag: '항구뷰', wifi: '500Mbps', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80' },
  { name: '퀸스타운 레이크 오피스', country: '뉴질랜드', region: '퀸스타운', score: 9.8, price: '195,000', tag: '호수뷰', wifi: '400Mbps', img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80' },
  { name: '피지 코랄코스트 리조트', country: '피지', region: '비티레부', score: 9.6, price: '145,000', tag: '산호초', wifi: '200Mbps', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80' },
]

type Tab = 'asia' | 'oceania'

export default function StayPage() {
  const { tr } = useLang()
  const [tab, setTab] = useState<Tab>('asia')

  const spaces = tab === 'asia' ? ASIA : OCEANIA

  return (
    <div className="min-h-screen bg-[#111]">
      <Navbar />

      {/* 히어로 */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-3">{tr('stay_badge')}</p>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">{tr('stay_title')}</h1>
        </div>
      </section>

      {/* 검증 배지 */}
      <section className="bg-[#1a1a1a] py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-5 justify-center">
          {['WiFi 실측 100Mbps+', '전용 데스크 확인', '소음 레벨 측정', '현장 직접 방문'].map(b => (
            <div key={b} className="flex items-center gap-2 text-white/60 text-sm">
              <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />{b}
            </div>
          ))}
        </div>
      </section>

      {/* 탭 */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">

          {/* 탭 버튼 */}
          <div className="flex gap-3 mb-10">
            <button
              onClick={() => setTab('asia')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${
                tab === 'asia'
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/30'
              }`}
            >
              <MapPin className="w-4 h-4" />
              🌏 아시아
              <span className={`text-xs px-2 py-0.5 rounded-full ${tab==='asia' ? 'bg-white/20' : 'bg-white/10'}`}>
                {ASIA.length}
              </span>
            </button>

            <button
              onClick={() => setTab('oceania')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${
                tab === 'oceania'
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/30'
              }`}
            >
              <MapPin className="w-4 h-4" />
              🦘 오세아니아
              <span className={`text-xs px-2 py-0.5 rounded-full ${tab==='oceania' ? 'bg-white/20' : 'bg-white/10'}`}>
                {OCEANIA.length}
              </span>
            </button>
          </div>

          {/* 지역 설명 */}
          <div className="mb-8 p-5 bg-white/5 border border-white/10 rounded-2xl">
            {tab === 'asia' ? (
              <div>
                <p className="text-white font-bold mb-1">🌏 아시아 워케이션</p>
                <p className="text-white/50 text-sm">한국 국내 + 동남아시아 (발리, 치앙마이, 다낭 등). 비용 대비 최고의 워케이션 환경.</p>
              </div>
            ) : (
              <div>
                <p className="text-white font-bold mb-1">🦘 오세아니아 워케이션</p>
                <p className="text-white/50 text-sm">호주 · 뉴질랜드 · 피지. 영어권 + 선진국 인프라에서 프리미엄 워케이션 경험.</p>
              </div>
            )}
          </div>

          {/* 숙소 그리드 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map(s => (
              <div key={s.name} className="group rounded-3xl overflow-hidden cursor-pointer bg-[#1a1a1a] hover:scale-[1.02] transition-transform duration-300">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">{s.tag}</span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-white text-xs font-bold">{s.score}</span>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <span className="text-white/70 text-xs font-medium">{s.country}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-white/40 text-xs mb-1">{s.region}</p>
                  <h3 className="text-white font-bold mb-3 text-base">{s.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-white/50 text-xs flex items-center gap-1">
                      <Wifi className="w-3 h-3 text-teal-400" />{s.wifi}
                    </span>
                    <div>
                      <span className="text-teal-400 font-black text-lg">₩{s.price}</span>
                      <span className="text-white/30 font-normal text-xs">/박</span>
                    </div>
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
