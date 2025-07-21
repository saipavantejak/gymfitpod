import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, Pause, RotateCcw, Video, Heart, Zap, Target } from 'lucide-react';

interface WorkoutTrackerProps {
  onBack: () => void;
  onComplete: () => void;
}

export function WorkoutTracker({ onBack, onComplete }: WorkoutTrackerProps) {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [heartRate, setHeartRate] = useState(128);
  const [calories, setCalories] = useState(0);

  const exercises = [
    { name: 'Warm-up', duration: 300, sets: 1 },
    { name: 'Chest Press', duration: 180, sets: 3 },
    { name: 'Lat Pulldown', duration: 180, sets: 3 },
    { name: 'Shoulder Press', duration: 180, sets: 3 },
    { name: 'Leg Press', duration: 240, sets: 3 },
    { name: 'Cool Down', duration: 300, sets: 1 },
  ];

  const totalDuration = exercises.reduce((acc, ex) => acc + ex.duration, 0);
  const progress = (time / totalDuration) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTime(time => time + 1);
        setCalories(cal => cal + 0.1);
        setHeartRate(hr => hr + Math.random() * 4 - 2);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    let exerciseTime = 0;
    let currentIndex = 0;
    
    for (let i = 0; i < exercises.length; i++) {
      if (time <= exerciseTime + exercises[i].duration) {
        currentIndex = i;
        break;
      }
      exerciseTime += exercises[i].duration;
    }
    
    setCurrentExercise(currentIndex);
    
    if (time >= totalDuration) {
      setIsActive(false);
      onComplete();
    }
  }, [time, totalDuration, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setCalories(0);
    setCurrentExercise(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-muted-foreground">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="text-center">
          <h1 className="text-xl font-semibold">Workout Session</h1>
          <p className="text-sm text-muted-foreground">Pod A1 • Private</p>
        </div>
        <Button variant="ghost" size="icon" className="text-primary">
          <Video className="w-6 h-6" />
        </Button>
      </div>

      {/* Main Timer */}
      <div className="p-6">
        <Card className="premium-card p-8 text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Session Timer
            </h2>
            <div className="text-6xl font-mono font-bold gradient-text pulse-glow">
              {formatTime(time)}
            </div>
          </div>
          
          <Progress value={progress} className="h-2 bg-muted" />
          
          <div className="flex justify-center space-x-4">
            <Button
              size="lg"
              onClick={handlePlayPause}
              className={isActive ? "bg-orange-500 hover:bg-orange-600" : "glow-button"}
            >
              {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            <Button variant="outline" size="lg" onClick={handleReset}>
              <RotateCcw className="w-6 h-6" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Current Exercise */}
      <div className="px-6 pb-6">
        <Card className="premium-card p-6">
          <div className="text-center space-y-3">
            <h3 className="text-lg font-semibold">Current Exercise</h3>
            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-primary">
                {exercises[currentExercise]?.name}
              </h4>
              <p className="text-muted-foreground">
                Sets: {exercises[currentExercise]?.sets} • 
                Duration: {Math.floor(exercises[currentExercise]?.duration / 60)}m
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-3 gap-4">
          <Card className="glass-surface p-4 text-center">
            <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{Math.round(heartRate)}</p>
            <p className="text-xs text-muted-foreground">BPM</p>
          </Card>
          
          <Card className="glass-surface p-4 text-center">
            <Zap className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{Math.round(calories)}</p>
            <p className="text-xs text-muted-foreground">Calories</p>
          </Card>
          
          <Card className="glass-surface p-4 text-center">
            <Target className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{currentExercise + 1}/{exercises.length}</p>
            <p className="text-xs text-muted-foreground">Exercise</p>
          </Card>
        </div>
      </div>

      {/* Exercise List */}
      <div className="flex-1 px-6 pb-6">
        <Card className="premium-card p-4">
          <h3 className="text-lg font-semibold mb-4">Workout Plan</h3>
          <div className="space-y-3 premium-scrollbar max-h-64 overflow-y-auto">
            {exercises.map((exercise, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  index === currentExercise
                    ? 'bg-primary/20 border border-primary/30'
                    : index < currentExercise
                    ? 'bg-green-500/20 border border-green-500/30'
                    : 'bg-secondary/50'
                }`}
              >
                <div>
                  <h4 className="font-medium">{exercise.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {exercise.sets} sets • {Math.floor(exercise.duration / 60)}m
                  </p>
                </div>
                <div className="text-right">
                  {index < currentExercise ? (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  ) : index === currentExercise ? (
                    <div className="w-3 h-3 bg-primary rounded-full pulse-glow" />
                  ) : (
                    <div className="w-3 h-3 bg-muted rounded-full" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Mirror Cam Placeholder */}
      <div className="px-6 pb-6">
        <Card className="premium-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Form Check</h3>
            <Button variant="outline" size="sm">
              <Video className="w-4 h-4 mr-2" />
              Record
            </Button>
          </div>
          <div className="h-32 bg-muted/50 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Mirror Camera Feed</p>
          </div>
        </Card>
      </div>
    </div>
  );
}