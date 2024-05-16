import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaMinusSquare, FaPlusSquare, FaSave } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

export default function UserDetails({ onSuccessAddInformation }) {
  const { addUserInformations } = useAuth();
  const [accordion, setAccordion] = useState({
    information: false,
    gallery: false,
  });
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const toggleAccordion = (section) => {
    setAccordion((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  const handleSaveInformation = async (e) => {
    e.preventDefault();
    try {
      const userInfo = {
        birthday: new Date(birthday),
        address,
        contactNumber,
      };
      await addUserInformations(userInfo);
      onSuccessAddInformation();
    } catch (error) {
      console.error('Error saving user information:', error);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">Information</h3>
        <button
          onClick={() => toggleAccordion('information')}
          className="focus:outline-none text-gray-600 hover:text-gray-800"
        >
           {accordion.information ? <FaMinusSquare size={30} /> : <FaPlusSquare size={30} />}
        </button>
      </div>
      {accordion.information && (
        <div className="mt-2 space-y-4">
          <div className="flex">
            <div className="w-1/2 pr-4">
              <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                Birthday
              </label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={birthday}
                onChange={handleBirthdayChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={contactNumber}
                onChange={handleContactNumberChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={address}
              onChange={handleAddressChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSaveInformation}
              className="inline-flex items-center px-3 py-1 bg-blue-500 text-white rounded-md ml-2 hover:bg-blue-600 focus:outline-none"
            >
              <FaSave className="mr-1" />
              Save Information
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
