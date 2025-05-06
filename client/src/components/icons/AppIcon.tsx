import { SVGProps } from "react";

export function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Lotus flower shape representing wellness and balance */}
      <path d="M12 3C7.5 3 4 6.5 4 11c0 2.5 1.5 4.5 3 6.5s3 4.5 5 4.5 3.5-2.5 5-4.5 3-4 3-6.5c0-4.5-3.5-8-8-8z" />
      <path d="M12 3c4.5 0 8 3.5 8 8 0 2.5-1.5 4.5-3 6.5s-3 4.5-5 4.5" />
      <path d="M12 3C7.5 3 4 6.5 4 11c0 2.5 1.5 4.5 3 6.5" />
      
      {/* Center circle representing the cycle */}
      <circle cx="12" cy="11" r="3" />
      
      {/* Droplet shapes representing flow */}
      <path d="M12 15l-2 2" />
      <path d="M12 15l2 2" />
      <path d="M12 15v3" />
    </svg>
  );
}