import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Link } from "wouter";

export default function Footer() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure theme component doesn't render until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Heart className="h-5 w-5 text-primary mr-2" />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} FlowCycle. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center">
            <div className="flex space-x-4">
              <Link href="/terms">
                <a className="text-sm text-muted-foreground hover:text-foreground">
                  Terms
                </a>
              </Link>
              <Link href="/privacy">
                <a className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy
                </a>
              </Link>
              <Link href="/help">
                <a className="text-sm text-muted-foreground hover:text-foreground">
                  Help
                </a>
              </Link>
            </div>
            
            {mounted && (
              <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleTheme}
                className="ml-2"
              >
                {theme === "light" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}