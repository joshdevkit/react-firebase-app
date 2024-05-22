import React from 'react';
import defaultAvatar from '../../../../assets/default.png';

const Avatar = ({ avatarUrl }) => {
  return (
    <img
      className="w-20 h-20 rounded-full border-4"
      src={avatarUrl || defaultAvatar}
      alt="Profile"
    />
  );
};

export default Avatar;
