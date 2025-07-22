import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';

interface BookingScreenProps {
  onBack: () => void;
  onBookPod: () => void;
}

const timeSlots = [
  { time: '6:00 AM', available: true },
  { time: '7:00 AM', available: false },
  { time: '8:00 AM', available: true },
  { time: '9:00 AM', available: true },
  { time: '10:00 AM', available: false },
  { time: '11:00 AM', available: true },
  { time: '12:00 PM', available: true },
  { time: '1:00 PM', available: false },
  { time: '2:00 PM', available: true },
  { time: '3:00 PM', available: true },
  { time: '4:00 PM', available: true },
  { time: '5:00 PM', available: false },
  { time: '6:00 PM', available: true },
  { time: '7:00 PM', available: true },
  { time: '8:00 PM', available: true },
  { time: '9:00 PM', available: false },
];

const BookingScreen = ({ onBack, onBookPod }: BookingScreenProps) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate] = useState('Today, Dec 15');

  const handleSlotSelect = (time: string) => {
    setSelectedSlot(time);
  };

  const handleBooking = () => {
    if (selectedSlot) {
      onBookPod();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="flex items-center p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-10 w-10 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-header font-bold text-foreground">Reserve Pod</h1>
            <p className="text-sm font-body text-muted-foreground">Koramangala, Bangalore</p>
          </div>
          <div className="w-10" />
        </div>
      </div>

      <div className="px-8 py-8 space-y-8">
        {/* Date Section */}
        <div className="elite-card p-6">
          <div className="flex items-center gap-4">
            <Calendar className="h-6 w-6 text-gym-green" />
            <div>
              <h3 className="text-lg font-header font-bold text-foreground">{selectedDate}</h3>
              <p className="text-sm font-body text-muted-foreground">Available slots</p>
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="text-xl font-header font-bold text-foreground mb-6">Choose Time</h3>
          <div className="grid grid-cols-2 gap-4">
            {timeSlots.map((slot) => (
              <div
                key={slot.time}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  slot.available
                    ? selectedSlot === slot.time
                      ? 'elite-card-glow border-2'
                      : 'elite-card hover:elite-card-glow'
                    : 'elite-card-disabled'
                }`}
                onClick={() => slot.available && handleSlotSelect(slot.time)}
              >
                <div className="text-center">
                  <p className="text-lg font-header font-bold text-foreground">{slot.time}</p>
                  <p className="text-sm font-body text-muted-foreground">30 min</p>
                  {slot.available && selectedSlot === slot.time && (
                    <div className="w-3 h-3 bg-gym-green rounded-full mx-auto mt-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Confirmation */}
        {selectedSlot && (
          <div className="elite-card-glow p-6 fade-in-up">
            <div className="text-center space-y-4">
              <h4 className="text-lg font-header font-bold text-foreground">Pod Reserved</h4>
              <p className="text-sm font-body text-muted-foreground">
                {selectedDate} at {selectedSlot}
              </p>
              <p className="text-2xl font-header font-bold text-gym-green">₹199</p>
            </div>
            
            <Button 
              onClick={handleBooking}
              className="w-full h-16 text-xl elite-button mt-6"
            >
              Private
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export { BookingScreen };