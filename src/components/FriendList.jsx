import React from 'react';

const FriendList = () => {
  const friends = {
    persons: [
      { name: 'Sample User 1', url: 'https://via.placeholder.com/300x300' },
      { name: 'Sample User 2', url: 'https://via.placeholder.com/300x300' },
      { name: 'Sample User 3', url: 'https://via.placeholder.com/300x300' },
      { name: 'Sample User 4', url: 'https://via.placeholder.com/300x300' },
      { name: 'Sample User 5', url: 'https://via.placeholder.com/300x300' },
      { name: 'Sample User 6', url: 'https://via.placeholder.com/300x300' },
    ],
  };

  return (
    <div className="mt-6 p-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Friends</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 cursor-pointer">
        {friends.persons.map((friend, index) => (
          <div key={index} className="relative group">
            <img
              src={friend.url}
              alt={friend.name}
              className="w-24 h-24 object-cover rounded-full shadow-md transition duration-300 transform group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 px-2 py-1  bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg">
              <p className="text-black font-semibold text-sm overflow-hidden whitespace-nowrap  mr-auto">{friend.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
