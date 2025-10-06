import React from 'react';
import Icon from '../AppIcon';

const ExchangeProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 4, 
  steps = [],
  showLabels = true,
  size = 'default' 
}) => {
  const defaultSteps = [
    { label: 'Create Exchange', icon: 'Plus', description: 'Define your exchange requirements' },
    { label: 'Find Partner', icon: 'Users', description: 'Match with suitable partners' },
    { label: 'Negotiate Terms', icon: 'MessageSquare', description: 'Agree on exchange details' },
    { label: 'Complete Exchange', icon: 'CheckCircle', description: 'Finalize the transaction' },
  ];

  const progressSteps = steps?.length > 0 ? steps : defaultSteps;
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'pending';
  };

  const getStepIcon = (step, status) => {
    if (status === 'completed') return 'CheckCircle';
    if (status === 'current') return step?.icon;
    return step?.icon;
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed':
        return 'var(--color-success)';
      case 'current':
        return 'var(--color-primary)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const sizeClasses = {
    sm: 'text-xs',
    default: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border transform -translate-y-1/2">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="relative flex justify-between">
          {progressSteps?.slice(0, totalSteps)?.map((step, index) => {
            const stepNumber = index + 1;
            const status = getStepStatus(stepNumber);
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center bg-card transition-all duration-300 ${
                    status === 'completed'
                      ? 'border-success bg-success'
                      : status === 'current' ?'border-primary bg-primary' :'border-border bg-card'
                  }`}
                >
                  <Icon
                    name={getStepIcon(step, status)}
                    size={20}
                    color={
                      status === 'completed' || status === 'current'
                        ? 'white' :'var(--color-muted-foreground)'
                    }
                  />
                </div>
                {showLabels && (
                  <div className="mt-3 text-center max-w-24">
                    <div
                      className={`font-medium ${sizeClasses?.[size]} ${
                        status === 'current' ?'text-primary'
                          : status === 'completed' ?'text-success' :'text-muted-foreground'
                      }`}
                    >
                      {step?.label}
                    </div>
                    {step?.description && size !== 'sm' && (
                      <div className="text-xs text-muted-foreground mt-1 leading-tight">
                        {step?.description}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Current Step Info */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon
              name={progressSteps?.[currentStep - 1]?.icon || 'Circle'}
              size={16}
              color="var(--color-primary)"
            />
          </div>
          <div>
            <h3 className="font-medium text-foreground">
              Step {currentStep} of {totalSteps}: {progressSteps?.[currentStep - 1]?.label}
            </h3>
            <p className="text-sm text-muted-foreground">
              {progressSteps?.[currentStep - 1]?.description}
            </p>
          </div>
        </div>

        {/* Progress Percentage */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExchangeProgressIndicator;