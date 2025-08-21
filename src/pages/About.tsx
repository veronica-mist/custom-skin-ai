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
        className="py-16 xs:py-18 sm:py-20 md:py-24 lg:py-28 xl:py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${aboutLuxuryBg})`
        }}
      >
        <div className="container mx-auto px-3 sm:px-6 lg:px-8 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold px-2">
              About TrueTone
            </h1>
            <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/90 px-3 sm:px-4">
              Revolutionizing inclusive beauty with AI technology
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
              <div className="space-y-3 sm:space-y-4 md:space-y-6 order-2 lg:order-1">
                <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-primary px-2">
                  Our Story
                </h2>
                <p className="text-sm xs:text-base sm:text-lg text-muted-foreground px-2 leading-relaxed">
                  TrueTone was born from the frustration of finding the perfect foundation match. 
                  As members of Third Wave, we witnessed countless people struggling with shade-matching, 
                  especially those with unique skin tones often overlooked by mainstream beauty brands.
                </p>
                <p className="text-sm xs:text-base sm:text-lg text-muted-foreground px-2 leading-relaxed">
                  We realized that technology could solve this age-old problem. By combining advanced 
                  AI with personalized formulation, we created a platform that celebrates every skin 
                  tone and delivers truly custom foundations.
                </p>
                <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 px-2">
                  <Heart className="h-5 w-5 xs:h-6 xs:w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
                  <span className="text-sm xs:text-base sm:text-lg font-semibold text-primary">
                    Beauty technology that celebrates diversity
                  </span>
                </div>
              </div>
              <div className="relative order-1 lg:order-2 px-2 sm:px-0">
                <Card className="p-4 xs:p-5 sm:p-6 md:p-8 shadow-luxury gradient-luxury">
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
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 gradient-luxury">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12 md:space-y-16">
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-primary px-2">
                Our Mission
              </h2>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground px-3 sm:px-4 leading-relaxed">
                To revolutionize the beauty industry by making perfect foundation matching 
                accessible to everyone, regardless of skin tone, undertone, or background. 
                We believe beauty is inclusive, and technology should serve all.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 max-w-sm mx-auto sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
              <Card className="p-4 xs:p-5 sm:p-6 md:p-8 bg-card/80 backdrop-blur-sm text-center hover-lift">
                <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 mx-auto mb-2 xs:mb-3 sm:mb-4 gradient-primary rounded-full flex items-center justify-center">
                  <Target className="h-5 w-5 xs:h-6 xs:w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-base xs:text-lg sm:text-xl font-bold text-primary mb-1 xs:mb-2 sm:mb-3">Precision</h3>
                <p className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Using cutting-edge AI to achieve 95%+ accuracy in skin tone matching
                </p>
              </Card>

              <Card className="p-4 xs:p-5 sm:p-6 md:p-8 bg-card/80 backdrop-blur-sm text-center hover-lift">
                <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 mx-auto mb-2 xs:mb-3 sm:mb-4 gradient-primary rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 xs:h-6 xs:w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-base xs:text-lg sm:text-xl font-bold text-primary mb-1 xs:mb-2 sm:mb-3">Inclusivity</h3>
                <p className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Celebrating every skin tone with 200+ unique shades and custom formulation
                </p>
              </Card>

              <Card className="p-4 xs:p-5 sm:p-6 md:p-8 bg-card/80 backdrop-blur-sm text-center hover-lift sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 mx-auto mb-2 xs:mb-3 sm:mb-4 gradient-primary rounded-full flex items-center justify-center">
                  <Award className="h-5 w-5 xs:h-6 xs:w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-base xs:text-lg sm:text-xl font-bold text-primary mb-1 xs:mb-2 sm:mb-3">Quality</h3>
                <p className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Premium ingredients and fresh formulation for every custom bottle
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-3 sm:space-y-4 md:space-y-6 mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-primary px-2">
                Meet Third Wave
              </h2>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-3 sm:px-4">
                The innovative team behind TrueTone's revolutionary beauty technology
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 max-w-sm mx-auto sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
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
                <Card key={index} className="p-4 xs:p-5 sm:p-6 md:p-8 text-center shadow-card hover-lift">
                  <div className="w-16 h-16 xs:w-18 xs:h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 sm:mb-4 md:mb-6 rounded-full overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={`${member.role} professional headshot`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-base xs:text-lg sm:text-xl font-bold text-primary mb-1 xs:mb-2 sm:mb-3">{member.role}</h3>
                  <p className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-relaxed">{member.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 md:space-y-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold px-2">
              Our Values
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div className="space-y-2 xs:space-y-3 sm:space-y-4 p-3 sm:p-4 md:p-0 bg-primary-foreground/5 rounded-lg sm:bg-transparent">
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-luxury-gold">Inclusivity First</h3>
                <p className="text-xs xs:text-sm sm:text-base text-primary-foreground/90 leading-relaxed">
                  Every product and feature is designed with diversity in mind. 
                  We ensure our technology works accurately for all skin tones and types.
                </p>
              </div>
              
              <div className="space-y-2 xs:space-y-3 sm:space-y-4 p-3 sm:p-4 md:p-0 bg-primary-foreground/5 rounded-lg sm:bg-transparent">
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-luxury-gold">Innovation & Science</h3>
                <p className="text-xs xs:text-sm sm:text-base text-primary-foreground/90 leading-relaxed">
                  We leverage the latest in AI and color science to deliver unprecedented 
                  accuracy in foundation matching.
                </p>
              </div>
              
              <div className="space-y-2 xs:space-y-3 sm:space-y-4 p-3 sm:p-4 md:p-0 bg-primary-foreground/5 rounded-lg sm:bg-transparent">
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-luxury-gold">Customer Trust</h3>
                <p className="text-xs xs:text-sm sm:text-base text-primary-foreground/90 leading-relaxed">
                  Your privacy and satisfaction are paramount. We maintain the highest 
                  standards of data security and product quality.
                </p>
              </div>
              
              <div className="space-y-2 xs:space-y-3 sm:space-y-4 p-3 sm:p-4 md:p-0 bg-primary-foreground/5 rounded-lg sm:bg-transparent">
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-luxury-gold">Sustainable Beauty</h3>
                <p className="text-xs xs:text-sm sm:text-base text-primary-foreground/90 leading-relaxed">
                  By eliminating trial-and-error purchasing, we reduce waste and promote 
                  more sustainable beauty consumption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 gradient-luxury">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-primary px-2">
              The Future of Beauty
            </h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground px-3 sm:px-4 leading-relaxed">
              TrueTone is just the beginning. We envision a future where personalized beauty 
              technology makes every individual feel confident and celebrated.
            </p>
            
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-12">
              <Card className="p-3 xs:p-4 sm:p-6 bg-card/80 backdrop-blur-sm text-center">
                <h4 className="text-xs xs:text-sm sm:text-base font-bold text-primary mb-1 sm:mb-2">Custom Concealers</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Expanding beyond foundation to complete base makeup
                </p>
              </Card>
              
              <Card className="p-3 xs:p-4 sm:p-6 bg-card/80 backdrop-blur-sm text-center">
                <h4 className="text-xs xs:text-sm sm:text-base font-bold text-primary mb-1 sm:mb-2">Mobile App</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Native mobile experience for scanning and ordering
                </p>
              </Card>
              
              <Card className="p-3 xs:p-4 sm:p-6 bg-card/80 backdrop-blur-sm text-center">
                <h4 className="text-xs xs:text-sm sm:text-base font-bold text-primary mb-1 sm:mb-2">Subscription Model</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Automatic refills when you need them
                </p>
              </Card>
              
              <Card className="p-3 xs:p-4 sm:p-6 bg-card/80 backdrop-blur-sm text-center">
                <h4 className="text-xs xs:text-sm sm:text-base font-bold text-primary mb-1 sm:mb-2">Global Expansion</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Bringing inclusive beauty technology worldwide
                </p>
              </Card>
            </div>
            
            <Link to="/ai-scan">
              <Button variant="hero" size="xl" className="mt-4 sm:mt-6 md:mt-8 w-full max-w-xs sm:w-auto text-sm sm:text-base">
                <span className="hidden xs:inline sm:hidden">Join Revolution</span>
                <span className="xs:hidden sm:inline">Join Our Beauty Revolution</span>
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