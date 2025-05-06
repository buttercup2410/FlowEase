import { useEffect } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useLocation } from "wouter";

export default function PaymentSuccessModal() {
  const { 
    isPaymentSuccessModalOpen, 
    setIsPaymentSuccessModalOpen,
    lastOrderDetails 
  } = useSubscription();
  
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (isPaymentSuccessModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPaymentSuccessModalOpen]);

  const handleClose = () => {
    setIsPaymentSuccessModalOpen(false);
    setLocation("/dashboard");
  };

  if (!isPaymentSuccessModalOpen) return null;

  // Generate order details
  const orderNumber = `FC${Math.floor(Math.random() * 100000)}`;
  const deliveryMessage = lastOrderDetails?.type === "emergency" 
    ? "Your order will arrive within 1 hour" 
    : `Estimated Delivery: ${lastOrderDetails?.date}`;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 text-center">
          <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-success" />
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Completed Successfully
          </h3>
          <p className="text-gray-600 mb-6">
            Thank you for your order! Your products are on their way.
          </p>

          <div className="bg-gray-100 rounded-lg p-4 text-left mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium text-gray-800">#{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery:</span>
              <span className="font-medium text-gray-800">{deliveryMessage}</span>
            </div>
          </div>

          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleClose}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
