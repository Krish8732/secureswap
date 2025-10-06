import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showMFA, setShowMFA] = useState(false);
  const [mfaCode, setMfaCode] = useState('');

  // Mock credentials for demonstration
  const mockCredentials = {
    email: 'demo@secureswap.com',
    password: 'SecurePass123!'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check mock credentials
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Simulate MFA requirement for demo user
        if (formData?.email === mockCredentials?.email && !showMFA) {
          setShowMFA(true);
          setIsLoading(false);
          return;
        }
        
        // Successful login
        localStorage.setItem('userToken', 'mock-jwt-token');
        localStorage.setItem('userEmail', formData?.email);
        if (formData?.rememberMe) {
          localStorage.setItem('rememberUser', 'true');
        }
        navigate('/exchange-dashboard');
      } else {
        setErrors({
          general: `Invalid credentials. Use: ${mockCredentials?.email} / ${mockCredentials?.password}`
        });
      }
    } catch (error) {
      setErrors({
        general: 'Login failed. Please check your connection and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMFASubmit = async (e) => {
    e?.preventDefault();
    
    if (!mfaCode || mfaCode?.length !== 6) {
      setErrors({ mfa: 'Please enter a valid 6-digit code' });
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock MFA verification (accept any 6-digit code)
      if (mfaCode === '123456') {
        localStorage.setItem('userToken', 'mock-jwt-token');
        localStorage.setItem('userEmail', formData?.email);
        navigate('/exchange-dashboard');
      } else {
        setErrors({ mfa: 'Invalid verification code. Use: 123456' });
      }
    } catch (error) {
      setErrors({ mfa: 'Verification failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In a real app, this would trigger password reset flow
    alert('Password reset link would be sent to your email address.');
  };

  if (showMFA) {
    return (
      <form onSubmit={handleMFASubmit} className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Shield" size={32} color="var(--color-primary)" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Two-Factor Authentication</h3>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit verification code sent to your registered device
          </p>
        </div>
        {errors?.general && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{errors?.general}</p>
          </div>
        )}
        <Input
          label="Verification Code"
          type="text"
          name="mfaCode"
          value={mfaCode}
          onChange={(e) => setMfaCode(e?.target?.value)}
          placeholder="Enter 6-digit code"
          maxLength={6}
          error={errors?.mfa}
          required
          className="text-center text-lg tracking-widest"
        />
        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          iconName="Shield"
          iconPosition="left"
        >
          Verify & Sign In
        </Button>
        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowMFA(false)}
            className="text-sm text-primary hover:underline"
          >
            Back to login
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.general && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive">{errors?.general}</p>
        </div>
      )}
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData?.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        error={errors?.email}
        required
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData?.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          error={errors?.password}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleInputChange}
        />
        
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        loading={isLoading}
        fullWidth
        iconName="LogIn"
        iconPosition="left"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;