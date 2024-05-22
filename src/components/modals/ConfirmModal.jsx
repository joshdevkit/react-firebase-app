import React, { useState } from 'react';

const ConfirmModal = ({ modalIsOpen, handleCancelAvatar, handleConfirmAvatar, loading }) => {
  const [waiting, setWaiting] = useState(false);

  const handleConfirm = async () => {
    setWaiting(true);
    await handleConfirmAvatar();
    setWaiting(false);
  };

  return (
    <div>
      {modalIsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Avatar Change</h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelAvatar}
                className="bg-red-500 text-white px-4 py-2 rounded"
                disabled={waiting}
              >
                No
              </button>
              <button
                onClick={handleConfirm}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={waiting}
              >
                {waiting ? 'Please Wait...' : 'Yes'}
              </button>
            </div>
          </div>
        </div>
      )}
      {waiting && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-25 blur-md flex items-center justify-center">
          <div className="text-white text-xl">Please wait...</div>
        </div>
      )}
    </div>
  );
};

export default ConfirmModal;
