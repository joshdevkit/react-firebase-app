import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faImage, faVideo, faCalendar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import PostPreview from '../ui/layouts/PostPreview';
import { useAuth } from '../../../contexts/AuthContext';




export default function MainContent() {

  const {avatarUrl } = useAuth();
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'Prelly Kilman',
      avatar: 'https://via.placeholder.com/50',
      image: 'https://via.placeholder.com/600x300',
      description: 'Caption or description of the image goes here...',
    },
    {
      id: 2,
      username: 'Jane Doe',
      avatar: 'https://via.placeholder.com/50',
      image: 'https://via.placeholder.com/600x300',
      description: 'Another caption or description...',
    },
  ]);

  const [showFullImage, setShowFullImage] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  const toggleFullImage = (post) => {
    setShowFullImage(!showFullImage);
    setSelectedPost(post);
  };

  const handleAddImage = () => {
    // Handle adding an image to posts
  };


  return (
    <div className="w-full lg:w-1/2 p-4 rounded-lg ">
      <div className="bg-white p-4 shadow-md rounded mb-4">
        <div className="flex items-center space-x-4 mb-4">
          <img
            className="w-12 h-12 rounded-full"
            src={avatarUrl}
            alt="User Image"
          />
          <textarea
            className="w-full border rounded p-2"
            placeholder="Write something..."
            onFocus={() => setIsTextareaFocused(true)}
            onBlur={() => setIsTextareaFocused(false)}
          />
          {isTextareaFocused && (
            <button
              className="bg-blue-500 text-white p-3 rounded-full ml-2"
              onClick={handleAddImage}
            >
              <FontAwesomeIcon icon={faShare} />
            </button>
          )}
        </div>
        <hr className='py-2' />
        <div className="flex justify-around text-gray-500 mt-4">
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <FontAwesomeIcon icon={faImage} />
            <span>Photo</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <FontAwesomeIcon icon={faVideo} />
            <span>Video</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <FontAwesomeIcon icon={faCalendar} />
            <span>Event</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>Location</span>
          </button>
        </div>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 shadow-md rounded mb-4">
          <div className="flex items-center space-x-4 mb-4">
            <img
              className="w-12 h-12 rounded-full"
              src={post.avatar}
              alt="User"
            />
            <div>
              <h2 className="text-lg font-bold">{post.username}</h2>
            </div>
          </div>
          <img
            className="w-full rounded cursor-pointer"
            src={post.image}
            alt="Post"
            onClick={() => toggleFullImage(post)}
          />
          <div className="mt-4">
            <p>{post.description}</p>
          </div>
        </div>
      ))}

      {showFullImage && selectedPost && (
        <PostPreview post={selectedPost} onClose={() => toggleFullImage(null)} />
      )}
    </div>
  );
}
