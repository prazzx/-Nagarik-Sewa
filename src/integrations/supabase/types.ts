export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      districts: {
        Row: {
          created_at: string
          id: string
          name: string
          name_nepali: string
          province: number
        }
        Insert: {
          created_at?: string
          id: string
          name: string
          name_nepali: string
          province: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          name_nepali?: string
          province?: number
        }
        Relationships: []
      }
      downloadable_forms: {
        Row: {
          created_at: string
          description: string
          file_type: string
          form_id: string
          id: string
          is_external: boolean
          name: string
          name_nepali: string
          service_id: string
          sort_order: number
          url: string
        }
        Insert: {
          created_at?: string
          description: string
          file_type: string
          form_id: string
          id?: string
          is_external?: boolean
          name: string
          name_nepali: string
          service_id: string
          sort_order?: number
          url: string
        }
        Update: {
          created_at?: string
          description?: string
          file_type?: string
          form_id?: string
          id?: string
          is_external?: boolean
          name?: string
          name_nepali?: string
          service_id?: string
          sort_order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "downloadable_forms_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      eligibility_questions: {
        Row: {
          created_at: string
          id: string
          options: Json
          question: string
          question_id: string
          question_nepali: string
          service_id: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          options?: Json
          question: string
          question_id: string
          question_nepali: string
          service_id: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          options?: Json
          question?: string
          question_id?: string
          question_nepali?: string
          service_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "eligibility_questions_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      municipalities: {
        Row: {
          created_at: string
          district_id: string
          id: string
          name: string
          name_nepali: string
          type: string
        }
        Insert: {
          created_at?: string
          district_id: string
          id: string
          name: string
          name_nepali: string
          type: string
        }
        Update: {
          created_at?: string
          district_id?: string
          id?: string
          name?: string
          name_nepali?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "municipalities_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
        ]
      }
      offices: {
        Row: {
          address: string
          created_at: string
          district_id: string
          email: string
          hours: string
          id: string
          name: string
          name_nepali: string
          phone: string
          services: string[]
          updated_at: string
        }
        Insert: {
          address: string
          created_at?: string
          district_id: string
          email: string
          hours: string
          id: string
          name: string
          name_nepali: string
          phone: string
          services?: string[]
          updated_at?: string
        }
        Update: {
          address?: string
          created_at?: string
          district_id?: string
          email?: string
          hours?: string
          id?: string
          name?: string
          name_nepali?: string
          phone?: string
          services?: string[]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "offices_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
        ]
      }
      procedure_steps: {
        Row: {
          created_at: string
          description: string
          id: string
          is_online: boolean
          link: string | null
          service_id: string
          sort_order: number
          step_id: string
          tips: string[] | null
          title: string
          title_nepali: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          is_online?: boolean
          link?: string | null
          service_id: string
          sort_order?: number
          step_id: string
          tips?: string[] | null
          title: string
          title_nepali: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          is_online?: boolean
          link?: string | null
          service_id?: string
          sort_order?: number
          step_id?: string
          tips?: string[] | null
          title?: string
          title_nepali?: string
        }
        Relationships: [
          {
            foreignKeyName: "procedure_steps_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      required_documents: {
        Row: {
          created_at: string
          description: string
          doc_id: string
          for_types: string[]
          id: string
          name: string
          name_nepali: string
          required: boolean
          service_id: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          description: string
          doc_id: string
          for_types?: string[]
          id?: string
          name: string
          name_nepali: string
          required?: boolean
          service_id: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string
          doc_id?: string
          for_types?: string[]
          id?: string
          name?: string
          name_nepali?: string
          required?: boolean
          service_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "required_documents_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_costs: {
        Row: {
          created_at: string
          fee: string
          fee_nepali: string
          id: string
          notes: string[]
          processing_time: string
          processing_time_nepali: string
          service_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          fee: string
          fee_nepali: string
          id?: string
          notes?: string[]
          processing_time: string
          processing_time_nepali: string
          service_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          fee?: string
          fee_nepali?: string
          id?: string
          notes?: string[]
          processing_time?: string
          processing_time_nepali?: string
          service_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_costs_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: true
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_info: {
        Row: {
          created_at: string
          id: string
          long_description: string
          service_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          long_description: string
          service_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          long_description?: string
          service_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_info_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: true
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          available: boolean
          category: string
          created_at: string
          description: string
          icon: string
          id: string
          title: string
          title_nepali: string
          updated_at: string
        }
        Insert: {
          available?: boolean
          category: string
          created_at?: string
          description: string
          icon?: string
          id: string
          title: string
          title_nepali: string
          updated_at?: string
        }
        Update: {
          available?: boolean
          category?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          title?: string
          title_nepali?: string
          updated_at?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
