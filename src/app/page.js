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
  const [spinner, setSpinner] = useState(false);
  const [invalid, setInvalid] = useState();
  const [errors, setErrors] = useState({
    email_or_phone: "",
    password: "",
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    setInvalid(false);
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
    setSpinner(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/signin`,
        formData
      );

      if (response.data.status_code === 200) {
        // console.log("Login successful", response.data);
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
          setErrors({
            ...errors,

            email_or_phone: response.data.message || "Login failed",
          });
        }
      }
    } catch (error) {
      setSpinner(false);
      console.error(
        "Login failed",

        setInvalid(error.response ? error.response.data : error.message)
      );
    }
  };

  return (
    <div className="h-full w-full bg-[#FFEEB9]">
      <div className="mx-auto max-w-screen-3xl">
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white mx-[20px] md:p-0 md:py-6 rounded-xl shadow-md w-full md:w-1/2 xl:w-1/3">
            <div className="flex justify-center py-6">
              <Image
                src="/hugsi-logo.webp"
                width={100}
                height={100}
                alt="logo"
              />
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
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email_or_phone"
                  className="w-full border border-gray-300 px-3 py-2 rounded-[5px] focus:outline-none focus:border-[#FFBF00]"
                  placeholder="Email"
                  value={formData.email_or_phone}
                  onChange={handleInputChange}
                />
                <div className="mb-2 text-red-500">
                  {errors.email_or_phone && <p >{errors.email_or_phone}</p>}
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-4 px-[50px] py-[10px] ">
              <label className="">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full border border-gray-300 px-3 py-2  focus:outline-none focus:border-[#FFBF00] rounded-[5px]"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <div className="mb-2 text-red-500">
                  {errors.password && <p>{errors.password}</p>}
                </div>
              </div>

              {/* Login Button */}

              <div className="flex justify-center px-[50px]">
                <button
                  type="submit"
                  className="bg-[#FFBF00] w-full rounded-[8px] text-white px-4 py-2 font-semibold  hover:bg-[#f5c800 focus:outline-none focus:shadow-outline-blue"
                >
                  {spinner ? (
                    <div className="flex justify-center items-center ">
                      <div className="relative w-8 h-8 animate-spin rounded-full bg-gradient-to-r from-[#FFEEB9] via-[#FFBF00] to-white">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-gray-200 rounded-full border-2 border-white"></div>
                      </div>
                    </div>
                  ) : (
                    "Log in"
                  )}
                </button>
              </div>
            </form>
            <div className="text-center py-3 text-red-500 font-semibold">
              {" "}
              {invalid && "Incorrect email or password"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
