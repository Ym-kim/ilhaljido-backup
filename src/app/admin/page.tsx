'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatPrice } from '@/lib/utils'
import {
  Users, Clock, CheckCircle2, XCircle,
  PhoneCall, TrendingUp, RefreshCw, Search,
  ChevronRight, Calendar, Briefcase,
} from 'lucide-react'
import type { Application } from '@/types/database'

const STATUS_MAP = {
  pending:   { label: '신규 접수', color: 'bg-amber-100 text-amber-800', icon: Clock },
  contacted: { label: '연락 완료', color: 'bg-blue-100 text-blue-800', icon: PhoneCall },
  confirmed: { label: '확정', color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle2 },
  cancelled: { label: '취소', color: 'bg-red-100 text-red-800', icon: XCircle },
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [apps, setApps] = useState<Application[]>([])
  const [filtered, setFiltered] = useState<Application[]>([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Application | null>(null)
  const [loading, setLoading] = useState(false)
  const [memo, setMemo] = useState('')

  // 임시 비밀번호 (실제 운영 시 env var로 교체)
  function login(e: React.FormEvent) {
    e.preventDefault()
    if (pw === (process.env.NEXT_PUBLIC_ADMIN_PW || 'ilhaljido2026')) {
      setAuthed(true)
      loadApps()
    } else {
      alert('비밀번호가 틀렸습니다.')
    }
  }

  async function loadApps() {
    setLoading(true)
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any)
      .from('applications')
      .select('*, programs(title, location)')
      .order('created_at', { ascending: false })
    setApps(data ?? [])
    setFiltered(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    let result = apps
    if (filter !== 'all') result = result.filter(a => a.status === filter)
    if (search) result = result.filter(a =>
      a.name.includes(search) || a.phone.includes(search) || a.email.includes(search)
    )
    setFiltered(result)
  }, [filter, search, apps])

  async function updateStatus(id: string, status: string) {
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('applications').update({ status }).eq('id', id)
    await loadApps()
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: status as Application['status'] } : null)
  }

  async function saveMemo(id: string) {
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('applications').update({ admin_memo: memo }).eq('id', id)
    await loadApps()
  }

  const counts = {
    all: apps.length,
    pending: apps.filter(a => a.status === 'pending').length,
    contacted: apps.filter(a => a.status === 'contacted').length,
    confirmed: apps.filter(a => a.status === 'confirmed').length,
    cancelled: apps.filter(a => a.status === 'cancelled').length,
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-border p-8 w-full max-w-sm shadow-sm">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-brand-mid to-brand flex items-center justify-center text-white text-sm font-black">일</span>
            <span className="text-lg font-black text-dark">관리자 로그인</span>
          </div>
          <form onSubmit={login} className="space-y-4">
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="관리자 비밀번호"
              className="w-full border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-brand-mid"
              autoFocus
            />
            <button type="submit" className="w-full bg-brand text-white rounded-lg py-3 font-bold text-sm hover:bg-brand-dark transition-colors">
              로그인
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Top Bar */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-brand-mid to-brand flex items-center justify-center text-white text-sm font-black">일</span>
          <span className="font-black text-dark">일할지도 관리자</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted">총 신청 {counts.all}건</span>
          <button onClick={loadApps} className="flex items-center gap-1.5 text-sm text-muted hover:text-brand border border-border rounded-lg px-3 py-1.5 hover:border-brand transition-colors">
            <RefreshCw size={13} /> 새로고침
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { key: 'pending', label: '신규 접수', num: counts.pending, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
          { key: 'contacted', label: '연락 완료', num: counts.contacted, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
          { key: 'confirmed', label: '확정', num: counts.confirmed, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
          { key: 'cancelled', label: '취소', num: counts.cancelled, color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
        ].map(s => (
          <div key={s.key} className={`rounded-xl border p-4 ${s.bg}`}>
            <div className={`text-2xl font-black ${s.color}`}>{s.num}</div>
            <div className="text-xs font-medium text-gray-600 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="px-6 pb-6 flex gap-5 items-start">
        {/* List */}
        <div className="flex-1">
          {/* Filters + Search */}
          <div className="bg-white rounded-xl border border-border p-4 mb-3 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {[
                { key: 'all', label: `전체 (${counts.all})` },
                { key: 'pending', label: `신규 (${counts.pending})` },
                { key: 'contacted', label: `연락완료 (${counts.contacted})` },
                { key: 'confirmed', label: `확정 (${counts.confirmed})` },
                { key: 'cancelled', label: `취소 (${counts.cancelled})` },
              ].map(f => (
                <button key={f.key} onClick={() => setFilter(f.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    filter === f.key ? 'bg-brand border-brand text-white' : 'bg-white border-border text-muted hover:border-brand'
                  }`}>
                  {f.label}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="이름·연락처·이메일 검색"
                className="pl-8 pr-3 py-1.5 border border-border rounded-lg text-xs outline-none focus:border-brand-mid w-48" />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            {loading ? (
              <div className="py-16 text-center text-sm text-muted">로딩 중…</div>
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center text-sm text-muted">신청 내역이 없습니다.</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-cream">
                    <th className="text-left px-4 py-3 text-xs font-bold text-muted">이름</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-muted">연락처</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-muted hidden md:table-cell">프로그램</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-muted hidden lg:table-cell">직업</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-muted">상태</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-muted hidden md:table-cell">신청일</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((app, i) => {
                    const s = STATUS_MAP[app.status]
                    return (
                      <tr key={app.id}
                        className={`border-b border-border hover:bg-cream cursor-pointer transition-colors ${selected?.id === app.id ? 'bg-brand-pale' : ''} ${i === filtered.length - 1 ? 'border-b-0' : ''}`}
                        onClick={() => { setSelected(app); setMemo(app.admin_memo || '') }}>
                        <td className="px-4 py-3 font-bold text-dark">{app.name}</td>
                        <td className="px-4 py-3 text-muted">{app.phone}</td>
                        <td className="px-4 py-3 text-muted hidden md:table-cell truncate max-w-[160px]">
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {(app as any).programs?.title ?? app.program_id ?? '미정'}
                        </td>
                        <td className="px-4 py-3 text-muted hidden lg:table-cell">{app.job_type}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${s.color}`}>
                            <s.icon size={10} /> {s.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted text-xs hidden md:table-cell">
                          {new Date(app.created_at).toLocaleDateString('ko-KR')}
                        </td>
                        <td className="px-4 py-3"><ChevronRight size={14} className="text-muted" /></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-xl border border-border p-5 sticky top-20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-black text-dark text-lg">{selected.name}</div>
                  <div className="text-sm text-muted">{selected.email}</div>
                </div>
                <button onClick={() => setSelected(null)} className="text-muted hover:text-dark text-lg leading-none">×</button>
              </div>

              {/* Info */}
              <div className="space-y-2 mb-4">
                {[
                  { icon: <PhoneCall size={13} />, val: selected.phone },
                  { icon: <Briefcase size={13} />, val: selected.job_type },
                  { icon: <Calendar size={13} />, val: selected.duration_preference ?? '미정' },
                  { icon: <TrendingUp size={13} />, val: selected.budget_range ?? '미정' },
                ].map(({ icon, val }) => (
                  <div key={val} className="flex items-center gap-2 text-sm text-muted">
                    <span className="text-brand">{icon}</span> {val}
                  </div>
                ))}
              </div>

              {selected.interests.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs font-bold text-dark mb-1.5">관심 분야</div>
                  <div className="flex flex-wrap gap-1">
                    {selected.interests.map(t => (
                      <span key={t} className="bg-brand-pale text-brand text-xs font-medium px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {selected.message && (
                <div className="mb-4 p-3 bg-cream rounded-lg text-xs text-muted leading-relaxed">
                  {selected.message}
                </div>
              )}

              {/* Status Change */}
              <div className="mb-4">
                <div className="text-xs font-bold text-dark mb-2">상태 변경</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {Object.entries(STATUS_MAP).map(([key, s]) => (
                    <button key={key} onClick={() => updateStatus(selected.id, key)}
                      className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        selected.status === key
                          ? 'bg-brand border-brand text-white'
                          : 'border-border text-muted hover:border-brand hover:text-brand'
                      }`}>
                      <s.icon size={11} /> {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Memo */}
              <div>
                <div className="text-xs font-bold text-dark mb-1.5">관리자 메모</div>
                <textarea value={memo} onChange={e => setMemo(e.target.value)} rows={3}
                  placeholder="상담 내용, 특이사항 등..."
                  className="w-full border border-border rounded-lg px-3 py-2 text-xs outline-none focus:border-brand-mid resize-none" />
                <button onClick={() => saveMemo(selected.id)}
                  className="w-full mt-1.5 bg-brand text-white rounded-lg py-2 text-xs font-bold hover:bg-brand-dark transition-colors">
                  메모 저장
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
