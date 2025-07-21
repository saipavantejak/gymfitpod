import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Lock, Target } from 'lucide-react';
import heroPod from '@/assets/hero-pod.jpg';

const motivationalQuotes = [
  "Your only limit is your mind.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Success starts with self-discipline.",
  "The body achieves what the mind believes."
];

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Hero Image Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroPod} 
          alt="GymFitPod Interior" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <div className="flex justify-center pt-16 pb-8">
          <div className="text-center fade-in-up">
            <h1 className="text-4xl font-bold gradient-text mb-2">GymFitPod</h1>
            <p className="text-muted-foreground text-sm tracking-wider">INDIA'S FIRST SMART FITNESS POD</p>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col justify-center px-6 space-y-8">
          {/* Motivational Quote */}
          <div className="text-center space-y-4 fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="h-20 flex items-center justify-center">
              <p className="text-2xl font-medium text-foreground leading-tight max-w-sm">
                "{motivationalQuotes[currentQuote]}"
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 slide-in-right" style={{ animationDelay: '0.4s' }}>
            <div className="glass-surface p-4 text-center">
              <Lock className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Private</p>
            </div>
            <div className="glass-surface p-4 text-center">
              <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Smart</p>
            </div>
            <div className="glass-surface p-4 text-center">
              <Target className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Elite</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-6 pb-8 space-y-4 fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Button 
            onClick={onGetStarted}
            className="w-full h-14 glow-button text-lg font-semibold"
          >
            Enter Your Sanctuary
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <p className="text-center text-xs text-muted-foreground">
            Transform your body. Elevate your mind.
          </p>
        </div>
      </div>

      {/* Ambient glow effects */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
    </div>
  );
}