import Image from "next/image";
import React from "react";

const BodyTest = () => {
  const PatientOverview = [
    {
      title: "BMI (Body Mass Index)",
      category: "BMI",
      level: 37.49,
      status: "High Exposure",
      icon: "/icons/Patient dashboard icons/Patient overview icons/bmi_human_icon.svg",
    },
    {
      title: "BP (Blood Pressure)",
      category: "Diastolic",
      level: 90,
      status: "Low Exposure",
      icon: "/icons/Patient dashboard icons/Patient overview icons/stethoscope_icon.svg",
    },
    ,
    {
      title: "Blood Sugar (Diabetics)",
      category: "Fasting",
      level: 80,
      status: "Normal",
      icon: "/icons/Patient dashboard icons/Patient overview icons/blood_sugar_icon.svg",
    },
    {
      title: "Blood Sugar (Diabetics)",
      category: "Non Fasting",
      level: 110,
      status: "Normal",
      icon: "/icons/Patient dashboard icons/Patient overview icons/blood_sugar_icon.svg",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 xs:grid-cols-2  min-[1300px]:grid-cols-4 gap-14">
        {PatientOverview.map((data, index) => {
          return (
            <div key={index} className="shadow-md rounded-2xl">
              <h4 className="text-center text-sm my-3">{data.title}</h4>
              <hr />
              {/* DETAILS SECTION */}
              <div className="px-4 py-2 ">
                <div
                  className={`rounded-lg p-[10px] ${
                    data.status === "High Exposure"
                      ? "bg-[#FFF6F7]"
                      : data.status === "Low Exposure"
                      ? "bg-[#EEF9F3]"
                      : data.status === "Normal"
                      ? "bg-[#F2FBFF]"
                      : ""
                  }`}
                >
                  {/* MIDDLE SECTION */}
                  <div className="grid grid-cols-2 items-center my-8">
                    <div className="flex justify-center items-center min-h-[80px]">
                      <Image
                        height={60}
                        width={60}
                        alt={data.title + "icon"}
                        src={data.icon}
                      ></Image>
                    </div>
                    <div>
                      <div
                        className={`rounded-md p-[10px] ${
                          data.status === "High Exposure"
                            ? "bg-[#F6EDEE]"
                            : data.status === "Low Exposure"
                            ? "bg-[#E6F1ED]"
                            : data.status === "Normal"
                            ? "bg-[#E9F2F7]"
                            : ""
                        }`}
                      >
                        <p className="text-xs font-medium">{data.category}</p>
                        <h5 className="font-bold">{data.level}</h5>
                      </div>
                    </div>
                  </div>

                  <hr />
                  {/* BUTTON SECTION */}
                  <div
                    className={`mt-4 py-3 text-center rounded-md ${
                      data.status === "High Exposure"
                        ? "bg-[#FFE3E2]"
                        : data.status === "Low Exposure"
                        ? "bg-[#CEEFE8]"
                        : data.status === "Normal"
                        ? "bg-[#BDE7FD]"
                        : ""
                    }`}
                  >
                    <p
                      className={`font-bold ${
                        data.status === "High Exposure"
                          ? "text-[#F28281]"
                          : data.status === "Low Exposure"
                          ? "text-[#59C0AD]"
                          : data.status === "Normal"
                          ? "text-[#6AAFD0]"
                          : ""
                      }`}
                    >
                      {data.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BodyTest;
