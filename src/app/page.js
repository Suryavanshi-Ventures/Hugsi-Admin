"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const [formData, setFormData] = useState({
    email_or_phone: "",
    password: "",
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    console.log(process.env.NEXT_PUBLIC_API_URL, "jhvjhvmmhv");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/signin`,
        formData
      );
      console.log(response, "res");
      if (response.data.status_code === 200) {
        console.log("Login successful", response.data);

        // localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem(
          "access_token",
          `${process.env.NEXT_PUBLIC_TOKEN_NAME}`
        );

        router.push("/Dashboard/All-users");
      } else {
        console.error("Login failed", response.data);
      }
    } catch (error) {
      console.error(
        "Login failed",
        error.response ? error.response.data : error.message
      );
      
    }
  };

  
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-[#FFEEB9] p-8 rounded shadow-md  w-1/2">
          <div className="flex justify-center py-6">
            <Image src="/hugsi-logo.webp" width={150} height={150} alt="logo" />
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {/* Email Input */}
            <div className="mb-4 px-[50px]">
              <input
                type="email"
                id="email"
                name="email_or_phone"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                placeholder="Email"
                value={formData.email_or_phone}
                onChange={handleInputChange}
              />
            </div>

            {/* Password Input */}
            <div className="mb-4 px-[50px] py-[10px]">
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            {/* Login Button */}

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#FFBF00] w-[200px] rounded-md text-white px-4 py-2 font-semibold  hover:bg-[#f5c800 focus:outline-none focus:shadow-outline-blue"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
