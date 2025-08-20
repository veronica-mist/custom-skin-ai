import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';
import { toast } from 'sonner';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, setIsCartOpen } = useCart();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'AI Face Scan', href: '/ai-scan' },
    { name: 'Shop', href: '/shop' },
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-smooth">
            <img 
              src="/lovable-uploads/e67052e5-ee53-48ee-aa8f-aede54208da4.png" 
              alt="TrueTone" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-smooth hover:text-primary",
                  isActive(item.href) 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Welcome back!
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate('/auth')}>
                  Login
                </Button>
                <Button variant="hero" size="sm" onClick={() => navigate('/auth')}>
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-smooth hover:text-primary px-2 py-1",
                    isActive(item.href) ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative justify-start"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                  {totalItems > 0 && (
                    <span className="ml-auto bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
                {user ? (
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={() => navigate('/auth')}>
                      Login
                    </Button>
                    <Button variant="hero" size="sm" onClick={() => navigate('/auth')}>
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;