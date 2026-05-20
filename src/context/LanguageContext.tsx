'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Lang, t } from '@/lib/i18n'

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; tr: (key: string) => string }

const LangContext = createContext<LangCtx>({ lang: 'KO', setLang: () => {}, tr: (k) => k })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('KO')

  useEffect(() => {
    const saved = localStorage.getItem('wakation_lang') as Lang
    if (saved && ['KO', 'EN', 'JP'].includes(saved)) setLangState(saved)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('wakation_lang', l)
  }

  const tr = (key: string) => t[lang][key] ?? t['KO'][key] ?? key

  return <LangContext.Provider value={{ lang, setLang, tr }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
