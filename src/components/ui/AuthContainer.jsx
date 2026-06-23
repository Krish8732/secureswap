import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthContainer = ({ children, title, subtitle, showSecurityBadge = true }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Ethereal Glass background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[40vh] bg-primary/10 dark:bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-fade-up">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center space-x-3 mb-10 group">
          <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-[1.25rem] flex items-center justify-center border border-black/5 dark:border-white/10 shadow-diffusion group-hover:scale-105 transition-all duration-fluid ease-fluid">
            <Icon name="ArrowLeftRight" size={24} className="text-primary" strokeWidth={1.5} />
          </div>
          <span className="text-3xl font-extrabold tracking-tight text-foreground">SecureSwap</span>
        </Link>

        {/* Security Badge */}
        {showSecurityBadge && (
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full">
              <Icon name="MonitorSmartphone" size={16} className="text-primary" strokeWidth={1.5} />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">Frontend Prototype</span>
            </div>
          </div>
        )}

        {/* Title and Subtitle */}
        <div className="text-center mb-10 px-4">
          <h2 className="text-4xl font-extrabold text-foreground tracking-tighter">{title}</h2>
          {subtitle && (
            <p className="mt-3 text-base text-text-secondary max-w-[40ch] mx-auto leading-relaxed">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-fade-up" style={{ animationDelay: '100ms' }}>
        {/* High-End Visual Design: Double-Bezel (Doppelrand) Architecture */}
        <div className="doppelrand-shell shadow-diffusion dark:shadow-diffusion-dark mx-4 sm:mx-0">
          <div className="doppelrand-core p-8 sm:p-10">
            {children}
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md animate-fade-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center justify-center space-x-8 text-xs font-medium text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="LayoutTemplate" size={16} strokeWidth={1.5} />
            <span>UI Only</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="ShieldAlert" size={16} strokeWidth={1.5} />
            <span>No Backend Auth</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="FlaskConical" size={16} strokeWidth={1.5} />
            <span>Demo Flow</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
