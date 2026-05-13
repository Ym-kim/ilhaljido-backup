'use client'

import { useState } from 'react'
import { ProgramCard } from '@/components/programs/ProgramCard'
import { CATEGORY_LABELS } from '@/lib/utils'
import type { Program } from '@/types/database'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Search } from 'lucide-react'

const FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'growth', label: '성장 캠프' },
  { key: 'healing', label: '힐링·휴식' },
  { key: 'network', label: '네트워킹' },
  { key: 'global', label: '해외 연계' },
]

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [filtered, setFiltered] = useState<Program[]>([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [aiSearching, setAiSearching] = useState(false)
  const [aiMessage, setAiMessage] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('programs')
      .select('*')
      .in('status', ['open', 'soon'])
      .order('date_start', { ascending: true })
      .then(({ data }) => {
        setPrograms(data ?? [])
        setFiltered(data ?? [])
      })
  }, [])

  function applyFilter(key: string) {
    setActiveFilter(key)
    setAiMessage('')
    setQuery('')
    if (key === 'all') {
      setFiltered(programs)
    } else {
      setFiltered(programs.filter(p => p.category === key))
    }
  }

  async function handleAiSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setAiSearching(true)
    setAiMessage('')
    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      const data = await res.json()
      if (data.programs?.length > 0) {
        setFiltered(data.programs)
        setAiMessage(data.message)
      } else {
        setAiMessage('조건에 맞는 프로그램을 찾지 못했습니다. 다른 방식으로 검색해 보세요.')
        setFiltered([])
      }
    } catch {
      setAiMessage('검색 중 오류가 발생했습니다.')
    } finally {
      setAiSearching(false)
    }
  }

  return (
    <main className="pt-20 min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-brand px-6 lg:px-[6%] py-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-emerald-300 text-xs font-black tracking-widest uppercase mb-3">PROGRAMS</p>
          <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-3">
            지금 신청 가능한 프로그램
          </h1>
          <p className="text-white/70 mb-8">1인 기업가·프리랜서의 성장과 힐링을 위해 설계된 워케이션 프로그램입니다.</p>

          {/* AI Search */}
          <form onSubmit={handleAiSearch} className="flex gap-2 max-w-lg">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="자연어로 검색해보세요 — '혼자 바다 보며 마케팅 배우고 싶어'"
                className="w-full bg-white/10 border border-white/25 text-white placeholder:text-white/40 rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-white/50 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={aiSearching}
              className="bg-white text-brand font-bold text-sm px-5 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-60"
            >
              {aiSearching ? '검색중…' : 'AI 검색'}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-[6%] py-10">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => applyFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                activeFilter === f.key
                  ? 'bg-brand border-brand text-white'
                  : 'bg-white border-border text-muted hover:border-brand hover:text-brand'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {aiMessage && (
          <div className="mb-6 p-4 bg-brand-pale border border-brand/20 rounded-xl text-sm text-brand">
            <span className="font-bold">AI 추천:</span> {aiMessage}
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => <ProgramCard key={p.id} program={p} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-muted">
            <p className="text-lg font-bold mb-2">해당 조건의 프로그램이 없습니다</p>
            <p className="text-sm">다른 카테고리를 선택하거나 전체 보기를 클릭해 주세요.</p>
          </div>
        )}
      </div>
    </main>
  )
}
