import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dumbbell, Shield, Zap } from 'lucide-react';
import heroPodImage from '@/assets/hero-pod.jpg';

const motivationalQuotes = [
  "Elevate Yourself",
  "Your private sanctuary awaits",
  "Where focus meets fitness",
  "Premium. Private. Powerful.",
];

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "100% Private",
      description: "Your pod, your rules"
    },
    {
      icon: Zap,
      title: "Smart Tech",
      description: "AI-powered workouts"
    },
    {
      icon: Dumbbell,
      title: "Premium Equipment",
      description: "Professional grade"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={heroPodImage} 
          alt="Private GymPod" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        {/* Logo/Brand */}
        <div className="absolute top-8 left-6 right-6">
          <div className="text-center">
            <h1 className="text-2xl font-header font-bold text-foreground mb-1">
              GymFitPod
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
              India's First PRIVATE GYMPOD
            </p>
          </div>
        </div>
        
        {/* Motivational Quote */}
        <div className="absolute bottom-8 left-6 right-6">
          <div className="text-center">
            <h2 className="text-3xl font-header font-bold text-foreground mb-2 fade-in-up">
              {motivationalQuotes[currentQuote]}
            </h2>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-8 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <Card key={index} className="gym-card p-4 text-center">
              <feature.icon className="w-6 h-6 text-gym-green mx-auto mb-2" />
              <h3 className="text-sm font-header font-semibold text-foreground mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-muted-foreground font-body">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Button 
            onClick={onGetStarted}
            className="w-full h-14 text-lg font-header font-semibold unlock-button"
          >
            Private
          </Button>
        </div>

        {/* Footer Text */}
        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground font-body">
            Premium fitness pods across India
          </p>
        </div>
      </div>
    </div>
  );
};

export { WelcomeScreen };