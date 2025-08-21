-- Add missing RLS policies for all tables

-- Concept content policies (users can access content for concepts they own)
CREATE POLICY "Users can view concept content from their study plans" ON public.concept_content FOR SELECT USING (
  concept_id IN (SELECT id FROM public.concepts WHERE study_plan_id IN (SELECT id FROM public.study_plans WHERE user_id = auth.uid()))
);
CREATE POLICY "Users can create concept content" ON public.concept_content FOR INSERT WITH CHECK (
  concept_id IN (SELECT id FROM public.concepts WHERE study_plan_id IN (SELECT id FROM public.study_plans WHERE user_id = auth.uid()))
);
CREATE POLICY "Users can update concept content" ON public.concept_content FOR UPDATE USING (
  concept_id IN (SELECT id FROM public.concepts WHERE study_plan_id IN (SELECT id FROM public.study_plans WHERE user_id = auth.uid()))
);

-- Concepts policies (users can access concepts from their study plans)
CREATE POLICY "Users can view concepts from their study plans" ON public.concepts FOR SELECT USING (
  study_plan_id IN (SELECT id FROM public.study_plans WHERE user_id = auth.uid())
);
CREATE POLICY "Users can create concepts" ON public.concepts FOR INSERT WITH CHECK (
  study_plan_id IN (SELECT id FROM public.study_plans WHERE user_id = auth.uid())
);
CREATE POLICY "Users can update concepts" ON public.concepts FOR UPDATE USING (
  study_plan_id IN (SELECT id FROM public.study_plans WHERE user_id = auth.uid())
);
CREATE POLICY "Users can delete concepts" ON public.concepts FOR DELETE USING (
  study_plan_id IN (SELECT id FROM public.study_plans WHERE user_id = auth.uid())
);

-- Documents policies
CREATE POLICY "Users can view their own documents" ON public.documents FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create their own documents" ON public.documents FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own documents" ON public.documents FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete their own documents" ON public.documents FOR DELETE USING (user_id = auth.uid());

-- Micro missions policies
CREATE POLICY "Users can view their own micro missions" ON public.micro_missions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create their own micro missions" ON public.micro_missions FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own micro missions" ON public.micro_missions FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete their own micro missions" ON public.micro_missions FOR DELETE USING (user_id = auth.uid());

-- Practice questions policies (users can view questions for concepts they own)
CREATE POLICY "Users can view practice questions for their concepts" ON public.practice_questions FOR SELECT USING (
  concept_id IN (SELECT id FROM public.concepts WHERE study_plan_id IN (SELECT id FROM public.study_plans WHERE user_id = auth.uid()))
);
CREATE POLICY "Users can create practice questions" ON public.practice_questions FOR INSERT WITH CHECK (
  concept_id IN (SELECT id FROM public.concepts WHERE study_plan_id IN (SELECT id FROM public.study_plans WHERE user_id = auth.uid()))
);
CREATE POLICY "Users can update practice questions" ON public.practice_questions FOR UPDATE USING (
  concept_id IN (SELECT id FROM public.concepts WHERE study_plan_id IN (SELECT id FROM public.study_plans WHERE user_id = auth.uid()))
);

-- User answers policies
CREATE POLICY "Users can view their own answers" ON public.user_answers FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create their own answers" ON public.user_answers FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own answers" ON public.user_answers FOR UPDATE USING (user_id = auth.uid());

-- Flashcard sets policies
CREATE POLICY "Users can view their own flashcard sets" ON public.flashcard_sets FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create their own flashcard sets" ON public.flashcard_sets FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own flashcard sets" ON public.flashcard_sets FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete their own flashcard sets" ON public.flashcard_sets FOR DELETE USING (user_id = auth.uid());

-- Flashcards policies (users can access flashcards in sets they own)
CREATE POLICY "Users can view flashcards in their sets" ON public.flashcards FOR SELECT USING (
  set_id IN (SELECT id FROM public.flashcard_sets WHERE user_id = auth.uid())
);
CREATE POLICY "Users can create flashcards in their sets" ON public.flashcards FOR INSERT WITH CHECK (
  set_id IN (SELECT id FROM public.flashcard_sets WHERE user_id = auth.uid())
);
CREATE POLICY "Users can update flashcards in their sets" ON public.flashcards FOR UPDATE USING (
  set_id IN (SELECT id FROM public.flashcard_sets WHERE user_id = auth.uid())
);
CREATE POLICY "Users can delete flashcards in their sets" ON public.flashcards FOR DELETE USING (
  set_id IN (SELECT id FROM public.flashcard_sets WHERE user_id = auth.uid())
);

-- Revision schedule policies
CREATE POLICY "Users can view their own revision schedule" ON public.revision_schedule FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create their own revision schedule" ON public.revision_schedule FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own revision schedule" ON public.revision_schedule FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete their own revision schedule" ON public.revision_schedule FOR DELETE USING (user_id = auth.uid());

-- Tutor sessions policies
CREATE POLICY "Users can view their own tutor sessions" ON public.tutor_sessions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create their own tutor sessions" ON public.tutor_sessions FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own tutor sessions" ON public.tutor_sessions FOR UPDATE USING (user_id = auth.uid());

-- Study rooms policies (users can view public rooms or rooms they created/joined)
CREATE POLICY "Users can view public study rooms and their own rooms" ON public.study_rooms FOR SELECT USING (
  is_public = true OR created_by = auth.uid() OR id IN (SELECT room_id FROM public.study_room_participants WHERE user_id = auth.uid())
);
CREATE POLICY "Users can create study rooms" ON public.study_rooms FOR INSERT WITH CHECK (created_by = auth.uid());
CREATE POLICY "Users can update rooms they created" ON public.study_rooms FOR UPDATE USING (created_by = auth.uid());
CREATE POLICY "Users can delete rooms they created" ON public.study_rooms FOR DELETE USING (created_by = auth.uid());

-- Study room participants policies
CREATE POLICY "Users can view participants in rooms they have access to" ON public.study_room_participants FOR SELECT USING (
  room_id IN (SELECT id FROM public.study_rooms WHERE is_public = true OR created_by = auth.uid() OR id IN (SELECT room_id FROM public.study_room_participants WHERE user_id = auth.uid()))
);
CREATE POLICY "Users can join rooms" ON public.study_room_participants FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Room creators can manage participants" ON public.study_room_participants FOR UPDATE USING (
  room_id IN (SELECT id FROM public.study_rooms WHERE created_by = auth.uid()) OR user_id = auth.uid()
);
CREATE POLICY "Users can leave rooms and creators can remove participants" ON public.study_room_participants FOR DELETE USING (
  user_id = auth.uid() OR room_id IN (SELECT id FROM public.study_rooms WHERE created_by = auth.uid())
);

-- User progress policies
CREATE POLICY "Users can view their own progress" ON public.user_progress FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create their own progress" ON public.user_progress FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own progress" ON public.user_progress FOR UPDATE USING (user_id = auth.uid());

-- Friend invitations policies
CREATE POLICY "Users can view invitations they sent or received" ON public.friend_invitations FOR SELECT USING (
  inviter_id = auth.uid() OR invitee_email IN (SELECT email FROM auth.users WHERE id = auth.uid())
);
CREATE POLICY "Users can create invitations" ON public.friend_invitations FOR INSERT WITH CHECK (inviter_id = auth.uid());
CREATE POLICY "Users can update invitations they sent" ON public.friend_invitations FOR UPDATE USING (inviter_id = auth.uid());

-- Fix function security by setting search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;