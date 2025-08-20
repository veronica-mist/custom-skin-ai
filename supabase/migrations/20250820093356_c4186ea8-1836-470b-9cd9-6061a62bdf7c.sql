-- Remove the problematic view and fix the issue with RLS policies only
DROP VIEW IF EXISTS public.public_reviews;

-- Keep only the necessary RLS policies
-- Remove the public access policy and keep user-specific access
DROP POLICY IF EXISTS "Public can view published reviews safely" ON public.reviews;

-- Ensure users can only see their own reviews in full
-- Public reviews will be handled at the application level with column selection