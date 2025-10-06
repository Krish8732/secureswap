import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const locationOptions = [
    { value: 'any', label: 'Any Location' },
    { value: '5', label: 'Within 5 miles' },
    { value: '10', label: 'Within 10 miles' },
    { value: '25', label: 'Within 25 miles' },
    { value: '50', label: 'Within 50 miles' },
    { value: '100', label: 'Within 100 miles' },
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'gift-cards', label: 'Gift Cards' },
    { value: 'services', label: 'Services' },
    { value: 'products', label: 'Products' },
    { value: 'digital', label: 'Digital Items' },
    { value: 'experiences', label: 'Experiences' },
  ];

  const ratingOptions = [
    { value: 'any', label: 'Any Rating' },
    { value: '4', label: '4+ Stars' },
    { value: '4.5', label: '4.5+ Stars' },
    { value: '4.8', label: '4.8+ Stars' },
  ];

  const handleLocalFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearAll = () => {
    const clearedFilters = {
      location: 'any',
      category: 'all',
      minValue: '',
      maxValue: '',
      minRating: 'any',
      verifiedOnly: false,
      responseTime: 'any',
      availability: 'any',
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Filter Panel */}
      <div className={`
        fixed lg:relative top-0 right-0 h-full w-80 bg-card border-l border-border z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        lg:w-72 lg:border-l-0 lg:border-r
      `}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Filters</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Location Filter */}
            <div>
              <Select
                label="Location"
                options={locationOptions}
                value={localFilters?.location}
                onChange={(value) => handleLocalFilterChange('location', value)}
              />
            </div>

            {/* Category Filter */}
            <div>
              <Select
                label="Category"
                options={categoryOptions}
                value={localFilters?.category}
                onChange={(value) => handleLocalFilterChange('category', value)}
              />
            </div>

            {/* Value Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Exchange Value Range
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="Min ($)"
                  value={localFilters?.minValue}
                  onChange={(e) => handleLocalFilterChange('minValue', e?.target?.value)}
                />
                <Input
                  type="number"
                  placeholder="Max ($)"
                  value={localFilters?.maxValue}
                  onChange={(e) => handleLocalFilterChange('maxValue', e?.target?.value)}
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <Select
                label="Minimum Rating"
                options={ratingOptions}
                value={localFilters?.minRating}
                onChange={(value) => handleLocalFilterChange('minRating', value)}
              />
            </div>

            {/* Verification Status */}
            <div>
              <Checkbox
                label="Verified users only"
                description="Show only identity-verified partners"
                checked={localFilters?.verifiedOnly}
                onChange={(e) => handleLocalFilterChange('verifiedOnly', e?.target?.checked)}
              />
            </div>

            {/* Response Time */}
            <div>
              <Select
                label="Response Time"
                options={[
                  { value: 'any', label: 'Any Response Time' },
                  { value: '1h', label: 'Within 1 hour' },
                  { value: '4h', label: 'Within 4 hours' },
                  { value: '24h', label: 'Within 24 hours' },
                ]}
                value={localFilters?.responseTime}
                onChange={(value) => handleLocalFilterChange('responseTime', value)}
              />
            </div>

            {/* Availability */}
            <div>
              <Select
                label="Availability"
                options={[
                  { value: 'any', label: 'Any Time' },
                  { value: 'now', label: 'Available Now' },
                  { value: 'today', label: 'Available Today' },
                  { value: 'week', label: 'This Week' },
                ]}
                value={localFilters?.availability}
                onChange={(value) => handleLocalFilterChange('availability', value)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            <Button
              variant="default"
              fullWidth
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={handleClearAll}
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;