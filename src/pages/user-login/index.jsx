import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '../../components/ui/AuthContainer';
import LoginForm from './components/LoginForm';
import SocialLoginOptions from './components/SocialLoginOptions';
import SecurityIndicators from './components/SecurityIndicators';
import CreateAccountPrompt from './components/CreateAccountPrompt';

const UserLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      navigate('/exchange-dashboard');
    }

    // Auto-detect timezone for session management
    const timezone = Intl.DateTimeFormat()?.resolvedOptions()?.timeZone;
    localStorage.setItem('userTimezone', timezone);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <AuthContainer
        title="Welcome Back"
        subtitle="Sign in to your SecureSwap account to continue secure exchanges"
        showSecurityBadge={true}
      >
        <div className="space-y-8">
          {/* Main Login Form */}
          <LoginForm />

          {/* Social Login Options */}
          <SocialLoginOptions />

          {/* Security Indicators */}
          <SecurityIndicators />

          {/* Create Account Prompt */}
          <CreateAccountPrompt />
        </div>
      </AuthContainer>
    </div>
  );
};

export default UserLogin;