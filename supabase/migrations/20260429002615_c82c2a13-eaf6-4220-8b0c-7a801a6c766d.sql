CREATE TABLE public.curator_chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL,
  teacher_id UUID NOT NULL,
  sender_id UUID NOT NULL,
  message TEXT NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.curator_chat_messages ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_curator_chat_student_created ON public.curator_chat_messages (student_id, created_at);
CREATE INDEX idx_curator_chat_teacher_created ON public.curator_chat_messages (teacher_id, created_at);

CREATE TRIGGER update_curator_chat_messages_updated_at
BEFORE UPDATE ON public.curator_chat_messages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Students can view their curator chat"
ON public.curator_chat_messages
FOR SELECT
TO authenticated
USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view assigned curator chats"
ON public.curator_chat_messages
FOR SELECT
TO authenticated
USING (auth.uid() = teacher_id);

CREATE POLICY "Students can send messages to their curator"
ON public.curator_chat_messages
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = student_id
  AND sender_id = auth.uid()
  AND public.has_role(auth.uid(), 'student')
);

CREATE POLICY "Teachers can reply in assigned chats"
ON public.curator_chat_messages
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = teacher_id
  AND sender_id = auth.uid()
  AND public.has_role(auth.uid(), 'teacher')
);

CREATE POLICY "Chat participants can mark their messages read"
ON public.curator_chat_messages
FOR UPDATE
TO authenticated
USING (auth.uid() = student_id OR auth.uid() = teacher_id)
WITH CHECK (auth.uid() = student_id OR auth.uid() = teacher_id);