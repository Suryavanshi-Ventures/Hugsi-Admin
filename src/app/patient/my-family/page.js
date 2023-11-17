import Image from "next/image";
import React from "react";
import InnerHome from "./inner home/inner_home";

const MyAppointmentHome = () => {
  return (
    <main>
      {/* HERO BANNER SECTION */}
      <section className="shadow-lg rounded-3xl">
        <div
          className=" bg-no-repeat bg-cover rounded-3xl grid max-md:p-5 md:grid-cols-3 items-center md:px-16 "
          style={{
            backgroundImage:
              "url('/images/Doctor dashboard/home/home_banner_img.svg')",
          }}
        >
          {/* TEXT SECTION */}
          <div className="max-md:order-2 max-md:mt-5 md:col-span-2 ">
            <h1 className="mb-3 font-bold text-xl md:text-3xl text-white">
              My Family
            </h1>
            <p className="mb-7 text-white text-xs md:text-base">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>

            <div>
              <button className="py-2 px-4 text-sm md:text-base border rounded-md font-bold bg-white text-primary transition-all duration-[0.3s]">
                Find a Doctor
              </button>
            </div>
          </div>

          {/* IMAGE SECTION */}
          <div className="flex justify-center min-[992px]:justify-end min-h-[210px] items-end">
            <Image
              width={400}
              height={400}
              src="/images/Patient dashboard/my familiy/my_family_banner_image.svg"
              alt="doctor image"
            ></Image>
          </div>
        </div>
      </section>
      {/* DATA SECTIOn */}
      <InnerHome />
    </main>
  );
};

export default MyAppointmentHome;
