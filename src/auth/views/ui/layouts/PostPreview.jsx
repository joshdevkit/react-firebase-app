import { useEffect, useState } from "react";

const PostPreview = ({ post, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
      setIsVisible(true);
      return () => setIsVisible(false);
    }, []);
  
    return (
      <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative max-w-full max-h-full">
          <img
            className="w-full h-full object-cover px-3"
            src={post.image}
            alt="Full Post"
          />
          <button
            className="absolute top-2 right-6 text-white text-xl"
            onClick={onClose}
          >
            X
          </button>
        </div>
      </div>
    );
  };

export default PostPreview;