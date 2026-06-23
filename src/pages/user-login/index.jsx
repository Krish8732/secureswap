import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContainer from '../../components/ui/AuthContainer';
import LoginForm from './components/LoginForm';
import SocialLoginOptions from './components/SocialLoginOptions';
import CreateAccountPrompt from './components/CreateAccountPrompt';
import { getSession, saveUserTimezone } from '../../utils/session';

const UserLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const session = getSession();
    if (session) {
      const nextPath = location?.state?.from?.pathname || '/exchange-dashboard';
      navigate(nextPath, { replace: true });
    }

    const timezone = Intl.DateTimeFormat()?.resolvedOptions()?.timeZone;
    saveUserTimezone(timezone);
  }, [location?.state?.from?.pathname, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <AuthContainer
        title="Welcome to SecureSwap"
        subtitle="Sign in to manage and execute your peer-to-peer exchanges securely."
        showSecurityBadge={false}
      >
        <div className="space-y-8">
          {/* Main Login Form */}
          <LoginForm />

          {/* Social Login Options */}
          <SocialLoginOptions />

          {/* Create Account Prompt */}
          <CreateAccountPrompt />
        </div>
      </AuthContainer>
    </div>
  );
};

export default UserLogin;
