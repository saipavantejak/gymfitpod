import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft, Trophy, Target, TrendingUp, Calendar as CalendarIcon, Award, Flame } from 'lucide-react';

interface ProgressDashboardProps {
  onBack: () => void;
}

export function ProgressDashboard({ onBack }: ProgressDashboardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentStreak, setCurrentStreak] = useState(12);
  const [totalWorkouts, setTotalWorkouts] = useState(47);
  const [monthlyGoal, setMonthlyGoal] = useState(20);
  const [completedThisMonth, setCompletedThisMonth] = useState(15);

  const achievements = [
    { icon: Flame, title: 'Consistency Master', description: '7-day streak', unlocked: true },
    { icon: Trophy, title: 'Monthly Champion', description: '20 workouts/month', unlocked: false },
    { icon: Target, title: 'Perfect Form', description: '95% accuracy', unlocked: true },
    { icon: Award, title: 'Early Bird', description: '6 AM warrior', unlocked: true },
  ];

  const weeklyData = [
    { day: 'Mon', completed: true, calories: 320 },
    { day: 'Tue', completed: true, calories: 285 },
    { day: 'Wed', completed: false, calories: 0 },
    { day: 'Thu', completed: true, calories: 340 },
    { day: 'Fri', completed: true, calories: 310 },
    { day: 'Sat', completed: false, calories: 0 },
    { day: 'Sun', completed: true, calories: 275 },
  ];

  const progressPercentage = (completedThisMonth / monthlyGoal) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-muted-foreground">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="text-center">
          <h1 className="text-xl font-semibold">Progress</h1>
          <p className="text-sm text-muted-foreground">Your fitness journey</p>
        </div>
        <Button variant="ghost" size="icon" className="text-primary">
          <CalendarIcon className="w-6 h-6" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 premium-scrollbar overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="premium-card p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 pulse-glow">
                <Flame className="w-6 h-6 text-primary" />
              </div>
              <p className="text-3xl font-bold gradient-text">{currentStreak}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </Card>
            
            <Card className="premium-card p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-blue-400">{totalWorkouts}</p>
              <p className="text-sm text-muted-foreground">Total Sessions</p>
            </Card>
          </div>

          {/* Monthly Progress */}
          <Card className="premium-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Monthly Goal</h3>
              <span className="text-sm text-muted-foreground">{completedThisMonth}/{monthlyGoal}</span>
            </div>
            <Progress value={progressPercentage} className="h-3 mb-3" />
            <p className="text-sm text-muted-foreground">
              {monthlyGoal - completedThisMonth} sessions remaining to reach your goal
            </p>
          </Card>

          {/* Weekly Activity */}
          <Card className="premium-card p-6">
            <h3 className="text-lg font-semibold mb-4">This Week</h3>
            <div className="grid grid-cols-7 gap-2">
              {weeklyData.map((day, index) => (
                <div key={index} className="text-center space-y-2">
                  <p className="text-xs text-muted-foreground">{day.day}</p>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                      day.completed
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {day.completed ? '✓' : '○'}
                  </div>
                  {day.completed && (
                    <p className="text-xs text-primary font-medium">{day.calories}</p>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card className="premium-card p-6">
            <h3 className="text-lg font-semibold mb-4">Achievements</h3>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border text-center space-y-2 ${
                    achievement.unlocked
                      ? 'bg-primary/10 border-primary/30'
                      : 'bg-muted/50 border-muted opacity-60'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto ${
                      achievement.unlocked ? 'bg-primary/20' : 'bg-muted'
                    }`}
                  >
                    <achievement.icon
                      className={`w-5 h-5 ${
                        achievement.unlocked ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    />
                  </div>
                  <h4 className="font-medium text-sm">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Transformation Calendar */}
          <Card className="premium-card p-6">
            <h3 className="text-lg font-semibold mb-4">Workout Calendar</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border-0"
              classNames={{
                months: "space-y-4",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground",
                day_range_end: "day-range-end",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
              }}
            />
          </Card>

          {/* Motivation Section */}
          <Card className="premium-card p-6 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto pulse-glow">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold gradient-text">Keep Going!</h3>
                <p className="text-muted-foreground mt-2">
                  You're making incredible progress. Every session brings you closer to your goals.
                </p>
              </div>
              <Button className="glow-button">
                Book Next Session
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}