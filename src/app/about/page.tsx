'use client'
import Navbar from '@/components/Navbar'
import { useLang } from '@/context/LanguageContext'
import { CheckCircle2, Users, Zap, Globe } from 'lucide-react'

export default function AboutPage() {
  const { tr } = useLang()
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-3">{tr('about_badge')}</p>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">{tr('about_title')}</h1>
        </div>
      </section>

      {/* 소개 */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-500 text-lg leading-relaxed mb-12">{tr('about_desc')}</p>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[[Users,'360만+','프리랜서·1인 사업자'],[Zap,'2,700+','검증된 워케이션 공간'],[Globe,'7개','전국 커버리지 지역']].map(([Icon,v,l]: any) => (
              <div key={l as string} className="bg-gray-50 rounded-2xl p-6 text-center">
                <Icon className="w-6 h-6 text-teal-500 mx-auto mb-3" />
                <p className="text-3xl font-black text-gray-900 mb-1">{v}</p>
                <p className="text-sm text-gray-500">{l}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-black text-gray-900 mb-8">기존 워케이션 vs Wakation</h2>
          <div className="space-y-4">
            {[['about_q1','about_a1'],['about_q2','about_a2'],['about_q3','about_a3']].map(([q,a]) => (
              <div key={q} className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-2xl p-5 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-400 flex items-center justify-center text-xs shrink-0">✗</span>
                  <p className="text-gray-600 text-sm line-through">{tr(q)}</p>
                </div>
                <div className="bg-teal-50 rounded-2xl p-5 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                  <p className="text-gray-800 text-sm font-medium">{tr(a)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
