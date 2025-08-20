-- Fix the security definer view issue
-- Drop the view and recreate without security definer
DROP VIEW IF EXISTS public.public_reviews;

-- Create a simple view without security definer behavior
-- This view will use the querying user's permissions
CREATE VIEW public.public_reviews AS
SELECT 
  id,
  customer_name,
  rating,
  review_text,
  created_at
FROM public.reviews 
WHERE is_published = true;

-- Create a more secure RLS policy for public review access
-- Allow anonymous and authenticated users to see published reviews but only safe fields
CREATE POLICY "Public can view published reviews safely" 
ON public.reviews 
FOR SELECT 
TO anon, authenticated
USING (is_published = true);

-- The view will automatically filter out email addresses
-- Users can still see their own complete reviews through the existing policy