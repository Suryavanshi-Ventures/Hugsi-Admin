// Pagination.js
import React from "react";

const Pagination = ({ onUpdatePagination, currentPage, totalPages }) => {
  const PageNumber = [];

  for (let i = 1; i <= totalPages; i++) {
    PageNumber.push(i);
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onUpdatePagination(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onUpdatePagination(currentPage + 1);
    }
  };

  return (
    <nav className="flex justify-center">
      <ul className="pagination flex flex-wrap">
        <li
          className={`w-12 h-11 flex justify-center items-center transition-all duration-[0.3s] ${
            currentPage === 1
              ? "bg-primary text-white hover:text-[#808191]"
              : "bg-[#DEDFE0] text-[#808191] hover:text-[#808191]"
          } border m-1 hover:bg-[#efeeee] cursor-pointer`}
          onClick={handlePrevClick}
        >
          <span>{`<<`}</span>
        </li>

        {PageNumber.map((number) => (
          <li
            key={number}
            className={`w-12 h-11 flex justify-center items-center transition-all duration-[0.3s] ${
              currentPage === number
                ? "bg-primary text-white "
                : "bg-[#DEDFE0] text-[#808191] hover:text-[#808191]"
            } border m-1 cursor-pointer`}
            onClick={() => onUpdatePagination(number)}
          >
            {number}
          </li>
        ))}

        <li
          className={`w-12 h-11 flex justify-center items-center transition-all duration-[0.3s] ${
            currentPage === totalPages
              ? "bg-primary text-white hover:text-[#808191]"
              : "bg-[#DEDFE0] text-[#808191] hover:text-[#808191]"
          } border m-1 hover:bg-[#efeeee] cursor-pointer`}
          onClick={handleNextClick}
        >
          <span>{`>>`}</span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
