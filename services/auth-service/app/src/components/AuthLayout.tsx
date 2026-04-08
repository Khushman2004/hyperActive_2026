// src/components/AuthLayout.tsx

import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center p-10">
        <h1 className="text-4xl font-semibold text-gray-700 max-w-md">
          Welcome to your second brain.
        </h1>
      </div>

      {/* Right side */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}