import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../Navbar';

const LoadingPlaceholder = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Profile - User Profile</title>
      </Helmet>
      <Navbar />
      <div className="flex justify-center items-center mt-10">
        <div className="py-4 rounded shadow-md w-full max-w-4xl animate-pulse bg-gray-50">
          <div className="flex p-4 space-x-4 sm:px-8">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-300"></div> {/* Avatar Placeholder */}
            <div className="flex-1 py-2 space-y-4">
              <div className="w-full h-3 rounded bg-gray-300"></div> {/* First Name Placeholder */}
              <div className="w-5/6 h-3 rounded bg-gray-300"></div> {/* Last Name Placeholder */}
            </div>
          </div>
          <div className="p-4 space-y-4 sm:px-8">
            <div className="w-full h-4 rounded bg-gray-300"></div> {/* User Information Placeholder */}
            <div className="w-full h-4 rounded bg-gray-300"></div> {/* User Information Placeholder */}
            <div className="w-3/4 h-4 rounded bg-gray-300"></div> {/* User Information Placeholder */}
          </div>
          <div className="p-4 space-y-4 sm:px-8">
            <div className="grid grid-cols-3 gap-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="w-full h-36 bg-gray-300 rounded-md"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPlaceholder;
