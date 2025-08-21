-- Create profiles table for user personalization
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  education_level TEXT,
  field_of_study TEXT,
  learning_goal TEXT,
  daily_study_time_minutes INTEGER,
  learning_style TEXT,
  preferred_formats TEXT[],
  language_preference TEXT DEFAULT 'en',
  strong_areas TEXT[],
  weak_areas TEXT[],
  exam_date DATE,
  motivation_style TEXT,
  allow_collaborative_rooms BOOLEAN DEFAULT true,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create study_plans table
CREATE TABLE public.study_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT,
  difficulty_level TEXT,
  estimated_duration_days INTEGER,
  knowledge_graph JSONB,
  is_active BOOLEAN DEFAULT true,
  is_collaborative BOOLEAN DEFAULT false,
  created_from_file UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create concepts table for knowledge graph nodes
CREATE TABLE public.concepts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_plan_id UUID NOT NULL REFERENCES public.study_plans(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  learning_objectives TEXT[],
  prerequisites TEXT[],
  difficulty_score DECIMAL(3,2),
  estimated_time_minutes INTEGER,
  mastery_level DECIMAL(3,2) DEFAULT 0,
  position_in_graph JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create concept_content table for multimodal content
CREATE TABLE public.concept_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_id UUID NOT NULL REFERENCES public.concepts(id) ON DELETE CASCADE,
  content_type TEXT, -- 'text', 'diagram', 'audio', 'video'
  content_data JSONB NOT NULL,
  difficulty_level TEXT,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create documents table for uploaded files
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  file_type TEXT,
  file_size_bytes BIGINT,
  storage_path TEXT NOT NULL,
  processing_status TEXT DEFAULT 'pending',
  extracted_content TEXT,
  generated_concepts INTEGER DEFAULT 0,
  uploaded_at TIMESTAMPTZ DEFAULT now(),
  processed_at TIMESTAMPTZ
);

-- Create micro_missions table for daily adaptive tasks
CREATE TABLE public.micro_missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  concept_id UUID NOT NULL REFERENCES public.concepts(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  mission_type TEXT, -- 'read', 'practice', 'review', 'create'
  content JSONB,
  estimated_minutes INTEGER,
  due_date DATE NOT NULL,
  status TEXT DEFAULT 'pending',
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create practice_questions table for exam simulation
CREATE TABLE public.practice_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_id UUID NOT NULL REFERENCES public.concepts(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT, -- 'multiple_choice', 'true_false', 'short_answer'
  options JSONB, -- For multiple choice questions
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty_level TEXT,
  targets_misconception TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_answers table to track performance
CREATE TABLE public.user_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.practice_questions(id) ON DELETE CASCADE,
  user_answer TEXT,
  is_correct BOOLEAN,
  time_taken_seconds INTEGER,
  attempt_count INTEGER DEFAULT 1,
  answered_at TIMESTAMPTZ DEFAULT now()
);

-- Create flashcard_sets table
CREATE TABLE public.flashcard_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  study_plan_id UUID REFERENCES public.study_plans(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  card_count INTEGER DEFAULT 0,
  export_format TEXT,
  export_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create flashcards table
CREATE TABLE public.flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  set_id UUID NOT NULL REFERENCES public.flashcard_sets(id) ON DELETE CASCADE,
  concept_id UUID REFERENCES public.concepts(id) ON DELETE CASCADE,
  front_content TEXT NOT NULL,
  back_content TEXT NOT NULL,
  difficulty_level TEXT,
  review_count INTEGER DEFAULT 0,
  success_rate DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create revision_schedule table for spaced repetition
CREATE TABLE public.revision_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  concept_id UUID NOT NULL REFERENCES public.concepts(id) ON DELETE CASCADE,
  next_review_date DATE NOT NULL,
  interval_days INTEGER DEFAULT 1,
  ease_factor DECIMAL(3,2) DEFAULT 2.5,
  review_count INTEGER DEFAULT 0,
  last_review_quality INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create tutor_sessions table for AI tutor interactions
CREATE TABLE public.tutor_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  concept_id UUID REFERENCES public.concepts(id) ON DELETE CASCADE,
  tutor_persona TEXT NOT NULL, -- 'professor', 'peer', 'coach'
  conversation_history JSONB,
  session_duration_minutes INTEGER,
  satisfaction_rating INTEGER,
  started_at TIMESTAMPTZ DEFAULT now(),
  ended_at TIMESTAMPTZ
);

-- Create study_rooms table for collaborative learning
CREATE TABLE public.study_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  room_code TEXT NOT NULL UNIQUE,
  is_public BOOLEAN DEFAULT false,
  max_participants INTEGER DEFAULT 10,
  merged_knowledge_graph JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create study_room_participants table
CREATE TABLE public.study_room_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES public.study_rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member', -- 'owner', 'moderator', 'member'
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(room_id, user_id)
);

-- Create user_progress table for gamification
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE UNIQUE,
  level INTEGER DEFAULT 1,
  experience_points INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  concepts_mastered INTEGER DEFAULT 0,
  total_study_time_minutes INTEGER DEFAULT 0,
  badges_earned TEXT[] DEFAULT '{}',
  last_activity_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create friend_invitations table for referral system
CREATE TABLE public.friend_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inviter_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  invitee_email TEXT NOT NULL,
  invitation_code TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'expired'
  invited_at TIMESTAMPTZ DEFAULT now(),
  accepted_at TIMESTAMPTZ
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concept_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.micro_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revision_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_room_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friend_invitations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for study_plans
CREATE POLICY "Users can view their own study plans" ON public.study_plans FOR SELECT USING (user_id IN (SELECT user_id FROM public.profiles WHERE user_id = auth.uid()));
CREATE POLICY "Users can create their own study plans" ON public.study_plans FOR INSERT WITH CHECK (user_id IN (SELECT user_id FROM public.profiles WHERE user_id = auth.uid()));
CREATE POLICY "Users can update their own study plans" ON public.study_plans FOR UPDATE USING (user_id IN (SELECT user_id FROM public.profiles WHERE user_id = auth.uid()));
CREATE POLICY "Users can delete their own study plans" ON public.study_plans FOR DELETE USING (user_id IN (SELECT user_id FROM public.profiles WHERE user_id = auth.uid()));

-- Create RLS policies for concepts
CREATE POLICY "Users can view concepts from their study plans" ON public.concepts FOR SELECT USING (
  study_plan_id IN (SELECT id FROM public.study_plans WHERE user_id IN (SELECT user_id FROM public.profiles WHERE user_id = auth.uid()))
);
CREATE POLICY "Users can create concepts in their study plans" ON public.concepts FOR INSERT WITH CHECK (
  study_plan_id IN (SELECT id FROM public.study_plans WHERE user_id IN (SELECT user_id FROM public.profiles WHERE user_id = auth.uid()))
);
CREATE POLICY "Users can update concepts in their study plans" ON public.concepts FOR UPDATE USING (
  study_plan_id IN (SELECT id FROM public.study_plans WHERE user_id IN (SELECT user_id FROM public.profiles WHERE user_id = auth.uid()))
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_study_plans_updated_at BEFORE UPDATE ON public.study_plans FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_concepts_updated_at BEFORE UPDATE ON public.concepts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_revision_schedule_updated_at BEFORE UPDATE ON public.revision_schedule FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_study_rooms_updated_at BEFORE UPDATE ON public.study_rooms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON public.user_progress FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();