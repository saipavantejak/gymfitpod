import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Fingerprint, Smartphone, Eye, EyeOff } from 'lucide-react';

interface AuthScreenProps {
  onBack: () => void;
  onAuth: () => void;
}

export function AuthScreen({ onBack, onAuth }: AuthScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (phoneNumber.length === 10) {
      setIsOtpSent(true);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      onAuth();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-muted-foreground">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-semibold">Access Your Pod</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <Card className="premium-card p-6 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
              <Fingerprint className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Secure Access</h2>
            <p className="text-muted-foreground">Your fitness journey starts with privacy and security</p>
          </div>

          <Tabs defaultValue="phone" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50">
              <TabsTrigger value="phone" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Smartphone className="w-4 h-4 mr-2" />
                Phone
              </TabsTrigger>
              <TabsTrigger value="email" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Email
              </TabsTrigger>
            </TabsList>

            <TabsContent value="phone" className="space-y-4">
              {!isOtpSent ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone Number</label>
                    <div className="relative">
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="bg-input border-border text-foreground pl-12"
                        maxLength={10}
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        +91
                      </span>
                    </div>
                  </div>
                  <Button 
                    onClick={handleSendOtp}
                    disabled={phoneNumber.length !== 10}
                    className="w-full glow-button h-12"
                  >
                    Send OTP
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Verification Code</label>
                    <Input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="bg-input border-border text-foreground text-center text-lg tracking-widest"
                      maxLength={6}
                    />
                    <p className="text-xs text-muted-foreground text-center">
                      Code sent to +91 {phoneNumber}
                    </p>
                  </div>
                  <Button 
                    onClick={handleVerifyOtp}
                    disabled={otp.length !== 6}
                    className="w-full glow-button h-12"
                  >
                    Verify & Continue
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setIsOtpSent(false)}
                    className="w-full text-primary"
                  >
                    Change Phone Number
                  </Button>
                </>
              )}
            </TabsContent>

            <TabsContent value="email" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-input border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="bg-input border-border text-foreground pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <Button onClick={onAuth} className="w-full glow-button h-12">
                  Sign In
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Biometric Option */}
          <div className="space-y-4 pt-4 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">Or use biometric authentication</p>
            <Button 
              variant="outline" 
              className="w-full h-12 border-primary/50 bg-primary/10 hover:bg-primary/20"
              onClick={onAuth}
            >
              <Fingerprint className="w-5 h-5 mr-2 text-primary" />
              Use Fingerprint
            </Button>
          </div>
        </Card>

        {/* Terms */}
        <p className="text-xs text-muted-foreground text-center mt-6 px-4">
          By continuing, you agree to our Terms of Service and Privacy Policy. 
          Your data is secured with enterprise-grade encryption.
        </p>
      </div>
    </div>
  );
}