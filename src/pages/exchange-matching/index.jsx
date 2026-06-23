import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FilterPanel from './components/FilterPanel';
import MatchCard from './components/MatchCard';
import SearchBar from './components/SearchBar';
import SortingControls from './components/SortingControls';
import PartnerPreviewModal from './components/PartnerPreviewModal';
import SavedSearches from './components/SavedSearches';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useMatching } from '../../hooks/useMatching';

const ExchangeMatching = () => {
  const navigate = useNavigate();
  const { matches: hookMatches = [], loading, error } = useMatching();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('compatibility');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: 'any',
    category: 'all',
    minValue: '',
    maxValue: '',
    minRating: 'any',
    verifiedOnly: false,
    responseTime: 'any',
    availability: 'any',
  });

  const [filteredMatches, setFilteredMatches] = useState([]);

  // Mock saved searches
  const [savedSearches, setSavedSearches] = useState([
    {
      id: 1,
      name: "Web Development Services",
      query: "web development",
      filters: { category: 'services', location: '25', minRating: '4' },
      createdAt: "3 days ago"
    },
    {
      id: 2,
      name: "Amazon Gift Cards",
      query: "amazon gift card",
      filters: { category: 'gift-cards', location: 'any', minValue: '50' },
      createdAt: "1 week ago"
    }
  ]);

  // Search suggestions
  const searchSuggestions = [
    "Amazon gift card",
    "Web development",
    "Graphic design",
    "Photography services",
    "MacBook Pro",
    "Digital marketing",
    "Logo design",
    "Gaming console"
  ];

  useEffect(() => {
    applyFiltersAndSort();
  }, [filters, sortBy, searchQuery, hookMatches]);

  const applyFiltersAndSort = () => {
    let filtered = [...hookMatches];

    // Apply search query
    if (searchQuery) {
      filtered = filtered?.filter(match =>
        match?.offering?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        match?.offering?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        match?.lookingFor?.some(item => item?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Apply filters
    if (filters?.category !== 'all') {
      filtered = filtered?.filter(match => {
        const category = match?.offering?.category?.toLowerCase()?.replace(' ', '-');
        return category === filters?.category;
      });
    }

    if (filters?.minValue) {
      filtered = filtered?.filter(match => match?.offering?.estimatedValue >= parseInt(filters?.minValue));
    }

    if (filters?.maxValue) {
      filtered = filtered?.filter(match => match?.offering?.estimatedValue <= parseInt(filters?.maxValue));
    }

    if (filters?.minRating !== 'any') {
      filtered = filtered?.filter(match => match?.rating >= parseFloat(filters?.minRating));
    }

    if (filters?.verifiedOnly) {
      filtered = filtered?.filter(match => match?.isVerified);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'compatibility':
          return b?.compatibilityScore - a?.compatibilityScore;
        case 'rating':
          return b?.rating - a?.rating;
        case 'distance':
          return parseFloat(a?.location) - parseFloat(b?.location);
        case 'recent':
          return b?.id - a?.id; // Mock recent activity
        case 'value-high':
          return b?.offering?.estimatedValue - a?.offering?.estimatedValue;
        case 'value-low':
          return a?.offering?.estimatedValue - b?.offering?.estimatedValue;
        case 'response-time':
          const timeOrder = { 'Within 1 hour': 1, 'Within 4 hours': 2, 'Within 24 hours': 3 };
          return (timeOrder?.[a?.responseTime] || 4) - (timeOrder?.[b?.responseTime] || 4);
        default:
          return 0;
      }
    });

    setFilteredMatches(filtered);
  };

  const handleViewDetails = (match) => {
    setSelectedPartner(match);
    setIsPreviewModalOpen(true);
  };

  const handleSendRequest = (match) => {
    // Navigate to exchange details with partner info
    navigate('/exchange-details', { state: { partnerId: match?.id, partnerName: match?.name } });
  };

  const handleViewFullProfile = (partner) => {
    setIsPreviewModalOpen(false);
    // Navigate to partner's full profile (would be implemented)
  };

  const handleSaveSearch = (name) => {
    const newSearch = {
      id: Date.now(),
      name,
      query: searchQuery,
      filters: { ...filters },
      createdAt: 'Just now'
    };
    setSavedSearches([newSearch, ...savedSearches]);
  };

  const handleLoadSearch = (search) => {
    setSearchQuery(search?.query);
    setFilters(search?.filters);
  };

  const handleDeleteSearch = (searchId) => {
    setSavedSearches(savedSearches?.filter(search => search?.id !== searchId));
  };

  const hasActiveFilters = () => {
    return filters?.category !== 'all' ||
           filters?.location !== 'any' ||
           filters?.minValue ||
           filters?.maxValue ||
           filters?.minRating !== 'any' ||
           filters?.verifiedOnly ||
           filters?.responseTime !== 'any' ||
           filters?.availability !== 'any';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Users" size={24} color="var(--color-primary)" />
              <h1 className="text-3xl font-bold text-foreground">Find Exchange Partners</h1>
            </div>
            <p className="text-muted-foreground">
              Discover compatible partners for secure exchanges based on your preferences and requirements.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearch={setSearchQuery}
              suggestions={searchSuggestions?.filter(s => 
                s?.toLowerCase()?.includes(searchQuery?.toLowerCase())
              )}
            />
          </div>

          {/* Saved Searches */}
          <div className="mb-6">
            <SavedSearches
              savedSearches={savedSearches}
              onLoadSearch={handleLoadSearch}
              onSaveSearch={handleSaveSearch}
              onDeleteSearch={handleDeleteSearch}
            />
          </div>

          <div className="flex gap-6">
            {/* Filter Panel - Desktop */}
            <div className="hidden lg:block">
              <FilterPanel
                isOpen={true}
                onClose={() => setIsFilterPanelOpen(false)}
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={() => setFilters({
                  location: 'any',
                  category: 'all',
                  minValue: '',
                  maxValue: '',
                  minRating: 'any',
                  verifiedOnly: false,
                  responseTime: 'any',
                  availability: 'any',
                })}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Sorting Controls */}
              <div className="mb-6">
                <SortingControls
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  resultsCount={filteredMatches?.length}
                  onToggleFilters={() => setIsFilterPanelOpen(true)}
                  hasActiveFilters={hasActiveFilters()}
                />
              </div>

              {/* Results */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 bg-card border border-border rounded-lg">
                  <Icon name="Loader" className="animate-spin text-primary mb-2" size={32} />
                  <p className="text-sm text-muted-foreground">Finding compatible partners...</p>
                </div>
              ) : filteredMatches?.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No matches found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters to find more partners.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({
                        location: 'any',
                        category: 'all',
                        minValue: '',
                        maxValue: '',
                        minRating: 'any',
                        verifiedOnly: false,
                        responseTime: 'any',
                        availability: 'any',
                      });
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' :'grid-cols-1'
                }`}>
                  {filteredMatches?.map((match) => (
                    <MatchCard
                      key={match?.id}
                      match={match}
                      onViewDetails={handleViewDetails}
                      onSendRequest={handleSendRequest}
                    />
                  ))}
                </div>
              )}

              {/* Load More Button */}
              {filteredMatches?.length > 0 && (
                <div className="text-center mt-8">
                  <Button variant="outline" size="lg">
                    Load More Partners
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={() => setFilters({
          location: 'any',
          category: 'all',
          minValue: '',
          maxValue: '',
          minRating: 'any',
          verifiedOnly: false,
          responseTime: 'any',
          availability: 'any',
        })}
      />
      {/* Partner Preview Modal */}
      <PartnerPreviewModal
        partner={selectedPartner}
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onSendRequest={handleSendRequest}
        onViewFullProfile={handleViewFullProfile}
      />
    </div>
  );
};

export default ExchangeMatching;