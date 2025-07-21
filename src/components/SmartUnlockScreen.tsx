import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Smartphone, Clock, MapPin } from 'lucide-react';

interface SmartUnlockScreenProps {
  onBack: () => void;
  onUnlock: () => void;
  selectedTime: string;
  selectedDate: string;
}

const SmartUnlockScreen = ({ onBack, onUnlock, selectedTime, selectedDate }: SmartUnlockScreenProps) => {
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleUnlock = async () => {
    setIsUnlocking(true);
    // Simulate unlock process
    setTimeout(() => {
      setIsUnlocking(false);
      onUnlock();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-header font-bold text-foreground">Your Pod</h1>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="font-body">Pod #A1</span>
            </div>
          </div>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Booking Info */}
        <Card className="gym-card-available p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gym-green" />
              <div>
                <h3 className="font-header font-semibold text-foreground">{selectedTime}</h3>
                <p className="text-sm text-muted-foreground font-body">{selectedDate}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-header font-semibold text-gym-green">Active</p>
              <p className="text-xs text-muted-foreground font-body">60 min remaining</p>
            </div>
          </div>
        </Card>

        {/* Unlock Instructions */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-header font-bold text-foreground">
            Ready to Elevate Yourself?
          </h2>
          <p className="text-muted-foreground font-body">
            Your private pod is ready. Tap to unlock and begin your session.
          </p>
        </div>

        {/* Unlock Button */}
        <div className="flex justify-center py-8">
          <div className="relative">
            <Button
              onClick={handleUnlock}
              disabled={isUnlocking}
              className={`w-48 h-48 rounded-full text-xl font-header font-bold unlock-button ${
                !isUnlocking ? 'unlock-button-glow' : ''
              }`}
            >
              {isUnlocking ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-sm">Unlocking...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Smartphone className="w-8 h-8" />
                  <span>Unlock Pod</span>
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Instructions */}
        <Card className="gym-card p-4">
          <h3 className="font-header font-semibold text-foreground mb-3">Session Guidelines</h3>
          <div className="space-y-2 text-sm text-muted-foreground font-body">
            <p>• Your pod is sanitized and ready</p>
            <p>• All equipment is calibrated for your profile</p>
            <p>• Session will auto-end in 60 minutes</p>
            <p>• Emergency button available inside</p>
          </div>
        </Card>

        {/* Support */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground font-body">
            Need help? Call +91 98765 43210
          </p>
        </div>
      </div>
    </div>
  );
};

export { SmartUnlockScreen };