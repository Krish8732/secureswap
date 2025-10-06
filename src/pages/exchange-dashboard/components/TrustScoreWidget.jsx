import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrustScoreWidget = () => {
  const trustScore = 87;
  const trustLevel = trustScore >= 90 ? 'Excellent' : trustScore >= 75 ? 'Good' : trustScore >= 60 ? 'Fair' : 'Needs Improvement';
  
  const improvements = [
    {
      title: 'Complete Profile Verification',
      description: 'Add government ID verification',
      points: '+8 points',
      icon: 'Shield',
      completed: false
    },
    {
      title: 'Link Social Media Accounts',
      description: 'Connect LinkedIn and Facebook',
      points: '+5 points',
      icon: 'Link',
      completed: true
    },
    {
      title: 'Complete More Exchanges',
      description: 'Successfully complete 3 more exchanges',
      points: '+10 points',
      icon: 'ArrowLeftRight',
      completed: false
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-primary';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBackground = (score) => {
    if (score >= 90) return 'from-success/20 to-success/5';
    if (score >= 75) return 'from-primary/20 to-primary/5';
    if (score >= 60) return 'from-warning/20 to-warning/5';
    return 'from-destructive/20 to-destructive/5';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Trust Score</h3>
        <Icon name="Award" size={20} color="var(--color-primary)" />
      </div>
      {/* Trust Score Display */}
      <div className={`bg-gradient-to-br ${getScoreBackground(trustScore)} rounded-lg p-6 mb-6`}>
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-4xl font-bold ${getScoreColor(trustScore)} mb-2`}>
              {trustScore}
            </div>
            <div className="text-sm text-muted-foreground">
              {trustLevel} Trust Level
            </div>
          </div>
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeDasharray={`${trustScore}, 100`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
            </div>
          </div>
        </div>
      </div>
      {/* Trust Factors */}
      <div className="space-y-3 mb-6">
        <h4 className="font-medium text-foreground">Improve Your Score</h4>
        {improvements?.map((improvement, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              improvement?.completed ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
            }`}>
              <Icon 
                name={improvement?.completed ? 'CheckCircle' : improvement?.icon} 
                size={16} 
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h5 className={`text-sm font-medium ${
                  improvement?.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                }`}>
                  {improvement?.title}
                </h5>
                <span className={`text-xs font-medium ${
                  improvement?.completed ? 'text-success' : 'text-primary'
                }`}>
                  {improvement?.completed ? 'Completed' : improvement?.points}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {improvement?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Action Button */}
      <Button variant="outline" fullWidth iconName="ArrowRight" iconPosition="right">
        View Full Trust Profile
      </Button>
      {/* Trust Benefits */}
      <div className="mt-4 p-3 bg-primary/5 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Star" size={16} color="var(--color-primary)" />
          <span className="text-sm font-medium text-primary">Trust Benefits</span>
        </div>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Higher visibility in partner matching</li>
          <li>• Access to premium exchange features</li>
          <li>• Priority customer support</li>
        </ul>
      </div>
    </div>
  );
};

export default TrustScoreWidget;