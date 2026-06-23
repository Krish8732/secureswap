import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      title: 'Create Exchange',
      description: 'Start a new service, product, or gift card exchange',
      icon: 'Plus',
      color: 'primary',
      path: '/create-exchange',
      popular: true
    },
    {
      title: 'Find Partners',
      description: 'Browse and connect with potential exchange partners',
      icon: 'Users',
      color: 'secondary',
      path: '/exchange-matching',
      popular: false
    },
    {
      title: 'Message Center',
      description: 'View and respond to messages from exchange partners',
      icon: 'MessageSquare',
      color: 'accent',
      path: '/exchange-dashboard',
      popular: false
    },
    {
      title: 'Exchange History',
      description: 'Review your completed and past exchange transactions',
      icon: 'History',
      color: 'muted',
      path: '/exchange-dashboard',
      popular: false
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary/10 text-primary hover:bg-primary/20';
      case 'secondary':
        return 'bg-secondary/10 text-secondary hover:bg-secondary/20';
      case 'accent':
        return 'bg-accent/10 text-accent hover:bg-accent/20';
      default:
        return 'bg-muted text-muted-foreground hover:bg-muted/80';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <Icon name="Zap" size={20} color="var(--color-primary)" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action, index) => (
          <Link
            key={index}
            to={action?.path}
            className="group block p-4 rounded-lg border border-border hover:border-primary/20 hover:shadow-card transition-smooth"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-smooth ${getColorClasses(action?.color)}`}>
                <Icon name={action?.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-smooth">
                    {action?.title}
                  </h4>
                  {action?.popular && (
                    <span className="bg-success/10 text-success text-xs px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {action?.description}
                </p>
              </div>
              <Icon 
                name="ArrowRight" 
                size={16} 
                color="var(--color-muted-foreground)"
                className="group-hover:text-primary transition-smooth"
              />
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} color="var(--color-success)" />
            <span className="text-sm text-muted-foreground">Your activity is up 23% this week</span>
          </div>
          <Button variant="ghost" size="sm">
            View Analytics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;