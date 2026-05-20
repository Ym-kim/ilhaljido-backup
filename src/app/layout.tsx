import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Wakation — Stay. Work. Grow.',
  description: '일, 쉼, 성장이 한 흐름으로 이어지는 워케이션. 숙소·액티비티·공유오피스·러닝을 하나의 여정으로.',
  keywords: '워케이션, 워크케이션, 프리랜서, 1인기업가, 제주, 강원, 성장캠프',
  openGraph: {
    title: 'Wakation — Stay. Work. Grow.',
    description: '일, 쉼, 성장이 한 흐름으로 이어지는 워케이션',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-full bg-white text-gray-900 antialiased flex flex-col">
        <LanguageProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
