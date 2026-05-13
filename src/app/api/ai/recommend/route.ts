import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// 자연어로 워케이션 검색하는 API
export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json()
    if (!query?.trim()) {
      return NextResponse.json({ error: '검색어를 입력해주세요.' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: programs } = await supabase
      .from('programs')
      .select('id, title, location, category, price, tags, description')
      .in('status', ['open', 'soon'])

    if (!programs?.length) {
      return NextResponse.json({ programs: [], message: '현재 모집 중인 프로그램이 없습니다.' })
    }

    type ProgramRow = { id: string; title: string; location: string; category: string; price: number; tags: string[]; description: string }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: `당신은 일할지도 워케이션 플랫폼의 검색 도우미입니다.
사용자의 자연어 검색 요청을 분석하여 가장 적합한 프로그램을 찾아드립니다.
항상 JSON 형식으로만 응답하세요.`,
      messages: [
        {
          role: 'user',
          content: `검색 요청: "${query}"

프로그램 목록:
${(programs as ProgramRow[]).map(p => `ID: ${p.id} | ${p.title} | ${p.location} | ${p.category} | ${p.price}원 | 태그: ${p.tags.join(', ')}`).join('\n')}

다음 JSON 형식으로 응답해주세요:
{
  "matched_ids": ["가장 관련있는 program id 배열 (최대 3개)"],
  "message": "검색 결과에 대한 한 문장 설명"
}`,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response type')

    const parsed = JSON.parse(content.text)
    const matched = (programs as ProgramRow[]).filter(p => parsed.matched_ids.includes(p.id))

    return NextResponse.json({
      programs: matched,
      message: parsed.message,
    })
  } catch (error) {
    console.error('AI search error:', error)
    return NextResponse.json({ error: '검색 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
