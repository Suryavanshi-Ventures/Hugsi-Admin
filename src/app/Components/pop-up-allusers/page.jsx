// UserProfileModal.js
import React from "react";
import Image from "next/image";

function UserProfileModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <button onClick={onClose}>Close</button>
        <Image
          src={user?.profile_pic || "/na.png"}
          alt={`${user?.name}`}
          width={200}
          height={200}
          className="rounded-full"
        />
        {/* Additional user details can be displayed here */}
      </div>
    </div>
  );
}

export default UserProfileModal;
// function UserProfileModal({ user, onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg">
//         <button onClick={onClose}>Close</button>
//         <Image
//           src={user?.profile_pic || "/na.png"}
//           alt={`${user?.name}`}
//           width={200}
//           height={200}
//           className="rounded-full"
//         />
//         {/* Additional user details can be displayed here */}
//       </div>
//     </div>
//   );
// }

// export default UserProfileModal;
