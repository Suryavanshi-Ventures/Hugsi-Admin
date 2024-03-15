"use client";
import Skeleton from "@/app/Components/skeleton/page";
import Image from "next/image";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const modalRef = useRef(null);
  const [que, setQue] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [weiA, setWeiA] = useState(["", 1]);
  const [weiB, setWeiB] = useState(["", 1]);
  const [weiC, setWeiC] = useState(["", 1]);
  const [QueError, setQueError] = useState("");
  const [OptionAError, setOptionAError] = useState("");
  const [OptionBError, setOptionBError] = useState("");
  const [OptionCError, setOptionCError] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [queEdit, setQueEdit] = useState("");
  const [editData, setEditData] = useState([]);
  const [ansAEdit, setAnsAEdit] = useState("");
  const [ansBEdit, setAnsBEdit] = useState("");
  const [ansCEdit, setAnsCEdit] = useState("");
  const [ansAWei, setAnsAWei] = useState([]);
  const [ansBWei, setAnsBWei] = useState([]);
  const [ansCWei, setAnsCWei] = useState([]);

  const handleModalOpen = (data) => {
    setUserToDelete(data);
    setDeleteOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowAddQuestionModal(false);
        setShowEditQuestionModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // LIST API
  const listQuiz = async () => {
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

    if (!que || que.trim() === "") {
      setQueError("Question is mandatory");
      return;
    } else {
      setQueError("");
    }

    if (!optionA || optionA.trim() === "") {
      setOptionAError("Option A is mandatory");
      return;
    } else {
      setOptionAError("");
    }

    if (!optionB || optionB.trim() === "") {
      setOptionBError("Option B is mandatory");
      return;
    } else {
      setOptionBError("");
    }

    if (!optionC || optionC.trim() === "") {
      setOptionCError("Option C is mandatory");
      return;
    } else {
      setOptionCError("");
    }

    try {
      const token = localStorage.getItem("access_token");
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
      listQuiz();
      setShowAddQuestionModal(false);
    } catch (error) {
      console.error("Error adding question:", error);
      setShowAddQuestionModal(false);
    }
  }

  // DELETE API
  const handleDeleteQuiz = async (queId) => {
    try {
      const token = localStorage.getItem("access_token");
      console.log("token", token);

      const data = {
        id: queId,
      };
      console.log("data", data);
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin_del_que`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data,
        }
      );
      setDeleteOpen(false);
      setQuiz((prevQuizList) => prevQuizList.filter((que) => que.id !== queId));
    } catch (error) {
      console.log("Not Deleted", error);
    }
  };

  // UPDATE API
  async function handleUpdate(e) {
    e.preventDefault();
    if (!queEdit || queEdit.trim() === "") {
      setQueError("Question is mandatory");
      return;
    } else {
      setQueError("");
    }

    if (!ansAEdit || ansAEdit.trim() === "") {
      setOptionAError("Option A is mandatory");
      return;
    } else {
      setOptionAError("");
    }

    if (!ansBEdit || ansBEdit.trim() === "") {
      setOptionBError("Option B is mandatory");
      return;
    } else {
      setOptionBError("");
    }

    if (!ansCEdit || ansCEdit.trim() === "") {
      setOptionCError("Option C is mandatory");
      return;
    } else {
      setOptionCError("");
    }

    try {
      const token = localStorage.getItem("access_token");
      const data = {
        id: editData.id,
        que: queEdit,
        answers: {
          A: {
            ans: ansAEdit,
            wei: ansAWei,
          },
          B: {
            ans: ansBEdit,
            wei: ansBWei,
          },
          C: {
            ans: ansCEdit,
            wei: ansCWei,
          },
        },
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin_edit_que`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      listQuiz();
      setShowEditQuestionModal(false);
    } catch (error) {
      console.error("Error editing question:", error);
      setShowEditQuestionModal(false);
    }
  }

  const toggleAnswer = (index) => {
    const updatedQuiz = [...quiz];
    updatedQuiz[index].showAnswer = !updatedQuiz[index].showAnswer;
    setQuiz(updatedQuiz);
  };

  useEffect(() => {
    listQuiz();
  }, []);

  const addModalOpen = () => {
    setShowAddQuestionModal(!showAddQuestionModal);
  };
  const populateAnswerOptions = (question) => {
    setAnsAEdit(question.answers.A.ans);
    setAnsBEdit(question.answers.B.ans);
    setAnsCEdit(question.answers.C.ans);
  };
  const handleEditOpen = (question) => {
    setQueEdit(question.que);
    setEditData(question);
    populateAnswerOptions(question);
    setAnsAWei(question.answers.A.wei);
    setAnsBWei(question.answers.B.wei);
    setAnsCWei(question.answers.C.wei);
    setShowEditQuestionModal(!showEditQuestionModal);
  };
  return (
    <div>
      {/* DELETE QUESTION MODAL */}
      {deleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
          <div className="flex flex-col bg-white rounded-lg p-5 gap-4 z-50">
            {/* <p>Que Id : {userToDelete}</p> */}
            <p>You want to delete this question?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleDeleteQuiz(userToDelete)}
                className="bg-[#FFBF00] opacity-[0.8] rounded-[4px] px-4 py-1 text-white w-fit"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-400 rounded-[4px] px-4 py-1 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD QUESTION MODAL */}
      {showAddQuestionModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-sm bg-gray-300 bg-opacity-50 z-50">
          <div
            ref={modalRef}
            className="bg-white p-8 rounded-lg relative max-sm:w-5/6 md:w-4/6 lg:w-3/6"
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
                    <select
                      onChange={(e) => setWeiA([e.target.value, weiA[1]])}
                      className="cursor-pointer text-gray-400 border border-[#C7C7C7] shadow-md px-4 py-1 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                    >
                      <option value="">Choose sentiments</option>
                      <option value="autonomy">Autonomy</option>
                      <option value="experiences">Experiences</option>
                      <option value="giveforward">Give Forward</option>
                      <option value="materialgoods">Material Goods</option>
                      <option value="timetogether">Time Together</option>
                      <option value="sentimentality">Sentimentality</option>
                    </select>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <select
                      onChange={(e) => {
                        setWeiA([weiA[0], parseInt(e.target.value, 10)]);
                      }}
                      className="cursor-pointer text-gray-400 border border-[#C7C7C7] shadow-md px-1 lg:px-2 xl:px-4 py-1 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
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
                    <select
                      onChange={(e) => setWeiB([e.target.value, weiB[1]])}
                      className="cursor-pointer text-gray-400 border border-[#C7C7C7] shadow-md px-4 py-1 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                    >
                      <option value="">Choose sentiments</option>
                      <option value="autonomy">Autonomy</option>
                      <option value="experiences">Experiences</option>
                      <option value="giveforward">Give Forward</option>
                      <option value="materialgoods">Material Goods</option>
                      <option value="timetogether">Time Together</option>
                      <option value="sentimentality">Sentimentality</option>
                    </select>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <select
                      onChange={(e) =>
                        setWeiB([weiB[0], parseInt(e.target.value, 10)])
                      }
                      className="cursor-pointer text-gray-400 border border-[#C7C7C7] shadow-md px-1 lg:px-2 xl:px-4 py-1 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
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
                    <select
                      onChange={(e) => setWeiC([e.target.value, weiC[1]])}
                      className="cursor-pointer text-gray-400 border border-[#C7C7C7] shadow-md px-4 py-1 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                    >
                      <option value="">Choose sentiments</option>
                      <option value="autonomy">Autonomy</option>
                      <option value="experiences">Experiences</option>
                      <option value="giveforward">Give Forward</option>
                      <option value="materialgoods">Material Goods</option>
                      <option value="timetogether">Time Together</option>
                      <option value="sentimentality">Sentimentality</option>
                    </select>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <select
                      onChange={(e) =>
                        setWeiC([weiC[0], parseInt(e.target.value, 10)])
                      }
                      className="cursor-pointer text-gray-400 border border-[#C7C7C7] shadow-md px-1 lg:px-2 xl:px-4 py-1 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                </div>
                {OptionCError && (
                  <div className="text-red-500">OptionC is mandatory</div>
                )}
              </div>

              <div className="flex justify-center w-full">
                <button className="bg-[#FFBF00] rounded-md text-white px-4 py-2 w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT QUESTION MODAL */}
      {showEditQuestionModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-sm bg-gray-300 bg-opacity-50 z-50">
          <div
            ref={modalRef}
            className="bg-white p-8 rounded-lg relative max-sm:w-5/6 md:w-4/6 lg:w-3/6"
          >
            <div className="flex flex-col gap-3 items-center">
              <h2 className="text-2xl font-semibold">
                Edit Question :{editData.id}
              </h2>
            </div>
            <form className="space-y-5 mt-6" onSubmit={handleUpdate}>
              <div className="space-y-2">
                <label className="font-semibold">Question</label>
                <div className="flex justify-center w-full">
                  <input
                    type="text"
                    value={queEdit}
                    placeholder="Enter your question"
                    onChange={(e) => setQueEdit(e.target.value)}
                    className="cursor-pointer border border-[#C7C7C7] shadow-md px-4 py-2 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                  />
                </div>
                {QueError && (
                  <div className="text-red-500">Question is mandatory</div>
                )}
              </div>
              <h3 className="font-semibold">Answer</h3>
              <div className="space-y-2">
                <label>Option A</label>
                <div className="flex gap-2">
                  <div className="flex justify-center w-full">
                    <input
                      type="text"
                      value={ansAEdit}
                      placeholder="Enter your answer"
                      onChange={(e) => setAnsAEdit(e.target.value)}
                      className="cursor-pointer border border-[#C7C7C7] shadow-md px-4 py-2 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                    />
                  </div>
                  <div className="flex justify-center w-1/2">
                    <select
                      onChange={(e) => setAnsAWei([e.target.value, ansAWei[1]])}
                      value={ansAWei[0]}
                      className="cursor-pointer text-gray-400 border border-[#C7C7C7] shadow-md px-4 py-1 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                    >
                      <option value="">Choose sentiments</option>
                      <option value="autonomy">Autonomy</option>
                      <option value="experiences">Experiences</option>
                      <option value="giveforward">Give Forward</option>
                      <option value="materialgoods">Material Goods</option>
                      <option value="timetogether">Time Together</option>
                      <option value="sentimentality">Sentimentality</option>
                    </select>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <select
                      onChange={(e) =>
                        setAnsAWei([ansAWei[0], parseInt(e.target.value, 10)])
                      }
                      value={ansAWei[1]}
                      className="cursor-pointer text-gray-400 border border-[#C7C7C7] shadow-md px-1 lg:px-2 xl:px-4 py-1 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
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
                      value={ansBEdit}
                      placeholder="Enter your answer"
                      onChange={(e) => setAnsBEdit(e.target.value)}
                      className="cursor-pointer border border-[#C7C7C7] shadow-md px-4 py-2 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                    />
                  </div>
                  <div className="flex justify-center w-1/2">
                    <select
                      onChange={(e) => setAnsBWei([e.target.value, ansBWei[1]])}
                      value={ansBWei[0]}
                      className="cursor-pointer text-gray-400 border border-[#C7C7C7] shadow-md px-4 py-1 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                    >
                      <option value="">Choose sentiments</option>
                      <option value="autonomy">Autonomy</option>
                      <option value="experiences">Experiences</option>
                      <option value="giveforward">Give Forward</option>
                      <option value="materialgoods">Material Goods</option>
                      <option value="timetogether">Time Together</option>
                      <option value="sentimentality">Sentimentality</option>
                    </select>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <select
                      onChange={(e) =>
                        setAnsBWei([ansBWei[0], parseInt(e.target.value, 10)])
                      }
                      value={ansBWei[1]}
                      className="cursor-pointer text-gray-400 border border-[#C7C7C7] shadow-md px-1 lg:px-2 xl:px-4 py-1 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
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
                      value={ansCEdit}
                      placeholder="Enter your answer"
                      onChange={(e) => setAnsCEdit(e.target.value)}
                      className="cursor-pointer border border-[#C7C7C7] shadow-md px-4 py-2 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                    />
                  </div>
                  <div className="flex justify-center w-1/2">
                    <select
                      onChange={(e) => setAnsCWei([e.target.value, ansCWei[1]])}
                      value={ansCWei[0]}
                      className="cursor-pointer text-gray-400 border border-[#C7C7C7] shadow-md px-4 py-1 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                    >
                      <option value="">Choose sentiments</option>
                      <option value="autonomy">Autonomy</option>
                      <option value="experiences">Experiences</option>
                      <option value="giveforward">Give Forward</option>
                      <option value="materialgoods">Material Goods</option>
                      <option value="timetogether">Time Together</option>
                      <option value="sentimentality">Sentimentality</option>
                    </select>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <select
                      onChange={(e) =>
                        setAnsCWei([ansCWei[0], parseInt(e.target.value, 10)])
                      }
                      value={ansCWei[1]}
                      className="cursor-pointer text-gray-400 border border-[#C7C7C7] shadow-md px-1 lg:px-2 xl:px-4 py-1 rounded-[7px] w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                </div>
                {OptionCError && (
                  <div className="text-red-500">OptionC is mandatory</div>
                )}
              </div>
              <div className="flex justify-center w-full">
                <button className="bg-[#FFBF00] rounded-md text-white px-4 py-2 w-full focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all border-transparent outline-none">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between my-5">
        <div className="flex justify-center items-center">
          <h2 className="text-lg font-semibold">Quiz</h2>
        </div>

        <div className="flex items-center  gap-5">
          <div
            onClick={addModalOpen}
            className="flex items-center border border-[#FFBF00] rounded-lg px-3 py-1 cursor-pointer shadow-md"
          >
            <Image src="/icons/addition.svg" alt="Add" width={20} height={20} />{" "}
            <span className="text-gray-400 ml-2">Add Question</span>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto pb-8">
        {loading ? (
          <Skeleton />
        ) : (
          <>
            {quiz.map((question, i) => (
              <div key={i} className="flex justify-between mb-2 text-gray-400">
                <div className="flex justify-between w-full items-start border border-[#FFBF00] rounded-md px-3 py-2">
                  <div>
                    <div className="flex">
                      <h3>
                        <span className="font-semibold">{i + 1}.</span>{" "}
                        <span className="font-normal text-base">
                          {question.que}
                        </span>
                      </h3>
                    </div>
                    <div
                      style={{
                        display: question.showAnswer ? "block" : "none",
                      }}
                      className="px-6 pb-4 pt-2"
                    >
                      <div>
                        {question.answers &&
                          Object.values(question.answers).map((answer, j) => (
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
                  {/* BUTTON */}
                  {question.showAnswer ? (
                    <Image
                      src="/icons/up-arrow.svg"
                      alt="Up Arrow"
                      width={15}
                      height={15}
                      onClick={() => toggleAnswer(i)}
                    />
                  ) : (
                    <Image
                      src="/icons/downArrow.svg"
                      alt="Down Arrow"
                      width={24}
                      height={24}
                      onClick={() => toggleAnswer(i)}
                    />
                  )}
                </div>

                <div className="flex gap-2 items-start ml-3 mt-2">
                  {/* EDIT BUTTON */}
                  <Image
                    src="/icons/edit.svg"
                    alt="Edit"
                    width={24}
                    height={24}
                    onClick={() => {
                      handleEditOpen(question);
                    }}
                  />

                  {/* DELETE BUTTON */}
                  <Image
                    src="/icons/delete.svg"
                    alt="Delete"
                    width={24}
                    height={24}
                    onClick={() => handleModalOpen(question.id)}
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
