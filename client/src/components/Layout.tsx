import { ReactNode } from "react";
import Header from "./Header";
import MobileNav from "./MobileNav";
import CartOverlay from "./CartOverlay";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
      <MobileNav />
      <CartOverlay />
    </div>
  );
}
