"use client";
import React, { useState } from "react";
import PhoneInput from "../../../../home/signup-user/phone input/phone_input";
import LoadingButton from "@/Main Common Components/Loading Button/loading_button";

const FormSection = () => {
  const [FormData, setFormData] = useState({
    fullName: "",
    userName: "",
    bio: "",
    email: "",
    phone: "",
  });
  const newErrors = {};

  const [EditDetailsMode, setEditDetailsMode] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const [ErrorsInputFields, setInputFieldsErrors] = useState({});

  const FormValidation = () => {
    if (!FormData.fullName) {
      newErrors.fullName = "Full Name is required";
    }
    if (!FormData.userName) {
      newErrors.userName = "User Name is required";
    }
    if (!FormData.bio) {
      newErrors.bio = "Bio is required";
    }
    if (!FormData.email || !/^\S+@\S+\.\S+$/.test(FormData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!FormData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (FormData.phone.length < 10) {
      newErrors.phone =
        "Invalid phone number, Number can not be less than (10 digits)";
    } else if (FormData.phone.length > 10) {
      newErrors.phone =
        "Invalid phone number, Number can not be more than (10 digits)";
    }

    console.log(newErrors);
    setInputFieldsErrors(newErrors);

    // Return true if there are no ErrorsInputFields
    return Object.keys(newErrors).length === 0;
  };

  const OnInputValueChange = (e) => {
    setFormData({
      ...FormData,
      [e.target.name]: e.target.value,
    });
  };

  const OnSubmitForm = () => {
    setIsLoading(true);
    console.log("CLICKE");
    if (FormValidation()) {
      // Handle form submission (e.g., send data to the server)
      console.log("Form data:", FormData);
    }
  };

  return (
    <div>
      {/* PROFILE IMAGE SECTION */}
      <div className="flex max-[1300px]:translate-y-[-40px] justify-center md:justify-between items-center max-[1300px]:flex-col">
        <div>
          <svg
            className="border-[5px] border-white rounded-full  min-[1300px]:translate-y-[-40px] min-[1300px]:translate-x-10"
            height="100"
            viewBox="0 0 512 512"
            width="100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Layer_2" data-name="Layer 2">
              <g id="Social_Icon" data-name="Social Icon">
                <g id="User">
                  <circle cx="256" cy="256" fill="#07c" r="256" />
                  <g fill="#fff">
                    <path d="m414.75 361.86a25.25 25.25 0 0 1 -5.13 22.22 200 200 0 0 1 -307.24 0 25.25 25.25 0 0 1 -5.13-22.22 163.57 163.57 0 0 1 57.56-89.32 24.77 24.77 0 0 1 30-.43c19 14.13 43.91 22.69 71.15 22.69s52.14-8.56 71.15-22.69a24.77 24.77 0 0 1 30 .43 163.57 163.57 0 0 1 57.64 89.32z" />
                    <circle cx="256" cy="169.89" r="91.89" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div className="flex max-xs:justify-center max-xs:flex-wrap justify-between self-start w-full min-[1300px]:w-[80%] min-[1600px]:w-[88%] mt-5">
          <h1 className="max-xs:mb-4 w-full font-bold text-lg md:text-2xl  text-[#3B3E45]">
            Settings
          </h1>

          <div>
            {EditDetailsMode ? (
              <div className="flex  items-center">
                <div className="mr-5">
                  <button
                    onClick={() => {
                      setIsLoading(false);
                      setInputFieldsErrors({});
                      setEditDetailsMode(!EditDetailsMode);
                    }}
                    className="text-sm md:text-base font-medium border border-primary px-4  py-2 rounded-lg hover:bg-primary hover:text-white transition-all duration-[0.3s]"
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <span onClick={OnSubmitForm}>
                    <LoadingButton
                      style="text-sm md:text-base font-medium border bg-primary text-white border-primary px-4  py-2 rounded-lg hover:bg-white hover:text-black transition-all duration-[0.3s]"
                      text="Save"
                      spinnerWidth="25"
                      spinnerHeight="25"
                      loading={IsLoading}
                    />
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setEditDetailsMode(!EditDetailsMode)}
                  className="text-sm md:text-base font-medium border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all duration-[0.3s]"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FORM SECTION */}
      <div>
        <div className="bg-[#FBFBFB] border border-[#CECECE] rounded-xl min-h-[300px]">
          <form className="px-9 py-10">
            <div className="grid  grid-cols-1 md:grid-cols-2 gap-x-20">
              {/* FULL NAME */}
              <div className="mb-5">
                <label
                  htmlFor="fullName"
                  className="inline-block mb-3 text-sm md:text-base text-[#4C535F]"
                >
                  Full name*
                </label>
                <input
                  disabled={!EditDetailsMode}
                  type="text"
                  name="fullName"
                  placeholder="Please Enter Full Name"
                  value={FormData.fullName}
                  onChange={OnInputValueChange}
                  className={`w-full disabled:bg-[#EDF2F6] disabled:text-[#8D98AA] disabled:cursor-not-allowed border focus-visible:outline-primary border-[#CECECE] rounded-lg p-3 text-xs md:text-sm ${
                    ErrorsInputFields.fullName ? "border-red-500" : ""
                  }`}
                />
                {ErrorsInputFields.fullName && (
                  <p className="text-red-500">{ErrorsInputFields.fullName}</p>
                )}
              </div>

              {/* EMAIL  */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="inline-block mb-3 text-sm md:text-base text-[#4C535F]"
                >
                  Email*
                </label>
                <input
                  disabled={!EditDetailsMode}
                  type="text"
                  name="email"
                  placeholder="Please Enter Email"
                  value={FormData.email}
                  onChange={OnInputValueChange}
                  className={`w-full disabled:bg-[#EDF2F6] disabled:text-[#8D98AA] disabled:cursor-not-allowed border focus-visible:outline-primary border-[#CECECE] rounded-lg p-3 text-xs md:text-sm ${
                    ErrorsInputFields.email ? "border-red-500" : ""
                  }`}
                />
                {ErrorsInputFields.email && (
                  <p className="text-red-500">{ErrorsInputFields.email}</p>
                )}
              </div>

              {/* USER NAME */}
              <div className="mb-5">
                <label
                  htmlFor="fullName"
                  className="inline-block mb-3 text-sm md:text-base text-[#4C535F]"
                >
                  User name*
                </label>
                <input
                  disabled={!EditDetailsMode}
                  type="text"
                  name="userName"
                  placeholder="Please Enter User Name"
                  value={FormData.userName}
                  onChange={OnInputValueChange}
                  className={`w-full disabled:bg-[#EDF2F6] disabled:text-[#8D98AA] disabled:cursor-not-allowed border focus-visible:outline-primary border-[#CECECE] rounded-lg p-3 text-xs md:text-sm ${
                    ErrorsInputFields.userName ? "border-red-500" : ""
                  }`}
                />
                {ErrorsInputFields.userName && (
                  <p className="text-red-500">{ErrorsInputFields.userName}</p>
                )}
              </div>
              {/* Phone   */}
              <div className="mb-5">
                <div>
                  <label
                    htmlFor="fullName"
                    className="inline-block mb-3 text-sm md:text-base text-[#4C535F]"
                  >
                    Phone*
                  </label>
                  <div className="border border-[#CECECE] flex max-xs:flex-wrap rounded-lg">
                    <div
                      className={` ${
                        !EditDetailsMode ? "bg-[#EDF2F6]" : ""
                      } disabled:bg-[#EDF2F6] disabled:text-[#8D98AA] disabled:cursor-not-allowed `}
                    >
                      <PhoneInput />
                    </div>

                    <input
                      disabled={!EditDetailsMode}
                      type="number"
                      id="phone"
                      min={0}
                      maxLength="10"
                      name="phone"
                      placeholder="Please Enter Phone"
                      value={FormData.phone}
                      onChange={OnInputValueChange}
                      className={`w-full disabled:bg-[#EDF2F6] disabled:text-[#8D98AA] disabled:cursor-not-allowed border focus-visible:outline-primary  p-3 text-xs md:text-sm ${
                        ErrorsInputFields.phone ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {ErrorsInputFields.phone && (
                    <p className="text-red-500">{ErrorsInputFields.phone}</p>
                  )}
                </div>
              </div>
              {/* BIO */}
              <div className="mb-5 md:col-span-2">
                <label
                  htmlFor="bio"
                  className="inline-block mb-3 text-sm md:text-base text-[#4C535F]"
                >
                  Bio*
                </label>
                <textarea
                  disabled={!EditDetailsMode}
                  type="text"
                  name="bio"
                  rows={4}
                  placeholder="Please Enter Something..."
                  value={FormData.bio}
                  onChange={OnInputValueChange}
                  className={`w-full disabled:bg-[#EDF2F6] disabled:text-[#8D98AA] disabled:cursor-not-allowed border focus-visible:outline-primary border-[#CECECE] rounded-lg p-3 text-xs md:text-sm ${
                    ErrorsInputFields.bio ? "border-red-500" : ""
                  }`}
                />
                {ErrorsInputFields.bio && (
                  <p className="text-red-500">{ErrorsInputFields.bio}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
