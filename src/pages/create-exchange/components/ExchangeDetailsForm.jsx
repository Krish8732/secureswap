import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ExchangeDetailsForm = ({ 
  title, 
  description, 
  onTitleChange, 
  onDescriptionChange,
  exchangeType 
}) => {
  const [charCount, setCharCount] = useState(description?.length || 0);
  const maxChars = 2000;

  const handleDescriptionChange = (e) => {
    const value = e?.target?.value;
    if (value?.length <= maxChars) {
      setCharCount(value?.length);
      onDescriptionChange(e);
    }
  };

  const getPlaceholderText = () => {
    switch (exchangeType) {
      case 'service':
        return `Describe your service in detail...\n\nExample:\n• What specific service you're offering\n• Your experience level and qualifications\n• Time commitment and availability\n• Any tools or resources you'll provide\n• Expected timeline for completion`;
      case 'product':
        return `Describe your product in detail...\n\nExample:\n• Brand, model, and condition\n• Age and usage history\n• Original purchase price\n• Included accessories or extras\n• Reason for exchange`;
      case 'giftcard':
        return `Provide gift card details...\n\nExample:\n• Retailer and exact card type\n• Current balance amount\n• Expiration date (if any)\n• Purchase date and method\n• Any usage restrictions`;
      default:
        return 'Provide detailed information about what you\'re offering...';
    }
  };

  const formatText = (type) => {
    const textarea = document.querySelector('textarea[name="description"]');
    if (!textarea) return;

    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const selectedText = description?.substring(start, end);
    let newText = description;

    switch (type) {
      case 'bold':
        newText = description?.substring(0, start) + `**${selectedText}**` + description?.substring(end);
        break;
      case 'italic':
        newText = description?.substring(0, start) + `*${selectedText}*` + description?.substring(end);
        break;
      case 'bullet':
        const lines = selectedText?.split('\n');
        const bulletLines = lines?.map(line => line?.trim() ? `• ${line}` : line)?.join('\n');
        newText = description?.substring(0, start) + bulletLines + description?.substring(end);
        break;
      default:
        break;
    }

    onDescriptionChange({ target: { value: newText } });
  };

  return (
    <div className="space-y-6">
      {/* Title Input */}
      <Input
        label="Exchange Title"
        type="text"
        placeholder={`Enter a clear title for your ${exchangeType} exchange`}
        value={title}
        onChange={onTitleChange}
        required
        maxLength={100}
        description="Create an engaging title that clearly describes what you're offering"
      />

      {/* Description with Formatting */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            Detailed Description *
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => formatText('bold')}
              className="p-1 rounded hover:bg-muted transition-colors"
              title="Bold"
            >
              <Icon name="Bold" size={16} />
            </button>
            <button
              type="button"
              onClick={() => formatText('italic')}
              className="p-1 rounded hover:bg-muted transition-colors"
              title="Italic"
            >
              <Icon name="Italic" size={16} />
            </button>
            <button
              type="button"
              onClick={() => formatText('bullet')}
              className="p-1 rounded hover:bg-muted transition-colors"
              title="Bullet List"
            >
              <Icon name="List" size={16} />
            </button>
          </div>
        </div>

        <div className="relative">
          <textarea
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder={getPlaceholderText()}
            className="w-full min-h-[200px] p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-y"
            required
          />
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {charCount}/{maxChars}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Provide comprehensive details to help potential partners understand exactly what you're offering. 
          Be honest and specific to attract the right matches.
        </p>
      </div>

      {/* Writing Tips */}
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} color="var(--color-warning)" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Writing Tips</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Be specific about quality, condition, and expectations</li>
              <li>• Include relevant experience, certifications, or proof</li>
              <li>• Mention any limitations, requirements, or special conditions</li>
              <li>• Use bullet points for easy reading</li>
              <li>• Avoid sharing personal contact information here</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeDetailsForm;