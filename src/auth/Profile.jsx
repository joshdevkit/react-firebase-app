import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import LoadingPlaceholder from '../components/loaders/LoadingPlaceholder';

import UserDetails from './views/UserDetails';
import { Helmet } from 'react-helmet-async';
import UserInformation from '../components/UserInformations';
import { FaEdit } from 'react-icons/fa';
import UserGallery from '../components/UserGallery';
import FriendList from '../components/FriendList';

const Profile = () => {
  const { currentUser, getUserDetails, getUserInformations } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInformationExists, setUserInformationExists] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const details = await getUserDetails();
        setUserDetails(details);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    const fetchUserInformation = async () => {
      try {
        const information = await getUserInformations();
        if (information) {
          setUserInformationExists(information);
        } else {
          setUserInformationExists(false);
        }
      } catch (error) {
        console.error("Failed to fetch user information", error);
      }
    };

    if (currentUser) {
      fetchUserDetails();
      fetchUserInformation();
    }
  }, [currentUser, getUserDetails, getUserInformations]);

  const handleSuccessAddInformation = async () => {
    const information = await getUserInformations();
    setUserInformationExists(information);
  };

  const userGallery = {
    gallery: [
      { url: 'https://via.placeholder.com/300x300' },
      { url: 'https://via.placeholder.com/300x300' },
      { url: 'https://via.placeholder.com/300x300' },
      { url: 'https://via.placeholder.com/300x300' },
      { url: 'https://via.placeholder.com/300x300' },
      { url: 'https://via.placeholder.com/300x300' },
    ]
  }

  if (loading) {
    return <LoadingPlaceholder />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Profile - User Profile</title>
      </Helmet>
      <Navbar />
      <div className="flex flex-col items-center py-12 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center px-3">
              <img
                src={userDetails && userDetails.avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full mr-4 border-2 object-contain"
              />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{userDetails.firstName} {userDetails.lastName}</h2>
                <p className="text-gray-600">{currentUser.email}</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none flex items-center">
              <FaEdit className="mr-2" />
              Edit Profile
            </button>
          </div>
          {userInformationExists ? (
            <UserInformation userInformation={userInformationExists} />
            
          ) : (
            <UserDetails onSuccessAddInformation={handleSuccessAddInformation} />
          )}

          <div className="flex flex-col mt-2">
              <div className="grid grid-cols-2 gap-8">
              <UserGallery images={userGallery?.gallery || []} />
              <FriendList />
              </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
