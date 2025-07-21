import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { AuthScreen } from '@/components/AuthScreen';
import { BookingScreen } from '@/components/BookingScreen';
import { WorkoutTracker } from '@/components/WorkoutTracker';
import { ProgressDashboard } from '@/components/ProgressDashboard';

type Screen = 'welcome' | 'auth' | 'booking' | 'workout' | 'progress';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

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
          <BookingScreen
            onBack={() => setCurrentScreen('auth')}
            onBookPod={() => setCurrentScreen('workout')}
          />
        );
      
      case 'workout':
        return (
          <WorkoutTracker
            onBack={() => setCurrentScreen('booking')}
            onComplete={() => setCurrentScreen('progress')}
          />
        );
      
      case 'progress':
        return (
          <ProgressDashboard
            onBack={() => setCurrentScreen('booking')}
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
