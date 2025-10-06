import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: '256-bit SSL Encryption',
      description: 'Your data is protected with bank-level security'
    },
    {
      icon: 'Lock',
      title: 'Secure Data Storage',
      description: 'All personal information is encrypted and stored safely'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified Platform',
      description: 'Trusted by thousands of users worldwide'
    },
    {
      icon: 'Users',
      title: 'Community Verified',
      description: 'Join 10,000+ verified exchange partners'
    }
  ];

  const trustIndicators = [
    { label: 'SSL Secured', icon: 'Lock' },
    { label: 'GDPR Compliant', icon: 'Shield' },
    { label: '99.9% Uptime', icon: 'CheckCircle' },
    { label: '24/7 Support', icon: 'HeadphonesIcon' }
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
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full">
          <Icon name="Award" size={16} color="var(--color-success)" />
          <span className="text-sm font-medium text-success">Security Certified Platform</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Independently audited and verified for user safety
        </p>
      </div>
      {/* Privacy Notice */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-primary">Your Privacy Matters</h4>
            <p className="text-xs text-muted-foreground mt-1">
              We use your information only to facilitate secure exchanges. Your data is never sold or shared with third parties without your consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;