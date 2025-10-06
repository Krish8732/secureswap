import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicators = () => {
  const securityFeatures = [
    {
      icon: 'Lock',
      title: '256-bit SSL Encryption',
      description: 'Your data is protected with bank-level security'
    },
    {
      icon: 'Shield',
      title: 'Verified Platform',
      description: 'Certified secure by leading security auditors'
    },
    {
      icon: 'Users',
      title: 'Trusted by 50,000+',
      description: 'Join thousands of secure exchange users'
    },
    {
      icon: 'CheckCircle',
      title: 'GDPR Compliant',
      description: 'Full compliance with data protection regulations'
    }
  ];

  const trustBadges = [
    {
      name: 'SSL Secured',
      icon: 'Lock',
      color: 'text-success'
    },
    {
      name: 'Privacy Protected',
      icon: 'Eye',
      color: 'text-primary'
    },
    {
      name: 'Fraud Prevention',
      icon: 'Shield',
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
      {/* Security Certifications */}
      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground mb-3">Secured and certified by</p>
        <div className="flex items-center justify-center space-x-8 opacity-60">
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={20} />
            <span className="text-xs font-medium">ISO 27001</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={20} />
            <span className="text-xs font-medium">SOC 2</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={20} />
            <span className="text-xs font-medium">PCI DSS</span>
          </div>
        </div>
      </div>
      {/* Last Updated */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Security measures last updated: September 2025
        </p>
      </div>
    </div>
  );
};

export default SecurityIndicators;