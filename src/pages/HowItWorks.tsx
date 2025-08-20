import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Camera, Brain, Beaker, Truck, Shield, Award, ArrowRight } from 'lucide-react';
import howItWorksBg from '@/assets/how-it-works-bg.jpg';

const HowItWorks = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section 
        className="relative py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${howItWorksBg})`
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              How TrueTone Works
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Discover the science behind perfect foundation matching
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {/* Step 1: Face Scan */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h2 className="text-4xl font-bold text-primary">Face Scan & Upload</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  Start by taking a clear selfie using our advanced camera scanner or upload 
                  a photo from your gallery. Our AI technology works best with natural lighting 
                  and a clean face without makeup.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Camera className="h-5 w-5 text-primary" />
                    <span>Live camera scanning</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Camera className="h-5 w-5 text-primary" />
                    <span>Photo upload from gallery</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Secure & private analysis</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <Card className="p-8 shadow-luxury">
                  <img 
                    src="/lovable-uploads/e2942bc5-ca06-4a0e-8224-190702092e5a.png" 
                    alt="AI Face Scanning Interface" 
                    className="w-full rounded-lg"
                  />
                </Card>
              </div>
            </div>

            {/* Step 2: AI Analysis */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h2 className="text-4xl font-bold text-primary">AI Skin Analysis</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  Our advanced AI analyzes your skin in multiple dimensions - tone, undertone, 
                  skin type, and texture. The analysis provides a confidence score and 
                  detailed recommendations for your perfect foundation match.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Brain className="h-5 w-5 text-primary" />
                    <span>Deep learning skin analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-primary" />
                    <span>95%+ accuracy rate</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Brain className="h-5 w-5 text-primary" />
                    <span>Instant results in seconds</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <Card className="p-8 shadow-luxury gradient-luxury">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-primary">Analysis Results</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-card p-4 rounded-lg">
                        <h4 className="font-semibold text-primary">Skin Tone</h4>
                        <p className="text-sm text-muted-foreground">Medium Warm</p>
                      </div>
                      <div className="bg-card p-4 rounded-lg">
                        <h4 className="font-semibold text-primary">Undertone</h4>
                        <p className="text-sm text-muted-foreground">Golden Yellow</p>
                      </div>
                      <div className="bg-card p-4 rounded-lg">
                        <h4 className="font-semibold text-primary">Skin Type</h4>
                        <p className="text-sm text-muted-foreground">Combination</p>
                      </div>
                      <div className="bg-card p-4 rounded-lg">
                        <h4 className="font-semibold text-primary">Confidence</h4>
                        <p className="text-sm text-muted-foreground">98%</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Step 3: Custom Blending */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h2 className="text-4xl font-bold text-primary">Custom Formula Blending</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  Based on your analysis, our expert team creates a custom foundation formula 
                  specifically for you. Choose your preferred finish (matte or dewy) and 
                  coverage level to complete your personalized bottle.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Beaker className="h-5 w-5 text-primary" />
                    <span>Fresh custom formulation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Beaker className="h-5 w-5 text-primary" />
                    <span>Choice of finish & coverage</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-primary" />
                    <span>Premium ingredients</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <Card className="p-8 shadow-luxury">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-primary text-center">Custom Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-primary">Finish</h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="finish" className="text-primary" defaultChecked />
                            <span>Matte (250,000 MMK)</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="finish" className="text-primary" />
                            <span>Dewy (300,000 MMK)</span>
                          </label>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-primary">Coverage</h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="coverage" className="text-primary" />
                            <span>Light</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="coverage" className="text-primary" defaultChecked />
                            <span>Medium</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="coverage" className="text-primary" />
                            <span>Full</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Step 4: Delivery & Reorder */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <h2 className="text-4xl font-bold text-primary">Delivery & Reorder</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  Your custom foundation is carefully packaged and delivered within 1 week 
                  via Royal Express for safety and trust. Enjoy easy reordering with your 
                  saved formula profile and earn loyalty points.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <span>1-week delivery time</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Royal Express trusted delivery</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-primary" />
                    <span>Loyalty points & discounts</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <Card className="p-8 shadow-luxury gradient-luxury">
                  <div className="text-center space-y-4">
                    <Truck className="h-16 w-16 text-primary mx-auto" />
                    <h3 className="text-2xl font-bold text-primary">Fast & Secure Delivery</h3>
                    <p className="text-muted-foreground">
                      Delivered by Royal Express within 1 week. Track your order every step of the way.
                    </p>
                    <div className="bg-card p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Loyalty Program:</strong> 2 purchases = 1 point, 1 point = 10% off your third purchase!
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Security & Accuracy */}
      <section className="py-20 gradient-luxury">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Your Privacy & Accuracy Matter
            </h2>
            <p className="text-xl text-muted-foreground">
              We use advanced encryption and never store your photos. Our AI is trained on 
              diverse datasets ensuring accurate results for all skin tones.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card className="p-6 bg-card/80 backdrop-blur-sm">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary mb-2">Secure & Private</h3>
                <p className="text-muted-foreground text-sm">
                  Your photos are processed instantly and never stored on our servers
                </p>
              </Card>
              <Card className="p-6 bg-card/80 backdrop-blur-sm">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary mb-2">95%+ Accuracy</h3>
                <p className="text-muted-foreground text-sm">
                  Trained on millions of skin samples for precise color matching
                </p>
              </Card>
              <Card className="p-6 bg-card/80 backdrop-blur-sm">
                <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary mb-2">Inclusive AI</h3>
                <p className="text-muted-foreground text-sm">
                  Designed to work accurately across all skin tones and ethnicities
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold">
              Ready to Find Your Perfect Match?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Start your personalized beauty journey today
            </p>
            <Link to="/ai-scan">
              <Button variant="secondary" size="xl" className="hover-lift">
                Start AI Skin Analysis
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;