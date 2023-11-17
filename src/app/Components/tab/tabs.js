"use client";
import React, { useState } from "react";

const Tab = ({ label, active, onClick }) => {
  return (
    <button
      className={`md:text-lg m-2 ${
        active
          ? "bg-white text-primary font-semibold"
          : " text-white  hover:bg-white hover:text-primary "
      } py-2 px-4 rounded-lg focus:outline-none transition-all duration-300`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const switchTab = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="w-full">
      <div className="flex justify-around flex-wrap bg-primary p-5 rounded-lg">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            active={index === activeTab}
            onClick={() => switchTab(index)}
          />
        ))}
      </div>
      <div className="py-8 bg-white rounded-b-lg transition-all duration-300">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${
              activeTab === index ? "block" : "hidden"
            } transition-all duration-300`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
