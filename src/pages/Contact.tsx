import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, Facebook, Instagram, Twitter } from 'lucide-react';
import contactLuxuryBg from '@/assets/contact-luxury-bg.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Create mailto link
    const subject = encodeURIComponent(formData.subject || 'TrueTone Inquiry');
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:support@truetone.com?subject=${subject}&body=${body}`;
    
    toast.success('Email client opened! Your message is ready to send.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handlePhoneCall = () => {
    window.location.href = 'tel:+9598123456789';
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section 
        className="py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${contactLuxuryBg})`
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              Contact & Support
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              We're here to help you find your perfect foundation match
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-primary">Get in Touch</h2>
                <p className="text-lg text-muted-foreground">
                  Have questions about our AI skin analysis or custom foundation process? 
                  Our beauty experts are here to help you achieve your perfect match.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="p-6 shadow-card hover-lift">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-primary mb-2">Email Support</h3>
                      <p className="text-muted-foreground mb-3">
                        Send us a detailed message and we'll get back to you within 24 hours
                      </p>
                      <a 
                        href="mailto:support@truetone.com"
                        className="text-primary hover:text-primary-glow transition-smooth font-medium"
                      >
                        support@truetone.com
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 shadow-card hover-lift">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-primary mb-2">Phone Support</h3>
                      <p className="text-muted-foreground mb-3">
                        Speak directly with our beauty consultants for immediate assistance
                      </p>
                      <button 
                        onClick={handlePhoneCall}
                        className="text-primary hover:text-primary-glow transition-smooth font-medium"
                      >
                        +95 9 812 345 6789
                      </button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 shadow-card hover-lift">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-primary mb-2">Location</h3>
                      <p className="text-muted-foreground mb-3">
                        Based in Yangon, Myanmar, serving customers nationwide
                      </p>
                      <p className="text-primary font-medium">
                        Yangon, Myanmar
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 shadow-card hover-lift">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-primary mb-2">Business Hours</h3>
                      <div className="space-y-1 text-muted-foreground">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-8">
              <Card className="p-8 shadow-luxury">
                <div className="space-y-6">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto gradient-primary rounded-full flex items-center justify-center">
                      <MessageSquare className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary">Send us a Message</h3>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll respond within 24 hours
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
                        placeholder="What can we help you with?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth resize-none"
                        placeholder="Tell us about your question or how we can help..."
                        required
                      />
                    </div>

                    <Button type="submit" variant="hero" size="lg" className="w-full">
                      <Send className="h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </Card>

              {/* Social Media */}
              <Card className="p-6 gradient-luxury">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-primary">Follow Us</h3>
                  <p className="text-muted-foreground">
                    Stay connected for beauty tips and product updates
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a href="#" className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center hover:scale-110 transition-smooth">
                      <Instagram className="h-6 w-6 text-white" />
                    </a>
                    <a href="#" className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center hover:scale-110 transition-smooth">
                      <Facebook className="h-6 w-6 text-white" />
                    </a>
                    <a href="#" className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center hover:scale-110 transition-smooth">
                      <Twitter className="h-6 w-6 text-white" />
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 gradient-luxury">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Quick answers to common questions about TrueTone
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "How accurate is the AI skin analysis?",
                  answer: "Our AI achieves 95%+ accuracy across all skin tones, trained on millions of diverse skin samples."
                },
                {
                  question: "How long does delivery take?",
                  answer: "Custom foundations are delivered within 1 week via Royal Express for safe and trusted delivery."
                },
                {
                  question: "Can I reorder my custom formula?",
                  answer: "Yes! Your formula is saved for easy reordering. Loyal customers earn points for discounts."
                },
                {
                  question: "Is my photo data stored?",
                  answer: "No, your photos are processed instantly and never stored on our servers for your privacy."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept bank transfers (KBZ Bank, Yoma Bank) and credit/debit cards for your convenience."
                },
                {
                  question: "Do you offer returns or exchanges?",
                  answer: "Yes, we stand behind our custom formulations with a satisfaction guarantee and return policy."
                }
              ].map((faq, index) => (
                <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm hover-lift">
                  <h3 className="font-bold text-primary mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Chat Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <MessageSquare className="h-16 w-16 mx-auto text-luxury-gold" />
            <h2 className="text-4xl font-bold">
              Need Immediate Help?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Our live chat support is available during business hours for instant assistance
            </p>
            <Button variant="secondary" size="xl" className="hover-lift">
              Start Live Chat
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;