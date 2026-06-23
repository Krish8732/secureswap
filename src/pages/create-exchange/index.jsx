import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ExchangeProgressIndicator from '../../components/ui/ExchangeProgressIndicator';
import { useExchanges } from '../../hooks/useExchanges';

// Import all components
import ExchangeTypeSelector from './components/ExchangeTypeSelector';
import CategorySelector from './components/CategorySelector';
import ExchangeDetailsForm from './components/ExchangeDetailsForm';
import FileUploadSection from './components/FileUploadSection';
import WhatIWantSection from './components/WhatIWantSection';
import ExchangeSettings from './components/ExchangeSettings';
import ExchangePreview from './components/ExchangePreview';

const CreateExchange = () => {
  const navigate = useNavigate();
  const { createExchange } = useExchanges();
  const [currentStep, setCurrentStep] = useState(1);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Basic exchange info
    exchangeType: '',
    category: '',
    title: '',
    description: '',
    files: [],
    
    // What I want
    wantedType: '',
    wantedCategory: '',
    wantedDescription: '',
    estimatedValue: '',
    valueFlexibility: 'exact',
    
    // Settings
    duration: '30',
    location: '',
    isPhysical: false,
    trustLevel: 'standard',
    isPublic: true,
    availableFrom: '',
    allowPartial: false,
    autoMatching: true,
    requireEscrow: false
  });

  const steps = [
    { label: 'Exchange Type', icon: 'Plus', description: 'Choose what you\'re offering' },
    { label: 'Details & Files', icon: 'FileText', description: 'Describe your offering' },
    { label: 'Requirements', icon: 'Target', description: 'What you want in return' },
    { label: 'Settings & Preview', icon: 'Settings', description: 'Configure and review' }
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    // Save draft logic here
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 2000);
  };

  const handlePublishExchange = async () => {
    try {
      setIsSubmitting(true);
      await createExchange(formData);
      navigate('/exchange-dashboard');
    } catch (err) {
      console.error('Failed to publish exchange:', err);
      alert('Failed to publish exchange. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData?.exchangeType && formData?.category;
      case 2:
        return formData?.title && formData?.description;
      case 3:
        return formData?.wantedType && formData?.wantedDescription;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <ExchangeTypeSelector
              selectedType={formData?.exchangeType}
              onTypeChange={(type) => updateFormData('exchangeType', type)}
            />
            {formData?.exchangeType && (
              <CategorySelector
                exchangeType={formData?.exchangeType}
                selectedCategory={formData?.category}
                onCategoryChange={(category) => updateFormData('category', category)}
              />
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <ExchangeDetailsForm
              title={formData?.title}
              description={formData?.description}
              onTitleChange={(e) => updateFormData('title', e?.target?.value)}
              onDescriptionChange={(e) => updateFormData('description', e?.target?.value)}
              exchangeType={formData?.exchangeType}
            />
            <FileUploadSection
              files={formData?.files}
              onFilesChange={(files) => updateFormData('files', files)}
              exchangeType={formData?.exchangeType}
            />
          </div>
        );

      case 3:
        return (
          <WhatIWantSection
            wantedType={formData?.wantedType}
            wantedCategory={formData?.wantedCategory}
            wantedDescription={formData?.wantedDescription}
            estimatedValue={formData?.estimatedValue}
            valueFlexibility={formData?.valueFlexibility}
            onWantedTypeChange={(type) => updateFormData('wantedType', type)}
            onWantedCategoryChange={(category) => updateFormData('wantedCategory', category)}
            onWantedDescriptionChange={(e) => updateFormData('wantedDescription', e?.target?.value)}
            onEstimatedValueChange={(e) => updateFormData('estimatedValue', e?.target?.value)}
            onValueFlexibilityChange={(flexibility) => updateFormData('valueFlexibility', flexibility)}
          />
        );

      case 4:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ExchangeSettings
                duration={formData?.duration}
                location={formData?.location}
                isPhysical={formData?.isPhysical}
                trustLevel={formData?.trustLevel}
                isPublic={formData?.isPublic}
                availableFrom={formData?.availableFrom}
                allowPartial={formData?.allowPartial}
                autoMatching={formData?.autoMatching}
                requireEscrow={formData?.requireEscrow}
                onDurationChange={(duration) => updateFormData('duration', duration)}
                onLocationChange={(e) => updateFormData('location', e?.target?.value)}
                onIsPhysicalChange={(isPhysical) => updateFormData('isPhysical', isPhysical)}
                onTrustLevelChange={(trustLevel) => updateFormData('trustLevel', trustLevel)}
                onIsPublicChange={(isPublic) => updateFormData('isPublic', isPublic)}
                onAvailableFromChange={(e) => updateFormData('availableFrom', e?.target?.value)}
                onAllowPartialChange={(val) => updateFormData('allowPartial', val)}
                onAutoMatchingChange={(val) => updateFormData('autoMatching', val)}
                onRequireEscrowChange={(val) => updateFormData('requireEscrow', val)}
              />
            </div>
            <div>
              <div className="sticky top-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Preview</h3>
                <ExchangePreview {...formData} />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/exchange-dashboard')}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Create New Exchange</h1>
                <p className="text-muted-foreground">Set up your secure exchange in a few simple steps</p>
              </div>
            </div>

            {/* Progress Indicator */}
            <ExchangeProgressIndicator
              currentStep={currentStep}
              totalSteps={4}
              steps={steps}
              showLabels={true}
            />
          </div>

          {/* Main Content */}
          <div className="bg-card border border-border rounded-lg">
            <div className="p-6 lg:p-8">
              {renderStepContent()}
            </div>

            {/* Navigation Footer */}
            <div className="border-t border-border px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={handleSaveDraft}
                    disabled={!formData?.title}
                    iconName={isDraftSaved ? "Check" : "Save"}
                    iconPosition="left"
                  >
                    {isDraftSaved ? 'Draft Saved' : 'Save Draft'}
                  </Button>
                  
                  {isDraftSaved && (
                    <span className="text-sm text-success flex items-center space-x-1">
                      <Icon name="CheckCircle" size={16} />
                      <span>Automatically saved</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      iconName="ChevronLeft"
                      iconPosition="left"
                    >
                      Previous
                    </Button>
                  )}
                  
                  {currentStep < 4 ? (
                    <Button
                      variant="default"
                      onClick={handleNext}
                      disabled={!isStepValid(currentStep)}
                      iconName="ChevronRight"
                      iconPosition="right"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      onClick={handlePublishExchange}
                      disabled={!isStepValid(4) || isSubmitting}
                      loading={isSubmitting}
                      iconName="Send"
                      iconPosition="left"
                    >
                      Publish Exchange
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-muted/30 border border-border rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="HelpCircle" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Creating your first exchange? Check out our comprehensive guide to get started safely.
                </p>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <Icon name="Book" size={16} />
                    Exchange Guide
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="MessageCircle" size={16} />
                    Get Support
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Play" size={16} />
                    Watch Tutorial
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExchange;