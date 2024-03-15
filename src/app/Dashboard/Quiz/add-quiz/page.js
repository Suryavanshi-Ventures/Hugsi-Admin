"use client";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [que, setQue] = useState("");
  const [QueError, setQueError] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [weiA, setWeiA] = useState("");
  const [weiB, setWeiB] = useState("");
  const [weiC, setWeiC] = useState("");
  const [OptionAError, setOptionAError] = useState("");
  const [OptionBError, setOptionBError] = useState("");
  const [OptionCError, setOptionCError] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowAddQuestionModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleContactModal = () => {
    setShowAddQuestionModal(!showAddQuestionModal);
  };

  // ADD API
  async function handleSubmit(e) {
    e.preventDefault();

    // Check if all fields are filled
    if (!que || !optionA || !optionB || !optionC) {
      setQueError(!que);
      setOptionAError(!optionA);
      setOptionBError(!optionB);
      setOptionCError(!optionC);
      return;
    }

    try {
      const data = {
        que: que,
        answers: {
          A: { ans: optionA, wei: weiA },
          B: { ans: optionB, wei: weiB },
          C: { ans: optionC, wei: weiC },
        },
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin_add_que`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowAddQuestionModal(false);
    } catch (error) {
      console.error("Error adding question:", error);
      alert("Something went wrong while adding the question.");
      setShowAddQuestionModal(false);
    }
  }

  return (
    <div>
      <div
        ref={modalRef}
        // className="bg-white p-8 rounded-lg relative max-sm:w-5/6 md:w-4/6 lg:w-3/6"
      >
        <div className="flex flex-col gap-3 items-center">
          <h2 className="text-2xl font-semibold">Add Question</h2>
        </div>
        <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="font-semibold">Question</label>
            <div className="flex justify-center w-full">
              <input
                type="text"
                placeholder="Enter your question"
                onChange={(e) => setQue(e.target.value)}
                className="cursor-pointer border border-[#C7C7C7] shadow-md px-4 py-2 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
              />
            </div>
            {QueError && (
              <div className="text-red-500">Question is mandatory</div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Answer</h3>
            <label>Option A</label>
            <div className="flex gap-2">
              <div className="flex justify-center w-full">
                <input
                  type="text"
                  placeholder="Enter your answer"
                  onChange={(e) => setOptionA(e.target.value)}
                  className="cursor-pointer border border-[#C7C7C7] shadow-md px-4 py-2 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                />
              </div>
              <div className="flex justify-center w-1/2">
                <input
                  type="text"
                  placeholder="Enter your sentiment"
                  onChange={(e) => setWeiA(e.target.value)}
                  className="cursor-pointer border border-[#C7C7C7] shadow-md px-4 py-1 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                />
              </div>
            </div>
            {OptionAError && (
              <div className="text-red-500">OptionA is mandatory</div>
            )}
          </div>
          <div className="space-y-2">
            <label>Option B</label>
            <div className="flex gap-2">
              <div className="flex justify-center w-full">
                <input
                  type="text"
                  placeholder="Enter your answer"
                  onChange={(e) => setOptionB(e.target.value)}
                  className="cursor-pointer border border-[#C7C7C7] shadow-md px-4 py-2 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                />
              </div>
              <div className="flex justify-center w-1/2">
                <input
                  type="text"
                  placeholder="Enter your sentiment"
                  onChange={(e) => setWeiB(e.target.value)}
                  className="cursor-pointer border border-[#C7C7C7] shadow-md px-4 py-1 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                />
              </div>
            </div>
            {OptionBError && (
              <div className="text-red-500">OptionB is mandatory</div>
            )}
          </div>
          <div className="space-y-2">
            <label>Option C</label>
            <div className="flex gap-2">
              <div className="flex justify-center w-full">
                <input
                  type="text"
                  placeholder="Enter your answer"
                  onChange={(e) => setOptionC(e.target.value)}
                  className="cursor-pointer border border-[#C7C7C7] shadow-md px-4 py-2 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                />
              </div>
              <div className="flex justify-center w-1/2">
                <input
                  type="text"
                  placeholder="Enter your sentiment"
                  onChange={(e) => setWeiC(e.target.value)}
                  className="cursor-pointer border border-[#C7C7C7] shadow-md px-4 py-1 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                />
              </div>
            </div>
            {OptionCError && (
              <div className="text-red-500">OptionC is mandatory</div>
            )}
          </div>

          <div className="flex justify-center w-full">
            <button className="bg-[#FFBF00] rounded-md text-white px-4 py-2 w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
