import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import type { AuthError } from '@supabase/supabase-js';

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  fullName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  dateOfBirth?: string;
  country?: string;
  phoneNumber?: string;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validatePassword = useCallback((password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
    if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
    if (!/\d/.test(password)) errors.push('One number');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('One special character');
    return errors;
  }, []);

  const handleAuthError = useCallback((error: AuthError) => {
    if (error.message.includes('Invalid login credentials')) {
      toast.error('Invalid email or password');
    } else if (error.message.includes('already registered')) {
      toast.error('An account with this email already exists');
    } else {
      toast.error(error.message);
    }
  }, []);

  const signIn = useCallback(async (data: LoginData) => {
    if (!data.email || !data.password) {
      toast.error('Please fill in all fields');
      return false;
    }

    if (!validateEmail(data.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        handleAuthError(error);
        return false;
      }

      toast.success('Welcome back!');
      navigate('/');
      return true;
    } catch (error) {
      toast.error('An unexpected error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  }, [validateEmail, handleAuthError, navigate]);

  const signUp = useCallback(async (data: SignupData) => {
    // Required field validation
    if (!data.fullName || !data.email || !data.username || !data.password || !data.confirmPassword) {
      toast.error('Please fill in all required fields');
      return false;
    }

    // Email validation
    if (!validateEmail(data.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // Password confirmation
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    // Password strength validation
    const passwordErrors = validatePassword(data.password);
    if (passwordErrors.length > 0) {
      toast.error(`Password must have: ${passwordErrors.join(', ')}`);
      return false;
    }

    // Username validation
    if (data.username.length < 3) {
      toast.error('Username must be at least 3 characters');
      return false;
    }

    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: data.fullName,
            username: data.username,
            date_of_birth: data.dateOfBirth || null,
            country: data.country || null,
            phone_number: data.phoneNumber || null
          }
        }
      });

      if (error) {
        handleAuthError(error);
        return false;
      }

      toast.success('Account created! Please check your email to verify your account.');
      return true;
    } catch (error) {
      toast.error('An unexpected error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  }, [validateEmail, validatePassword, handleAuthError]);

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
        return false;
      }
      toast.success('Signed out successfully');
      navigate('/');
      return true;
    } catch (error) {
      toast.error('An unexpected error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return {
    loading,
    signIn,
    signUp,
    signOut,
    validateEmail,
    validatePassword
  };
};