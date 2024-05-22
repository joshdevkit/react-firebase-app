import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import { useAuth } from '../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserPlus, FaCircleNotch } from 'react-icons/fa';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser, fetchUsersExceptCurrentUser, sendFriendRequest } = useAuth();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersList = await fetchUsersExceptCurrentUser(currentUser.uid);
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
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
        toast.success("Friend request sent successfully!");
      }
    } catch (error) {
      if (error.message === "Friend request already sent.") {
        toast.error("Friend request already sent.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Home - User Dashboard</title>
      </Helmet>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User List</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {users.map(user => (
            <div key={user.id} className="relative p-4 border rounded">
              <img src={user.avatar} alt={user.firstName} className="w-16 h-16 rounded-full mb-2" />
              <h2 className="text-lg font-bold mb-3">{user.firstName} {user.lastName}</h2>
              <button
                className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-2 mr-2 mt-2 rounded"
                onClick={() => handleSendFriendRequest(user.id)}
                disabled={loading}
              >
                {loading ? <FaCircleNotch className="spin-icon" /> : <FaUserPlus />}
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
