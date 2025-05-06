import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format, addDays } from "date-fns";
import { 
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { products } from "@/data/products";
import { useSubscription, FrequencyType } from "@/contexts/SubscriptionContext";
import EmergencyDeliveryModal from "@/components/EmergencyDeliveryModal";
import PaymentSuccessModal from "@/components/PaymentSuccessModal";

// Schema for the subscription form
const subscriptionSchema = z.object({
  products: z.record(z.string(), z.boolean()).refine(
    (data) => Object.values(data).some((selected) => selected),
    {
      message: "Please select at least one product",
    }
  ),
  quantities: z.record(z.string(), z.string()),
  frequency: z.enum(["monthly", "bimonthly", "quarterly"]),
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    apt: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(5, "Valid ZIP code is required"),
    phone: z.string().min(10, "Valid phone number is required"),
  }),
});

type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;

export default function Subscription() {
  const { 
    saveSubscription, 
    setIsEmergencyModalOpen, 
    isEmergencyModalOpen,
    isPaymentSuccessModalOpen,
    setIsPaymentSuccessModalOpen,
    setLastOrderDetails
  } = useSubscription();
  const { toast } = useToast();

  // Initialize form with default values
  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      products: products.reduce((acc, product) => {
        acc[product.id.toString()] = false;
        return acc;
      }, {} as Record<string, boolean>),
      quantities: products.reduce((acc, product) => {
        acc[product.id.toString()] = "1";
        return acc;
      }, {} as Record<string, string>),
      frequency: "monthly",
      address: {
        street: "",
        apt: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
      },
    },
  });

  // Calculate total price based on selected products and quantities
  const calculateTotalPrice = () => {
    const selectedProducts = form.getValues("products");
    const quantities = form.getValues("quantities");
    
    let total = 0;
    Object.keys(selectedProducts).forEach((productId) => {
      if (selectedProducts[productId]) {
        const product = products.find((p) => p.id.toString() === productId);
        const quantity = parseInt(quantities[productId] || "1");
        if (product) {
          total += product.price * quantity;
        }
      }
    });
    
    return total;
  };

  const onSubmit = (data: SubscriptionFormValues) => {
    // Create subscription product list from form data
    const subscriptionProducts = Object.keys(data.products)
      .filter((productId) => data.products[productId])
      .map((productId) => ({
        productId: parseInt(productId),
        quantity: parseInt(data.quantities[productId] || "1"),
      }));

    // Save subscription
    saveSubscription({
      products: subscriptionProducts,
      frequency: data.frequency as FrequencyType,
      address: data.address,
      active: true
    });

    // Set last order details for the success modal
    const today = new Date();
    let deliveryDate = new Date(today);
    
    switch (data.frequency) {
      case "monthly":
        deliveryDate = addDays(today, 28);
        break;
      case "bimonthly":
        deliveryDate = addDays(today, 56);
        break;
      case "quarterly":
        deliveryDate = addDays(today, 84);
        break;
    }
    
    setLastOrderDetails({
      type: "subscription",
      date: format(deliveryDate, "MMM d, yyyy")
    });
    
    // Show success modal
    setIsPaymentSuccessModalOpen(true);
    
    toast({
      title: "Subscription created",
      description: "Your subscription has been set up successfully.",
    });
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 font-heading">Subscription</h2>
        <p className="text-gray-600">Never run out of supplies with our flexible subscription</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Create Your Subscription Box</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form id="subscription-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-4">1. Choose Your Products</h4>
                    <div className="space-y-4">
                      {products.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg p-4 flex items-center">
                          <FormField
                            control={form.control}
                            name={`products.${product.id}`}
                            render={({ field }) => (
                              <FormItem className="flex-1 flex items-center space-x-3">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    id={`product-${product.id}`}
                                  />
                                </FormControl>
                                <FormLabel htmlFor={`product-${product.id}`} className="cursor-pointer flex-1">
                                  <span className="block font-medium text-gray-800">{product.name}</span>
                                  <span className="block text-sm text-gray-600">{product.shortDescription}</span>
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                          
                          <div className="ml-4">
                            <FormField
                              control={form.control}
                              name={`quantities.${product.id}`}
                              render={({ field }) => (
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  disabled={!form.watch(`products.${product.id}`)}
                                >
                                  <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="Quantity" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">1 {product.unit}</SelectItem>
                                    <SelectItem value="2">2 {product.unit}s</SelectItem>
                                    <SelectItem value="3">3 {product.unit}s</SelectItem>
                                    <SelectItem value="4">4 {product.unit}s</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                          
                          <div className="ml-4 text-primary font-bold">
                            ${product.price.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-4">2. Select Delivery Frequency</h4>
                    <FormField
                      control={form.control}
                      name="frequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="monthly"
                                    id="frequency-monthly"
                                    className="peer hidden"
                                  />
                                </FormControl>
                                <FormLabel
                                  htmlFor="frequency-monthly"
                                  className="w-full block border border-gray-200 rounded-lg p-4 cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5"
                                >
                                  <div className="font-medium text-gray-800">Monthly</div>
                                  <div className="text-sm text-gray-600">Delivered every 28 days</div>
                                </FormLabel>
                              </FormItem>
                              
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="bimonthly"
                                    id="frequency-bimonthly"
                                    className="peer hidden"
                                  />
                                </FormControl>
                                <FormLabel
                                  htmlFor="frequency-bimonthly"
                                  className="w-full block border border-gray-200 rounded-lg p-4 cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5"
                                >
                                  <div className="font-medium text-gray-800">Every 2 Months</div>
                                  <div className="text-sm text-gray-600">Delivered every 56 days</div>
                                </FormLabel>
                              </FormItem>
                              
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="quarterly"
                                    id="frequency-quarterly"
                                    className="peer hidden"
                                  />
                                </FormControl>
                                <FormLabel
                                  htmlFor="frequency-quarterly"
                                  className="w-full block border border-gray-200 rounded-lg p-4 cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5"
                                >
                                  <div className="font-medium text-gray-800">Quarterly</div>
                                  <div className="text-sm text-gray-600">Delivered every 3 months</div>
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-4">3. Delivery Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="address.street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="123 Main St" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address.apt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Apt, Suite, Unit (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Apt #123" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address.city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="New York" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address.state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="NY" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address.zip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="10001" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address.phone"
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
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Need Supplies Urgently?</CardTitle>
              <CardDescription>
                Request emergency 1-hour delivery for your area.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="bg-secondary hover:bg-secondary/90"
                onClick={() => setIsEmergencyModalOpen(true)}
              >
                Request Emergency Delivery
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-800">${totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium text-gray-800">FREE</span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 flex justify-between">
                    <span className="text-gray-800 font-medium">Total per delivery:</span>
                    <span className="font-bold text-primary text-xl">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-6">
                  You can modify or cancel your subscription at any time.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit"
                  form="subscription-form"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={totalPrice === 0}
                >
                  Subscribe Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EmergencyDeliveryModal />
      <PaymentSuccessModal />
    </div>
  );
}
