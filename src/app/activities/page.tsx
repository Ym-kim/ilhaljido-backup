'use client'
import Navbar from '@/components/Navbar'
import { useLang } from '@/context/LanguageContext'

const ACTS = [
  { title: '오름 선라이즈 트레킹', region: '제주', tag: '자연', img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80' },
  { title: '로컬 카페 크롤링', region: '전국', tag: '힐링', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80' },
  { title: '네트워킹 밋업', region: '전국', tag: '커뮤니티', img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80' },
  { title: '요가 & 명상', region: '제주·강원', tag: '웰니스', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80' },
  { title: '서핑 레슨', region: '부산·강원', tag: '스포츠', img: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80' },
  { title: '지역 문화 체험', region: '경주·전주', tag: '문화', img: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80' },
]

export default function ActivitiesPage() {
  const { tr } = useLang()
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navbar />
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-3">{tr('act_badge')}</p>
          <h1 className="text-5xl md:text-6xl font-black text-white">{tr('act_title')}</h1>
          <p className="text-white/60 mt-3 max-w-md">{tr('act_desc')}</p>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTS.map(a => (
            <div key={a.title} className="group rounded-3xl overflow-hidden cursor-pointer bg-white shadow-sm hover:shadow-xl transition-shadow">
              <img src={a.img} alt={a.title} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="p-5">
                <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">{a.tag}</span>
                <h3 className="font-black text-gray-900 mt-3 mb-1">{a.title}</h3>
                <p className="text-gray-400 text-xs">{a.region}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
