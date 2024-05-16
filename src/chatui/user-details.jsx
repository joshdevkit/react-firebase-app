import React from 'react';
import { FiPaperclip, FiSend, FiArrowLeft } from 'react-icons/fi';
const UserDetail = ({ user, onBack }) => {
    return (
        <div className="h-full w-full flex flex-col bg-gray-100">
            <div className="flex items-center p-4 border-b bg-white">
                <button onClick={onBack} className="mr-4 text-blue-500">
                    <FiArrowLeft size={20} />
                </button>


                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <p className="text-lg font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">Last seen at {user.time}</p>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                {/* Chat messages will be rendered here */}
                <div className="flex flex-col space-y-4">
                    {/* Example of a received message */}
                    <div className="flex items-start">
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-3" />
                        <div className="bg-white rounded-lg p-3">
                            <p className="text-sm text-gray-800">This is an example of a received message.</p>
                        </div>
                    </div>
                    {/* Example of a sent message */}
                    <div className="flex items-end justify-end">
                        <div className="bg-blue-500 rounded-lg p-3">
                            <p className="text-sm text-white">This is an example of a sent message.</p>
                        </div>
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full ml-3" />
                    </div>
                </div>
            </div>
            {/* Input area for typing messages */}
            <div className="p-4 mb-20 bg-white border-t flex items-center">
                <label htmlFor="file-upload" className="cursor-pointer text-blue-500 mr-2">
                    <FiPaperclip size={20} />
                </label>
                <input type="text" placeholder="Type your message..." className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-00" />
                <button className="bg-blue-400 text-white px-4 py-2 rounded-lg ml-2">
                    <FiSend size={20} />
                </button>
            </div>
        </div>
    );
};

export default UserDetail;
