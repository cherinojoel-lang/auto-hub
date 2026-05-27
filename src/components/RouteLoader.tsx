import React from 'react';

export default function RouteLoader() {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
