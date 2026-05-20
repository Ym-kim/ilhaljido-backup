'use client'

import Link from 'next/link'
import { Mountain } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'

export default function Footer() {
  const { tr } = useLang()
  return (
    <footer className="bg-[#0a0a0a] text-white/65 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="w-5 h-5 text-teal-500" />
              <span className="font-black text-white text-lg">Wakation</span>
            </div>
            <p className="text-sm leading-relaxed text-white/55 max-w-xs">Stay. Work. Grow.</p>
          </div>
          <div>
            <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">{tr('footer_service')}</h4>
            <ul className="space-y-2 text-sm">
              {[
                { k:'nav_stay', h:'/stay' }, { k:'nav_activities', h:'/activities' },
                { k:'nav_workspace', h:'/workspace' }, { k:'nav_growth', h:'/growth' },
                { k:'nav_cruise', h:'/cruise' }, { k:'nav_language', h:'/language' },
              ].map(i => (
                <li key={i.k}><Link href={i.h} className="hover:text-white transition-colors">{tr(i.k)}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">{tr('footer_contact')}</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-white/60">hello@wakation.kr</li>
              <li><Link href="/about" className="hover:text-white transition-colors">{tr('nav_about')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs">
          <span>{tr('footer_copy')}</span>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-white transition-colors">{tr('footer_privacy')}</Link>
            <Link href="#" className="hover:text-white transition-colors">{tr('footer_terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
