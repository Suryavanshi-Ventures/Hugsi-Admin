
import React from "react";

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-50"></div>
      <div className="bg-white p-4 rounded-md z-10">
        <p className="text-xl font-semibold mb-4">Are you sure you want to logout?</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 font-semibold rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onLogout}
            className="bg-[#FFBF00] text-white font-semibold px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
