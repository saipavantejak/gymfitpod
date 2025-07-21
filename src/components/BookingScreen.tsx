import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, MapPin, Clock, Zap, Users } from 'lucide-react';
import bookingInterface from '@/assets/booking-interface.jpg';

interface BookingScreenProps {
  onBack: () => void;
  onBookPod: () => void;
}

const timeSlots = [
  { time: '06:00', available: true, duration: '60 min' },
  { time: '07:00', available: false, duration: '60 min' },
  { time: '08:00', available: true, duration: '60 min' },
  { time: '09:00', available: true, duration: '60 min' },
  { time: '10:00', available: false, duration: '60 min' },
  { time: '11:00', available: true, duration: '60 min' },
  { time: '12:00', available: true, duration: '60 min' },
  { time: '13:00', available: true, duration: '60 min' },
  { time: '14:00', available: false, duration: '60 min' },
  { time: '15:00', available: true, duration: '60 min' },
  { time: '16:00', available: true, duration: '60 min' },
  { time: '17:00', available: false, duration: '60 min' },
  { time: '18:00', available: true, duration: '60 min' },
  { time: '19:00', available: true, duration: '60 min' },
  { time: '20:00', available: false, duration: '60 min' },
  { time: '21:00', available: true, duration: '60 min' },
];

const podFeatures = [
  { icon: Zap, label: 'Smart Equipment', description: 'AI-powered resistance training' },
  { icon: Users, label: 'Private Space', description: 'Complete privacy guaranteed' },
  { icon: Clock, label: 'Flexible Duration', description: '30-120 minute sessions' },
];

export function BookingScreen({ onBack, onBookPod }: BookingScreenProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('Today');

  const handleSlotSelect = (time: string) => {
    setSelectedSlot(time);
  };

  const handleBooking = () => {
    if (selectedSlot) {
      onBookPod();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-muted-foreground">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="text-center">
          <h1 className="text-xl font-semibold">Book Your Pod</h1>
          <p className="text-sm text-muted-foreground">Select your preferred time</p>
        </div>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 premium-scrollbar overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Location Info */}
          <Card className="premium-card p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center pulse-glow">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">GymFitPod Koramangala</h3>
                <p className="text-sm text-muted-foreground">5th Block, Bangalore</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-primary">2.3 km</p>
                <p className="text-xs text-muted-foreground">8 min drive</p>
              </div>
            </div>
          </Card>

          {/* Date Selection */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Select Date</h3>
            <div className="flex space-x-3">
              {['Today', 'Tomorrow', 'Day After'].map((date) => (
                <Button
                  key={date}
                  variant={selectedDate === date ? "default" : "outline"}
                  onClick={() => setSelectedDate(date)}
                  className={selectedDate === date ? "glow-button" : "bg-secondary border-border"}
                >
                  {date}
                </Button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Available Time Slots</h3>
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.time}
                  variant="outline"
                  disabled={!slot.available}
                  onClick={() => handleSlotSelect(slot.time)}
                  className={`h-16 flex flex-col ${
                    selectedSlot === slot.time 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : slot.available 
                        ? 'bg-secondary border-border hover:bg-accent' 
                        : 'opacity-50 bg-muted border-muted'
                  }`}
                >
                  <span className="font-semibold">{slot.time}</span>
                  <span className="text-xs opacity-75">{slot.duration}</span>
                  {!slot.available && (
                    <span className="text-xs text-destructive">Booked</span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Pod Features */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Pod Features</h3>
            <div className="grid grid-cols-1 gap-3">
              {podFeatures.map((feature, index) => (
                <div key={index} className="glass-surface p-4 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{feature.label}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Interface Visual */}
          <div className="rounded-lg overflow-hidden">
            <img 
              src={bookingInterface} 
              alt="Pod Booking Interface" 
              className="w-full h-32 object-cover opacity-80"
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      {selectedSlot && (
        <div className="p-6 border-t border-border space-y-4 slide-in-right">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Selected Slot</p>
              <p className="font-semibold">{selectedDate} at {selectedSlot}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Session Fee</p>
              <p className="font-semibold text-primary">₹299</p>
            </div>
          </div>
          <Button 
            onClick={handleBooking}
            className="w-full h-14 glow-button text-lg font-semibold"
          >
            Confirm Booking
          </Button>
        </div>
      )}
    </div>
  );
}