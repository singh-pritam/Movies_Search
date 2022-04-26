import React, { useContext, useEffect, useState } from "react";
import MoviesContext from "./MoviesContext";
import "./Pagination.css";

const Pagination = ({
  currentPage,
  setCurrentPage,
  setMoviesPerPage,
  //   IndexOfFirstMovie,
  //   IndexOfLastMovie,
  moviesPerPage,
}) => {
  const moviesContext = useContext(MoviesContext);
  const { filteredMovies } = moviesContext;
  const [pageNumbers, setPageNumbers] = useState([]);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const handleLeftClick = () => {
    if (pageNumbers[0] !== 1) {
      setPageNumbers((prev) => prev.map((pageNo) => pageNo - 1));
    }
  };

  const handleRightClick = () => {
    if (pageNumbers[3] !== totalPages) {
      setPageNumbers((prev) => prev.map((pageNo) => pageNo + 1));
    }
  };

  useEffect(() => {
    if (totalPages > 4) {
      setPageNumbers((prev) => {
        if (prev.length === 0) {
          return [1, 2, 3, 4];
        }
        return prev;
      }, []);
    } else {
      let pageNoArray = [];
      for (let i = 1; i <= totalPages; i++) {
        pageNoArray.push(i);
      }
      setPageNumbers(pageNoArray);
    }
  });
  return (
    <ul className="page_numbers">
      <li onClick={handleLeftClick}>&laquo;</li>
      {pageNumbers.map((number) => (
        <li
          onClick={() => {
            setCurrentPage(number);
          }}
        >
          {number}
        </li>
      ))}
      <li onClick={handleRightClick}>&raquo;</li>
    </ul>
  );
};

export default Pagination;
