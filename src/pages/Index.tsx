import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Star, CheckCircle, Scan, Palette, Truck } from 'lucide-react';

const Index = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/lovable-uploads/4513518d-12ca-431a-888a-4f209eec3353.png')`
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <img 
                src="/lovable-uploads/e67052e5-ee53-48ee-aa8f-aede54208da4.png" 
                alt="TrueTone" 
                className="h-16 w-auto mx-auto filter brightness-0 invert"
              />
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Flawless Match,<br />
                <span className="text-luxury-gold">Effortlessly You</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                Discover your perfect foundation with AI-powered skin analysis. 
                Custom-blended just for your unique skin tone.
              </p>
            </div>
            
            <div className="space-y-4">
              <Link to="/ai-scan">
                <Button variant="hero" size="xl" className="hover-lift">
                  <Scan className="h-5 w-5" />
                  Scan Your Face & Find Your Formula
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-white/70">
                Free AI analysis • Instant results • Custom formula
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              3 Simple Steps to Perfect Skin
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our revolutionary AI technology makes finding your perfect foundation effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover-lift shadow-card">
              <div className="w-20 h-20 mx-auto mb-6 gradient-primary rounded-full flex items-center justify-center">
                <Scan className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">1. Scan</h3>
              <p className="text-muted-foreground">
                Upload a selfie or use our live camera scanner to analyze your skin tone, 
                undertone, and skin type with scientific precision.
              </p>
            </Card>

            <Card className="p-8 text-center hover-lift shadow-card">
              <div className="w-20 h-20 mx-auto mb-6 gradient-primary rounded-full flex items-center justify-center">
                <Palette className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">2. Analyze</h3>
              <p className="text-muted-foreground">
                Our AI creates a custom formula perfectly matched to your skin. 
                Choose your preferred finish and coverage level.
              </p>
            </Card>

            <Card className="p-8 text-center hover-lift shadow-card">
              <div className="w-20 h-20 mx-auto mb-6 gradient-primary rounded-full flex items-center justify-center">
                <Truck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">3. Order</h3>
              <p className="text-muted-foreground">
                Your custom foundation is blended fresh and delivered to your door. 
                Reorder with one click anytime.
              </p>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/how-it-works">
              <Button variant="luxury" size="lg">
                Learn More About Our Process
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 gradient-luxury">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Loved by Beauty Enthusiasts
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands who found their perfect match
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                rating: 5,
                text: "Finally found my perfect shade! The AI analysis was spot-on and my custom foundation feels like it was made just for me."
              },
              {
                name: "Maya Patel", 
                rating: 5,
                text: "As someone with unique undertones, I've struggled for years. TrueTone's technology is revolutionary - my foundation looks invisible!"
              },
              {
                name: "Jessica Williams",
                rating: 5,
                text: "The convenience is unmatched. I scan, order, and get my perfect foundation delivered. No more guessing or wasted products!"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm hover-lift">
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-luxury-gold fill-current" />
                  ))}
                </div>
                <p className="text-card-foreground mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-primary">
                  {testimonial.name}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusivity Message */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Beauty Without Boundaries
            </h2>
            <p className="text-xl text-primary-foreground/90">
              TrueTone celebrates every skin tone, undertone, and unique beauty story. 
              Our AI technology ensures perfect matches for all skin types, 
              because true beauty is inclusive.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="h-6 w-6 text-luxury-gold" />
                <span className="text-lg">200+ Unique Shades</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="h-6 w-6 text-luxury-gold" />
                <span className="text-lg">All Undertones Covered</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="h-6 w-6 text-luxury-gold" />
                <span className="text-lg">Custom Formulation</span>
              </div>
            </div>
            <Link to="/ai-scan">
              <Button variant="secondary" size="xl" className="mt-8">
                Start Your Beauty Journey
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;