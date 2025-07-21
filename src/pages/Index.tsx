import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { AuthScreen } from '@/components/AuthScreen';
import { BookingScreen } from '@/components/BookingScreen';
import { BookingConfirmationPopup } from '@/components/BookingConfirmationPopup';
import { SmartUnlockScreen } from '@/components/SmartUnlockScreen';
import { WorkoutTracker } from '@/components/WorkoutTracker';
import { ProgressDashboard } from '@/components/ProgressDashboard';

type Screen = 'welcome' | 'auth' | 'booking' | 'unlock' | 'workout' | 'progress';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({ date: '', time: '' });

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={() => setCurrentScreen('auth')} />;
      
      case 'auth':
        return (
          <AuthScreen
            onBack={() => setCurrentScreen('welcome')}
            onAuth={() => setCurrentScreen('booking')}
          />
        );
      
      case 'booking':
        return (
          <>
            <BookingScreen
              onBack={() => setCurrentScreen('auth')}
              onBookPod={() => {
                setBookingDetails({ date: 'Today, Dec 15', time: '8:00 AM' });
                setShowBookingConfirmation(true);
              }}
            />
            <BookingConfirmationPopup
              isOpen={showBookingConfirmation}
              onClose={() => {
                setShowBookingConfirmation(false);
                setCurrentScreen('unlock');
              }}
              selectedDate={bookingDetails.date}
              selectedTime={bookingDetails.time}
            />
          </>
        );
      
      case 'unlock':
        return (
          <SmartUnlockScreen
            onBack={() => setCurrentScreen('booking')}
            onUnlock={() => setCurrentScreen('workout')}
            selectedDate={bookingDetails.date}
            selectedTime={bookingDetails.time}
          />
        );
      
      case 'workout':
        return (
          <WorkoutTracker
            onBack={() => setCurrentScreen('unlock')}
            onComplete={() => setCurrentScreen('progress')}
          />
        );
      
      case 'progress':
        return (
          <ProgressDashboard
            onBack={() => setCurrentScreen('unlock')}
          />
        );
      
      default:
        return <WelcomeScreen onGetStarted={() => setCurrentScreen('auth')} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-background relative">
      {renderScreen()}
    </div>
  );
};

export default Index;
