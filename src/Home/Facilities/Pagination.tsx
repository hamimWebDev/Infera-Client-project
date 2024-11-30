import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded-md ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400"
            : "bg-gray-300 text-black"
        }`}
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-4 py-2 border rounded-md ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded-md ${
          currentPage === totalPages
            ? "bg-gray-400 text-gray-700"
            : "bg-gray-700 text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
