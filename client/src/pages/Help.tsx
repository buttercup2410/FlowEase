import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Help() {
  const [_, setLocation] = useLocation();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Help Center</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Welcome to the FlowCycle Help Center. Find answers to common questions below.
          </p>
          
          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I track my menstrual cycle?</AccordionTrigger>
              <AccordionContent>
                To track your cycle, go to the Dashboard and enter your last period start date, 
                cycle length, and flow type. You can update this information at any time by clicking 
                the edit button on your Dashboard.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>How do product recommendations work?</AccordionTrigger>
              <AccordionContent>
                Product recommendations are personalized based on your flow type and cycle data. 
                We suggest products that may be best suited for your specific needs.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I set up a subscription?</AccordionTrigger>
              <AccordionContent>
                Visit the Subscription page to select products, delivery frequency, and shipping details. 
                You can modify or cancel your subscription at any time.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>What is an emergency delivery?</AccordionTrigger>
              <AccordionContent>
                Emergency deliveries are one-time, expedited shipments for when you need products quickly. 
                You can request an emergency delivery from the Subscription page.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="pt-4">
            <Button onClick={() => setLocation("/dashboard")}>
              Return to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}