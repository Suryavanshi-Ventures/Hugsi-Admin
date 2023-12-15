"use client";
import axios from "axios";
import React, { useState } from "react";

const NotificationModal = ({ isOpen, onClose, userId, userAllDetails,sendingSelectedIdsToNotification }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleError, setTitleError] = useState("");
  const [bodyError, setBodyError] = useState("");
const [loading,setLoading]=useState(false)
  const handleSendNotification = async () => {
    setLoading(true)
    if (!title.trim()) {
      setTitleError("Title cannot be empty.");
      setBodyError(""); // Reset body error
      setLoading(false)
      return;
    }

    // Check if body is empty
    if (!body.trim()) {
      setBodyError("Body cannot be empty.");
      setTitleError(""); // Reset title error
      setLoading(false)
      return;
    }

    // Reset error states
    setTitleError("");
    setBodyError("");
    try {
      const token = localStorage.getItem("access_token");
    //   const userIds = [userId];

      let userIds;

    if (sendingSelectedIdsToNotification && sendingSelectedIdsToNotification.length > 0) {
      // Use the provided array of user IDs
      userIds = sendingSelectedIdsToNotification;
    } else {
      // selecting individual   userId if multiple id is not available
      userIds = [userId];
    }

    console.log(userIds,"ha bhai final check")
      const notificationData = {
        user_ids: userIds,
        title: title,
        body: body,
        click_action: "perfect_gift_message_page",
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin_send_notifications`,

        notificationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status_code === 200) {
        alert("Notification Send successfully");
        setLoading(false)
        localStorage.removeItem("selectedIds");
      } else {
      }
    } catch (error) {
        alert("Can't Send Notification")
      console.error("Error to Send  Notification:", error);
      setLoading(false)
    }

    onClose();
  };

  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? "block" : "hidden"
      } bg-gray-800 bg-opacity-50 z-50`}
    >
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white w-1/3 p-8 rounded-md">
        {sendingSelectedIdsToNotification && sendingSelectedIdsToNotification.length > 0 ? (
            <h2 className="text-lg font-semibold mb-4">
              Sending Notification with{" "}
              <span className="text-[#FFBF00]">{sendingSelectedIdsToNotification.length}</span> {" "}users
            </h2>
          ) : (
            <h2 className="text-lg font-semibold mb-4">
              Sending Notification to{" "}
              <span className="text-[#FFBF00]">{userAllDetails?.name}</span>
            </h2>
          )}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              className={`mt-1 p-2 border border-gray-300 focus:outline-none focus:border-[#FFBF00] rounded-md  w-full ${titleError ? 'border-red-500' : ''}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {titleError && (
              <p className="text-red-500 font-semibold">{titleError}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700"
            >
              Body:
            </label>
            <textarea
              id="body"
              rows="4"
              className={`mt-1 p-2 border rounded-md focus:outline-none focus:border-[#FFBF00] w-full ${bodyError ? 'border-red-500' : ''}`}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            {bodyError && <p className="text-red-500 font-semibold">{bodyError}</p>}
          </div>

          <div className="flex justify-end">
            <button
              className="mr-2 px-4 py-2 bg-gray-300 rounded-md font-semibold"
              onClick={onClose}
            >
              Cancel
            </button>
            {/* <button className="px-4 py-2 bg-[#FFBF00] rounded-md" onClick={handleSendNotification}>
              Send Notification
            </button> */}

            <button
              onClick={handleSendNotification}
              className="relative inline-flex items-center justify-center px-3 py-2 overflow-hidden font-semibold tracking-tighter text-white bg-[#FFBF00]  rounded-lg group transition-all duration-300 ease-out hover:font-semibold hover:text-white hover:bg-[#FFBF00]"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#FFBF00] rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent"></span>
              <span className="relative"> {loading?"Sending...":"Send Notification  "}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
