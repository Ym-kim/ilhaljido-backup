'use client'
import Navbar from '@/components/Navbar'
import { useLang } from '@/context/LanguageContext'
import { Wifi, Monitor, Building2, Zap, Volume2, Coffee } from 'lucide-react'

const FEATURES = [
  { icon: <Wifi className="w-6 h-6" />, title: '기가 인터넷', desc: '1Gbps 전용 회선 + 백업 LTE' },
  { icon: <Monitor className="w-6 h-6" />, title: '고사양 모니터', desc: '27인치 4K 모니터 제공' },
  { icon: <Building2 className="w-6 h-6" />, title: '독립 부스', desc: '방음 처리된 집중 업무 공간' },
  { icon: <Zap className="w-6 h-6" />, title: '24시간 이용', desc: '언제든 입장 가능' },
  { icon: <Volume2 className="w-6 h-6" />, title: '화상회의룸', desc: '방음 처리된 전용 미팅룸' },
  { icon: <Coffee className="w-6 h-6" />, title: '음료 무제한', desc: '커피·차·음료 무제한 제공' },
]

export default function WorkspacePage() {
  const { tr } = useLang()
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Navbar />
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-3">{tr('ws_badge')}</p>
          <h1 className="text-5xl md:text-6xl font-black text-white">{tr('ws_title')}</h1>
          <p className="text-white/60 mt-3 max-w-md">{tr('ws_desc')}</p>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-500 mb-5">{f.icon}</div>
                <h3 className="font-black text-gray-900 text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
