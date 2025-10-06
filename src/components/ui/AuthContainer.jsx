import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthContainer = ({ children, title, subtitle, showSecurityBadge = true }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="ArrowLeftRight" size={24} color="white" />
          </div>
          <span className="text-2xl font-semibold text-foreground">SecureSwap</span>
        </Link>

        {/* Security Badge */}
        {showSecurityBadge && (
          <div className="flex items-center justify-center space-x-2 mb-6 p-3 bg-success/10 border border-success/20 rounded-lg">
            <Icon name="Shield" size={20} color="var(--color-success)" />
            <span className="text-sm font-medium text-success">Secure & Encrypted</span>
          </div>
        )}

        {/* Title and Subtitle */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-foreground">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow-elevated sm:rounded-lg sm:px-10 border border-border">
          {children}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={14} />
            <span>256-bit SSL</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={14} />
            <span>Verified Platform</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>Trusted by 10k+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;