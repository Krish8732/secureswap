import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const DashboardNavPanel = ({ isCollapsed = false, onToggleCollapse }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const quickActions = [
    { label: 'Create Exchange', path: '/create-exchange', icon: 'Plus', color: 'primary' },
    { label: 'Find Partners', path: '/exchange-matching', icon: 'Users', color: 'secondary' },
    { label: 'Exchange Details', path: '/exchange-details', icon: 'FileText', color: 'accent' },
  ];

  const exchangeCategories = [
    { label: 'Active Exchanges', count: 3, icon: 'Activity', path: '/exchange-dashboard?filter=active' },
    { label: 'Pending Matches', count: 7, icon: 'Clock', path: '/exchange-dashboard?filter=pending' },
    { label: 'Completed', count: 12, icon: 'CheckCircle', path: '/exchange-dashboard?filter=completed' },
    { label: 'Draft Exchanges', count: 2, icon: 'Edit', path: '/exchange-dashboard?filter=draft' },
  ];

  const statusFilters = [
    { label: 'All Exchanges', value: 'all', icon: 'List' },
    { label: 'High Priority', value: 'priority', icon: 'AlertTriangle' },
    { label: 'Expiring Soon', value: 'expiring', icon: 'Timer' },
    { label: 'Needs Action', value: 'action', icon: 'Bell' },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path || location?.search?.includes(path?.split('?')?.[1]);
  };

  return (
    <div className={`bg-card border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4 space-y-6">
        {/* Collapse Toggle */}
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h3 className="text-lg font-semibold text-foreground">Navigation</h3>
          )}
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="h-8 w-8"
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
            </Button>
          )}
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div>
            <Input
              type="search"
              placeholder="Search exchanges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full"
            />
          </div>
        )}

        {/* Quick Actions */}
        <div>
          {!isCollapsed && (
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h4>
          )}
          <div className="space-y-2">
            {quickActions?.map((action) => (
              <Link
                key={action?.path}
                to={action?.path}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-smooth hover:bg-muted group ${
                  isActivePath(action?.path) ? 'bg-primary/10 text-primary' : 'text-foreground'
                }`}
                title={isCollapsed ? action?.label : undefined}
              >
                <div className={`p-1 rounded ${
                  action?.color === 'primary' ? 'bg-primary/10' :
                  action?.color === 'secondary'? 'bg-secondary/10' : 'bg-accent/10'
                }`}>
                  <Icon 
                    name={action?.icon} 
                    size={16} 
                    color={
                      action?.color === 'primary' ? 'var(--color-primary)' :
                      action?.color === 'secondary' ? 'var(--color-secondary)' :
                      'var(--color-accent)'
                    }
                  />
                </div>
                {!isCollapsed && (
                  <span className="text-sm font-medium">{action?.label}</span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Exchange Categories */}
        <div>
          {!isCollapsed && (
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Exchange Status</h4>
          )}
          <div className="space-y-1">
            {exchangeCategories?.map((category) => (
              <Link
                key={category?.path}
                to={category?.path}
                className={`flex items-center justify-between p-2 rounded-lg transition-smooth hover:bg-muted ${
                  isActivePath(category?.path) ? 'bg-muted text-primary' : 'text-foreground'
                }`}
                title={isCollapsed ? category?.label : undefined}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={category?.icon} size={16} />
                  {!isCollapsed && (
                    <span className="text-sm">{category?.label}</span>
                  )}
                </div>
                {!isCollapsed && (
                  <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                    {category?.count}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Status Filters */}
        {!isCollapsed && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Filters</h4>
            <div className="space-y-1">
              {statusFilters?.map((filter) => (
                <button
                  key={filter?.value}
                  className="flex items-center space-x-3 w-full p-2 rounded-lg transition-smooth hover:bg-muted text-left text-foreground"
                >
                  <Icon name={filter?.icon} size={16} />
                  <span className="text-sm">{filter?.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardNavPanel;