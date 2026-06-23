import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ExchangeSettings = ({ 
  duration,
  location,
  isPhysical,
  trustLevel,
  isPublic,
  availableFrom,
  allowPartial,
  autoMatching,
  requireEscrow,
  onDurationChange,
  onLocationChange,
  onIsPhysicalChange,
  onTrustLevelChange,
  onIsPublicChange,
  onAvailableFromChange,
  onAllowPartialChange,
  onAutoMatchingChange,
  onRequireEscrowChange
}) => {
  const durationOptions = [
    { value: '1', label: '1 day' },
    { value: '3', label: '3 days' },
    { value: '7', label: '1 week' },
    { value: '14', label: '2 weeks' },
    { value: '30', label: '1 month' },
    { value: '60', label: '2 months' },
    { value: '90', label: '3 months' },
    { value: 'ongoing', label: 'Ongoing/Flexible' }
  ];

  const trustLevelOptions = [
    { 
      value: 'basic', 
      label: 'Basic Verification', 
      description: 'Email verification required' 
    },
    { 
      value: 'standard', 
      label: 'Standard Verification', 
      description: 'Email + phone verification required' 
    },
    { 
      value: 'enhanced', 
      label: 'Enhanced Verification', 
      description: 'Full profile verification + ID check' 
    },
    { 
      value: 'premium', 
      label: 'Premium Members Only', 
      description: 'Verified premium members with good ratings' 
    }
  ];

  const getCurrentDate = () => {
    const today = new Date();
    return today?.toISOString()?.split('T')?.[0];
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Exchange Settings</h3>
        <p className="text-sm text-muted-foreground">Configure timing, location, and security preferences</p>
      </div>
      {/* Duration and Timing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Exchange Duration"
          placeholder="How long should this exchange remain active?"
          options={durationOptions}
          value={duration}
          onChange={onDurationChange}
          description="After this period, the exchange will be automatically closed"
        />

        <Input
          label="Available From"
          type="date"
          min={getCurrentDate()}
          value={availableFrom}
          onChange={onAvailableFromChange}
          description="When can you start this exchange?"
        />
      </div>
      {/* Location Settings */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={isPhysical}
            onChange={(e) => onIsPhysicalChange(e?.target?.checked)}
            label="Physical exchange required"
            description="Check if this exchange involves physical items or in-person services"
          />
        </div>

        {isPhysical && (
          <div className="pl-6 space-y-4">
            <Input
              label="Location"
              type="text"
              placeholder="City, State or ZIP code"
              value={location}
              onChange={onLocationChange}
              description="Where should the physical exchange take place?"
            />

            <div className="bg-muted/30 border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={16} color="var(--color-warning)" className="mt-0.5" />
                <div>
                  <h5 className="text-sm font-medium text-foreground mb-1">Safety Reminder</h5>
                  <p className="text-xs text-muted-foreground">
                    Always meet in public places for physical exchanges. Consider using our recommended safe exchange locations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Trust and Verification */}
      <Select
        label="Partner Trust Level"
        placeholder="Select minimum verification level for partners"
        options={trustLevelOptions}
        value={trustLevel}
        onChange={onTrustLevelChange}
        description="Higher levels provide more security but may limit potential matches"
      />
      {/* Privacy Settings */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={isPublic}
            onChange={(e) => onIsPublicChange(e?.target?.checked)}
            label="Make exchange publicly visible"
            description="Allow all users to see and respond to this exchange"
          />
        </div>

        {!isPublic && (
          <div className="pl-6">
            <div className="bg-muted/30 border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Lock" size={16} color="var(--color-primary)" className="mt-0.5" />
                <div>
                  <h5 className="text-sm font-medium text-foreground mb-1">Private Exchange</h5>
                  <p className="text-xs text-muted-foreground">
                    Only users you directly invite or share the link with can see this exchange.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Additional Settings */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h4 className="text-sm font-medium text-foreground">Additional Preferences</h4>
        
        <div className="space-y-3">
          <Checkbox
            checked={allowPartial}
            onChange={(e) => onAllowPartialChange(e?.target?.checked)}
            label="Allow partial exchanges"
            description="Accept offers for part of what you're offering"
          />
          
          <Checkbox
            checked={autoMatching}
            onChange={(e) => onAutoMatchingChange(e?.target?.checked)}
            label="Enable auto-matching"
            description="Automatically notify you of potential matches"
          />
          
          <Checkbox
            checked={requireEscrow}
            onChange={(e) => onRequireEscrowChange(e?.target?.checked)}
            label="Require escrow protection"
            description="Use SecureSwap's escrow service for added security"
          />
        </div>
      </div>
      {/* Security Notice */}
      <div className="bg-success/5 border border-success/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} color="var(--color-success)" className="mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-success mb-1">Security Features</h5>
            <ul className="text-xs text-success/80 space-y-1">
              <li>• All exchanges are monitored for suspicious activity</li>
              <li>• Partner verification badges help you choose trusted users</li>
              <li>• Dispute resolution system protects both parties</li>
              <li>• Your personal information is never shared without consent</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeSettings;