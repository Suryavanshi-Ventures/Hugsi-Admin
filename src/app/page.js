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

  const [errors, setErrors] = useState({
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

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

   
    if (!formData.email_or_phone) {
      newErrors.email_or_phone = "Email is required";
      isValid = false;
    } else {
      newErrors.email_or_phone = "";
    }

    
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/signin`,
        formData
      );
  
      if (response.data.status_code === 200) {
        console.log("Login successful", response.data);
        localStorage.setItem(
          "access_token",
          `${process.env.NEXT_PUBLIC_TOKEN_NAME}`
        );
        router.push("/Dashboard/All-users");
      } else {
       
        if (response.data.status_code === 401) {
         
          setErrors({
            ...errors,
            email_or_phone: "Incorrect email or password",
            password: "Incorrect email or password",
          });
        } else {
          console.error("Login failed", response.data);
        }
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
        <div className="bg-[#FFEEB9] mx-[20px] md:p-8 rounded shadow-md w-full md:w-1/2">
          <div className="flex justify-center py-6">
            <Image src="/hugsi-logo.webp" width={150} height={150} alt="logo" />
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (validateForm()) {
                handleLogin();
              }
            
            }}
          >
            {/* Email Input */}
            <div className="mb-4 px-[50px]">
              <input
                type="email"
                id="email"
                name="email_or_phone"
                className="w-full border border-gray-300 px-3 py-2 rounded-xl focus:outline-none focus:border-blue-500"
                placeholder="Email"
                value={formData.email_or_phone}
                onChange={handleInputChange}
              />
               <div className="mb-2 text-red-500">
          {errors.email_or_phone && <p>{errors.email_or_phone}</p>}
        </div>
            </div>

            {/* Password Input */}
            <div className="mb-4 px-[50px] py-[10px]">
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 px-3 py-2  focus:outline-none focus:border-blue-500 rounded-xl"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <div className="mb-2 text-red-500">
          {errors.password && <p>{errors.password}</p>}
        </div>
            </div>

            {/* Login Button */}

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#FFBF00] w-[200px] rounded-2xl text-white px-4 py-2 font-semibold  hover:bg-[#f5c800 focus:outline-none focus:shadow-outline-blue"
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
