import { Link, useLocation } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { LayoutDashboard, Store, Repeat, ShoppingCart } from "lucide-react";

export default function MobileNav() {
  const [location] = useLocation();
  const { toggleCart } = useCart();

  // Determine active link
  const isActive = (path: string) => {
    return location === path ? "text-primary" : "text-gray-500";
  };

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-10">
      <div className="grid grid-cols-4">
        <Link href="/dashboard">
          <a className={`flex flex-col items-center justify-center py-3 ${isActive("/dashboard")}`}>
            <LayoutDashboard className="text-xl" />
            <span className="text-xs mt-1">Dashboard</span>
          </a>
        </Link>
        <Link href="/products">
          <a className={`flex flex-col items-center justify-center py-3 ${isActive("/products")}`}>
            <Store className="text-xl" />
            <span className="text-xs mt-1">Products</span>
          </a>
        </Link>
        <Link href="/subscription">
          <a className={`flex flex-col items-center justify-center py-3 ${isActive("/subscription")}`}>
            <Repeat className="text-xl" />
            <span className="text-xs mt-1">Subscribe</span>
          </a>
        </Link>
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
