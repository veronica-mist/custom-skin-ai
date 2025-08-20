-- Fix the fundamental security issue: Remove public access to email addresses at the database level
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can view published reviews" ON public.reviews;

-- Create a secure function that returns only safe review data for public access
CREATE OR REPLACE FUNCTION public.get_public_reviews()
RETURNS TABLE (
  id UUID,
  customer_name TEXT,
  rating INTEGER,
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    r.id,
    r.customer_name,
    r.rating,
    r.review_text,
    r.created_at
  FROM public.reviews r
  WHERE r.is_published = true
  ORDER BY r.created_at DESC;
$$;

-- Grant access to the function for both anonymous and authenticated users
GRANT EXECUTE ON FUNCTION public.get_public_reviews() TO anon;
GRANT EXECUTE ON FUNCTION public.get_public_reviews() TO authenticated;

-- Note: Now the reviews table itself has no public access policy for SELECT
-- Users can only see their own reviews directly via the "Users can view own reviews only" policy
-- Public access is only available through the secure function that excludes email addresses