
import React from 'react'

const Pagination = ({ totalUsers, usersPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalUsers / usersPerPage);
  
    // Display up to 3 pages before and after the current page
    const pagesToShow = 3;
  
    const getPageNumbers = () => {
      const pageNumbers = [];
      for (let i = Math.max(1, currentPage - pagesToShow); i <= Math.min(totalPages, currentPage + pagesToShow); i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    };
  
    const renderPaginationDots = () => {
      return (
        <span className="mx-1"></span>
      );
    };
  
    return (
      <div className="flex justify-center flex-wrap mt-4">
        {currentPage > pagesToShow && renderPaginationDots()}
  
        {getPageNumbers().map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => onPageChange(pageNumber)}
            className={`px-3 py-2 mx-1 border ${
              currentPage === pageNumber ? "bg-[#FFBF00] text-white" : "bg-[#FFEEB9]"
            }`}
          >
            {pageNumber}
          </button>
        ))}
  
        {currentPage + pagesToShow < totalPages && renderPaginationDots()}
      </div>
    );
  };

export default Pagination
