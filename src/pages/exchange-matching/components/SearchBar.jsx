import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ searchQuery, onSearchChange, onSearch, suggestions = [] }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setLocalQuery(value);
    onSearchChange(value);
    setShowSuggestions(value?.length > 0 && suggestions?.length > 0);
  };

  const handleSearch = () => {
    onSearch(localQuery);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setLocalQuery(suggestion);
    onSearchChange(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
    if (e?.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const popularSearches = [
    "Gift cards",
    "Graphic design",
    "Amazon gift card",
    "Web development",
    "Photography",
    "Gaming items",
    "Tutoring services",
    "Digital art"
  ];

  return (
    <div className="relative">
      <div className="flex space-x-3">
        <div className="flex-1 relative">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              color="var(--color-muted-foreground)"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
            <Input
              type="search"
              placeholder="Search for services, products, or gift cards..."
              value={localQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowSuggestions(localQuery?.length > 0 && suggestions?.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="pl-10 pr-4"
            />
          </div>

          {/* Search Suggestions */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-elevated z-10 max-h-60 overflow-y-auto">
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center space-x-3"
                >
                  <Icon name="Search" size={16} color="var(--color-muted-foreground)" />
                  <span className="text-sm text-foreground">{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          variant="default"
          onClick={handleSearch}
          iconName="Search"
          iconPosition="left"
        >
          Search
        </Button>
      </div>
      {/* Popular Searches */}
      {!localQuery && (
        <div className="mt-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-foreground">Popular searches:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches?.map((search, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(search)}
                className="px-3 py-1 bg-muted hover:bg-primary/10 hover:text-primary text-sm text-muted-foreground rounded-full transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;