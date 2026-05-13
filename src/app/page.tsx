import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { ProgramCard } from '@/components/programs/ProgramCard'
import { ArrowRight, ChevronDown, CheckCircle } from 'lucide-react'
import type { Program } from '@/types/database'

export default async function HomePage() {
  let featuredPrograms: Program[] | null = null
  let allPrograms: Program[] | null = null
  try {
    const supabase = await createClient()
    const sb = supabase as any // eslint-disable-line
    const [fp, ap] = await Promise.all([
      sb.from('programs').select('*').eq('is_featured', true).in('status', ['open', 'soon']).limit(2),
      sb.from('programs').select('*').in('status', ['open', 'soon']).order('date_start', { ascending: true }).limit(6),
    ])
    featuredPrograms = fp.data
    allPrograms = ap.data
  } catch { /* Supabase not configured */ }

  return (
    <main className="overflow-hidden">

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-end pb-20 overflow-hidden">
        {/* BG image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=90"
            alt="워케이션" fill priority className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-8 lg:px-16 max-w-3xl pt-32">
          {/* Label */}
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300 text-[12px] font-bold tracking-[0.15em] uppercase">
              AI 워케이션 플랫폼
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2.6rem,6vw,5.5rem)] font-black text-white leading-[1.05] tracking-[-0.04em] mb-7">
            일하고,<br />배우고,<br />
            <span className="text-emerald-300">여행까지.</span>
          </h1>

          <p className="text-[17px] text-white/70 leading-relaxed max-w-lg mb-10">
            1인 기업가·프리랜서를 위한 새로운 방식의 워케이션.<br />
            AI가 업무 공간·성장 프로그램·힐링을 내 스타일로 설계합니다.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/programs"
              className="inline-flex items-center gap-2 bg-white text-dark font-bold text-[14px] px-6 py-3.5 rounded-full hover:bg-white/90 transition-all hover:-translate-y-0.5 shadow-lg">
              프로그램 보기 <ArrowRight size={15} />
            </Link>
            <Link href="/apply"
              className="inline-flex items-center gap-2 bg-brand-mid/90 text-white font-bold text-[14px] px-6 py-3.5 rounded-full hover:bg-brand-mid transition-all hover:-translate-y-0.5">
              신청 접수하기
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mt-14">
            {[
              { num: '6', label: '운영 프로그램' },
              { num: '10~15인', label: '소규모 진행' },
              { num: 'AI', label: '맞춤 플랜' },
              { num: '3~5박', label: '체류형 설계' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-[22px] font-black text-white tracking-tight">{s.num}</div>
                <div className="text-[11px] text-white/45 mt-0.5 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 right-10 hidden lg:flex flex-col items-center gap-2 text-white/30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/30" />
          <ChevronDown size={14} className="animate-bounce" />
        </div>
      </section>

      {/* ─── MANIFESTO ─── */}
      <section className="bg-dark py-28 px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-bold tracking-[0.2em] text-brand-mid uppercase mb-6">Our Philosophy</p>
          <h2 className="text-[clamp(1.8rem,3.5vw,3.2rem)] font-black text-white leading-tight tracking-tight max-w-3xl">
            "단순 여행도, 숨막히는 출장도 아닌<br />
            <span className="text-emerald-300">균형 잡힌 새로운 라이프스타일</span>을 만듭니다."
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {[
              { no: '01', title: '업무 공간', body: '전국 검증된 공유오피스와 업무 특화 공간을 원클릭으로. 빠른 인터넷, 집중 환경 보장.' },
              { no: '02', title: '성장 프로그램', body: 'AI 활용, 마케팅, 디자인, 글로벌 진출. 체류 기간 동안 하나의 스킬을 완성합니다.' },
              { no: '03', title: '로컬 힐링', body: '지역 문화, 맛집, 자연. 일 끝난 뒤의 진짜 재충전으로 번아웃 없이 지속합니다.' },
            ].map(c => (
              <div key={c.no} className="bg-white/[0.03] p-8 hover:bg-white/[0.06] transition-colors">
                <div className="text-[11px] font-bold text-brand-mid tracking-widest mb-4">{c.no}</div>
                <h3 className="text-[18px] font-black text-white mb-3">{c.title}</h3>
                <p className="text-[14px] text-white/50 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how" className="py-28 px-8 lg:px-16 bg-[#F9F7F3]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] font-bold tracking-[0.2em] text-brand-mid uppercase mb-4">HOW IT WORKS</p>
            <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-black text-dark">AI가 나만의 워케이션을 설계합니다</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: '01', emoji: '📋', t: '사전 진단', d: '업무 스타일·관심 분야·예산을 5분 안에 입력' },
              { n: '02', emoji: '✦', t: 'AI 플랜 수령', d: '최적 지역·공간·프로그램 조합을 자동 생성' },
              { n: '03', emoji: '📞', t: '담당자 확인', d: '3일 내 연락, 세부 일정과 준비사항 안내' },
              { n: '04', emoji: '🗺', t: '워케이션 출발', d: '일하고 배우고 쉬는 균형 잡힌 여정 시작' },
            ].map((s, i) => (
              <div key={s.n} className="relative bg-white rounded-2xl p-6 border border-[#E5E1DA]">
                <div className="text-[11px] font-black text-brand tracking-widest mb-5">{s.n}</div>
                <div className="text-2xl mb-4">{s.emoji}</div>
                <h3 className="text-[15px] font-black text-dark mb-2">{s.t}</h3>
                <p className="text-[13px] text-muted leading-relaxed">{s.d}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-[#E5E1DA]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROGRAMS ─── */}
      {allPrograms && allPrograms.length > 0 && (
        <section id="programs" className="py-28 px-8 lg:px-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[11px] font-bold tracking-[0.2em] text-brand-mid uppercase mb-3">PROGRAMS</p>
                <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-black text-dark">지금 신청 가능한 프로그램</h2>
              </div>
              <Link href="/programs"
                className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-bold text-brand hover:text-brand-dark transition-colors">
                전체 보기 <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allPrograms.map(p => <ProgramCard key={p.id} program={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ─── FULL-WIDTH PHOTO ─── */}
      <section className="relative h-[50vh] min-h-[380px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=85"
          alt="여행" fill className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-8">
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-emerald-300 uppercase mb-4">DESTINATIONS</p>
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-white tracking-tight">
              경기·강원·충청·경남<br />그리고 일본·동남아
            </h2>
          </div>
        </div>
      </section>

      {/* ─── DESTINATIONS GRID ─── */}
      <section className="py-28 px-8 lg:px-16 bg-[#F9F7F3]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { img: 'https://picsum.photos/seed/gangwon-mtn/400/500', label: '강원', sub: '속초·춘천' },
              { img: 'https://picsum.photos/seed/taean-shoreline/400/500', label: '충남', sub: '태안' },
              { img: 'https://picsum.photos/seed/gapyeong-lake/400/500', label: '경기', sub: '가평' },
              { img: 'https://picsum.photos/seed/japan-kyoto/400/500', label: '일본', sub: '오사카·교토' },
              { img: 'https://picsum.photos/seed/tongyeong-harbor/400/500', label: '경남', sub: '통영' },
            ].map(({ img, label, sub }) => (
              <div key={label} className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer">
                <Image src={img} alt={label} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="20vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-white font-black text-[15px] tracking-tight">{label}</div>
                  <div className="text-white/60 text-[12px]">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST SIGNALS ─── */}
      <section className="py-24 px-8 lg:px-16 bg-white border-t border-[#E5E1DA]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { check: '확정 전 비용 없음', desc: '신청 후 담당자 상담 → 최종 확정 시에만 결제' },
              { check: '7일 전 전액 환불', desc: '출발 7일 전까지 취소 시 100% 환불 보장' },
              { check: 'AI 맞춤 플랜 무료', desc: '신청서 기반 개인 맞춤 워케이션 플랜 제공' },
            ].map(t => (
              <div key={t.check} className="flex gap-3.5">
                <CheckCircle size={20} className="text-brand-mid flex-shrink-0 mt-0.5" strokeWidth={2} />
                <div>
                  <div className="font-black text-dark text-[15px] mb-1">{t.check}</div>
                  <div className="text-[13px] text-muted leading-relaxed">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-28 px-8 lg:px-16 bg-[#F9F7F3]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold tracking-[0.2em] text-brand-mid uppercase mb-4">FAQ</p>
            <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-black text-dark">자주 묻는 질문</h2>
          </div>
          <div className="bg-white rounded-2xl border border-[#E5E1DA] overflow-hidden divide-y divide-[#E5E1DA]">
            {[
              { q: '가격에 어떤 것들이 포함되나요?', a: '숙박비, 공유오피스/업무 공간 이용료, 프로그램 참가비, 일부 식사가 포함됩니다. 항공·교통비는 별도이며 상세 내역은 담당자 안내 시 알려드립니다.' },
              { q: '혼자 참가해도 괜찮나요?', a: '네, 대부분 혼자 오시는 1인 기업가·프리랜서분들입니다. 소규모(10~15명)라 자연스럽게 친해지실 수 있습니다.' },
              { q: '업무는 어느 정도 해야 하나요?', a: '강제 업무 시간은 없습니다. 오전 집중 업무 시간이 제공되고, 오후부터는 프로그램과 자유 시간으로 구성됩니다.' },
              { q: '취소·변경이 가능한가요?', a: '출발 7일 전 취소 시 전액 환불. 이내는 50% 환불이며 다음 회차 이월도 가능합니다.' },
              { q: '결제는 언제 하나요?', a: '신청 → 담당자 상담 → 최종 확정 후 결제. 신청만으로 비용 발생 없습니다.' },
            ].map((f, i) => (
              <details key={i} className="group">
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none hover:bg-[#F9F7F3] transition-colors">
                  <span className="font-bold text-dark text-[14px]">{f.q}</span>
                  <span className="text-muted text-lg font-thin ml-4 transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-5 text-[13px] text-muted leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="bg-dark py-28 px-8 text-center">
        <p className="text-[11px] font-bold tracking-[0.2em] text-brand-mid uppercase mb-5">GET STARTED</p>
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-white tracking-tight mb-5">
          나만의 워케이션을<br />지금 시작하세요.
        </h2>
        <p className="text-white/50 text-[15px] mb-10 max-w-md mx-auto">
          AI가 맞춤 플랜을 만들어드립니다.<br />신청 후 3일 내 담당자가 직접 연락드립니다.
        </p>
        <Link href="/apply"
          className="inline-flex items-center gap-2.5 bg-white text-dark font-black text-[15px] px-8 py-4 rounded-full hover:bg-white/90 transition-all hover:-translate-y-0.5 shadow-2xl">
          신청 접수하기 <ArrowRight size={16} />
        </Link>
      </section>

    </main>
  )
}
