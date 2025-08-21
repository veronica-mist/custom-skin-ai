import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Heart, Users, Award, Target, ArrowRight } from 'lucide-react';
import aboutLuxuryBg from '@/assets/about-luxury-bg.jpg';
import teamAiLead from '@/assets/team-ai-lead.jpg';
import teamBeautyExpert from '@/assets/team-beauty-expert.jpg';
import teamUxDesigner from '@/assets/team-ux-designer.jpg';
import trueToneLogoEnhanced from '@/assets/truetone-logo-enhanced.png';

const About = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section 
        className="py-20 sm:py-24 md:py-28 lg:py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${aboutLuxuryBg})`
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              About TrueTone
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 px-4">
              Revolutionizing inclusive beauty with AI technology
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
                  Our Story
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground">
                  TrueTone was born from the frustration of finding the perfect foundation match. 
                  As members of Third Wave, we witnessed countless people struggling with shade-matching, 
                  especially those with unique skin tones often overlooked by mainstream beauty brands.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground">
                  We realized that technology could solve this age-old problem. By combining advanced 
                  AI with personalized formulation, we created a platform that celebrates every skin 
                  tone and delivers truly custom foundations.
                </p>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
                  <span className="text-base sm:text-lg font-semibold text-primary">
                    Beauty technology that celebrates diversity
                  </span>
                </div>
              </div>
              <div className="relative order-1 lg:order-2">
                <Card className="p-6 sm:p-8 shadow-luxury gradient-luxury">
                  <img 
                    src="/lovable-uploads/8c1280d2-3c43-479c-befa-b0b364f87fbd.png" 
                    alt="TrueTone logo - Revolutionizing inclusive beauty" 
                    className="w-full rounded-lg max-w-md mx-auto"
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-16 lg:py-20 gradient-luxury">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-12 sm:space-y-16">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
                Our Mission
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground px-4">
                To revolutionize the beauty industry by making perfect foundation matching 
                accessible to everyone, regardless of skin tone, undertone, or background. 
                We believe beauty is inclusive, and technology should serve all.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <Card className="p-6 sm:p-8 bg-card/80 backdrop-blur-sm text-center hover-lift">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 gradient-primary rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">Precision</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Using cutting-edge AI to achieve 95%+ accuracy in skin tone matching
                </p>
              </Card>

              <Card className="p-6 sm:p-8 bg-card/80 backdrop-blur-sm text-center hover-lift">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 gradient-primary rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">Inclusivity</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Celebrating every skin tone with 200+ unique shades and custom formulation
                </p>
              </Card>

              <Card className="p-6 sm:p-8 bg-card/80 backdrop-blur-sm text-center hover-lift sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 gradient-primary rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">Quality</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Premium ingredients and fresh formulation for every custom bottle
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
                Meet Third Wave
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                The innovative team behind TrueTone's revolutionary beauty technology
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  role: "AI Technology Lead",
                  description: "Developing cutting-edge skin analysis algorithms that work for all skin tones",
                  image: teamAiLead
                },
                {
                  role: "Beauty Formulation Expert", 
                  description: "Creating custom foundation formulas with premium ingredients and perfect color matching",
                  image: teamBeautyExpert
                },
                {
                  role: "User Experience Designer",
                  description: "Designing inclusive and accessible beauty technology for everyone",
                  image: teamUxDesigner
                }
              ].map((member, index) => (
                <Card key={index} className="p-6 sm:p-8 text-center shadow-card hover-lift">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={`${member.role} professional headshot`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">{member.role}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{member.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Our Values
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-3 sm:space-y-4 p-4 sm:p-0">
                <h3 className="text-xl sm:text-2xl font-bold text-luxury-gold">Inclusivity First</h3>
                <p className="text-sm sm:text-base text-primary-foreground/90">
                  Every product and feature is designed with diversity in mind. 
                  We ensure our technology works accurately for all skin tones and types.
                </p>
              </div>
              
              <div className="space-y-3 sm:space-y-4 p-4 sm:p-0">
                <h3 className="text-xl sm:text-2xl font-bold text-luxury-gold">Innovation & Science</h3>
                <p className="text-sm sm:text-base text-primary-foreground/90">
                  We leverage the latest in AI and color science to deliver unprecedented 
                  accuracy in foundation matching.
                </p>
              </div>
              
              <div className="space-y-3 sm:space-y-4 p-4 sm:p-0">
                <h3 className="text-xl sm:text-2xl font-bold text-luxury-gold">Customer Trust</h3>
                <p className="text-sm sm:text-base text-primary-foreground/90">
                  Your privacy and satisfaction are paramount. We maintain the highest 
                  standards of data security and product quality.
                </p>
              </div>
              
              <div className="space-y-3 sm:space-y-4 p-4 sm:p-0">
                <h3 className="text-xl sm:text-2xl font-bold text-luxury-gold">Sustainable Beauty</h3>
                <p className="text-sm sm:text-base text-primary-foreground/90">
                  By eliminating trial-and-error purchasing, we reduce waste and promote 
                  more sustainable beauty consumption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-12 sm:py-16 lg:py-20 gradient-luxury">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
              The Future of Beauty
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground px-4">
              TrueTone is just the beginning. We envision a future where personalized beauty 
              technology makes every individual feel confident and celebrated.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
              <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm text-center">
                <h4 className="text-sm sm:text-base font-bold text-primary mb-2">Custom Concealers</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Expanding beyond foundation to complete base makeup
                </p>
              </Card>
              
              <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm text-center">
                <h4 className="text-sm sm:text-base font-bold text-primary mb-2">Mobile App</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Native mobile experience for scanning and ordering
                </p>
              </Card>
              
              <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm text-center">
                <h4 className="text-sm sm:text-base font-bold text-primary mb-2">Subscription Model</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Automatic refills when you need them
                </p>
              </Card>
              
              <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm text-center">
                <h4 className="text-sm sm:text-base font-bold text-primary mb-2">Global Expansion</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Bringing inclusive beauty technology worldwide
                </p>
              </Card>
            </div>
            
            <Link to="/ai-scan">
              <Button variant="hero" size="xl" className="mt-6 sm:mt-8 w-full sm:w-auto">
                <span className="hidden sm:inline">Join Our Beauty Revolution</span>
                <span className="sm:hidden">Join Revolution</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;