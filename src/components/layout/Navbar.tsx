'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const light = isHome && !scrolled

  return (
    <>
      <nav className={cn(
        'fixed inset-x-0 top-0 z-50 flex items-center justify-between transition-all duration-500',
        'px-8 lg:px-16 h-[60px]',
        light
          ? 'bg-transparent'
          : 'bg-white/90 backdrop-blur-xl border-b border-[#E5E1DA]/60 shadow-[0_1px_0_rgba(0,0,0,0.04)]'
      )}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className={cn(
            'w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black transition-all',
            'bg-gradient-to-br from-brand-mid to-brand'
          )}>일</span>
          <span className={cn(
            'text-[15px] font-black tracking-tight transition-colors',
            light ? 'text-white' : 'text-dark'
          )}>일할지도</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {[
            { href: '/#how', label: '이용방법' },
            { href: '/programs', label: '프로그램' },
            { href: '/apply', label: '신청' },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={cn(
                'text-[13px] font-semibold tracking-wide transition-colors',
                light ? 'text-white/75 hover:text-white' : 'text-muted hover:text-dark'
              )}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href="/apply" className={cn(
          'hidden md:flex items-center gap-2 text-[13px] font-bold px-4 py-2 rounded-full transition-all',
          light
            ? 'bg-white text-brand hover:bg-white/90'
            : 'bg-brand text-white hover:bg-brand-dark'
        )}>
          프로그램 신청
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className={cn('md:hidden w-8 h-8 flex flex-col justify-center gap-[5px] items-center', light ? 'text-white' : 'text-dark')}
        >
          <span className={cn('block h-[1.5px] w-5 bg-current transition-all', open && 'rotate-45 translate-y-[6.5px]')} />
          <span className={cn('block h-[1.5px] w-5 bg-current transition-all', open && 'opacity-0')} />
          <span className={cn('block h-[1.5px] w-5 bg-current transition-all', open && '-rotate-45 -translate-y-[6.5px]')} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={cn(
        'fixed inset-0 z-40 bg-dark flex flex-col px-8 pt-20 pb-10 transition-all duration-300 md:hidden',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}>
        {[
          { href: '/', label: '홈' },
          { href: '/programs', label: '프로그램' },
          { href: '/apply', label: '신청하기' },
        ].map(({ href, label }) => (
          <Link key={href} href={href}
            className="text-3xl font-black text-white/80 hover:text-white py-4 border-b border-white/10 transition-colors">
            {label}
          </Link>
        ))}
        <Link href="/apply"
          className="mt-8 bg-brand-mid text-white text-center py-4 rounded-2xl text-lg font-black">
          지금 신청하기 →
        </Link>
      </div>
    </>
  )
}
