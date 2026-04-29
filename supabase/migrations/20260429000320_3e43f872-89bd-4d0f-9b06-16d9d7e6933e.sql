UPDATE public.profiles
SET preferred_language = 'uk'
WHERE preferred_language = 'ru';

ALTER TABLE public.profiles
DROP CONSTRAINT IF EXISTS profiles_preferred_language_check;

ALTER TABLE public.profiles
ADD CONSTRAINT profiles_preferred_language_check
CHECK (preferred_language IN ('uk', 'en'));

ALTER TABLE public.profiles
ALTER COLUMN preferred_language SET DEFAULT 'uk';