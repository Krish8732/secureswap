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

const ExchangeMatching = () => {
  const navigate = useNavigate();
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

  // Mock data for potential matches
  const mockMatches = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      reviewCount: 127,
      compatibilityScore: 94,
      location: "2.3 miles away",
      isVerified: true,
      isOnline: true,
      responseTime: "Within 1 hour",
      exchangeCount: 23,
      offering: {
        title: "$100 Amazon Gift Card",
        description: "Brand new Amazon gift card, perfect for online shopping. Can provide proof of purchase and will transfer digitally for security.",
        category: "Gift Cards",
        estimatedValue: 100,
        images: [
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop",
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop"
        ]
      },
      lookingFor: ["Web Development", "Graphic Design", "Digital Marketing", "Photography"]
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      reviewCount: 89,
      compatibilityScore: 87,
      location: "5.1 miles away",
      isVerified: true,
      isOnline: false,
      lastActive: "2 hours ago",
      responseTime: "Within 4 hours",
      exchangeCount: 15,
      offering: {
        title: "Professional Logo Design Service",
        description: "Custom logo design with 3 concepts, unlimited revisions, and final files in all formats. 5+ years experience in branding.",
        category: "Services",
        estimatedValue: 150,
        images: [
          "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=200&h=200&fit=crop",
          "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop"
        ]
      },
      lookingFor: ["Gift Cards", "Electronics", "Software Licenses"]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      reviewCount: 156,
      compatibilityScore: 82,
      location: "3.7 miles away",
      isVerified: true,
      isOnline: true,
      responseTime: "Within 1 hour",
      exchangeCount: 31,
      offering: {
        title: "Photography Session Package",
        description: "Professional portrait or event photography session including 2 hours shooting time and 20 edited high-resolution photos.",
        category: "Services",
        estimatedValue: 200,
        images: [
          "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=200&fit=crop",
          "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=200&h=200&fit=crop"
        ]
      },
      lookingFor: ["Web Development", "App Development", "Digital Marketing"]
    },
    {
      id: 4,
      name: "David Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.6,
      reviewCount: 73,
      compatibilityScore: 79,
      location: "8.2 miles away",
      isVerified: false,
      isOnline: false,
      lastActive: "1 day ago",
      responseTime: "Within 24 hours",
      exchangeCount: 12,
      offering: {
        title: "MacBook Pro 13-inch (2021)",
        description: "Excellent condition MacBook Pro with M1 chip, 8GB RAM, 256GB SSD. Includes original charger and box. Perfect for students or professionals.",
        category: "Electronics",
        estimatedValue: 800,
        images: [
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop",
          "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=200&fit=crop"
        ]
      },
      lookingFor: ["Gift Cards", "Gaming Console", "Camera Equipment"]
    },
    {
      id: 5,
      name: "Lisa Wang",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      reviewCount: 201,
      compatibilityScore: 91,
      location: "1.8 miles away",
      isVerified: true,
      isOnline: true,
      responseTime: "Within 1 hour",
      exchangeCount: 45,
      offering: {
        title: "Full-Stack Web Development",
        description: "Complete website development using React, Node.js, and modern technologies. Includes responsive design, database integration, and deployment.",
        category: "Services",
        estimatedValue: 500,
        images: [
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=200&fit=crop",
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=200&fit=crop"
        ]
      },
      lookingFor: ["Gift Cards", "Photography", "Marketing Services", "Design Work"]
    },
    {
      id: 6,
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 4.5,
      reviewCount: 64,
      compatibilityScore: 75,
      location: "6.4 miles away",
      isVerified: true,
      isOnline: false,
      lastActive: "5 hours ago",
      responseTime: "Within 4 hours",
      exchangeCount: 18,
      offering: {
        title: "Digital Marketing Campaign Setup",
        description: "Complete digital marketing campaign setup including Google Ads, Facebook Ads, and analytics tracking. 3+ years experience in digital marketing.",
        category: "Services",
        estimatedValue: 300,
        images: [
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop",
          "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=200&h=200&fit=crop"
        ]
      },
      lookingFor: ["Web Development", "App Development", "Gift Cards"]
    }
  ];

  const [matches, setMatches] = useState(mockMatches);
  const [filteredMatches, setFilteredMatches] = useState(mockMatches);

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
  }, [filters, sortBy, searchQuery]);

  const applyFiltersAndSort = () => {
    let filtered = [...matches];

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
    console.log('Navigate to full profile:', partner?.id);
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
              {filteredMatches?.length === 0 ? (
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