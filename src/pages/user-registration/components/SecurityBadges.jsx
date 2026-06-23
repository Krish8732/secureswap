import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'MonitorSmartphone',
      title: 'Prototype Registration',
      description: 'This form validates inputs locally and previews the intended onboarding experience.'
    },
    {
      icon: 'ShieldCheck',
      title: 'Improved Route Safety',
      description: 'Protected pages are no longer directly accessible without a local demo session.'
    },
    {
      icon: 'CheckCircle',
      title: 'Safer Client Defaults',
      description: 'The app now removes the injected runtime dependency and blocks broad dev host exposure.'
    },
    {
      icon: 'Users',
      title: 'Backend Still Needed',
      description: 'Real account creation, storage, verification, and audit controls are not connected yet.'
    }
  ];

  const trustIndicators = [
    { label: 'UI Validation', icon: 'CheckCircle' },
    { label: 'Route Guarded', icon: 'ShieldCheck' },
    { label: 'Demo Session', icon: 'Clock3' },
    { label: 'Needs API', icon: 'ServerCrash' }
  ];

  return (
    <div className="space-y-6">
      {/* Main Security Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 bg-card border border-border rounded-lg hover:shadow-elevated transition-smooth"
          >
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={20} color="var(--color-success)" />
            </div>
            <div>
              <h3 className="font-medium text-foreground text-sm">{feature?.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Trust Indicators Bar */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
          {trustIndicators?.map((indicator, index) => (
            <div key={index} className="flex items-center space-x-1">
              <Icon name={indicator?.icon} size={14} color="var(--color-success)" />
              <span className="font-medium">{indicator?.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Security Certification */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
          <Icon name="Wrench" size={16} color="var(--color-primary)" />
          <span className="text-sm font-medium text-primary">Prototype Hardening Applied</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Real security certifications should only be shown after formal review and backend controls exist.
        </p>
      </div>
      {/* Privacy Notice */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-primary">Next Step</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Connect this flow to a real backend before collecting production user data or displaying trust claims.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;
