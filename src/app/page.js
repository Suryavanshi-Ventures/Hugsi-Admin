"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import React from "react";

function Home() {
  const [formData, setFormData] = useState({
    email_or_phone: "",
    password: "",
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    
    try {
      // Make a POST request to the login API
      const response = await axios.post("https://backend.hugsi.com/signin", formData);


      // Handle the response, e.g., redirect to dashboard or display a success message
      console.log("Login successful", response.data);
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Login failed", error.response.data);
    }
  };
  return (
//     <div>
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="bg-[#FFEEB9] p-8 rounded shadow-md  w-1/2">
//           <div className="flex justify-center py-6">
//             <Image src="/hugsi-logo.webp" width={150} height={150} alt="logo" />
//           </div>

//           {/* Form */}
//           <form onSubmit={(e) => {
//    e.preventDefault();
//    handleLogin();
// }}>
//             {/* Email Input */}
//             <div className="mb-4 px-[50px]">
//               <input
//                 type="email"
//                 id="email"
//                 name="email_or_phone"
//                 className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
//                 placeholder="Email"
//                 value={formData.email_or_phone}
//                 onChange={handleInputChange}
//               />
//             </div>

//             {/* Password Input */}
//             <div className="mb-4 px-[50px] py-[10px]">
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
//                 placeholder="Password"
               
//                 value={formData.password}
//                 onChange={handleInputChange}
//               />
//             </div>

//             {/* Login Button */}

//             <div className="flex justify-center">
//               <button
//                 type="submit"
//                 className="bg-[#FFBF00] w-[200px] rounded-md text-white px-4 py-2 font-semibold  hover:bg-[#f5c800 focus:outline-none focus:shadow-outline-blue"
//                >
//                 Login
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
 
<div></div>

);
}

export default Home;
