import React, { useState } from 'react';
import { auth } from '../firebase';
import { FaComment, FaHome, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="bg-blue-500  top-0 ">
      <div className="flex justify-center items-center text-center mb-0">
        <div className="flex items-center justify-between h-16">
          <div className="flex space-x-4 items-center">
            <Link to="/dashboard" className="text-white hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <FaHome className="mr-1" /> Home
            </Link>
            <Link to="/chat" className="text-white hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <FaComment className="mr-1" /> Chat
            </Link>
            <Link to="/profile" className="text-white hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <FaUser className="mr-1" /> Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-white hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <FaSignOutAlt className="mr-1" /> Log Out
            </button>
          </div>
        </div>
      </div>
      

    </nav>
  );
};

export default Navbar;
