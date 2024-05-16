// UserInformation.js
import React from 'react';
import { FaBirthdayCake, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleDateString();
  };

const UserInformation = ({ userInformation }) => {
  return (
    <div className="mt-6">
     
      <div className="bg-white rounded-lg shadow-md p-6 mt-4">
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-lg font-semibold mb-2">About Me:</h4>
          <div className="flex items-center mb-2">
            <FaBirthdayCake className="text-gray-500 mr-2" />
            <p><strong>Birthday:</strong> {formatDate(userInformation?.birthday)}</p>
          </div>
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <p><strong>Address:</strong> {userInformation?.address}</p>
          </div>
          <div className="flex items-center">
            <FaPhoneAlt className="text-gray-500 mr-2" />
            <p><strong>Contact Number:</strong> {userInformation?.contactNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
