import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLoginOptions = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: 'Square',
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Smartphone',
      color: 'bg-gray-900 hover:bg-black',
      textColor: 'text-white'
    }
  ];

  const handleSocialLogin = async (providerId) => {
    setLoadingProvider(providerId);
    
    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful social login
      localStorage.setItem('userToken', `mock-${providerId}-token`);
      localStorage.setItem('userEmail', `user@${providerId}.com`);
      localStorage.setItem('loginProvider', providerId);
      
      navigate('/exchange-dashboard');
    } catch (error) {
      console.error(`${providerId} login failed:`, error);
      alert(`${providerId} login failed. Please try again.`);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            onClick={() => handleSocialLogin(provider?.id)}
            loading={loadingProvider === provider?.id}
            disabled={loadingProvider !== null}
            fullWidth
            iconName={provider?.icon}
            iconPosition="left"
            className="justify-center"
          >
            Continue with {provider?.name}
          </Button>
        ))}
      </div>
      {/* Security Disclaimer */}
      <div className="mt-6 p-3 bg-muted/50 border border-border rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Secure Social Login</p>
            <p>
              Your social login is encrypted and we never store your social media passwords. 
              Only basic profile information is accessed with your permission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLoginOptions;