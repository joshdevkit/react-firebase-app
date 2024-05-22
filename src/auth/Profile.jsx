import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import LoadingPlaceholder from '../components/loaders/LoadingPlaceholder';
import UserDetails from './views/UserDetails';
import { Helmet } from 'react-helmet-async';
import UserInformation from '../components/UserInformations';
import UserGallery from '../components/UserGallery';
import FriendList from '../components/FriendList';
import { FaCamera } from 'react-icons/fa';
import ConfirmModal from '../components/modals/ConfirmModal';

const Profile = () => {
  const { currentUser, getUserDetails, getUserInformations, updateAvatar } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInformationExists, setUserInformationExists] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setNewAvatar(URL.createObjectURL(file));
      setModalIsOpen(true);
    }
  };

  const handleConfirmAvatar = async () => {
    if (selectedFile) {
      try {
        await updateAvatar(selectedFile);
        const updatedDetails = await getUserDetails();
        setUserDetails(updatedDetails);
      } catch (error) {
        console.error("Failed to update avatar", error);
      } finally {
        setModalIsOpen(false);
        setSelectedFile(null);
      }
    }
  };

  const handleCancelAvatar = () => {
    setModalIsOpen(false);
    setNewAvatar(null);
    setSelectedFile(null);
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
  };

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
            <div className="relative flex items-center px-3">
              <img
                src={newAvatar || (userDetails && userDetails.avatar)}
                alt="Profile"
                className="w-36 h-36 rounded-full mr-4 border-2 object-cover"
              />
              <label className="absolute -bottom-2 left-1/3 transform -translate-x-1/5 bg-gray-700 text-white rounded-full p-2 cursor-pointer">
                <FaCamera />
                <input type="file" className="hidden" onChange={handleAvatarChange} />
              </label>
              <div className="ml-4">
                <h2 className="text-2xl font-semibold text-gray-900">{userDetails.firstName} {userDetails.lastName}</h2>
              </div>
            </div>
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
      <ConfirmModal modalIsOpen={modalIsOpen} handleConfirmAvatar={handleConfirmAvatar} handleCancelAvatar={handleCancelAvatar} />
    </div>
  );
};

export default Profile;
