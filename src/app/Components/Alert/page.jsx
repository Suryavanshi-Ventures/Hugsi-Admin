import { useEffect, useState } from "react";

const CustomAlert = ({ message, duration, onClose, position, type }) => {
  const [showSnackBar, setShowSnackBar] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSnackBar(false);
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  const GetPositionStyles = () => {
    switch (position) {
      case "top":
        return "top-4 left-1/2 transform -translate-x-1/2";
      case "bottom":
        return "bottom-4 left-1/2 transform -translate-x-1/2";
      case "center":
        return "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
      case "top-right":
        return "top-4 left-4";
      case "bottom-right":
        return "bottom-0 right-0";
      case "center-right":
        return "top-1/2 right-0 transform translate-y-1/2";
      default:
        return "top-0 right-0";
    }
  };

  const TypeOfAlert = {
    success: "text-[#218D26]",
    danger: "text-[#FF0000]",
    info: "text-[#2196F3]",
  }[type];

  return (
    <div
      className={`fixed rounded-lg max-w-fit z-[9999] left-0 right-0 p-4 bg-white shadow-md transition-transform duration-300 transform ease-in-out ${GetPositionStyles()} ${TypeOfAlert} ${
        showSnackBar ? "" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center">
        <div className="mr-2">
          {type === "success" ? (
            <svg
              width="17"
              height="17"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.4063 24.1992C5.77865 24.1992 0.40625 18.8268 0.40625 12.1992C0.40625 5.57162 5.77865 0.199219 12.4063 0.199219C19.0339 0.199219 24.4063 5.57162 24.4063 12.1992C24.4063 18.8268 19.0339 24.1992 12.4063 24.1992ZM11.2099 16.9992L19.6939 8.51402L17.9971 6.81722L11.2099 13.6056L7.81505 10.2108L6.11825 11.9076L11.2099 16.9992Z"
                fill="#218D26"
              />
            </svg>
          ) : type === "danger" ? (
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3177_1380)">
                <path
                  d="M11.7072 0C5.25159 0 0 5.25159 0 11.7072C0 18.1628 5.25159 23.4144 11.7072 23.4144C18.1628 23.4144 23.4144 18.1628 23.4144 11.7072C23.4144 5.25159 18.1628 0 11.7072 0Z"
                  fill="#FF0000"
                />
                <path
                  d="M16.0179 14.6383C16.3993 15.0198 16.3993 15.6363 16.0179 16.0179C15.8276 16.2081 15.5779 16.3037 15.328 16.3037C15.0783 16.3037 14.8285 16.2081 14.6383 16.0179L11.7067 13.0861L8.77504 16.0179C8.58479 16.2081 8.33505 16.3037 8.08532 16.3037C7.8354 16.3037 7.58567 16.2081 7.39542 16.0179C7.01403 15.6363 7.01403 15.0198 7.39542 14.6383L10.3272 11.7067L7.39542 8.77504C7.01403 8.39347 7.01403 7.77699 7.39542 7.39542C7.77699 7.01403 8.39347 7.01403 8.77504 7.39542L11.7067 10.3272L14.6383 7.39542C15.0198 7.01403 15.6363 7.01403 16.0179 7.39542C16.3993 7.77699 16.3993 8.39347 16.0179 8.77504L13.0861 11.7067L16.0179 14.6383Z"
                  fill="#FAFAFA"
                />
              </g>
              <defs>
                <clipPath id="clip0_3177_1380">
                  <rect width="23.4144" height="23.4144" fill="white" />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1191 23.9961C18.6808 23.9961 24 18.6769 24 12.1152C24 5.55362 18.6808 0.234375 12.1191 0.234375C5.55752 0.234375 0.238281 5.55362 0.238281 12.1152C0.238281 18.6769 5.55752 23.9961 12.1191 23.9961Z"
                fill="#2196F3"
              />
              <path
                d="M12.1218 8.11084C12.942 8.11084 13.6069 7.44593 13.6069 6.62573C13.6069 5.80553 12.942 5.14062 12.1218 5.14062C11.3016 5.14062 10.6367 5.80553 10.6367 6.62573C10.6367 7.44593 11.3016 8.11084 12.1218 8.11084Z"
                fill="white"
              />
              <path
                d="M12.1184 19.0984C11.8033 19.0984 11.5011 18.9733 11.2783 18.7505C11.0554 18.5276 10.9303 18.2255 10.9303 17.9104V11.9699C10.6152 11.9699 10.313 11.8447 10.0902 11.6219C9.86736 11.3991 9.74219 11.0969 9.74219 10.7818C9.74219 10.4667 9.86736 10.1645 10.0902 9.94173C10.313 9.71892 10.6152 9.59375 10.9303 9.59375H12.1184C12.4335 9.59375 12.7357 9.71892 12.9585 9.94173C13.1813 10.1645 13.3064 10.4667 13.3064 10.7818V17.9104C13.3064 18.2255 13.1813 18.5276 12.9585 18.7505C12.7357 18.9733 12.4335 19.0984 12.1184 19.0984Z"
                fill="white"
              />
              <path
                d="M13.3064 19.0988H10.9303C10.6152 19.0988 10.313 18.9737 10.0902 18.7508C9.86736 18.528 9.74219 18.2258 9.74219 17.9107C9.74219 17.5956 9.86736 17.2934 10.0902 17.0706C10.313 16.8478 10.6152 16.7227 10.9303 16.7227H13.3064C13.6215 16.7227 13.9237 16.8478 14.1465 17.0706C14.3694 17.2934 14.4945 17.5956 14.4945 17.9107C14.4945 18.2258 14.3694 18.528 14.1465 18.7508C13.9237 18.9737 13.6215 19.0988 13.3064 19.0988Z"
                fill="white"
              />
            </svg>
          )}
        </div>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default CustomAlert;
