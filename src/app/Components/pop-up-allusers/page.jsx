// UserProfileModal.js
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

const UserProfileModal = ({ user, onClose }) => {
  const [users, setUsers] = useState([]);
  // console.log(user,"id")
  // -----------------------------------------
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin_get_user?id=${user}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!users) {
    return null;
  }

 
  // --------------------------------------------

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
      <div className="w-[800px] max-h-[80vh] overflow-hidden bg-white rounded-lg flex flex-col">
        <div className="bg-[#FFBF00] w-full columns-2 flex justify-end p-6 rounded-t">
          <div className="float-right pr-10">
            <h3 className="text-white text-md font-bold text-xl">
              Profile Details
            </h3>
          </div>

          <div className="w-2/5 float-right">
            <Image
              src="/icons/close.png"
              alt="Close"
              onClick={onClose}
              className="float-right cursor-pointer transition-transform transform hover:scale-125"
              width={30}
              height={30}
            />
          </div>
        </div>

        <div className="overflow-y-auto p-4">
          <div className="flex py-6 px-14 gap-8">
            <div className="">
              <Image
                src={users?.profile_pic || "/na.png"}
                alt={`${users?.name}`}
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>

            <div>
              <div className="row cloumns-2 flex justify-between pb-2.5">
                <div className="col">
                  <h4>
                    Full Name:{" "}
                    <span className="text-[#767676]">
                      {users?.name || "N/A"}
                    </span>
                  </h4>
                </div>
                <div className="col">
                  <h4 className="pr-4">
                    Email:{" "}
                    <span className="text-[#767676]">
                      {users?.email || "N/A"}
                    </span>
                  </h4>
                </div>
              </div>
              <hr className="text-[#D9D9D9] border-[1px]" />

              <div className="row cloumns-2 flex justify-between py-2.5">
                <div className="col">
                  <h4>
                    Phone Number:{" "}
                    <span className="text-[#767676]">
                      {users?.phone || "N/A"}
                    </span>
                  </h4>
                </div>
                <div className="col">
                  <h4 className="pr-4">
                    DOB:{" "}
                    <span className="text-[#767676]">
                      {users?.dob || "N/A"}
                    </span>
                  </h4>
                </div>
              </div>
              <hr className="text-[#D9D9D9] border-[1px]" />

              <div className="row cloumns-2 flex justify-between py-2.5">
                <div className="col">
                  <h4>
                    Connections :{" "}
                    <span className="text-[#767676]">
                      {" "}
                      {users?.connections}
                    </span>
                  </h4>
                </div>
                <div className="col">
                  <h4 className="pr-4">
                    Gift Search:{" "}
                    <span className="text-[#767676]">
                      {users?.gift_search || "N/A"}
                    </span>
                  </h4>
                </div>
              </div>
              <hr className="text-[#D9D9D9] border-[1px]" />

              <div className="row cloumns-2 flex justify-between py-2.5">
                <div className="col">
                  <h4>Gift Language: </h4>
                  <div >
                    {Object.entries(users?.gift_lan || {}).map(
                      ([key, value]) => (
                        <p key={key}>
                          {key}: <span className="text-[#767676]">{value}%,</span>{" "}
                        </p>
                      )
                    )}
                  </div>
                </div>

                <div className="columns-3 flex flex-row">
                  <div className="col">
                    <span className="text-[#767676]"></span>
                  </div>
                </div>
              </div>
              <hr className="text-[#D9D9D9] border-[1px]" />

              <div className="row cloumns-2 flex flex-col py-2.5">
                <h4>Psychological Q/A : </h4>
                <div>
                  {users?.psych_ans &&
                    users?.psych_ans.map((data, index) => (
                      <div key={index}>
                        <h4>Q. {data.que}</h4>
                        <h4 className="text-[#767676]">A. {data.ans}</h4>
                      </div>
                    ))}
                </div>
              </div>
              <hr className="text-[#D9D9D9] border-[1px]" />

              <div className="row cloumns-4 flex justify-between py-2.5">
                <div className="col">
                  <h4>
                    Interests:{" "}
                    <span className="text-[#767676]">
                      {" "}
                      {users?.interest &&
                        users?.interest.map((data, index) => data).join(", ")}
                    </span>
                  </h4>
                </div>

                <div className="col">
                  <span className="text-[#767676]"></span>
                </div>
              </div>
              <hr className="text-[#D9D9D9] border-[1px]" />

              <div className="row cloumns-2 flex flex-col justify-between py-2.5">
                <div className="col">
                  <h4>Wishlist: </h4>
                </div>
                {users?.wishlist &&
                  users?.wishlist.map((data, index) => (
                    <div key={index}>
                      <div className="row columns-2">
                        <div className="col">
                          <h4>
                            Name:{" "}
                            <span className="text-[#767676]">{data.name}</span>
                          </h4>
                        </div>

                        <div className="col">
                          <h4>
                            Image Link:{" "}
                            {data?.link ? (
                              <Link
                                href={data?.link}
                                className="text-[#767676] "
                              >
                                {data?.link}
                              </Link>
                            ) : (
                              "N/A"
                            )}
                          </h4>
                        </div>
                      </div>

                      <div className="col">
                        <h4>
                          Price :{" "}
                          <span className="text-[#767676]">{data.price}</span>
                        </h4>
                      </div>
                    </div>
                  ))}
              </div>
              <hr className="text-[#D9D9D9] border-[1px]" />

              <div className="row cloumns-2 flex flex-col justify-between pt-2.5">
                <div className="col">
                  <h4>Strength </h4>
                </div>

                <div>
                  <div className="row columns-3">
                    <div className="col">
                      <h4>
                        Gift Language: <span>{users?.strength?.items?.gift_lan ?? 0}%,</span> 
                      </h4>
                    </div>

                    <div className="col">
                      <h4>Interest: <span className="text-[#767676]">{users?.strength?.items?.interest}%,</span> </h4>
                      <h4>
                        Profile Pic: <span className="text-[#767676]">{users?.strength?.items?.profile_pic ?? 0} %,</span> 
                       
                      </h4>
                    </div>
                  </div>

                  <div className="row columns-2">
                    <div className="col">
                      <h4>
                        Physiological Answer:{" "}
                      <span className="text-[#767676]">{users?.strength?.items?.psych_ans ?? 0}%,</span>  
                      </h4>
                    </div>

                    <div className="col">
                      <h4>
                        Wishlist: <span className="text-[#767676]">{users?.strength?.items?.wishlist ?? 0}%</span> 
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
