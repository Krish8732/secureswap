import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const CommitmentPanel = ({ 
  exchange, 
  currentUserId, 
  onCommit, 
  onCancel, 
  isRevealed 
}) => {
  const [showCommitDialog, setShowCommitDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [riskAccepted, setRiskAccepted] = useState(false);

  const currentUser = exchange?.participants?.find(p => p?.id === currentUserId);
  const partner = exchange?.participants?.find(p => p?.id !== currentUserId);
  
  const isCurrentUserCommitted = currentUser?.commitmentStatus === 'committed';
  const isPartnerCommitted = partner?.commitmentStatus === 'committed';
  const bothCommitted = isCurrentUserCommitted && isPartnerCommitted;

  const handleCommit = () => {
    if (termsAccepted && riskAccepted) {
      onCommit();
      setShowCommitDialog(false);
      setTermsAccepted(false);
      setRiskAccepted(false);
    }
  };

  const handleCancel = () => {
    onCancel();
    setShowCancelDialog(false);
  };

  const CommitDialog = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-md w-full p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Commit to Exchange</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6">
          By committing to this exchange, you agree to proceed with the transaction. 
          Once both parties commit, all details will be revealed and the exchange becomes binding.
        </p>
        
        <div className="space-y-4 mb-6">
          <Checkbox
            label="I agree to the exchange terms and conditions"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e?.target?.checked)}
          />
          
          <Checkbox
            label="I understand the risks and responsibilities involved"
            checked={riskAccepted}
            onChange={(e) => setRiskAccepted(e?.target?.checked)}
          />
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => setShowCommitDialog(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleCommit}
            disabled={!termsAccepted || !riskAccepted}
            className="flex-1"
          >
            Commit to Exchange
          </Button>
        </div>
      </div>
    </div>
  );

  const CancelDialog = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-md w-full p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
            <Icon name="XCircle" size={20} color="var(--color-destructive)" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Cancel Exchange</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6">
          Are you sure you want to cancel this exchange? This action cannot be undone and 
          may affect your reputation score.
        </p>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => setShowCancelDialog(false)}
            className="flex-1"
          >
            Keep Exchange
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancel}
            className="flex-1"
          >
            Cancel Exchange
          </Button>
        </div>
      </div>
    </div>
  );

  if (bothCommitted && isRevealed) {
    return (
      <div className="bg-success/5 border border-success/20 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
            <Icon name="CheckCircle" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-success">Exchange Active</h3>
            <p className="text-sm text-muted-foreground">
              Both parties have committed. Contact details are now visible.
            </p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="success"
            iconName="MessageSquare"
            iconPosition="left"
            className="flex-1"
          >
            Contact Partner
          </Button>
          <Button
            variant="outline"
            iconName="CheckCircle"
            iconPosition="left"
            className="flex-1"
          >
            Mark as Complete
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Commitment Status</h3>
          <p className="text-sm text-muted-foreground">
            Both parties must commit before exchange details are revealed
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-semibold text-foreground">
            {(isCurrentUserCommitted ? 1 : 0) + (isPartnerCommitted ? 1 : 0)}/2
          </div>
          <div className="text-xs text-muted-foreground">Committed</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={`p-4 rounded-lg border ${
          isCurrentUserCommitted 
            ? 'bg-success/5 border-success/20' :'bg-muted/50 border-border'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            <Icon 
              name={isCurrentUserCommitted ? 'CheckCircle' : 'Clock'} 
              size={16} 
              color={isCurrentUserCommitted ? 'var(--color-success)' : 'var(--color-muted-foreground)'}
            />
            <span className="text-sm font-medium text-foreground">You</span>
          </div>
          <div className={`text-xs ${
            isCurrentUserCommitted ? 'text-success' : 'text-muted-foreground'
          }`}>
            {isCurrentUserCommitted ? 'Committed' : 'Pending'}
          </div>
        </div>
        
        <div className={`p-4 rounded-lg border ${
          isPartnerCommitted 
            ? 'bg-success/5 border-success/20' :'bg-muted/50 border-border'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            <Icon 
              name={isPartnerCommitted ? 'CheckCircle' : 'Clock'} 
              size={16} 
              color={isPartnerCommitted ? 'var(--color-success)' : 'var(--color-muted-foreground)'}
            />
            <span className="text-sm font-medium text-foreground">Partner</span>
          </div>
          <div className={`text-xs ${
            isPartnerCommitted ? 'text-success' : 'text-muted-foreground'
          }`}>
            {isPartnerCommitted ? 'Committed' : 'Pending'}
          </div>
        </div>
      </div>
      
      {!isCurrentUserCommitted && (
        <div className="flex space-x-3">
          <Button
            variant="default"
            iconName="Shield"
            iconPosition="left"
            onClick={() => setShowCommitDialog(true)}
            className="flex-1"
          >
            Commit to Exchange
          </Button>
          <Button
            variant="destructive"
            iconName="X"
            iconPosition="left"
            onClick={() => setShowCancelDialog(true)}
          >
            Cancel
          </Button>
        </div>
      )}
      
      {isCurrentUserCommitted && !isPartnerCommitted && (
        <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} color="var(--color-warning)" />
            <span className="text-sm font-medium text-warning">Waiting for Partner</span>
          </div>
          <p className="text-xs text-muted-foreground">
            You've committed to this exchange. Waiting for your partner to commit.
          </p>
        </div>
      )}
      
      {showCommitDialog && <CommitDialog />}
      {showCancelDialog && <CancelDialog />}
    </div>
  );
};

export default CommitmentPanel;