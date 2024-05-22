import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import Avatar from './Avatar';

export default function LeftSidebar() {
  const { getUserDetails, avatarUrl } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Check if user details are already cached in local state
        const cachedUserDetails = localStorage.getItem('userDetails');
        if (cachedUserDetails) {
          setUserDetails(JSON.parse(cachedUserDetails));
          setLoading(false); // Set loading to false since data is fetched from cache
        } else {
          // Fetch user details from API if not cached
          const userDetailsData = await getUserDetails();
          setUserDetails(userDetailsData);
          localStorage.setItem('userDetails', JSON.stringify(userDetailsData)); // Cache user details
          setLoading(false); // Set loading to false once data is fetched
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchUserDetails();
  }, [getUserDetails]);

  return (
    <div className="hidden lg:flex flex-col w-1/4 p-4 bg-gray-100 rounded-lg ml-2">
      <div className="flex items-center space-x-4">
        {loading ? (
          <div className="w-20 h-20 rounded-full border-4 bg-gray-500"></div> // Placeholder for avatar
        ) : (
          <Avatar avatarUrl={avatarUrl} />
        )}
        <div>
          {loading ? (
            <h2 className="text-lg font-bold bg-gray-300 h-6 w-24 mb-1 rounded"></h2> // Placeholder for first name
          ) : (
            <h2 className="text-lg font-bold">{userDetails ? `${userDetails.firstName} ${userDetails.lastName}` : ''}</h2>
          )}
        </div>
      </div>
      <nav className="mt-6">
        <ul>
          <li className="my-2">
            <a href="#">Reddit Inc.</a>
          </li>
          <li className="my-2">
            <a href="#">Google Search</a>
          </li>
          <li className="my-2">
            <a href="#">TikTok Inc.</a>
          </li>
          <li className="my-2">
            <a href="#">Add new page</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
