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
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Customer: {
        Row: {
          email: string
          id: string
        }
        Insert: {
          email: string
          id: string
        }
        Update: {
          email?: string
          id?: string
        }
        Relationships: []
      }
      Url: {
        Row: {
          counter: number
          created_at: string
          customer_id: string
          id: number
          name: string | null
          shorted_url: string
          url: string
        }
        Insert: {
          counter: number
          created_at?: string
          customer_id: string
          id?: number
          name?: string | null
          shorted_url: string
          url: string
        }
        Update: {
          counter?: number
          created_at?: string
          customer_id?: string
          id?: number
          name?: string | null
          shorted_url?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "Url_customer_id_fkey"
            columns: ["customer_id"]
            referencedRelation: "Customer"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
