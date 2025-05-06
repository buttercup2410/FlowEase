import { useMemo } from "react";
import { format, addDays, eachDayOfInterval, startOfWeek, getDay, startOfMonth, endOfMonth, isToday } from "date-fns";
import { useCycleData } from "@/contexts/CycleDataContext";

export default function CycleCalendar() {
  const { cycleData, getPhaseForDate } = useCycleData();

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  // Generate calendar days for the entire month
  const calendarDays = useMemo(() => {
    if (!cycleData) return [];

    const startDate = new Date(cycleData.startDate);
    const endDate = addDays(startDate, cycleData.cycleLength);
    
    // Get the start and end of the current month
    const monthStart = startOfMonth(startDate);
    const monthEnd = endOfMonth(startDate);
    
    // Get the start of the week for the first day of the month
    const weekStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    
    // Generate all days in the interval including padding for complete weeks
    const interval = eachDayOfInterval({
      start: weekStart,
      end: addDays(monthEnd, 6 - getDay(monthEnd)), // Add padding at the end to complete the week
    });
    
    return interval.map(date => {
      const isInCycle = date >= startDate && date < endDate;
      return {
        date,
        dayOfMonth: date.getDate(),
        isToday: isToday(date),
        isInCycle,
        phase: isInCycle ? getPhaseForDate(date) : "none",
        currentMonth: date.getMonth() === startDate.getMonth(),
      };
    });
  }, [cycleData, getPhaseForDate]);

  // Get color based on phase and flow type
  const getPhaseColor = (phase: string, flowType: string, isInCycle: boolean): string => {
    if (!isInCycle) return "bg-transparent text-muted-foreground dark:text-muted-foreground";
    
    switch(flowType) {
      case "heavy":
        return "bg-primary text-primary-foreground";
      case "moderate":
        return "bg-primary/80 text-primary-foreground";
      case "light":
        return "bg-primary/40 text-primary-foreground";
      case "variable":
        return "bg-primary/60 text-primary-foreground";
      default:
        return "bg-transparent text-muted-foreground dark:text-muted-foreground";
    }
  };

  // Get title based on phase and flow type
  const getPhaseTitle = (phase: string, flowType: string, isInCycle: boolean): string => {
    if (!isInCycle) return "";
    return `${flowType.charAt(0).toUpperCase() + flowType.slice(1)} Flow`;
  };

  if (!cycleData) return null;

  return (
    <div>
      <div className="grid grid-cols-7 gap-2">
        {/* Days of week header */}
        {daysOfWeek.map((day, i) => (
          <div key={i} className="text-center text-muted-foreground text-sm font-medium">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map((day, i) => (
          <div 
            key={i} 
            className={`aspect-square rounded-full flex items-center justify-center text-sm ${!day.currentMonth ? 'text-muted-foreground/50' : ''}`}
          >
            <div 
              className={`w-10 h-10 rounded-full ${getPhaseColor(day.phase, cycleData.flowType, day.isInCycle)} flex items-center justify-center ${day.isToday ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-background' : ''}`}
              title={getPhaseTitle(day.phase, cycleData.flowType, day.isInCycle)}
            >
              {day.dayOfMonth}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
