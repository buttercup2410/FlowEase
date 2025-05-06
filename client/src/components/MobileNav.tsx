import { useLocation } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { LayoutDashboard, Store, Repeat, ShoppingCart } from "lucide-react";

export default function MobileNav() {
  const [location, setLocation] = useLocation();
  const { toggleCart } = useCart();

  // Determine active link
  const isActive = (path: string) => {
    return location === path ? "text-primary" : "text-gray-500";
  };

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-background border-t border-border z-10">
      <div className="grid grid-cols-4">
        <button 
          onClick={() => setLocation("/dashboard")}
          className={`flex flex-col items-center justify-center py-3 ${isActive("/dashboard")}`}
        >
          <LayoutDashboard className="text-xl" />
          <span className="text-xs mt-1">Dashboard</span>
        </button>
        <button 
          onClick={() => setLocation("/products")}
          className={`flex flex-col items-center justify-center py-3 ${isActive("/products")}`}
        >
          <Store className="text-xl" />
          <span className="text-xs mt-1">Products</span>
        </button>
        <button 
          onClick={() => setLocation("/subscription")}
          className={`flex flex-col items-center justify-center py-3 ${isActive("/subscription")}`}
        >
          <Repeat className="text-xl" />
          <span className="text-xs mt-1">Subscribe</span>
        </button>
        <button 
          className="flex flex-col items-center justify-center py-3 text-gray-500"
          onClick={toggleCart}
        >
          <ShoppingCart className="text-xl" />
          <span className="text-xs mt-1">Cart</span>
        </button>
      </div>
    </nav>
  );
}
