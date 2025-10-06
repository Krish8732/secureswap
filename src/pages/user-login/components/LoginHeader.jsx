import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center space-y-6">
      {/* Logo */}
      <Link to="/exchange-dashboard" className="inline-flex items-center space-x-3 hover:opacity-80 transition-smooth">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-elevated">
          <Icon name="ArrowLeftRight" size={28} color="white" />
        </div>
        <span className="text-3xl font-semibold text-foreground">SecureSwap</span>
      </Link>

      {/* Welcome Message */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">
          Sign in to your account to continue secure exchanges
        </p>
      </div>

      {/* Security Badge */}
      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full">
        <Icon name="Shield" size={18} color="var(--color-success)" />
        <span className="text-sm font-medium text-success">Secure & Encrypted Platform</span>
      </div>
    </div>
  );
};

export default LoginHeader;