export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          bio: string | null
          theme: string
          accent_color: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name?: string | null
          bio?: string | null
          theme?: string
          accent_color?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          bio?: string | null
          theme?: string
          accent_color?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      links: {
        Row: {
          id: string
          profile_id: string
          title: string
          url: string
          icon: string
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          title: string
          url: string
          icon?: string
          order: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          title?: string
          url?: string
          icon?: string
          order?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}