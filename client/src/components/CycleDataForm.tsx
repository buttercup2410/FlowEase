import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCycleData, FlowType } from "@/contexts/CycleDataContext";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  startDate: z.string(),
  cycleLength: z.string().transform((val) => parseInt(val, 10)),
  flowType: z.enum(["light", "moderate", "heavy", "variable"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function CycleDataForm() {
  const { cycleData, updateCycleData } = useCycleData();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: cycleData?.startDate || "",
      cycleLength: cycleData?.cycleLength?.toString() || "28",
      flowType: cycleData?.flowType || "moderate",
    },
  });

  function onSubmit(values: FormValues) {
    updateCycleData({
      startDate: values.startDate,
      cycleLength: values.cycleLength,
      flowType: values.flowType as FlowType,
    });

    toast({
      title: "Cycle data updated",
      description: "Your cycle information has been saved.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cycleLength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cycle Length</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <SelectValue placeholder="Select cycle length" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 15 }, (_, i) => i + 21).map((days) => (
                    <SelectItem key={days} value={days.toString()}>
                      {days} days
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="flowType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flow Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <SelectValue placeholder="Select flow type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="heavy">Heavy</SelectItem>
                  <SelectItem value="variable">Variable</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Update Cycle Information
        </Button>
      </form>
    </Form>
  );
}
