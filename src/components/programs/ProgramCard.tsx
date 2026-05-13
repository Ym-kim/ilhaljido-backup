import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Calendar, Users, ArrowUpRight } from 'lucide-react'
import { formatPrice, formatDateRange, getRemainingSlots, CATEGORY_LABELS, STATUS_LABELS } from '@/lib/utils'
import type { Program } from '@/types/database'

const STATUS_STYLES = {
  open:   'bg-emerald-500 text-white',
  soon:   'bg-amber-500 text-white',
  full:   'bg-neutral-400 text-white',
  closed: 'bg-neutral-300 text-neutral-600',
}

const CATEGORY_ACCENT = {
  growth:  'from-emerald-900 to-emerald-600',
  healing: 'from-amber-900 to-amber-600',
  network: 'from-violet-900 to-violet-600',
  global:  'from-sky-900 to-sky-600',
}

interface ProgramCardProps { program: Program }

export function ProgramCard({ program }: ProgramCardProps) {
  const remaining = getRemainingSlots(program.max_participants, program.current_participants)

  return (
    <Link href={`/programs/${program.id}`} className="group block">
      <article className="relative flex flex-col h-full bg-white rounded-[20px] overflow-hidden border border-[#E5E1DA] transition-all duration-400 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          {program.image_url ? (
            <Image
              src={program.image_url} alt={program.location}
              fill className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${CATEGORY_ACCENT[program.category] ?? 'from-brand to-brand-dark'}`} />
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start justify-between">
            <span className="text-[11px] font-bold tracking-wider uppercase text-white/80 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
              {CATEGORY_LABELS[program.category]}
            </span>
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[program.status]}`}>
              {STATUS_LABELS[program.status]}
            </span>
          </div>

          {/* Bottom location */}
          <div className="absolute bottom-3 left-3.5 flex items-center gap-1 text-white/90 text-xs font-medium">
            <MapPin size={11} />
            {program.location}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">
          {/* Duration tag */}
          <div className="text-[11px] font-bold text-brand tracking-wider uppercase mb-2">
            {program.duration_nights}박 {program.duration_nights + 1}일
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-black text-dark leading-snug mb-3 line-clamp-2 tracking-tight">
            {program.title}
          </h3>

          {/* Meta */}
          <div className="flex flex-col gap-1.5 mb-4">
            <span className="flex items-center gap-1.5 text-[12px] text-muted">
              <Calendar size={11} className="text-brand-mid flex-shrink-0" />
              {formatDateRange(program.date_start, program.date_end)}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-muted">
              <Users size={11} className="text-brand-mid flex-shrink-0" />
              최대 {program.max_participants}명 소규모
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-auto">
            {program.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[11px] font-semibold text-brand bg-brand-pale px-2.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-end justify-between mt-4 pt-4 border-t border-[#E5E1DA]">
            <div>
              <div className="text-[18px] font-black text-dark tracking-tight">
                {formatPrice(program.price)}
              </div>
              <div className="text-[11px] text-muted mt-0.5">
                {program.status === 'open'
                  ? <>잔여 <span className="text-brand font-bold">{remaining}</span>석</>
                  : program.status === 'soon' ? '사전예약 접수중' : ''
                }
              </div>
            </div>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300
              group-hover:scale-110 group-hover:bg-brand group-hover:text-white
              bg-[#F1EDE5] text-dark`}>
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
