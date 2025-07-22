import { Button } from '@/components/ui/button';
import heroPodImage from '@/assets/hero-pod.jpg';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Full Screen Pod Image */}
      <div className="absolute inset-0">
        <img 
          src={heroPodImage} 
          alt="Private GymPod" 
          className="w-full h-full object-cover opacity-60"
        />
        {/* Elite Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <div className="pt-16 px-8 text-center">
          <h1 className="text-4xl font-header font-bold text-foreground mb-2 tracking-tight">
            GymFitPod
          </h1>
        </div>
        
        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col justify-center items-center px-8 text-center">
          <div className="space-y-6 fade-in-up">
            {/* Primary Headline */}
            <h2 className="text-3xl font-header font-bold text-foreground leading-tight">
              India's First<br />
              <span className="text-gym-green">PRIVATE GYMPOD</span>
            </h2>
            
            {/* Subheadline */}
            <p className="text-xl font-body text-muted-foreground font-medium tracking-wide">
              Privacy. Progress. Power.
            </p>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="pb-16 px-8">
          <Button 
            onClick={onGetStarted}
            className="w-full h-16 text-xl elite-button elite-button-pulse"
          >
            Private
          </Button>
        </div>
      </div>
    </div>
  );
};

export { WelcomeScreen };