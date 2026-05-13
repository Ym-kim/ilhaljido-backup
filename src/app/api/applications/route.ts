import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Anthropic from '@anthropic-ai/sdk'
import type { ApplicationInsert } from '@/types/database'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const supabase = await createClient()

    // 1. 신청 저장
    const applicationData: ApplicationInsert = {
      program_id: body.program_id || null,
      name: body.name,
      phone: body.phone,
      email: body.email,
      job_type: body.job_type,
      work_style: body.work_style || null,
      interests: body.interests || [],
      rest_preferences: body.rest_preferences || [],
      duration_preference: body.duration_preference || null,
      budget_range: body.budget_range || null,
      message: body.message || null,
      status: 'pending',
      admin_memo: null,
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: application, error: appError } = await (supabase as any)
      .from('applications')
      .insert(applicationData)
      .select()
      .single()

    if (appError) throw appError

    // 2. 전체 프로그램 조회
    const { data: programs } = await supabase
      .from('programs')
      .select('id, title, category, location, date_start, date_end, price, status, tags, description')
      .in('status', ['open', 'soon'])

    // 3. Claude AI 추천 생성 (백그라운드)
    if (programs && programs.length > 0) {
      generateAIRecommendation(application.id, body, programs).catch(console.error)
    }

    return NextResponse.json({ success: true, id: application.id }, { status: 201 })
  } catch (error) {
    console.error('Application error:', error)
    return NextResponse.json({ error: '신청 처리 중 오류가 발생했습니다.' }, { status: 500 })
  }
}

async function generateAIRecommendation(
  applicationId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  applicant: Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  programs: Record<string, any>[]
) {
  const supabase = await createClient()

  const prompt = `당신은 일할지도(Wakation) 워케이션 플랫폼의 AI 어시스턴트입니다.
신청자 정보를 바탕으로 가장 적합한 워케이션 프로그램을 추천해주세요.

신청자 정보:
- 직업: ${applicant.job_type}
- 업무 스타일: ${applicant.work_style === 'focus' ? '집중 근무 필요' : applicant.work_style === 'relaxed' ? '여유롭게' : '균형 선호'}
- 관심 분야: ${(applicant.interests as string[])?.join(', ') || '없음'}
- 휴식 선호: ${(applicant.rest_preferences as string[])?.join(', ') || '없음'}
- 예산: ${applicant.budget_range || '미정'}
- 희망 기간: ${applicant.duration_preference || '미정'}

현재 운영중인 프로그램 목록:
${programs.map((p, i) => `${i + 1}. [${p.id}] ${p.title} - ${p.location} (${p.price}원) - ${p.description}`).join('\n')}

다음 JSON 형식으로만 응답해주세요:
{
  "recommended": [
    {"program_id": "uuid", "match_score": 95, "reason": "추천 이유 (1-2문장)"},
    {"program_id": "uuid", "match_score": 80, "reason": "추천 이유"}
  ],
  "summary": "신청자에게 맞는 워케이션 스타일 요약 (2-3문장)"
}`

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = message.content[0]
  if (content.type !== 'text') return

  try {
    const parsed = JSON.parse(content.text)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('ai_recommendations').insert({
      application_id: applicationId,
      recommended_programs: parsed.recommended,
      recommendation_reason: parsed.summary,
      ai_model: 'claude-sonnet-4-6',
    })
  } catch {
    console.error('AI recommendation parsing failed')
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
