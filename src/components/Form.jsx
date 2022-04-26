import React, { useContext, useState } from "react";
import MoviesContext from "./MoviesContext";
import "./Form.css";

const Form = ({ showForm, setShowForm }) => {
  const [movie, setMovie] = useState({ img: "", name: "", lang: "" });
  const moviesContext = useContext(MoviesContext);
  const { dispatch, filteredMovies } = moviesContext;

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_MOVIE", movie: movie });
  };

  return (
    <>
      <div
        className={showForm ? "overlay" : "hidden"}
        onClick={() => setShowForm((prev) => !prev)}
      ></div>
      <div className={showForm ? "container" : "hidden"}>
        <form onSubmit={handleSubmit}>
          <label>Movie Name:</label>
          <input name="name" onChange={handleChange}></input>
          <label>Language:</label>
          <input name="lang" onChange={handleChange}></input>
          <label>Image URL:</label>
          <input name="img" onChange={handleChange}></input>
          <button onClick={() => setShowForm(false)}>Submit</button>
        </form>
      </div>
    </>
  );
};

export default Form;
