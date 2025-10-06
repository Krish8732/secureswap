import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SavedSearches = ({ savedSearches, onLoadSearch, onSaveSearch, onDeleteSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [searchName, setSearchName] = useState('');

  const handleSaveSearch = () => {
    if (searchName?.trim()) {
      onSaveSearch(searchName?.trim());
      setSearchName('');
      setShowSaveModal(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Bookmark" size={16} color="var(--color-primary)" />
          <h3 className="font-medium text-foreground">Saved Searches</h3>
          <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
            {savedSearches?.length}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSaveModal(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Save Current
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4 space-y-2">
          {savedSearches?.length === 0 ? (
            <div className="text-center py-4">
              <Icon name="Search" size={24} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No saved searches yet</p>
              <p className="text-xs text-muted-foreground">Save your current search to quickly access it later</p>
            </div>
          ) : (
            savedSearches?.map((search) => (
              <div
                key={search?.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground">{search?.name}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {search?.query || 'All items'}
                    </span>
                    {search?.filters?.category !== 'all' && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {search?.filters?.category}
                      </span>
                    )}
                    {search?.filters?.location !== 'any' && (
                      <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                        {search?.filters?.location} miles
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Saved {search?.createdAt}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onLoadSearch(search)}
                    iconName="Search"
                  >
                    Load
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteSearch(search?.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {/* Save Search Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-foreground mb-4">Save Current Search</h3>
            <Input
              label="Search Name"
              placeholder="Enter a name for this search..."
              value={searchName}
              onChange={(e) => setSearchName(e?.target?.value)}
              className="mb-4"
            />
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowSaveModal(false);
                  setSearchName('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleSaveSearch}
                disabled={!searchName?.trim()}
                className="flex-1"
              >
                Save Search
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedSearches;