export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type ProgramCategory = 'growth' | 'healing' | 'network' | 'global'
export type ProgramStatus = 'open' | 'soon' | 'full' | 'closed'
export type ApplicationStatus = 'pending' | 'contacted' | 'confirmed' | 'cancelled'
export type WorkStyle = 'focus' | 'relaxed' | 'balanced'

export interface Database {
  public: {
    Tables: {
      programs: {
        Row: {
          id: string
          title: string
          subtitle: string | null
          description: string
          category: ProgramCategory
          status: ProgramStatus
          location: string
          region: string
          date_start: string
          date_end: string
          duration_nights: number
          max_participants: number
          current_participants: number
          price: number
          price_includes: string[]
          tags: string[]
          image_url: string | null
          is_featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['programs']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['programs']['Insert']>
      }
      applications: {
        Row: {
          id: string
          program_id: string | null
          name: string
          phone: string
          email: string
          job_type: string
          work_style: WorkStyle | null
          interests: string[]
          rest_preferences: string[]
          duration_preference: string | null
          budget_range: string | null
          message: string | null
          status: ApplicationStatus
          admin_memo: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['applications']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['applications']['Insert']>
      }
      ai_recommendations: {
        Row: {
          id: string
          application_id: string
          recommended_programs: Json
          recommendation_reason: string
          ai_model: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['ai_recommendations']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['ai_recommendations']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      program_category: ProgramCategory
      program_status: ProgramStatus
      application_status: ApplicationStatus
      work_style: WorkStyle
    }
  }
}

export type Program = Database['public']['Tables']['programs']['Row']
export type Application = Database['public']['Tables']['applications']['Row']
export type ApplicationInsert = Database['public']['Tables']['applications']['Insert']
export type AIRecommendation = Database['public']['Tables']['ai_recommendations']['Row']
