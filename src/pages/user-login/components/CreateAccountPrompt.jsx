import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CreateAccountPrompt = () => {
  const benefits = [
    {
      icon: 'Shield',
      title: 'Secure Exchanges',
      description: 'Protected by escrow-style system'
    },
    {
      icon: 'Users',
      title: 'Verified Partners',
      description: 'Connect with trusted users'
    },
    {
      icon: 'Star',
      title: 'Rating System',
      description: 'Build your reputation'
    },
    {
      icon: 'Clock',
      title: 'Quick Setup',
      description: 'Get started in minutes'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground">New to SecureSwap?</span>
        </div>
      </div>
      {/* Benefits Grid */}
      <div className="grid grid-cols-2 gap-3">
        {benefits?.map((benefit, index) => (
          <div key={index} className="text-center p-3 bg-muted/30 rounded-lg border border-border">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Icon name={benefit?.icon} size={16} color="var(--color-primary)" />
            </div>
            <h4 className="text-xs font-medium text-foreground">{benefit?.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{benefit?.description}</p>
          </div>
        ))}
      </div>
      {/* Create Account CTA */}
      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Join thousands of users making secure exchanges daily
        </p>
        
        <Link to="/user-registration">
          <Button
            variant="outline"
            fullWidth
            iconName="UserPlus"
            iconPosition="left"
          >
            Create Free Account
          </Button>
        </Link>

        <p className="text-xs text-muted-foreground">
          Free to join • No hidden fees • Cancel anytime
        </p>
      </div>
    </div>
  );
};

export default CreateAccountPrompt;