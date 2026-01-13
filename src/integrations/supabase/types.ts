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
      ai_chat_history: {
        Row: {
          content: string
          context: Json | null
          created_at: string
          farm_id: string | null
          id: string
          role: string
          session_id: string
          user_id: string
        }
        Insert: {
          content: string
          context?: Json | null
          created_at?: string
          farm_id?: string | null
          id?: string
          role: string
          session_id: string
          user_id: string
        }
        Update: {
          content?: string
          context?: Json | null
          created_at?: string
          farm_id?: string | null
          id?: string
          role?: string
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_chat_history_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      disease_detections: {
        Row: {
          ai_response: Json | null
          confidence_score: number
          created_at: string
          detected_at: string
          disease_type: string
          field_id: string | null
          id: string
          image_url: string
          scouting_report_id: string | null
          treatment_recommendations: string | null
          user_id: string
        }
        Insert: {
          ai_response?: Json | null
          confidence_score: number
          created_at?: string
          detected_at?: string
          disease_type: string
          field_id?: string | null
          id?: string
          image_url: string
          scouting_report_id?: string | null
          treatment_recommendations?: string | null
          user_id: string
        }
        Update: {
          ai_response?: Json | null
          confidence_score?: number
          created_at?: string
          detected_at?: string
          disease_type?: string
          field_id?: string | null
          id?: string
          image_url?: string
          scouting_report_id?: string | null
          treatment_recommendations?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "disease_detections_field_id_fkey"
            columns: ["field_id"]
            isOneToOne: false
            referencedRelation: "fields"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disease_detections_scouting_report_id_fkey"
            columns: ["scouting_report_id"]
            isOneToOne: false
            referencedRelation: "scouting_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      farms: {
        Row: {
          created_at: string
          id: string
          latitude: number | null
          location: string | null
          longitude: number | null
          name: string
          settings: Json | null
          total_hectares: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          name: string
          settings?: Json | null
          total_hectares?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          name?: string
          settings?: Json | null
          total_hectares?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      fields: {
        Row: {
          created_at: string
          crop_type: string | null
          expected_harvest_date: string | null
          farm_id: string
          geo_boundary: Json | null
          health_status: string | null
          hectares: number | null
          id: string
          name: string
          planted_date: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          crop_type?: string | null
          expected_harvest_date?: string | null
          farm_id: string
          geo_boundary?: Json | null
          health_status?: string | null
          hectares?: number | null
          id?: string
          name: string
          planted_date?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          crop_type?: string | null
          expected_harvest_date?: string | null
          farm_id?: string
          geo_boundary?: Json | null
          health_status?: string | null
          hectares?: number | null
          id?: string
          name?: string
          planted_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fields_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_items: {
        Row: {
          category: string
          cost_per_unit: number | null
          created_at: string
          expiry_date: string | null
          farm_id: string
          id: string
          name: string
          notes: string | null
          quantity: number
          reorder_level: number | null
          storage_location: string | null
          supplier: string | null
          unit: string
          updated_at: string
        }
        Insert: {
          category: string
          cost_per_unit?: number | null
          created_at?: string
          expiry_date?: string | null
          farm_id: string
          id?: string
          name: string
          notes?: string | null
          quantity?: number
          reorder_level?: number | null
          storage_location?: string | null
          supplier?: string | null
          unit: string
          updated_at?: string
        }
        Update: {
          category?: string
          cost_per_unit?: number | null
          created_at?: string
          expiry_date?: string | null
          farm_id?: string
          id?: string
          name?: string
          notes?: string | null
          quantity?: number
          reorder_level?: number | null
          storage_location?: string | null
          supplier?: string | null
          unit?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_items_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_transactions: {
        Row: {
          created_at: string
          field_id: string | null
          id: string
          inventory_item_id: string
          notes: string | null
          quantity: number
          transaction_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          field_id?: string | null
          id?: string
          inventory_item_id: string
          notes?: string | null
          quantity: number
          transaction_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          field_id?: string | null
          id?: string
          inventory_item_id?: string
          notes?: string | null
          quantity?: number
          transaction_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_transactions_field_id_fkey"
            columns: ["field_id"]
            isOneToOne: false
            referencedRelation: "fields"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_transactions_inventory_item_id_fkey"
            columns: ["inventory_item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["id"]
          },
        ]
      }
      microclimate_data: {
        Row: {
          created_at: string
          field_id: string
          forecast_data: Json | null
          humidity: number | null
          id: string
          rainfall: number | null
          recorded_at: string
          soil_temperature: number | null
          solar_radiation: number | null
          temperature: number | null
          weather_condition: string | null
          wind_direction: string | null
          wind_speed: number | null
        }
        Insert: {
          created_at?: string
          field_id: string
          forecast_data?: Json | null
          humidity?: number | null
          id?: string
          rainfall?: number | null
          recorded_at?: string
          soil_temperature?: number | null
          solar_radiation?: number | null
          temperature?: number | null
          weather_condition?: string | null
          wind_direction?: string | null
          wind_speed?: number | null
        }
        Update: {
          created_at?: string
          field_id?: string
          forecast_data?: Json | null
          humidity?: number | null
          id?: string
          rainfall?: number | null
          recorded_at?: string
          soil_temperature?: number | null
          solar_radiation?: number | null
          temperature?: number | null
          weather_condition?: string | null
          wind_direction?: string | null
          wind_speed?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "microclimate_data_field_id_fkey"
            columns: ["field_id"]
            isOneToOne: false
            referencedRelation: "fields"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          farm_id: string | null
          id: string
          message: string
          priority: string | null
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          farm_id?: string | null
          id?: string
          message: string
          priority?: string | null
          read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          farm_id?: string | null
          id?: string
          message?: string
          priority?: string | null
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      scouting_reports: {
        Row: {
          created_at: string
          description: string | null
          field_id: string
          id: string
          issue_type: string | null
          latitude: number | null
          longitude: number | null
          photos: string[] | null
          reported_at: string
          severity: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          field_id: string
          id?: string
          issue_type?: string | null
          latitude?: number | null
          longitude?: number | null
          photos?: string[] | null
          reported_at?: string
          severity?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          field_id?: string
          id?: string
          issue_type?: string | null
          latitude?: number | null
          longitude?: number | null
          photos?: string[] | null
          reported_at?: string
          severity?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scouting_reports_field_id_fkey"
            columns: ["field_id"]
            isOneToOne: false
            referencedRelation: "fields"
            referencedColumns: ["id"]
          },
        ]
      }
      seasonal_reports: {
        Row: {
          created_at: string
          data: Json | null
          farm_id: string
          file_url: string | null
          generated_at: string
          id: string
          report_type: string
          season: string
          status: string | null
          year: number
        }
        Insert: {
          created_at?: string
          data?: Json | null
          farm_id: string
          file_url?: string | null
          generated_at?: string
          id?: string
          report_type: string
          season: string
          status?: string | null
          year: number
        }
        Update: {
          created_at?: string
          data?: Json | null
          farm_id?: string
          file_url?: string | null
          generated_at?: string
          id?: string
          report_type?: string
          season?: string
          status?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "seasonal_reports_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      soil_health_records: {
        Row: {
          created_at: string
          field_id: string
          id: string
          moisture_content: number | null
          nitrogen_level: number | null
          notes: string | null
          organic_matter: number | null
          ph_level: number | null
          phosphorus_level: number | null
          potassium_level: number | null
          recorded_at: string
          soil_composition: Json | null
        }
        Insert: {
          created_at?: string
          field_id: string
          id?: string
          moisture_content?: number | null
          nitrogen_level?: number | null
          notes?: string | null
          organic_matter?: number | null
          ph_level?: number | null
          phosphorus_level?: number | null
          potassium_level?: number | null
          recorded_at?: string
          soil_composition?: Json | null
        }
        Update: {
          created_at?: string
          field_id?: string
          id?: string
          moisture_content?: number | null
          nitrogen_level?: number | null
          notes?: string | null
          organic_matter?: number | null
          ph_level?: number | null
          phosphorus_level?: number | null
          potassium_level?: number | null
          recorded_at?: string
          soil_composition?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "soil_health_records_field_id_fkey"
            columns: ["field_id"]
            isOneToOne: false
            referencedRelation: "fields"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_farm_ids: { Args: { _user_id: string }; Returns: string[] }
      has_field_access: {
        Args: { _field_id: string; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      owns_farm: {
        Args: { _farm_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "farmer" | "agronomist" | "viewer"
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
    Enums: {
      app_role: ["admin", "farmer", "agronomist", "viewer"],
    },
  },
} as const
