export type WorkStyle = 'focused' | 'collaborative' | 'flexible'
export type SpaceType = 'cafe' | 'coworking' | 'pension' | 'hotel' | 'villa'
export type Region = 'jeju' | 'gangwon' | 'jeonnam' | 'gyeongnam' | 'busan' | 'other'

export interface Space {
  id: string
  name: string
  description: string
  region: Region
  address: string
  lat: number
  lng: number
  type: SpaceType
  pricePerDay: number
  pricePerMonth: number | null
  wifiSpeed: number // Mbps
  noiseLevel: 1 | 2 | 3 | 4 | 5 // 1=very quiet, 5=noisy
  hasPrivateRoom: boolean
  hasMonitor: boolean
  hasPrinter: boolean
  nearNature: boolean
  images: string[]
  rating: number
  reviewCount: number
  tags: string[]
  createdAt: string
}

export interface UserProfile {
  id: string
  email: string
  name: string
  jobType: string
  workStyle: WorkStyle
  preferredRegions: Region[]
  budget: number
  createdAt: string
}

export interface Review {
  id: string
  spaceId: string
  userId: string
  userName: string
  rating: number
  content: string
  productivityScore: number // 1-5
  createdAt: string
}

export interface AIRecommendRequest {
  query: string
  userProfile?: Partial<UserProfile>
  budget?: number
  duration?: string
}

export interface AIRecommendResponse {
  spaces: Space[]
  reasoning: string
  tips: string[]
}
