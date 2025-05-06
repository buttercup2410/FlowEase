import { Fragment } from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/contexts/CartContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useToast } from "@/hooks/use-toast";

export default function CartOverlay() {
  const { 
    cartItems, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    getTotalPrice, 
    isCartOpen, 
    toggleCart,
    clearCart
  } = useCart();
  
  const { 
    setIsPaymentSuccessModalOpen, 
    isPaymentSuccessModalOpen,
    setLastOrderDetails
  } = useSubscription();
  
  const { toast } = useToast();

  const handleCheckout = () => {
    // In a real app, we would process payment here
    setLastOrderDetails({
      type: "regular",
      date: new Date().toISOString().split('T')[0]
    });
    
    clearCart();
    setIsPaymentSuccessModalOpen(true);
    
    toast({
      title: "Order placed successfully",
      description: "Your payment has been processed.",
    });
    
    toggleCart();
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 ? 4.99 : 0;
  const total = subtotal + shipping;

  if (!isCartOpen) return null;

  return (
    <Fragment>
      <div className="fixed inset-0 z-50">
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={toggleCart}
        />
        <div className="absolute inset-y-0 right-0 max-w-md w-full bg-background shadow-xl flex flex-col">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">
              Your Cart ({cartItems.length})
            </h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleCart}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {cartItems.length > 0 ? (
            <Fragment>
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex border-b border-border pb-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-foreground font-medium">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.product.shortDescription}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-6 h-6 rounded-full"
                              onClick={() => decreaseQuantity(item.product.id)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="mx-2 text-foreground">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-6 h-6 rounded-full"
                              onClick={() => increaseQuantity(item.product.id)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="text-primary font-bold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2 text-muted-foreground hover:text-foreground"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-6 border-t border-border">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span className="font-medium text-foreground">${shipping.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between pt-2">
                    <span className="text-foreground font-medium">Total:</span>
                    <span className="font-bold text-primary text-xl">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </Fragment>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <h4 className="text-lg font-medium text-foreground mb-2">Your cart is empty</h4>
                <p className="text-muted-foreground mb-6">Browse our products and add items to your cart.</p>
                <Button
                  onClick={toggleCart}
                  className="bg-primary hover:bg-primary/90"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
