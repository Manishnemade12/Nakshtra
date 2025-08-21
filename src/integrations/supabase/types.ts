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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      concept_content: {
        Row: {
          concept_id: string
          content_data: Json
          content_type: string | null
          created_at: string | null
          difficulty_level: string | null
          id: string
          language: string | null
        }
        Insert: {
          concept_id: string
          content_data: Json
          content_type?: string | null
          created_at?: string | null
          difficulty_level?: string | null
          id?: string
          language?: string | null
        }
        Update: {
          concept_id?: string
          content_data?: Json
          content_type?: string | null
          created_at?: string | null
          difficulty_level?: string | null
          id?: string
          language?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "concept_content_concept_id_fkey"
            columns: ["concept_id"]
            isOneToOne: false
            referencedRelation: "concepts"
            referencedColumns: ["id"]
          },
        ]
      }
      concepts: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty_score: number | null
          estimated_time_minutes: number | null
          id: string
          learning_objectives: string[] | null
          mastery_level: number | null
          position_in_graph: Json | null
          prerequisites: string[] | null
          study_plan_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty_score?: number | null
          estimated_time_minutes?: number | null
          id?: string
          learning_objectives?: string[] | null
          mastery_level?: number | null
          position_in_graph?: Json | null
          prerequisites?: string[] | null
          study_plan_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty_score?: number | null
          estimated_time_minutes?: number | null
          id?: string
          learning_objectives?: string[] | null
          mastery_level?: number | null
          position_in_graph?: Json | null
          prerequisites?: string[] | null
          study_plan_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "concepts_study_plan_id_fkey"
            columns: ["study_plan_id"]
            isOneToOne: false
            referencedRelation: "study_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          extracted_content: string | null
          file_size_bytes: number | null
          file_type: string | null
          filename: string
          generated_concepts: number | null
          id: string
          processed_at: string | null
          processing_status: string | null
          storage_path: string
          uploaded_at: string | null
          user_id: string
        }
        Insert: {
          extracted_content?: string | null
          file_size_bytes?: number | null
          file_type?: string | null
          filename: string
          generated_concepts?: number | null
          id?: string
          processed_at?: string | null
          processing_status?: string | null
          storage_path: string
          uploaded_at?: string | null
          user_id: string
        }
        Update: {
          extracted_content?: string | null
          file_size_bytes?: number | null
          file_type?: string | null
          filename?: string
          generated_concepts?: number | null
          id?: string
          processed_at?: string | null
          processing_status?: string | null
          storage_path?: string
          uploaded_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      flashcard_sets: {
        Row: {
          card_count: number | null
          created_at: string | null
          description: string | null
          export_data: Json | null
          export_format: string | null
          id: string
          study_plan_id: string | null
          title: string
          user_id: string
        }
        Insert: {
          card_count?: number | null
          created_at?: string | null
          description?: string | null
          export_data?: Json | null
          export_format?: string | null
          id?: string
          study_plan_id?: string | null
          title: string
          user_id: string
        }
        Update: {
          card_count?: number | null
          created_at?: string | null
          description?: string | null
          export_data?: Json | null
          export_format?: string | null
          id?: string
          study_plan_id?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flashcard_sets_study_plan_id_fkey"
            columns: ["study_plan_id"]
            isOneToOne: false
            referencedRelation: "study_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flashcard_sets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      flashcards: {
        Row: {
          back_content: string
          concept_id: string | null
          created_at: string | null
          difficulty_level: string | null
          front_content: string
          id: string
          review_count: number | null
          set_id: string
          success_rate: number | null
        }
        Insert: {
          back_content: string
          concept_id?: string | null
          created_at?: string | null
          difficulty_level?: string | null
          front_content: string
          id?: string
          review_count?: number | null
          set_id: string
          success_rate?: number | null
        }
        Update: {
          back_content?: string
          concept_id?: string | null
          created_at?: string | null
          difficulty_level?: string | null
          front_content?: string
          id?: string
          review_count?: number | null
          set_id?: string
          success_rate?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "flashcards_concept_id_fkey"
            columns: ["concept_id"]
            isOneToOne: false
            referencedRelation: "concepts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flashcards_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "flashcard_sets"
            referencedColumns: ["id"]
          },
        ]
      }
      friend_invitations: {
        Row: {
          accepted_at: string | null
          id: string
          invitation_code: string
          invited_at: string | null
          invitee_email: string
          inviter_id: string
          status: string | null
        }
        Insert: {
          accepted_at?: string | null
          id?: string
          invitation_code: string
          invited_at?: string | null
          invitee_email: string
          inviter_id: string
          status?: string | null
        }
        Update: {
          accepted_at?: string | null
          id?: string
          invitation_code?: string
          invited_at?: string | null
          invitee_email?: string
          inviter_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "friend_invitations_inviter_id_fkey"
            columns: ["inviter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      micro_missions: {
        Row: {
          completed_at: string | null
          concept_id: string
          content: Json | null
          created_at: string | null
          description: string | null
          due_date: string
          estimated_minutes: number | null
          id: string
          mission_type: string | null
          status: string | null
          title: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          concept_id: string
          content?: Json | null
          created_at?: string | null
          description?: string | null
          due_date: string
          estimated_minutes?: number | null
          id?: string
          mission_type?: string | null
          status?: string | null
          title: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          concept_id?: string
          content?: Json | null
          created_at?: string | null
          description?: string | null
          due_date?: string
          estimated_minutes?: number | null
          id?: string
          mission_type?: string | null
          status?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "micro_missions_concept_id_fkey"
            columns: ["concept_id"]
            isOneToOne: false
            referencedRelation: "concepts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "micro_missions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      practice_questions: {
        Row: {
          concept_id: string
          correct_answer: string
          created_at: string | null
          difficulty_level: string | null
          explanation: string | null
          id: string
          options: Json | null
          question_text: string
          question_type: string | null
          targets_misconception: string | null
        }
        Insert: {
          concept_id: string
          correct_answer: string
          created_at?: string | null
          difficulty_level?: string | null
          explanation?: string | null
          id?: string
          options?: Json | null
          question_text: string
          question_type?: string | null
          targets_misconception?: string | null
        }
        Update: {
          concept_id?: string
          correct_answer?: string
          created_at?: string | null
          difficulty_level?: string | null
          explanation?: string | null
          id?: string
          options?: Json | null
          question_text?: string
          question_type?: string | null
          targets_misconception?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "practice_questions_concept_id_fkey"
            columns: ["concept_id"]
            isOneToOne: false
            referencedRelation: "concepts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          allow_collaborative_rooms: boolean | null
          created_at: string | null
          daily_study_time_minutes: number | null
          education_level: string | null
          exam_date: string | null
          field_of_study: string | null
          full_name: string
          id: string
          language_preference: string | null
          learning_goal: string | null
          learning_style: string | null
          motivation_style: string | null
          preferred_formats: string[] | null
          strong_areas: string[] | null
          subscription_tier: string | null
          updated_at: string | null
          user_id: string
          weak_areas: string[] | null
        }
        Insert: {
          allow_collaborative_rooms?: boolean | null
          created_at?: string | null
          daily_study_time_minutes?: number | null
          education_level?: string | null
          exam_date?: string | null
          field_of_study?: string | null
          full_name: string
          id?: string
          language_preference?: string | null
          learning_goal?: string | null
          learning_style?: string | null
          motivation_style?: string | null
          preferred_formats?: string[] | null
          strong_areas?: string[] | null
          subscription_tier?: string | null
          updated_at?: string | null
          user_id: string
          weak_areas?: string[] | null
        }
        Update: {
          allow_collaborative_rooms?: boolean | null
          created_at?: string | null
          daily_study_time_minutes?: number | null
          education_level?: string | null
          exam_date?: string | null
          field_of_study?: string | null
          full_name?: string
          id?: string
          language_preference?: string | null
          learning_goal?: string | null
          learning_style?: string | null
          motivation_style?: string | null
          preferred_formats?: string[] | null
          strong_areas?: string[] | null
          subscription_tier?: string | null
          updated_at?: string | null
          user_id?: string
          weak_areas?: string[] | null
        }
        Relationships: []
      }
      revision_schedule: {
        Row: {
          concept_id: string
          created_at: string | null
          ease_factor: number | null
          id: string
          interval_days: number | null
          last_review_quality: number | null
          next_review_date: string
          review_count: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          concept_id: string
          created_at?: string | null
          ease_factor?: number | null
          id?: string
          interval_days?: number | null
          last_review_quality?: number | null
          next_review_date: string
          review_count?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          concept_id?: string
          created_at?: string | null
          ease_factor?: number | null
          id?: string
          interval_days?: number | null
          last_review_quality?: number | null
          next_review_date?: string
          review_count?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "revision_schedule_concept_id_fkey"
            columns: ["concept_id"]
            isOneToOne: false
            referencedRelation: "concepts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "revision_schedule_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      study_plans: {
        Row: {
          created_at: string | null
          created_from_file: string | null
          description: string | null
          difficulty_level: string | null
          estimated_duration_days: number | null
          id: string
          is_active: boolean | null
          is_collaborative: boolean | null
          knowledge_graph: Json | null
          subject: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          created_from_file?: string | null
          description?: string | null
          difficulty_level?: string | null
          estimated_duration_days?: number | null
          id?: string
          is_active?: boolean | null
          is_collaborative?: boolean | null
          knowledge_graph?: Json | null
          subject: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          created_from_file?: string | null
          description?: string | null
          difficulty_level?: string | null
          estimated_duration_days?: number | null
          id?: string
          is_active?: boolean | null
          is_collaborative?: boolean | null
          knowledge_graph?: Json | null
          subject?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_plans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      study_room_participants: {
        Row: {
          id: string
          joined_at: string | null
          role: string | null
          room_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          role?: string | null
          room_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          role?: string | null
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_room_participants_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "study_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_room_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      study_rooms: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          is_public: boolean | null
          max_participants: number | null
          merged_knowledge_graph: Json | null
          name: string
          room_code: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          max_participants?: number | null
          merged_knowledge_graph?: Json | null
          name: string
          room_code: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          max_participants?: number | null
          merged_knowledge_graph?: Json | null
          name?: string
          room_code?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_rooms_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tutor_sessions: {
        Row: {
          concept_id: string | null
          conversation_history: Json | null
          ended_at: string | null
          id: string
          satisfaction_rating: number | null
          session_duration_minutes: number | null
          started_at: string | null
          tutor_persona: string
          user_id: string
        }
        Insert: {
          concept_id?: string | null
          conversation_history?: Json | null
          ended_at?: string | null
          id?: string
          satisfaction_rating?: number | null
          session_duration_minutes?: number | null
          started_at?: string | null
          tutor_persona: string
          user_id: string
        }
        Update: {
          concept_id?: string | null
          conversation_history?: Json | null
          ended_at?: string | null
          id?: string
          satisfaction_rating?: number | null
          session_duration_minutes?: number | null
          started_at?: string | null
          tutor_persona?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutor_sessions_concept_id_fkey"
            columns: ["concept_id"]
            isOneToOne: false
            referencedRelation: "concepts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutor_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_answers: {
        Row: {
          answered_at: string | null
          attempt_count: number | null
          id: string
          is_correct: boolean | null
          question_id: string
          time_taken_seconds: number | null
          user_answer: string | null
          user_id: string
        }
        Insert: {
          answered_at?: string | null
          attempt_count?: number | null
          id?: string
          is_correct?: boolean | null
          question_id: string
          time_taken_seconds?: number | null
          user_answer?: string | null
          user_id: string
        }
        Update: {
          answered_at?: string | null
          attempt_count?: number | null
          id?: string
          is_correct?: boolean | null
          question_id?: string
          time_taken_seconds?: number | null
          user_answer?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "practice_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_answers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_progress: {
        Row: {
          badges_earned: string[] | null
          concepts_mastered: number | null
          created_at: string | null
          current_streak: number | null
          experience_points: number | null
          id: string
          last_activity_date: string | null
          level: number | null
          longest_streak: number | null
          total_study_time_minutes: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          badges_earned?: string[] | null
          concepts_mastered?: number | null
          created_at?: string | null
          current_streak?: number | null
          experience_points?: number | null
          id?: string
          last_activity_date?: string | null
          level?: number | null
          longest_streak?: number | null
          total_study_time_minutes?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          badges_earned?: string[] | null
          concepts_mastered?: number | null
          created_at?: string | null
          current_streak?: number | null
          experience_points?: number | null
          id?: string
          last_activity_date?: string | null
          level?: number | null
          longest_streak?: number | null
          total_study_time_minutes?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
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
