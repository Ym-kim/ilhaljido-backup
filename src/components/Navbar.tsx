'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Mountain, Menu, X } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n'

const NAV_LINKS = [
  { key: 'nav_about',      href: '/about' },
  { key: 'nav_stay',       href: '/stay' },
  { key: 'nav_activities', href: '/activities' },
  { key: 'nav_workspace',  href: '/workspace' },
  { key: 'nav_growth',     href: '/growth' },
  { key: 'nav_cruise',     href: '/cruise' },
  { key: 'nav_language',   href: '/language' },
]

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const { lang, setLang, tr } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    fn()
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // 투명 모드: 최상단에서만 투명, 스크롤하면 흰 배경
  // 비투명 모드: 항상 흰 배경
  const isTransparentNow = transparent && !scrolled

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      isTransparentNow
        ? 'bg-black/40 backdrop-blur-sm'
        : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* 로고 */}
        <Link href="/" className={`flex items-center gap-2 font-black text-base transition-colors ${
          isTransparentNow ? 'text-white' : 'text-gray-900'
        }`}>
          <Mountain className="w-5 h-5 text-teal-500" />
          Wakation
        </Link>

        {/* 데스크탑 메뉴 — 항상 명확하게 */}
        <ul className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(n => (
            <li key={n.key}>
              <Link href={n.href} className={`text-sm font-semibold transition-colors hover:text-teal-500 ${
                isTransparentNow ? 'text-white/90' : 'text-gray-700'
              }`}>
                {tr(n.key)}
              </Link>
            </li>
          ))}
        </ul>

        {/* 우측 */}
        <div className="hidden lg:flex items-center gap-3">
          {/* 언어 전환 */}
          <div className={`flex items-center gap-0.5 text-xs font-bold rounded-full border p-0.5 ${
            isTransparentNow ? 'border-white/30' : 'border-gray-200'
          }`}>
            {(['KO','EN','JP'] as Lang[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === l
                    ? 'bg-teal-500 text-white shadow-sm'
                    : isTransparentNow
                      ? 'text-white/70 hover:text-white'
                      : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <Link href="#" className={`text-sm font-medium transition-colors hover:text-teal-500 ${
            isTransparentNow ? 'text-white/80' : 'text-gray-600'
          }`}>
            {tr('nav_login')}
          </Link>

          <Link href="/about"
            className="bg-teal-500 text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-teal-400 transition-colors">
            {tr('nav_cta')}
          </Link>
        </div>

        {/* 모바일 */}
        <button onClick={() => setOpen(!open)} className={isTransparentNow ? 'text-white lg:hidden' : 'text-gray-800 lg:hidden'}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-5 space-y-1">
          {NAV_LINKS.map(n => (
            <Link key={n.key} href={n.href} onClick={() => setOpen(false)}
              className="block text-gray-700 text-sm font-medium py-2.5 border-b border-gray-50 hover:text-teal-600 transition-colors">
              {tr(n.key)}
            </Link>
          ))}
          <div className="flex gap-2 pt-4">
            {(['KO','EN','JP'] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  lang === l ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {l}
              </button>
            ))}
          </div>
          <Link href="/about" onClick={() => setOpen(false)}
            className="block mt-3 bg-teal-500 text-white text-center font-bold py-3 rounded-full text-sm hover:bg-teal-400 transition-colors">
            {tr('nav_cta')}
          </Link>
        </div>
      )}
    </nav>
  )
}
