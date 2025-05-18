import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
        <div className="mt-4 text-center text-blue-600 font-medium">
          Loading...
        </div>
      </div>
    </div>
  );
}
