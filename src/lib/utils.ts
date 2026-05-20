import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ko-KR').format(price) + '원'
}

export function formatDateRange(start: string, end: string): string {
  const s = new Date(start)
  const e = new Date(end)
  const fmt = (d: Date) =>
    `${d.getMonth() + 1}/${d.getDate()}(${['일','월','화','수','목','금','토'][d.getDay()]})`
  return `${s.getFullYear()}. ${fmt(s)} ~ ${fmt(e)}`
}

export function getRemainingSlots(max: number, current: number): number {
  return Math.max(0, max - current)
}

export function getRegionLabel(region: string): string {
  const map: Record<string, string> = {
    jeju: '제주', gangwon: '강원', jeonnam: '전남',
    gyeongnam: '경남', busan: '부산', other: '기타',
  }
  return map[region] ?? region
}

export function getSpaceTypeLabel(type: string): string {
  const map: Record<string, string> = {
    cafe: '카페', coworking: '코워킹', pension: '펜션', hotel: '호텔', villa: '빌라',
  }
  return map[type] ?? type
}

export function getNoiseLevelLabel(level: number): string {
  const map: Record<number, string> = {
    1: '매우 조용', 2: '조용', 3: '보통', 4: '약간 시끄러움', 5: '시끄러움',
  }
  return map[level] ?? '보통'
}

export const CATEGORY_LABELS: Record<string, string> = {
  growth: '성장 캠프', healing: '힐링·휴식', network: '네트워킹', global: '해외 연계',
}
export const STATUS_LABELS: Record<string, string> = {
  open: '모집중', soon: '사전예약', full: '마감', closed: '종료',
}
export const JOB_TYPE_OPTIONS = [
  '1인 기업가', '프리랜서', '온라인 셀러 (스마트스토어·쿠팡·아마존 등)',
  '마케터 / 크리에이터', '디자이너', '개발자', '직장인 (부업 병행)', '기타',
]
export const INTEREST_OPTIONS = [
  'AI 활용', '마케팅', '디자인', '어학', '글로벌 진출', '네트워킹', '브랜딩', '사업 전략',
]
export const REST_OPTIONS = [
  '힐링·명상', '액티비티', '로컬 맛집·카페', '자연·산책', '문화 체험',
]
