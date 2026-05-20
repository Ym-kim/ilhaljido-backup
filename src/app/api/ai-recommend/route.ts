import { NextRequest, NextResponse } from 'next/server'
import { getWorkcationRecommendation } from '@/lib/anthropic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, spaces, userContext } = body

    if (!query || !spaces) {
      return NextResponse.json({ error: '필수 파라미터가 없습니다.' }, { status: 400 })
    }

    const result = await getWorkcationRecommendation(query, spaces, userContext)
    return NextResponse.json(result)
  } catch (error) {
    console.error('AI recommendation error:', error)
    return NextResponse.json({ error: 'AI 추천 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
