-- Add default created_at with KST timezone for registrations table
ALTER TABLE public.registrations
ALTER COLUMN created_at SET DEFAULT timezone('Asia/Seoul', now())::timestamptz,
ALTER COLUMN created_at SET NOT NULL; 