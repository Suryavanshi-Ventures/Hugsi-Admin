"use client";
import Skeleton from "@/app/Components/skeleton/page";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const modalRef = useRef(null);
  const [que, setQue] = useState("");
  const [QueError, setQueError] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [OptionAError, setOptionAError] = useState("");
  const [OptionBError, setOptionBError] = useState("");
  const [OptionCError, setOptionCError] = useState("");

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

  // LIST API
  const listBlog = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin_get_quiz`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response) {
        throw new Error("Failed to fetch list");
      }
      const quizData = await response.json();
      console.log("quizData", quizData);
      if (quizData.status_code === 200) {
        setQuiz(quizData.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // ADD API
  async function handleSubmit(e) {
    e.preventDefault();

    setQueError(!que);
    setOptionAError(!optionA);
    setOptionBError(!optionB);
    setOptionCError(!optionC);

    if (!que || !optionA || !optionB || !optionC) {
      return;
    }

    const formData = new FormData();
    formData.append("que", que);
    // formData.append("optionA", optionA);
    // formData.append("optionB", optionB);
    // formData.append("optionC", optionC);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin_add_que`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowAddQuestionModal(false);
    } catch (error) {
      setShowAddQuestionModal(false);
      alert("Somthing went wrong");
    }
  }

  const toggleAnswer = (index) => {
    const updatedQuiz = [...quiz];
    updatedQuiz[index].showAnswer = !updatedQuiz[index].showAnswer;
    setQuiz(updatedQuiz);
  };

  useEffect(() => {
    listBlog();
  }, []);

  const toggleContactModal = () => {
    setShowAddQuestionModal(!showAddQuestionModal);
  };

  return (
    <div>
      {showAddQuestionModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-sm bg-gray-300 bg-opacity-50 z-50">
          <div
            ref={modalRef}
            className="bg-white p-8 rounded-lg relative max-sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6"
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
                <div className="flex justify-center w-full">
                  <input
                    type="text"
                    placeholder="Enter your answer"
                    onChange={(e) => setOptionA(e.target.value)}
                    className="cursor-pointer border border-[#C7C7C7] shadow-md px-4 py-2 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                  />
                </div>
                {OptionAError && (
                  <div className="text-red-500">OptionA is mandatory</div>
                )}
              </div>
              <div className="space-y-2">
                <label>Option B</label>
                <div className="flex justify-center w-full">
                  <input
                    type="text"
                    placeholder="Enter your answer"
                    onChange={(e) => setOptionB(e.target.value)}
                    className="cursor-pointer border border-[#C7C7C7] shadow-md px-4 py-2 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                  />
                </div>
                {OptionBError && (
                  <div className="text-red-500">OptionB is mandatory</div>
                )}
              </div>
              <div className="space-y-2">
                <label>Option C</label>
                <div className="flex justify-center w-full">
                  <input
                    type="text"
                    placeholder="Enter your answer"
                    onChange={(e) => setOptionC(e.target.value)}
                    className="cursor-pointer border border-[#C7C7C7] shadow-md px-4 py-2 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                  />
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
      )}

      <div className="flex items-center justify-between my-5">
        <div className="flex justify-center items-center">
          <h2 className="text-lg font-semibold  ">Quiz</h2>
        </div>

        <div className="flex items-center  gap-5">
          <div onClick={toggleContactModal} className="flex items-center">
            <Image src="/icons/addition.svg" alt="Add" width={20} height={20} />
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        {loading ? (
          <Skeleton />
        ) : (
          <>
            {quiz.map((question, i) => (
              <div key={i} className="flex justify-between mb-2">
                <div className="flex flex-col border border-[#FFBF00] rounded-md px-3 py-2">
                  <div className="flex">
                    <h3>
                      <span className="font-semibold">{i + 1}.</span>{" "}
                      <span className="font-normal text-base">
                        {question.que}
                      </span>
                    </h3>
                  </div>
                  <div
                    style={{ display: question.showAnswer ? "block" : "none" }}
                    className="px-6 pb-4 pt-2"
                  >
                    <div>
                      {Object.values(question.answers).map((answer, j) => (
                        <div key={j} className="flex items-center">
                          <input
                            type="radio"
                            id={`answer-${j}`}
                            name="answer"
                            style={{
                              appearance: "none",
                              width: "12px",
                              height: "12px",
                              borderRadius: "50%",
                              border: "2px solid #FFBF00",
                              marginRight: "6px",
                            }}
                          />
                          <label htmlFor={`answer-${j}`} className="ml-2">
                            <h4>{answer.ans}</h4>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  {/* TOGGLE BUTTON */}
                  <Image
                    src="/icons/downArrow.svg"
                    alt="Down Arrow"
                    width={20}
                    height={20}
                    onClick={() => toggleAnswer(i)}
                  />
                  {/* EDIT BUTTON */}
                  <Image
                    src="/icons/editing.svg"
                    alt="Edit"
                    width={20}
                    height={20}
                  />
                  {/* DELETE BUTTON */}
                  <Image
                    src="/icons/delete.svg"
                    alt="Delete"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            ))}
          </>
        )}

        {/* <Pagination
          totalUsers={users.length}          usersPerPage={usersPerPage}
          currentPage={currentPage}
          onPageChange={paginate}
        /> */}
      </div>
    </div>
  );
};

export default Page;
