import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AuthForm } from '@/components/auth/AuthForm';
import type { User, Session } from '@supabase/supabase-js';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        navigate('/');
      }
    });

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen bg-gradient-luxury flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-primary mb-2">
            {isLogin ? 'Welcome Back' : 'Join TrueTone'}
          </h2>
          <p className="text-muted-foreground">
            {isLogin ? 'Sign in to your account' : 'Create your beauty profile'}
          </p>
        </div>

        <AuthForm isLogin={isLogin} onToggleMode={toggleMode} />
      </div>
    </div>
  );
};

export default Auth;