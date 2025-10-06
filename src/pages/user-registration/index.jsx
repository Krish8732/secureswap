import React from 'react';
import AuthContainer from '../../components/ui/AuthContainer';
import RegistrationForm from './components/RegistrationForm';
import SecurityBadges from './components/SecurityBadges';
import TimezoneDetector from './components/TimezoneDetector';

const UserRegistration = () => {
  return (
    <div className="min-h-screen bg-background">
      <AuthContainer
        title="Create Your Account"
        subtitle="Join thousands of users making secure exchanges worldwide"
        showSecurityBadge={true}
      >
        <div className="space-y-8">
          {/* Timezone Detection */}
          <TimezoneDetector />

          {/* Registration Form */}
          <RegistrationForm />

          {/* Security Information */}
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
              Why Choose SecureSwap?
            </h3>
            <SecurityBadges />
          </div>
        </div>
      </AuthContainer>
    </div>
  );
};

export default UserRegistration;