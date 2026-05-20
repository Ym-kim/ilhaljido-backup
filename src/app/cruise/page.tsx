'use client'
import Navbar from '@/components/Navbar'
import { useLang } from '@/context/LanguageContext'
import { Anchor, Wifi, Globe, Star } from 'lucide-react'

const ROUTES = [
  { name: '동아시아 크루즈 워케이션', ports: '부산 → 후쿠오카 → 나가사키 → 상하이', days: '7박 8일', price: '1,200,000', img: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80' },
  { name: '동남아 크루즈 워케이션', ports: '싱가포르 → 페낭 → 랑카위 → 푸켓', days: '10박 11일', price: '1,800,000', img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&w=800&q=80' },
  { name: '지중해 크루즈 워케이션', ports: '바르셀로나 → 로마 → 아테네 → 두브로브니크', days: '14박 15일', price: '3,500,000', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80' },
]

export default function CruisePage() {
  const { tr } = useLang()
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-3">{tr('cruise_badge')}</p>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">{tr('cruise_title')}</h1>
          <p className="text-white/60 mt-3 max-w-xl">{tr('cruise_desc')}</p>
        </div>
      </section>

      {/* 특징 */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: <Wifi className="w-6 h-6" />, title: '선상 WiFi 보장', desc: '크루즈 전용 위성 인터넷, 업무 가능한 속도 확인' },
            { icon: <Globe className="w-6 h-6" />, title: '항구마다 새 영감', desc: '기항지에서 현지 문화 체험과 네트워킹' },
            { icon: <Anchor className="w-6 h-6" />, title: '올인클루시브', desc: '숙박·식사·액티비티 모두 포함' },
          ].map(f => (
            <div key={f.title} className="bg-white rounded-2xl p-7 shadow-sm">
              <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-500 mb-4">{f.icon}</div>
              <h3 className="font-black text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 루트 */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-10">추천 크루즈 루트</h2>
          <div className="space-y-6">
            {ROUTES.map(r => (
              <div key={r.name} className="group flex flex-col md:flex-row gap-6 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={r.img} alt={r.name} className="w-full md:w-64 h-48 md:h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-gray-400">{r.days}</span>
                  </div>
                  <h3 className="font-black text-gray-900 text-xl mb-2">{r.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{r.ports}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-teal-500">₩{r.price}<span className="text-sm text-gray-400 font-normal">/인</span></span>
                    <button className="bg-teal-500 text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-teal-400 transition-colors">
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
