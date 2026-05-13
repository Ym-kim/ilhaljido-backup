import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: '일할지도 — 일하고 배우고 여행까지',
  description: '1인 기업가·프리랜서를 위한 AI 워케이션 통합 플랫폼. 업무 공간 + 성장 프로그램 + 로컬 힐링을 하나의 경험으로.',
  keywords: ['워케이션', '일할지도', '1인 기업가', '프리랜서', '원격근무', 'workation'],
  openGraph: {
    title: '일할지도 — 일하고 배우고 여행까지',
    description: '1인 기업가·프리랜서를 위한 AI 워케이션 통합 플랫폼',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
