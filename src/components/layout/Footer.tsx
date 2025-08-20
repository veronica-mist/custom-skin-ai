import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/e67052e5-ee53-48ee-aa8f-aede54208da4.png" 
              alt="TrueTone" 
              className="h-8 w-auto filter brightness-0 invert"
            />
            <p className="text-sm text-primary-foreground/80">
              Revolutionizing inclusive beauty with AI-powered custom foundation matching. 
              Your perfect shade, scientifically created.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-luxury-gold transition-smooth">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-luxury-gold transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-luxury-gold transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/how-it-works" className="block text-sm hover:text-luxury-gold transition-smooth">
                How It Works
              </Link>
              <Link to="/ai-scan" className="block text-sm hover:text-luxury-gold transition-smooth">
                AI Face Scan
              </Link>
              <Link to="/shop" className="block text-sm hover:text-luxury-gold transition-smooth">
                Custom Foundation
              </Link>
              <Link to="/about" className="block text-sm hover:text-luxury-gold transition-smooth">
                About Us
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Support</h3>
            <div className="space-y-2">
              <Link to="/contact" className="block text-sm hover:text-luxury-gold transition-smooth">
                Contact Us
              </Link>
              <a href="#" className="block text-sm hover:text-luxury-gold transition-smooth">
                FAQ
              </a>
              <a href="#" className="block text-sm hover:text-luxury-gold transition-smooth">
                Returns Policy
              </a>
              <a href="#" className="block text-sm hover:text-luxury-gold transition-smooth">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <a href="mailto:support@truetone.com" className="hover:text-luxury-gold transition-smooth">
                  support@truetone.com
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <a href="tel:+9598123456789" className="hover:text-luxury-gold transition-smooth">
                  +95 9 812 345 6789
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Yangon, Myanmar</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © 2024 TrueTone by Third Wave. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;