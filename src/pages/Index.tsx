import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Star, CheckCircle, Scan, Palette, Truck } from 'lucide-react';

const Index = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-3 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/lovable-uploads/4513518d-12ca-431a-888a-4f209eec3353.png')`
        }}
      >
        <div className="container mx-auto text-center text-white">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <img 
                src="/lovable-uploads/e67052e5-ee53-48ee-aa8f-aede54208da4.png" 
                alt="TrueTone" 
                className="h-10 xs:h-12 sm:h-14 md:h-16 w-auto mx-auto filter brightness-0 invert"
              />
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight px-2">
                Flawless Match,<br />
                <span className="text-luxury-gold">Effortlessly You</span>
              </h1>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto px-3 sm:px-4">
                Discover your perfect foundation with AI-powered skin analysis. 
                Custom-blended just for your unique skin tone.
              </p>
            </div>
            
            <div className="space-y-2 sm:space-y-3 md:space-y-4 px-3">
              <Link to="/ai-scan">
                <Button variant="hero" size="xl" className="hover-lift w-full max-w-sm mx-auto sm:w-auto text-sm sm:text-base">
                  <Scan className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden xs:inline sm:hidden">Find Formula</span>
                  <span className="xs:hidden sm:inline">Scan Your Face & Find Your Formula</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <p className="text-xs sm:text-sm text-white/70 px-2">
                Free AI analysis • Instant results • Custom formula
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 sm:space-y-3 md:space-y-4 mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-primary px-2">
              3 Simple Steps to Perfect Skin
            </h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-3 sm:px-4">
              Our revolutionary AI technology makes finding your perfect foundation effortless
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 max-w-xs mx-auto sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-4 xs:p-5 sm:p-6 md:p-8 text-center hover-lift shadow-card">
              <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 gradient-primary rounded-full flex items-center justify-center">
                <Scan className="h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h3 className="text-lg xs:text-xl sm:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-primary">1. Scan</h3>
              <p className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-relaxed">
                Upload a selfie or use our live camera scanner to analyze your skin tone, 
                undertone, and skin type with scientific precision.
              </p>
            </Card>

            <Card className="p-4 xs:p-5 sm:p-6 md:p-8 text-center hover-lift shadow-card">
              <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 gradient-primary rounded-full flex items-center justify-center">
                <Palette className="h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h3 className="text-lg xs:text-xl sm:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-primary">2. Analyze</h3>
              <p className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-relaxed">
                Our AI creates a custom formula perfectly matched to your skin. 
                Choose your preferred finish and coverage level.
              </p>
            </Card>

            <Card className="p-4 xs:p-5 sm:p-6 md:p-8 text-center hover-lift shadow-card sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 gradient-primary rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h3 className="text-lg xs:text-xl sm:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-primary">3. Order</h3>
              <p className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-relaxed">
                Your custom foundation is blended fresh and delivered to your door. 
                Reorder with one click anytime.
              </p>
            </Card>
          </div>

          <div className="text-center mt-6 sm:mt-8 md:mt-12 px-3">
            <Link to="/how-it-works">
              <Button variant="luxury" size="lg" className="w-full max-w-xs sm:w-auto text-sm sm:text-base">
                <span className="hidden xs:inline sm:hidden">Learn More</span>
                <span className="xs:hidden sm:inline">Learn More About Our Process</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 gradient-luxury">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 sm:space-y-3 md:space-y-4 mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-primary px-2">
              Loved by Beauty Enthusiasts
            </h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground px-3 sm:px-4">
              Join thousands who found their perfect match
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 max-w-sm mx-auto sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
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
              <Card key={index} className="p-3 xs:p-4 sm:p-6 bg-card/80 backdrop-blur-sm hover-lift">
                <div className="flex justify-center space-x-1 mb-2 sm:mb-3 md:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-luxury-gold fill-current" />
                  ))}
                </div>
                <p className="text-xs xs:text-sm sm:text-base text-card-foreground mb-2 sm:mb-3 md:mb-4 italic text-center leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="text-xs xs:text-sm sm:text-base font-semibold text-primary text-center">
                  {testimonial.name}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusivity Message */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold px-2">
              Beauty Without Boundaries
            </h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-primary-foreground/90 px-3 sm:px-4 leading-relaxed">
              TrueTone celebrates every skin tone, undertone, and unique beauty story. 
              Our AI technology ensures perfect matches for all skin types, 
              because true beauty is inclusive.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-12 max-w-sm mx-auto sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center justify-center space-x-2 p-3 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                <CheckCircle className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-luxury-gold flex-shrink-0" />
                <span className="text-sm xs:text-base sm:text-lg font-medium">200+ Unique Shades</span>
              </div>
              <div className="flex items-center justify-center space-x-2 p-3 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                <CheckCircle className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-luxury-gold flex-shrink-0" />
                <span className="text-sm xs:text-base sm:text-lg font-medium">All Undertones Covered</span>
              </div>
              <div className="flex items-center justify-center space-x-2 p-3 bg-primary-foreground/10 rounded-lg backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                <CheckCircle className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-luxury-gold flex-shrink-0" />
                <span className="text-sm xs:text-base sm:text-lg font-medium">Custom Formulation</span>
              </div>
            </div>
            <Link to="/ai-scan">
              <Button variant="secondary" size="xl" className="mt-4 sm:mt-6 md:mt-8 w-full max-w-xs sm:w-auto text-sm sm:text-base">
                <span className="hidden xs:inline sm:hidden">Start Journey</span>
                <span className="xs:hidden sm:inline">Start Your Beauty Journey</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;