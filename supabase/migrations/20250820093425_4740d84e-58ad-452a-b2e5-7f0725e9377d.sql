-- Create a secure RLS policy for public reviews that includes all published reviews
-- But the application will be responsible for selecting only safe columns
CREATE POLICY "Anyone can view published reviews" 
ON public.reviews 
FOR SELECT 
TO anon, authenticated
USING (is_published = true);