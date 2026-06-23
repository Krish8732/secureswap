import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicators = () => {
  const securityFeatures = [
    {
      icon: 'MonitorSmartphone',
      title: 'Prototype Access Flow',
      description: 'This screen demonstrates the intended sign-in UX before backend integration.'
    },
    {
      icon: 'ShieldAlert',
      title: 'Client-Side Session Guard',
      description: 'Protected pages now require a local demo session instead of open route access.'
    },
    {
      icon: 'Users',
      title: 'Demo Accounts Only',
      description: 'Use the prototype credentials above to explore the app safely.'
    },
    {
      icon: 'CheckCircle',
      title: 'Safer Defaults',
      description: 'The build removes the injected Rocket runtime and limits ambient client exposure.'
    }
  ];

  const trustBadges = [
    {
      name: 'Demo Only',
      icon: 'FlaskConical',
      color: 'text-success'
    },
    {
      name: 'Route Guarded',
      icon: 'ShieldCheck',
      color: 'text-primary'
    },
    {
      name: 'Session Scoped',
      icon: 'Clock3',
      color: 'text-warning'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Trust Badges */}
      <div className="flex items-center justify-center space-x-6 py-4 bg-muted/30 rounded-lg border border-border">
        {trustBadges?.map((badge, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Icon name={badge?.icon} size={16} className={badge?.color} />
            <span className="text-xs font-medium text-foreground">{badge?.name}</span>
          </div>
        ))}
      </div>
      {/* Security Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-card border border-border rounded-lg">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={16} color="var(--color-primary)" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">{feature?.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Prototype Notes */}
      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground mb-3">Current hardening in this repo</p>
        <div className="flex items-center justify-center space-x-8 opacity-60">
          <div className="flex items-center space-x-1">
            <Icon name="ShieldCheck" size={20} />
            <span className="text-xs font-medium">Protected Routes</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="KeyRound" size={20} />
            <span className="text-xs font-medium">Demo Sessions</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Blocks" size={20} />
            <span className="text-xs font-medium">CSP Applied</span>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Backend authentication, real OAuth, and compliance claims still need a server-side implementation.
        </p>
      </div>
    </div>
  );
};

export default SecurityIndicators;
