import { useEffect } from "react";
import { X } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/data/products";

const formSchema = z.object({
  productId: z.string().min(1, "Please select a product"),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EmergencyDeliveryModal() {
  const { 
    isEmergencyModalOpen, 
    setIsEmergencyModalOpen,
    createEmergencyDelivery,
    setIsPaymentSuccessModalOpen,
    setLastOrderDetails
  } = useSubscription();
  
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      address: "",
      phone: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (!isEmergencyModalOpen) {
      form.reset();
    }
  }, [isEmergencyModalOpen, form]);

  const onSubmit = (values: FormValues) => {
    createEmergencyDelivery({
      productId: parseInt(values.productId),
      address: values.address,
      phone: values.phone,
      notes: values.notes,
    });
    
    setIsEmergencyModalOpen(false);
    
    setLastOrderDetails({
      type: "emergency",
      date: new Date().toISOString().split('T')[0]
    });
    
    setIsPaymentSuccessModalOpen(true);
    
    toast({
      title: "Emergency delivery requested",
      description: "Your request has been submitted successfully.",
    });
  };

  if (!isEmergencyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setIsEmergencyModalOpen(false)}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">Emergency Delivery</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsEmergencyModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6">
            <p className="text-gray-600 mb-6">
              We'll deliver your selected products within 1 hour to your location. A $9.99 rush fee applies.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="productId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Product</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Product" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem 
                              key={product.id} 
                              value={product.id.toString()}
                            >
                              {product.name}
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="123 Main St, City, State, ZIP" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="(123) 456-7890" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Additional instructions for delivery" 
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary/90"
                >
                  Confirm Emergency Delivery
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
