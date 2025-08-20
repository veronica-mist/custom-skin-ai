-- Fix security vulnerability: Remove email exposure from public reviews
-- Create a view for public reviews that excludes sensitive data
CREATE OR REPLACE VIEW public.public_reviews AS
SELECT 
  id,
  customer_name,
  rating,
  review_text,
  created_at,
  updated_at
FROM public.reviews 
WHERE is_published = true;

-- Remove the existing policies that expose sensitive data
DROP POLICY IF EXISTS "Anyone can view published reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can view their own reviews" ON public.reviews;

-- Create new restrictive policy - only allow users to see their own reviews
CREATE POLICY "Users can view own reviews only" 
ON public.reviews 
FOR SELECT 
USING (auth.uid() = user_id);

-- Grant public access to the safe view
GRANT SELECT ON public.public_reviews TO anon;
GRANT SELECT ON public.public_reviews TO authenticated;