import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import UserSideBarList from '../chatui/user-list-sidebar';
import UserDetail from '../chatui/user-details';
import '../style.css';


const ChatList = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const users = [
    { id: 1, name: 'Elijah Sabrina', status: 'Recording 23s', time: '6:20 pm', avatar: 'https://ui-avatars.com/api/?name=Elijah+Sabrina' },
    { id: 2, name: 'Dylan Billy', status: 'You\'re welcome', time: '1:30 pm', avatar: 'https://ui-avatars.com/api/?name=Dylan+Billy' },
    { id: 3, name: 'Design Team', status: 'Ok next week then.', time: '5:00 pm', avatar: 'https://ui-avatars.com/api/?name=Design+Team' },
    { id: 4, name: 'Breaking News', status: 'Apple Watch Ultra and n...', time: '5:00 pm', avatar: 'https://ui-avatars.com/api/?name=Breaking+News' },
  ];

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSidebarOpen(false);
  };

  const handleBack = () => {
    setSelectedUser(null);
    setSidebarOpen(true);
  };

  return (
    <div className="h-screen overflow-hidden">
      <Helmet>
        <title>ChatList - Messenger</title>
      </Helmet>
      <Navbar />
      <div className="flex h-full relative">
        <div className={`fixed md:relative z-30 bg-white md:bg-transparent transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} w-full md:w-64 lg:w-80 h-full`}>
          <UserSideBarList users={users} onSelectUser={handleSelectUser} />
        </div>
        <div className={`flex-1 overflow-hidden transition-opacity duration-300 ease-in-out ${sidebarOpen ? 'hidden md:block' : 'block'}`}>
          {selectedUser ? (
            <UserDetail user={selectedUser} onBack={handleBack} />
          ) : (
            <div className="hidden md:flex justify-center items-center h-full text-gray-500">Select a user to start messaging</div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default ChatList;
