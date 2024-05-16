import React from 'react';
import { FaImage } from 'react-icons/fa';

const UserGallery = ({ images }) => {
  return (
    <div className="mt-6 p-4">
      <h3 className="text-xl font-semibold text-gray-900">Uploads</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 mt-4 cursor-pointer">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image.url}
              alt={`Image ${index + 1}`}
              className="w-full h-30 object-cover rounded-md shadow-md"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-md">
              <FaImage className="text-white text-3xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserGallery;
