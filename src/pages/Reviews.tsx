import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Star, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  created_at: string;
  // Note: email is excluded for public reviews for security reasons
}

const Reviews = () => {
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  
  const [reviewData, setReviewData] = useState({
    customerName: '',
    rating: 0,
    review: ''
  });

  useEffect(() => {
    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    // Load published reviews
    loadReviews();

    return () => subscription.unsubscribe();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    try {
      // Use the secure function that excludes email addresses at the database level
      const { data, error } = await supabase
        .rpc('get_public_reviews');

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating: number) => {
    setReviewData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in to submit a review');
      return;
    }

    if (!reviewData.customerName || !reviewData.review || reviewData.rating === 0) {
      toast.error('Please fill in all fields and select a rating');
      return;
    }

    setSubmittingReview(true);
    try {
      const { error } = await supabase
        .from('reviews')
        .insert([{
          user_id: user.id,
          customer_name: reviewData.customerName,
          email: user.email || '',
          rating: reviewData.rating,
          review_text: reviewData.review,
          is_published: true // Auto-publish for now, could be moderated later
        }]);

      if (error) throw error;

      toast.success('Review submitted successfully! Thank you for your feedback.');
      setReviewData({ customerName: '', rating: 0, review: '' });
      
      // Reload reviews to show the new one
      loadReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setSubmittingReview(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onStarClick?.(star)}
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-smooth ${
              star <= rating 
                ? 'text-yellow-400' 
                : 'text-gray-300'
            }`}
          >
            <Star 
              className={`h-5 w-5 ${interactive ? 'hover:h-6 hover:w-6' : ''}`}
              fill={star <= rating ? 'currentColor' : 'none'}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="py-20 gradient-luxury">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-primary">
              Customer Reviews
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              See what our customers say about their TrueTone experience
            </p>
          </div>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 shadow-luxury">
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto gradient-primary rounded-full flex items-center justify-center">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-primary">Leave a Review</h2>
                  <p className="text-muted-foreground">
                    Share your experience with TrueTone's custom foundation service
                  </p>
                </div>

                {user ? (
                  <form onSubmit={handleReviewSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="customerName" className="text-primary font-medium">
                        Your Name *
                      </Label>
                      <Input
                        id="customerName"
                        name="customerName"
                        type="text"
                        value={reviewData.customerName}
                        onChange={handleReviewChange}
                        className="mt-2"
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-primary font-medium">
                        Rating *
                      </Label>
                      <div className="mt-2 mb-2">
                        {renderStars(reviewData.rating, true, handleRatingClick)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Click to rate your experience (1-5 stars)
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="review" className="text-primary font-medium">
                        Your Review *
                      </Label>
                      <textarea
                        id="review"
                        name="review"
                        value={reviewData.review}
                        onChange={handleReviewChange}
                        rows={6}
                        className="mt-2 w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth resize-none"
                        placeholder="Tell us about your experience with TrueTone's custom foundation matching service..."
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                      disabled={submittingReview}
                    >
                      <Send className="h-5 w-5" />
                      {submittingReview ? 'Submitting...' : 'Submit Review'}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center space-y-4">
                    <p className="text-muted-foreground">
                      Please log in to leave a review
                    </p>
                    <Button variant="hero" onClick={() => window.location.href = '/auth'}>
                      Sign In to Leave Review
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews Display Section */}
      <section className="py-20 gradient-luxury">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary">
                What Our Customers Say
              </h2>
              <p className="text-xl text-muted-foreground">
                Real experiences from real customers
              </p>
            </div>

            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading reviews...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center">
                <p className="text-muted-foreground text-lg">
                  No reviews yet. Be the first to share your experience!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map((review) => (
                  <Card key={review.id} className="p-6 shadow-card hover-lift">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-primary text-lg">
                            {review.customer_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Verified Customer
                          </p>
                        </div>
                        {renderStars(review.rating)}
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        "{review.review_text}"
                      </p>
                      
                      <p className="text-xs text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;