import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TimezoneDetector = () => {
  const [timezone, setTimezone] = useState(null);
  const [location, setLocation] = useState(null);
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    detectTimezone();
  }, []);

  const detectTimezone = () => {
    try {
      // Get timezone from browser
      const detectedTimezone = Intl.DateTimeFormat()?.resolvedOptions()?.timeZone;
      const currentTime = new Date()?.toLocaleString('en-US', {
        timeZone: detectedTimezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      });

      // Extract location from timezone
      const locationParts = detectedTimezone?.split('/');
      const city = locationParts?.[locationParts?.length - 1]?.replace(/_/g, ' ');
      const region = locationParts?.[0];

      setTimezone({
        name: detectedTimezone,
        display: detectedTimezone?.replace(/_/g, ' '),
        currentTime,
        offset: new Date()?.getTimezoneOffset()
      });

      setLocation({
        city,
        region,
        full: `${city}, ${region}`
      });

      setIsDetecting(false);
    } catch (error) {
      console.error('Timezone detection failed:', error);
      setIsDetecting(false);
    }
  };

  if (isDetecting) {
    return (
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="animate-spin">
            <Icon name="Globe" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Detecting your timezone...</h3>
            <p className="text-sm text-muted-foreground">
              This helps us schedule exchanges at convenient times for you
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon name="MapPin" size={20} color="var(--color-primary)" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-foreground">Timezone Detected</h3>
          <div className="mt-2 space-y-1">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
              <span className="text-sm text-muted-foreground">
                {timezone?.currentTime}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={14} color="var(--color-muted-foreground)" />
              <span className="text-sm text-muted-foreground">
                {timezone?.display} ({location?.full})
              </span>
            </div>
          </div>
          <div className="mt-3 p-2 bg-success/10 border border-success/20 rounded text-xs text-success">
            <div className="flex items-center space-x-1">
              <Icon name="CheckCircle" size={12} />
              <span>Timezone automatically configured for optimal exchange scheduling</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimezoneDetector;