import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SortingControls = ({ 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange, 
  resultsCount,
  onToggleFilters,
  hasActiveFilters 
}) => {
  const sortOptions = [
    { value: 'compatibility', label: 'Best Match' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'distance', label: 'Nearest First' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'value-high', label: 'Highest Value' },
    { value: 'value-low', label: 'Lowest Value' },
    { value: 'response-time', label: 'Fastest Response' },
  ];

  const viewModeOptions = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* Results Count and Filter Toggle */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} color="var(--color-primary)" />
            <span className="text-sm text-foreground">
              <span className="font-medium">{resultsCount?.toLocaleString()}</span> potential matches
            </span>
          </div>
          
          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFilters}
            className="lg:hidden relative"
            iconName="Filter"
            iconPosition="left"
          >
            Filters
            {hasActiveFilters && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
            )}
          </Button>
        </div>

        {/* Sorting and View Controls */}
        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <Icon name="ArrowUpDown" size={16} color="var(--color-muted-foreground)" />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              className="min-w-40"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center space-x-1 bg-muted rounded-lg p-1">
            {viewModeOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={viewMode === option?.value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange(option?.value)}
                className="h-8 w-8 p-0"
                title={option?.label}
              >
                <Icon name={option?.icon} size={16} />
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Active Filters Indicator */}
      {hasActiveFilters && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={14} color="var(--color-primary)" />
              <span className="text-sm text-primary font-medium">Filters applied</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleFilters}
              className="text-xs"
            >
              View/Edit Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortingControls;