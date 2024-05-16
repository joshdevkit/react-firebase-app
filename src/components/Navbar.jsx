import React, { useState } from 'react';
import { auth } from '../firebase';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-white font-bold text-xl">React - Firebase</a>
          </div>
          <div className="hidden md:flex space-x-4">
            <a href="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="/chat" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Chat</a>
            <a href="/profile" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Profile</a>
            <button
              onClick={handleLogout}
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Log Out
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="/" className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Home</a>
          <a href="/chat" className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Chat</a>
          <a href="/profile" className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Profile</a>
          <button
              onClick={handleLogout}
              className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Log Out
            </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
