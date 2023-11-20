"use client";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { signOut } from "next-auth/react";

const Sidebar = () => {
  // const { data: session, status } = useSession();

  const [SideBarOpen, setSideBarOpen] = useState(true);
  const [ScreenWidth, setScreenWidth] = useState(0);  
  const UrlPath = usePathname();
  const drawerRef = useRef(null);

  const [AlertDetails, setAlertDetails] = useState({
    isOpen: false,
    message: "",
    duration: 3000,
    position: "bottom",
    type: "success",
  });

  // const Role = session.user.role;

  const LinksPatient = [
    {
      title: "Overview",
      link: "/Dashboard/overview",
      src: "/icons/overview-icon.png",
    },
    {
      title: "All Users",
      link: "/Dashboard/All-users",
      src: "/icons/all-usernnew.png",
    },
    
  ];
 
  useEffect(() => {
    // Check if window is defined (available in the browser)
    if (typeof window !== "undefined") {
      // Initialize ScreenWidth after ensuring window is defined
      setScreenWidth(window.innerWidth);
  
      // Define a function to update the screen ScreenWidth
      function OnWindowResize() {
        setScreenWidth(window.innerWidth);
  
        if (window.innerWidth >= 992) {
          setSideBarOpen(true);
        } else {
          setSideBarOpen(false);
        }
      }
  
      // Add an event listener for the window's resize event
      window.addEventListener("resize", OnWindowResize);
  
      // Cleanup the event listener when the component unmounts
      return () => {
        window.removeEventListener("resize", OnWindowResize);
      };
    }
  }, []);
  
  

  const OnClickOutSide = (event) => {
    if (
      drawerRef.current &&
      !drawerRef.current.contains(event.target) &&
      ScreenWidth <= 992
    ) {
      setSideBarOpen(false);
    }
  };

  useEffect(() => {
    if (SideBarOpen) {
      // Attach the event listener when the drawer is open
      document.addEventListener("mousedown", OnClickOutSide);
    } else {
      // Remove the event listener when the drawer is closed
      document.removeEventListener("mousedown", OnClickOutSide);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", OnClickOutSide);
    };
  }, [SideBarOpen, ScreenWidth]);

  const OnClickLogout = async () => {
    // Adding  4 mili seconds delay to logout to show logout alert
    setTimeout(async () => {
      const LogOutResponse = await signOut({ redirect: false });
    }, 400);

    //  logout alert
    setAlertDetails({
      isOpen: true,
      message: "Logout Successfully!",
      duration: 3000,
      position: "top",
      type: "success",
    });
  };

  return (
    <>
      {AlertDetails.isOpen && (
        <div
          message={AlertDetails.message}
          duration={AlertDetails.duration}
          onClose={() =>
            setAlertDetails({
              ...AlertDetails,
              isOpen: false,
            })
          }
          position={AlertDetails.position}
          type={AlertDetails.type}
        />
      )}
      <div
        ref={drawerRef}
        className={`max-[992px]:absolute inset-y-0 left-0 z-50 w-[250px] max-[992px]:w-[45vw] h-screen bg-[#FFEEB9]  transform transition-transform ease-in-out duration-300 ${
          SideBarOpen ? "translate-x-0 " : "-translate-x-full fixed"
        }`}
      >
        {/* CLOSE DRAWER BUTTON */}

        <div className="flex justify-end m-4">
          <div
            className="bg-primary  cursor-pointer top-7 right-4  text-white rounded-full text-center flex justify-center items-center w-8 h-8 z-[50] min-[992px]:hidden "
            onClick={() => setSideBarOpen(false)}
          >
            X
          </div>
        </div>

        {/* LOGO div */}
        <div className="flex justify-center items-center  px-4">
          <div text="Go To Home">
            <Link href="/" className="p-4">
              <Image
                src={"/hugsi-logo.webp"}
                height={75}
                width={86}
                alt="hugsi-logo"
              ></Image>
            </Link>
          </div>
        </div>

        {/* SIDE NAV LINKS */}
        <ul className="p-3">
          {/* {Role === "doctor" && ( */}
            <>
              {/* {LinksDoctor.map((data, index) => {
                const ActivePath =
                  UrlPath.slice(3) === data.link ? true : false;
                return (
                  <li
                    ref={drawerRef}
                    key={index}
                    className={`group ${
                      ActivePath ? "bg-primary text-white" : ""
                    } max-[992px]:p-2 md:p-3 text-xs md:text-base rounded-lg my-3 font-medium text-[#333333] hover:text-white hover:bg-[#1E7BAE] transition-all duration-[0.3] cursor-pointer`}
                  >
                    <Link
                      href={data.link}
                      className="flex items-center min-[992px]:px-3"
                    >
                      <div
                        className={`mr-4 group-hover:bg-white group-hover:p-[6px] rounded-full transition-all duration-[0.3s] ${
                          ActivePath ? "bg-white p-[6px] rounded-full" : ""
                        } `}
                      >
                        <Image
                          width={16}
                          height={16}
                          src={data.src}
                          alt={data.title + "icon"}
                          className="min-w-[16px] min-h-[16px]"
                        ></Image>
                      </div>
                      {data.title === "Logout" && (
                        <p className="break-all" onClick={OnClickLogout}>
                          Logout
                        </p>
                      )}

                      {data.title !== "Logout" && (
                        <p className="break-all">{data.title}</p>
                      )}
                    </Link>
                  </li>
                );
              })} */}
            </>
          {/* ) */}
          {/* } */}

          {/* {"Role" === "patient" && ( */}
            <>
              {LinksPatient.map((data, index) => {
                const ActivePath =
                  UrlPath.slice(3) === data.link ? true : false;
                return (
                  <li
                    ref={drawerRef}
                    key={index}
                    className={`group ${
                      ActivePath ? "bg-primary text-white" : ""
                    } max-[992px]:p-2 md:p-3 text-xs md:text-base rounded-lg my-3 font-medium text-[#333333] hover:text-white hover:bg-[#FFBF00] transition-all duration-[0.3] cursor-pointer`}
                  >
                    <Link
                      href={data.link}
                      className="flex items-center min-[992px]:px-3"
                    >
                      <div
                        className={`mr-4 group-hover:bg-white group-hover:p-[6px] rounded-full transition-all duration-[0.3s] ${
                          ActivePath ? "bg-white p-[6px] rounded-full" : ""
                        } `}
                      >
                        <Image
                          width={16}
                          height={16}
                          src={data.src}
                          alt={data.title + "icon"}
                          className="min-w-[16px] min-h-[16px]"
                        ></Image>
                      </div>

                      <p className="break-all">{data.title}</p>
                    </Link>
                  </li>
                );
              })}
            </>
          {/* )} */}

          {/* LOGOUT BUTTON */}
          <li
            onClick={OnClickLogout}
            className={`group max-[992px]:p-2 md:p-3 text-xs md:text-base rounded-lg my-3 font-medium text-[#333333] hover:text-white hover:bg-[#FFBF00] transition-all duration-[0.3] cursor-pointer`}
          >
            <div className="flex items-center min-[992px]:px-3">
              <div
                className={`mr-4 group-hover:bg-white group-hover:p-[6px] rounded-full transition-all duration-[0.3s]`}
              >
                <Image
                  width={16}
                  height={16}
                  src="/icons/logout-icon.png"
                  alt="logout icon"
                  className="min-w-[16px] min-h-[16px]"
                ></Image>
              </div>

              <p className="break-all">Logout</p>
            </div>
          </li>
        </ul>
      </div>

      {!SideBarOpen && (
        <div
          className="bg-primary cursor-pointer top-4  text-white rounded-full text-center flex justify-center items-center w-8 h-8 z-[50] min-[992px]:hidden max-[992px]:absolute"
          onClick={() => setSideBarOpen(!SideBarOpen)}
        >
          ☰
        </div>
      )}
    </>
  );
};

export default Sidebar;
