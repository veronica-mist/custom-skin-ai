import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User as UserIcon, Calendar, MapPin, Phone, Eye, EyeOff } from 'lucide-react';
import { useAuth, type LoginData, type SignupData } from '@/hooks/useAuth';

interface AuthFormProps {
  isLogin: boolean;
  onToggleMode: () => void;
}

export const AuthForm = ({ isLogin, onToggleMode }: AuthFormProps) => {
  const { loading, signIn, signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState<SignupData>({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    country: '',
    phoneNumber: ''
  });

  const handleInputChange = (field: keyof (LoginData & SignupData), value: string) => {
    if (isLogin) {
      setLoginData(prev => ({ ...prev, [field]: value }));
    } else {
      setSignupData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      const success = await signIn(loginData);
      if (success) {
        setLoginData({ email: '', password: '' });
      }
    } else {
      const success = await signUp(signupData);
      if (success) {
        setSignupData({
          fullName: '',
          email: '',
          username: '',
          password: '',
          confirmPassword: '',
          dateOfBirth: '',
          country: '',
          phoneNumber: ''
        });
        onToggleMode();
      }
    }
  };

  return (
    <Card className="p-8 shadow-luxury">
      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <>
            <div>
              <Label htmlFor="fullName" className="flex items-center gap-2 text-primary">
                <UserIcon className="h-4 w-4" />
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                value={signupData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Your full name"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="username" className="flex items-center gap-2 text-primary">
                <UserIcon className="h-4 w-4" />
                Username *
              </Label>
              <Input
                id="username"
                type="text"
                value={signupData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="Choose a unique username"
                className="mt-2"
                required
              />
            </div>
          </>
        )}

        <div>
          <Label htmlFor="email" className="flex items-center gap-2 text-primary">
            <Mail className="h-4 w-4" />
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={isLogin ? loginData.email : signupData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your.email@example.com"
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="password" className="flex items-center gap-2 text-primary">
            <Lock className="h-4 w-4" />
            Password *
          </Label>
          <div className="relative mt-2">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={isLogin ? loginData.password : signupData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder={isLogin ? "Enter your password" : "Min. 8 chars with uppercase, lowercase, number & symbol"}
              className="pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {!isLogin && (
          <>
            <div>
              <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-primary">
                <Lock className="h-4 w-4" />
                Confirm Password *
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={signupData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                className="mt-2"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth" className="flex items-center gap-2 text-primary">
                  <Calendar className="h-4 w-4" />
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={signupData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="country" className="flex items-center gap-2 text-primary">
                  <MapPin className="h-4 w-4" />
                  Country
                </Label>
                <Input
                  id="country"
                  type="text"
                  value={signupData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  placeholder="Your country"
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="flex items-center gap-2 text-primary">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={signupData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="mt-2"
              />
            </div>
          </>
        )}

        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={onToggleMode}
          className="text-primary hover:text-primary-glow transition-smooth font-medium"
        >
          {isLogin 
            ? "Don't have an account? Sign up" 
            : "Already have an account? Sign in"}
        </button>
      </div>
    </Card>
  );
};