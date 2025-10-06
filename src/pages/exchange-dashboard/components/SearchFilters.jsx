import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchFilters = ({ onSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'service', label: 'Services' },
    { value: 'product', label: 'Products' },
    { value: 'gift_card', label: 'Gift Cards' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'disputed', label: 'Disputed' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'deadline', label: 'Deadline Soon' },
    { value: 'value_high', label: 'Highest Value' },
    { value: 'value_low', label: 'Lowest Value' },
    { value: 'progress', label: 'Progress' }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch && onSearch({
      query: searchQuery,
      category: selectedCategory,
      status: selectedStatus,
      sortBy: sortBy
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSortBy('recent');
    onFilterChange && onFilterChange({
      query: '',
      category: 'all',
      status: 'all',
      sortBy: 'recent'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Search & Filter</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search Input */}
        <div>
          <Input
            type="search"
            placeholder="Search exchanges, partners, or descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Filter Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Category"
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />

          <Select
            label="Status"
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
          />

          <Select
            label="Sort By"
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4">
            <Button type="submit" variant="default" iconName="Search" iconPosition="left">
              Search
            </Button>
            <Button type="button" variant="outline" iconName="Filter">
              Advanced Filters
            </Button>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>24 exchanges found</span>
          </div>
        </div>
      </form>
      {/* Quick Filter Tags */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground mb-2">Quick Filters:</p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Action Required', value: 'action_required' },
            { label: 'High Value', value: 'high_value' },
            { label: 'Expiring Soon', value: 'expiring' },
            { label: 'New Partners', value: 'new_partners' }
          ]?.map((tag) => (
            <button
              key={tag?.value}
              className="px-3 py-1 text-xs bg-muted hover:bg-primary/10 hover:text-primary rounded-full transition-smooth"
            >
              {tag?.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;