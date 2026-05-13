import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Calendar, MapPin, Users, CheckCircle2,
  ArrowLeft, Clock, Wifi, Coffee, Home, BookOpen,
} from 'lucide-react'
import { formatPrice, formatDateRange, getRemainingSlots, CATEGORY_LABELS, STATUS_LABELS } from '@/lib/utils'
import type { Program } from '@/types/database'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getProgram(id: string): Promise<Program | null> {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase as any)
    .from('programs')
    .select('*')
    .eq('id', id)
    .single()
  return data
}

const INCLUDES_ICONS: Record<string, React.ReactNode> = {
  '숙박비': <Home size={14} />,
  '공유오피스 이용료': <Wifi size={14} />,
  '프로그램 참가비': <BookOpen size={14} />,
  '조식': <Coffee size={14} />,
  '석식': <Coffee size={14} />,
  '항공권': <Calendar size={14} />,
  '업무 공간': <Wifi size={14} />,
  '시장조사 투어': <MapPin size={14} />,
  '요가 클래스': <CheckCircle2 size={14} />,
  '네트워킹 프로그램': <Users size={14} />,
  '조식·석식': <Coffee size={14} />,
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const program = await getProgram(id)
  if (!program) notFound()

  const remaining = getRemainingSlots(program.max_participants, program.current_participants)

  const SAMPLE_SCHEDULE = [
    { day: 'DAY 1', title: '도착 & 오리엔테이션', items: ['숙소 체크인 및 짐 정리', '참가자 오리엔테이션 & 아이스브레이킹', '첫날 저녁 로컬 식당 탐방'] },
    { day: 'DAY 2', title: '업무 집중 + 프로그램', items: ['오전 09:00~12:00 자유 업무 집중 시간 (공유오피스)', '오후 13:00~17:00 메인 프로그램 워크숍', '저녁 자유 시간 (선택: 로컬 체험 투어)'] },
    { day: 'DAY 3', title: '심화 세션 + 네트워킹', items: ['오전 업무 집중 시간', '오후 실습 프로젝트 & 피드백', '저녁 네트워킹 파티'] },
    { day: `DAY ${program.duration_nights + 1}`, title: '마무리 & 출발', items: ['오전 결과 발표 & 소감 나누기', '점심 후 자유 체크아웃', '다음 워케이션 할인 혜택 제공'] },
  ]

  return (
    <main className="pt-16 min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-72 md:h-96">
        {program.image_url && (
          <Image src={program.image_url} alt={program.title} fill className="object-cover" priority sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 px-6 lg:px-[6%] pb-7">
          <Link href="/programs" className="inline-flex items-center gap-1.5 text-white/70 text-xs font-medium mb-3 hover:text-white transition-colors">
            <ArrowLeft size={13} /> 프로그램 목록으로
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="category" className="bg-white/20 text-white border-0">{CATEGORY_LABELS[program.category]}</Badge>
            <Badge variant={program.status as 'open' | 'soon' | 'full'}>{STATUS_LABELS[program.status]}</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">{program.title}</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-[6%] py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: <MapPin size={16} />, label: '장소', val: program.location },
                { icon: <Calendar size={16} />, label: '일정', val: formatDateRange(program.date_start, program.date_end) },
                { icon: <Clock size={16} />, label: '기간', val: `${program.duration_nights}박 ${program.duration_nights + 1}일` },
                { icon: <Users size={16} />, label: '인원', val: `최대 ${program.max_participants}명` },
              ].map(({ icon, label, val }) => (
                <div key={label} className="bg-cream rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-1.5 text-brand mb-1">{icon}<span className="text-xs font-bold text-muted">{label}</span></div>
                  <div className="text-sm font-bold text-dark">{val}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-black text-dark mb-3">프로그램 소개</h2>
              <p className="text-muted leading-relaxed">{program.description}</p>
            </div>

            {/* Tags */}
            <div>
              <h2 className="text-lg font-black text-dark mb-3">프로그램 특징</h2>
              <div className="flex flex-wrap gap-2">
                {program.tags.map(tag => (
                  <div key={tag} className="flex items-center gap-1.5 bg-brand-pale border border-brand/20 text-brand text-sm font-medium px-3 py-2 rounded-xl">
                    <CheckCircle2 size={14} /> {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h2 className="text-lg font-black text-dark mb-4">샘플 일정</h2>
              <div className="space-y-3">
                {SAMPLE_SCHEDULE.map((day) => (
                  <div key={day.day} className="border border-border rounded-xl overflow-hidden">
                    <div className="bg-brand px-4 py-2.5 flex items-center gap-3">
                      <span className="text-xs font-black text-emerald-300 tracking-widest">{day.day}</span>
                      <span className="text-sm font-bold text-white">{day.title}</span>
                    </div>
                    <div className="px-4 py-3 space-y-1.5">
                      {day.items.map(item => (
                        <div key={item} className="flex items-start gap-2 text-sm text-muted">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-mid mt-1.5 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted mt-3">* 세부 일정은 확정 후 안내드립니다. 프로그램에 따라 변경될 수 있습니다.</p>
            </div>
          </div>

          {/* Sidebar: Apply Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-border rounded-2xl p-6 sticky top-24 shadow-sm">
              <div className="text-2xl font-black text-dark mb-1">
                {formatPrice(program.price)}
                <span className="text-sm font-normal text-muted"> / 1인</span>
              </div>
              {program.status === 'open' && (
                <div className="text-sm text-muted mb-4">
                  잔여석 <span className="text-brand font-bold">{remaining}</span>명 / {program.max_participants}명
                  <div className="mt-1.5 h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-brand-mid rounded-full transition-all"
                      style={{ width: `${(program.current_participants / program.max_participants) * 100}%` }} />
                  </div>
                </div>
              )}

              {/* Price Includes */}
              <div className="mb-5">
                <div className="text-xs font-bold text-dark mb-2">가격 포함 항목</div>
                <div className="space-y-1.5">
                  {program.price_includes.map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-muted">
                      <span className="text-brand">{INCLUDES_ICONS[item] ?? <CheckCircle2 size={14} />}</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <Button asChild size="lg" className="w-full mb-3">
                <Link href={`/apply?program=${program.id}`}>
                  {program.status === 'open' ? '지금 신청하기' : '사전예약하기'}
                </Link>
              </Button>

              <div className="text-xs text-muted text-center leading-relaxed">
                신청 후 담당자가 3일 내 연락드립니다<br />
                확정 전 비용 발생 없음
              </div>

              {/* Contact */}
              <div className="mt-5 pt-4 border-t border-border">
                <div className="text-xs font-bold text-dark mb-2">문의</div>
                <a href="mailto:wakation@email.com" className="text-sm text-brand hover:underline">
                  wakation@email.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
