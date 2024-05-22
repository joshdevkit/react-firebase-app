import React from 'react';

const UserSideBarList = ({ users, onSelectUser }) => {
  return (
    <div className="flex flex-col h-full w-full md:w-64 lg:w-80 bg-gray-100 border-r bg-transparent ">
      <div className="py-4 px-6 bg-gray-200">
        <h1 className="text-lg font-semibold">Messages</h1>
      </div>
      <div className="py-2 px-4">
        <input type="text" placeholder="Search.." className="w-full p-2 rounded-md border" />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="py-2 px-6 text-gray-600">Active Conversations</div>
        {users.map(user => (
          <div
            key={user.id}
            className="flex items-center px-6 py-4 border-b cursor-pointer hover:bg-gray-200"
            onClick={() => onSelectUser(user)}
          >
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
            <div className="flex-1">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-gray-400">{user.status}</p>
            </div>
            <span className="text-xs text-gray-400">{user.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSideBarList;
