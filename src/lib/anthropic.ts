import Anthropic from '@anthropic-ai/sdk'

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function getWorkcationRecommendation(
  query: string,
  spaces: unknown[],
  userContext?: string
): Promise<{ reasoning: string; spaceIds: string[]; tips: string[] }> {
  const systemPrompt = `당신은 일할지도(Wakation)의 AI 워케이션 매니저입니다.
프리랜서와 1인 사업자가 최적의 워케이션 공간을 찾을 수 있도록 도와줍니다.
주어진 공간 목록에서 사용자의 요청에 가장 맞는 곳을 추천하고,
왜 그 공간이 좋은지 친근하고 구체적으로 설명해주세요.
항상 한국어로 답변하세요.`

  const userMessage = `
사용자 요청: "${query}"
${userContext ? `사용자 정보: ${userContext}` : ''}

이용 가능한 공간 목록:
${JSON.stringify(spaces, null, 2)}

위 공간들 중에서 사용자에게 가장 적합한 공간을 추천해주세요.
다음 JSON 형식으로만 답변하세요:
{
  "spaceIds": ["추천공간id1", "추천공간id2", "추천공간id3"],
  "reasoning": "추천 이유 (2-3문장, 친근하게)",
  "tips": ["워케이션 팁1", "워케이션 팁2", "워케이션 팁3"]
}`

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')

  const jsonMatch = content.text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON found in response')

  return JSON.parse(jsonMatch[0])
}
