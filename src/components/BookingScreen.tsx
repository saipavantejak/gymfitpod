import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, MapPin, Calendar, Clock, Users, Thermometer, Wifi } from 'lucide-react';

interface BookingScreenProps {
  onBack: () => void;
  onBookPod: () => void;
}

const timeSlots = [
  { time: '6:00 AM', available: true, duration: '60 min' },
  { time: '7:00 AM', available: false, duration: '60 min' },
  { time: '8:00 AM', available: true, duration: '60 min' },
  { time: '9:00 AM', available: true, duration: '60 min' },
  { time: '10:00 AM', available: false, duration: '60 min' },
  { time: '11:00 AM', available: true, duration: '60 min' },
  { time: '12:00 PM', available: true, duration: '60 min' },
  { time: '1:00 PM', available: false, duration: '60 min' },
  { time: '2:00 PM', available: true, duration: '60 min' },
  { time: '3:00 PM', available: true, duration: '60 min' },
  { time: '4:00 PM', available: true, duration: '60 min' },
  { time: '5:00 PM', available: false, duration: '60 min' },
  { time: '6:00 PM', available: true, duration: '60 min' },
  { time: '7:00 PM', available: true, duration: '60 min' },
  { time: '8:00 PM', available: true, duration: '60 min' },
  { time: '9:00 PM', available: false, duration: '60 min' },
];

const podFeatures = [
  { icon: Users, label: 'Private', description: 'Solo workout space' },
  { icon: Thermometer, label: 'Climate', description: 'Controlled environment' },
  { icon: Wifi, label: 'Connected', description: 'Smart equipment' },
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
            <h1 className="text-lg font-header font-bold text-foreground">Book Pod</h1>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="font-body">Koramangala, Bangalore</span>
            </div>
          </div>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Date Selection */}
        <Card className="gym-card p-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gym-green" />
            <div>
              <h3 className="font-header font-semibold text-foreground">{selectedDate}</h3>
              <p className="text-sm text-muted-foreground font-body">Available slots</p>
            </div>
          </div>
        </Card>

        {/* Time Slots */}
        <div>
          <h3 className="text-lg font-header font-bold text-foreground mb-4">Choose Time</h3>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot) => (
              <Card
                key={slot.time}
                className={`p-4 cursor-pointer transition-all duration-300 ${
                  slot.available
                    ? selectedSlot === slot.time
                      ? 'gym-card-available border-gym-green bg-gym-green/10'
                      : 'gym-card-available hover:border-gym-green/40'
                    : 'gym-card opacity-50 cursor-not-allowed'
                }`}
                onClick={() => slot.available && handleSlotSelect(slot.time)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-header font-semibold text-foreground">{slot.time}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span className="font-body">{slot.duration}</span>
                    </div>
                  </div>
                  {slot.available && selectedSlot === slot.time && (
                    <div className="w-2 h-2 bg-gym-green rounded-full" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Pod Features */}
        <div>
          <h3 className="text-lg font-header font-bold text-foreground mb-4">Pod Features</h3>
          <div className="grid grid-cols-3 gap-3">
            {podFeatures.map((feature, index) => (
              <Card key={index} className="gym-card p-3 text-center">
                <feature.icon className="w-5 h-5 text-gym-green mx-auto mb-2" />
                <h4 className="text-sm font-header font-semibold text-foreground mb-1">
                  {feature.label}
                </h4>
                <p className="text-xs text-muted-foreground font-body">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Booking Confirmation */}
        {selectedSlot && (
          <Card className="gym-card-available p-4 fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-header font-semibold text-foreground">Selected Slot</h4>
                <p className="text-sm text-muted-foreground font-body">
                  {selectedDate} at {selectedSlot}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-header font-bold text-gym-green">₹199</p>
                <p className="text-xs text-muted-foreground font-body">60 minutes</p>
              </div>
            </div>
            <Button 
              onClick={handleBooking}
              className="w-full h-12 font-header font-semibold unlock-button"
            >
              Private
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export { BookingScreen };