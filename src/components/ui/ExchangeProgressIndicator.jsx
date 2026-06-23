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
    { label: 'Create Protocol', icon: 'Plus', description: 'Define execution requirements' },
    { label: 'Find Partner', icon: 'Users', description: 'Match with suitable counterparty' },
    { label: 'Negotiate Terms', icon: 'MessageSquare', description: 'Agree on parameters' },
    { label: 'Execute Escrow', icon: 'Lock', description: 'Finalize the transaction' },
  ];

  const progressSteps = steps?.length > 0 ? steps : defaultSteps;
  const progressPercentage = totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 100;

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

  const sizeClasses = {
    sm: 'text-xs',
    default: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="w-full">
      {/* Liquid Cascade Progress Bar */}
      <div className="relative mb-12 mt-4 px-4">
        {/* Track */}
        <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-black/5 dark:bg-white/5 rounded-full transform -translate-y-1/2 overflow-hidden">
          {/* Liquid Fill */}
          <div 
            className="h-full bg-primary transition-all duration-[1.2s] ease-fluid relative overflow-hidden"
            style={{ width: `${progressPercentage}%` }}
          >
            {/* Shimmer effect inside fill */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
        </div>

        {/* Step Indicators - Staggered */}
        <div className="relative flex justify-between">
          {progressSteps?.slice(0, totalSteps)?.map((step, index) => {
            const stepNumber = index + 1;
            const status = getStepStatus(stepNumber);
            const delay = index * 100;
            
            return (
              <div key={index} className="flex flex-col items-center animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
                <div
                  className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-fluid ease-fluid ${
                    status === 'completed'
                      ? 'border-background bg-primary text-primary-foreground shadow-diffusion scale-100'
                      : status === 'current' 
                        ? 'border-background bg-card text-primary ring-2 ring-primary shadow-diffusion scale-110' 
                        : 'border-background bg-black/5 dark:bg-white/5 text-text-secondary scale-90 opacity-60'
                  }`}
                >
                  <Icon
                    name={getStepIcon(step, status)}
                    size={20}
                    strokeWidth={status === 'completed' ? 2 : 1.5}
                  />
                </div>
                
                {showLabels && (
                  <div className={`mt-4 text-center max-w-[120px] transition-all duration-fluid ${status === 'pending' ? 'opacity-50' : 'opacity-100'}`}>
                    <div
                      className={`font-semibold tracking-tight ${sizeClasses?.[size]} ${
                        status === 'current' ? 'text-foreground'
                          : status === 'completed' ? 'text-primary' : 'text-text-secondary'
                      }`}
                    >
                      {step?.label}
                    </div>
                    {step?.description && size !== 'sm' && (
                      <div className="text-xs text-text-secondary mt-1.5 leading-relaxed">
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

      {/* High-End Doppelrand Current Step Info */}
      <div className="doppelrand-shell mt-8">
        <div className="doppelrand-core p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
              <Icon
                name={progressSteps?.[currentStep - 1]?.icon || 'Circle'}
                size={24}
                className="text-primary"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wider text-primary uppercase mb-1">
                Phase {currentStep} of {totalSteps}
              </p>
              <h3 className="text-xl font-bold text-foreground">
                {progressSteps?.[currentStep - 1]?.label}
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                {progressSteps?.[currentStep - 1]?.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end min-w-[140px]">
            <span className="text-sm font-medium text-text-secondary mb-2">Protocol Status</span>
            <div className="w-full bg-black/5 dark:bg-white/5 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-fluid" 
                style={{ width: `${progressPercentage}%` }} 
              />
            </div>
            <span className="text-xs font-bold text-primary mt-2">
              {Math.round(progressPercentage)}% Synchronized
            </span>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default ExchangeProgressIndicator;