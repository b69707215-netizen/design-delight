ALTER TABLE public.payment_history
ADD COLUMN lessons_purchased INTEGER NOT NULL DEFAULT 0;

CREATE INDEX idx_payment_history_lessons_purchased ON public.payment_history (lessons_purchased);