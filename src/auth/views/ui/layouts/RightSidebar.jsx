import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { FaUserPlus, FaCircleNotch, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RightSidebar() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser, fetchUsersExceptCurrentUser, sendFriendRequest, cancelFriendRequest } = useAuth();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const usersList = await fetchUsersExceptCurrentUser(currentUser.uid);
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      loadUsers();
    }
  }, [currentUser, fetchUsersExceptCurrentUser]);

  const handleSendFriendRequest = async (receiverId) => {
    try {
      setLoading(true);
      const result = await sendFriendRequest(receiverId, currentUser);
      if (result) {
        const usersList = await fetchUsersExceptCurrentUser(currentUser.uid);
        setUsers(usersList);
      }
    } catch (error) {
      if (error.message === "Friend request already sent.") {
        toast.error("Friend request already sent.");
      } else {
        toast.error("Failed to send friend request.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelFriendRequest = async (requestId) => {
    try {
      setLoading(true);
      const result = await cancelFriendRequest(requestId);
      if (result) {
        const usersList = await fetchUsersExceptCurrentUser(currentUser.uid);
        setUsers(usersList);
      }
    } catch (error) {
      toast.error("Failed to cancel friend request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hidden lg:flex flex-col w-1/4 p-4 bg-gray-100 space-y-4">
      <div className='border-2 rounded-lg py-5 p-3'>
        <h2 className="text-lg font-bold mb-2">Find Friends</h2>
        {users.length === 0 ? (
          <p className='text-center text-lg'>No users registered</p>
        ) : (
          users.map(user => (
            <div key={user.id} className="relative p-2 border rounded flex items-center justify-between">
              <div className="flex items-center">
                <img src={user.avatar} alt={user.firstName} className="w-12 h-12 rounded-full mb-2" />
                <h5 className="text-md font-bold mx-3">{user.firstName} {user.lastName}</h5>
              </div>
              {user.friendRequest && user.friendRequest.status === 'pending' ? (
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded"
                  onClick={() => handleCancelFriendRequest(user.friendRequest.id)}
                  disabled={loading}
                >
                  {loading ? <FaCircleNotch className="spin-icon" /> : <FaTimes />}
                </button>
              ) : (
                <button
                  className="bg-blue-500 text-white px-3 py-2 rounded"
                  onClick={() => handleSendFriendRequest(user.id)}
                  disabled={loading}
                >
                  {loading ? <FaCircleNotch className="spin-icon" /> : <FaUserPlus />}
                </button>
              )}
            </div>
          ))
        )}
      </div>
      <div className='border-2 rounded-lg py-5 p-3'>
        <h2 className="text-lg font-bold mb-2">Join Group</h2>
        <ul className="space-y-2">
          <li><a href="#">#freeinternet</a></li>
          <li><a href="#">#globalwarming</a></li>
          <li><a href="#">#cars</a></li>
          <li><a href="#">#iphone</a></li>
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}
