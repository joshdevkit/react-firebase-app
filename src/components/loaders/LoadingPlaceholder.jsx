import React from 'react';
import { Helmet } from 'react-helmet-async';


const LoadingPlaceholder = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Profile - User Profile</title>
      </Helmet>
      <div className="flex justify-center items-center">
        <div className="py-4 rounded shadow-md w-full max-w-4xl animate-pulse bg-gray-50">
          <div className="flex p-4 space-x-4 sm:px-8">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-300"></div>
            <div className="flex-1 py-2 space-y-4">
              <div className="w-full h-3 rounded bg-gray-300"></div>
              <div className="w-5/6 h-3 rounded bg-gray-300"></div>
            </div>
          </div>
          <div className="p-4 space-y-4 sm:px-8">
            <div className="w-full h-4 rounded bg-gray-300"></div>
            <div className="w-full h-4 rounded bg-gray-300"></div>
            <div className="w-3/4 h-4 rounded bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPlaceholder;
