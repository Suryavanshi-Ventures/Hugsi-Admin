import React from "react";
import FormSection from "../form section/form_section";
import Image from "next/image";

const SettingsHome = () => {
  return (
    <div>
      {/* BANNER IMAGE */}
      <section>
        <Image
          height={220}
          width={2000}
          alt="banner image"
          src="/images/Doctor dashboard/settings/settings_banner_image.svg"
          className="rounded-xl w-full min-h-[100px]"
        ></Image>
      </section>
      <section>
        <FormSection />
      </section>
    </div>
  );
};

export default SettingsHome;
