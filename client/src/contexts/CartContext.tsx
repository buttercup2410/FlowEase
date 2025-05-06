import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  cartCount: number;
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
  userId?: string;
}

export function CartProvider({ children, userId }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on initial load
  useEffect(() => {
    if (userId) {
      const storedCart = localStorage.getItem(`flowcycle_cart_${userId}`);
      if (storedCart) {
        try {
          setCartItems(JSON.parse(storedCart));
        } catch (err) {
          console.error("Failed to parse stored cart", err);
        }
      }
    }
  }, [userId]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`flowcycle_cart_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const increaseQuantity = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.product.id === productId);
      
      if (item && item.quantity === 1) {
        return prevItems.filter((item) => item.product.id !== productId);
      }
      
      return prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getTotalPrice,
        cartCount,
        isCartOpen,
        toggleCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
