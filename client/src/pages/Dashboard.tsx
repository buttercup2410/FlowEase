import { useState } from "react";
import { format, addDays, eachDayOfInterval, startOfWeek, addWeeks } from "date-fns";
import { useCycleData } from "@/contexts/CycleDataContext";
import CycleDataForm from "@/components/CycleDataForm";
import CycleCalendar from "@/components/CycleCalendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Leaf, Droplet } from "lucide-react";

export default function Dashboard() {
  const { cycleData, toggleEditMode, getRecommendations } = useCycleData();
  const recommendations = getRecommendations();

  if (!cycleData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Welcome to FlowEase</h2>
            <p className="mb-4 text-foreground">Please enter your cycle information to get started.</p>
            <CycleDataForm />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground font-heading">FlowEase</h2>
        <p className="text-muted-foreground">Welcome back! Here's your cycle overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Cycle Data Summary */}
        <div className="md:col-span-8 bg-background rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Current Cycle</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary/10 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Start Date</p>
              <p className="text-xl font-semibold text-foreground">
                {format(new Date(cycleData.startDate), "MMM d, yyyy")}
              </p>
            </div>

            <div className="bg-primary/10 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Cycle Length</p>
              <p className="text-xl font-semibold text-foreground">
                {cycleData.cycleLength} days
              </p>
            </div>

            <div className="bg-primary/10 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Flow Type</p>
              <p className="text-xl font-semibold text-foreground capitalize">
                {cycleData.flowType}
              </p>
            </div>
          </div>

          {/* Cycle Calendar Visualization */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-foreground mb-4">Cycle Calendar</h4>
            <CycleCalendar />
          </div>
        </div>

        {/* Edit Cycle Data Form */}
        <div className="md:col-span-4 bg-background rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">Update Cycle Data</h3>
          <CycleDataForm />

          {/* Product Recommendations */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-foreground mb-4">Recommendations</h4>
            <div className="space-y-3">
              {recommendations.map((item) => (
                <div key={item.id} className="bg-muted rounded-lg p-3 flex items-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    {item.icon === "leaf" ? (
                      <Leaf className="text-primary" />
                    ) : (
                      <Droplet className="text-primary" />
                    )}
                  </div>
                  <div className="ml-3">
                    <h5 className="font-medium text-foreground">{item.name}</h5>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
