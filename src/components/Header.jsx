import React, { useContext, useRef, useState } from "react";
import Form from "./Form";
import MoviesContext from "./MoviesContext";
import "./Header.css";
import Pagination from "./Pagination";

const Header = ({
  AllMovies,
  setDisplayHeader,
  setMoviesPerPage,
  setCurrentPage,
  currentPage,
  moviesPerPage,
}) => {
  const inputRef = useRef("");
  const moviesContext = useContext(MoviesContext);
  const { filteredMovies, dispatch } = moviesContext;
  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
  };

  const handleChange = (value) => {
    inputRef.current = value;
    dispatch({ type: "INPUT_CHANGE", value: value, AllMovies: AllMovies });
  };
  const showDetails = { showForm: showForm, setShowForm: setShowForm };
  const PaginationDetails = {
    currentPage: currentPage,
    setCurrentPage: setCurrentPage,
    setMoviesPerPage: setMoviesPerPage,
    moviesPerPage: moviesPerPage,
  };
  return (
    <div className="header">
      <input
        type="text"
        placeholder="Search Movies"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <div className="sorting_buttons">
        <button
          onClick={() => {
            dispatch({ type: "ASCENDING" });
            setDisplayHeader((prev) => !prev);
          }}
        >
          A-Z
        </button>
        <button
          onClick={() => {
            dispatch({ type: "DESCENDING" });
            setDisplayHeader((prev) => !prev);
          }}
        >
          Z-A
        </button>
      </div>
      <Pagination {...PaginationDetails} />
      <button onClick={openForm}>Add Movie</button>
      <Form {...showDetails} />
    </div>
  );
};

export default Header;
