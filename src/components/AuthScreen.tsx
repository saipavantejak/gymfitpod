import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

interface AuthScreenProps {
  onBack: () => void;
  onAuth: () => void;
}

const AuthScreen = ({ onBack, onAuth }: AuthScreenProps) => {
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateMobile = (value: string) => {
    if (value.length > 0 && value.length !== 10) {
      setMobileError('Mobile number must be exactly 10 digits');
    } else {
      setMobileError('');
    }
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.length > 0 && !emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobile(value);
    validateMobile(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const canProceed = mobile.length === 10 && email.length > 0 && !mobileError && !emailError;

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
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-12 space-y-12">
        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-header font-bold text-foreground">
            Elevate Yourself
          </h1>
          <p className="text-lg font-body text-muted-foreground">
            Private access requires verification
          </p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Mobile Input */}
          <div className="space-y-3">
            <Label className="text-base font-header font-bold text-foreground">
              Mobile Number
            </Label>
            <Input
              type="tel"
              value={mobile}
              onChange={handleMobileChange}
              placeholder="10-digit mobile number"
              className={`elite-input h-14 text-lg ${mobileError ? 'elite-input-error' : ''}`}
            />
            {mobileError && (
              <p className="text-destructive text-sm font-body">{mobileError}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="space-y-3">
            <Label className="text-base font-header font-bold text-foreground">
              Email Address
            </Label>
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="your@email.com"
              className={`elite-input h-14 text-lg ${emailError ? 'elite-input-error' : ''}`}
            />
            {emailError && (
              <p className="text-destructive text-sm font-body">{emailError}</p>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-8">
          <Button 
            onClick={onAuth}
            disabled={!canProceed}
            className="w-full h-16 text-xl elite-button disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Private
          </Button>
        </div>
      </div>
    </div>
  );
};

export { AuthScreen };