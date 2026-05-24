import React from 'react';

/**
 * Atomic, responsive loading spinner component.
 * Supports "sm", "md", and "lg" sizes.
 */
export const Spinner = ({ size = "md" }) => {
  const dimensions = 
    size === "sm" ? "h-4 w-4 border-2" : 
    size === "lg" ? "h-10 w-10 border-4" : 
    "h-7 w-7 border-3";

  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent ${dimensions}`}></div>
    </div>
  );
};
