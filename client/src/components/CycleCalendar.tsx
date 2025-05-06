import { useMemo } from "react";
import { format, addDays, eachDayOfInterval, startOfWeek, getDay } from "date-fns";
import { useCycleData } from "@/contexts/CycleDataContext";

export default function CycleCalendar() {
  const { cycleData, getPhaseForDate } = useCycleData();

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  // Generate calendar days starting from the current cycle start date
  const calendarDays = useMemo(() => {
    if (!cycleData) return [];

    const startDate = new Date(cycleData.startDate);
    const endDate = addDays(startDate, cycleData.cycleLength - 1);
    
    // Get the start of the week for the first day to ensure a complete week view
    const weekStart = startOfWeek(startDate, { weekStartsOn: 0 });
    
    // Calculate the number of days before the start date to include
    const daysBeforeStart = getDay(startDate);
    
    // Generate all days in the interval including padding for complete weeks
    const interval = eachDayOfInterval({
      start: weekStart,
      end: addDays(endDate, 6 - getDay(endDate)), // Add padding at the end to complete the week
    });
    
    return interval.map(date => ({
      date,
      dayOfMonth: date.getDate(),
      isStart: date.toDateString() === startDate.toDateString(),
      phase: getPhaseForDate(date),
      currentMonth: date.getMonth() === startDate.getMonth(),
    }));
  }, [cycleData, getPhaseForDate]);

  // Get color based on phase
  const getPhaseColor = (phase: string): string => {
    switch(phase) {
      case "menstruation":
        return "bg-primary text-white";
      case "follicular":
        return "bg-primary/80 text-white";
      case "ovulation":
        return "bg-primary/60 text-white";
      case "luteal":
        return "bg-primary/40 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  // Get title based on phase
  const getPhaseTitle = (phase: string): string => {
    switch(phase) {
      case "menstruation":
        return "Menstruation Phase";
      case "follicular":
        return "Follicular Phase";
      case "ovulation":
        return "Ovulation Phase";
      case "luteal":
        return "Luteal Phase";
      default:
        return "";
    }
  };

  if (!cycleData) return null;

  return (
    <div>
      <div className="grid grid-cols-7 gap-2">
        {/* Days of week header */}
        {daysOfWeek.map((day, i) => (
          <div key={i} className="text-center text-gray-600 text-sm font-medium">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map((day, i) => (
          <div 
            key={i} 
            className="aspect-square rounded-full flex items-center justify-center text-sm"
            title={getPhaseTitle(day.phase)}
          >
            <div 
              className={`w-10 h-10 rounded-full ${getPhaseColor(day.phase)} flex items-center justify-center ${day.isStart ? 'ring-2 ring-primary ring-offset-2' : ''}`}
            >
              {day.dayOfMonth}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
