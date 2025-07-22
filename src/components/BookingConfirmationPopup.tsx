import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface BookingConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: string;
  selectedDate: string;
}

const motivationalQuotes = [
  "Discipline = Freedom. Pod reserved.",
  "You just chose discipline. See you in the pod.",
  "Excellence chosen. Sanctuary ready.",
  "Your commitment to power begins now.",
];

const BookingConfirmationPopup = ({ 
  isOpen, 
  onClose, 
  selectedTime, 
  selectedDate 
}: BookingConfirmationPopupProps) => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentQuote(Math.floor(Math.random() * motivationalQuotes.length));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-sm elite-card-glow p-8 text-center fade-in-up rounded-2xl">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-gym-green mx-auto mb-4" />
          <h2 className="text-xl font-header font-bold text-foreground mb-2">
            Pod Reserved
          </h2>
          <p className="text-sm text-muted-foreground font-body">
            {selectedDate} at {selectedTime}
          </p>
        </div>

        <div className="mb-6 p-4 bg-gym-green/5 rounded-lg border border-gym-green/20">
          <p className="text-lg font-header font-semibold text-foreground leading-relaxed">
            "{motivationalQuotes[currentQuote]}"
          </p>
        </div>

        <div className="space-y-3">
          <div className="text-xs text-muted-foreground font-body">
            <p>Pod #A1 • Koramangala, Bangalore</p>
            <p>Arrive 5 minutes early for setup</p>
          </div>
          
          <Button 
            onClick={onClose}
            className="w-full h-12 font-header font-semibold unlock-button"
          >
            Ready
          </Button>
        </div>
      </div>
    </div>
  );
};

export { BookingConfirmationPopup };