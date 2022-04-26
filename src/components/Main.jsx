import React, { useEffect, useReducer, useRef, useState } from "react";
import Header from "./Header";
import "./Main.css";
import Movies from "./Movies";
import MoviesContext from "./MoviesContext";

let initialMovies = [];
let AllMovies = [];

const reducer = (filteredMovies, action) => {
  console.log(action, filteredMovies, "reducer Called");
  switch (action.type) {
    case "INPUT_CHANGE":
      return action.AllMovies.filter((movie) => {
        return movie.name.toLowerCase().includes(action.value.toLowerCase());
      });

    case "ASCENDING":
      return filteredMovies.sort((movie1, movie2) => {
        return movie1.name.localeCompare(movie2.name);
      });

    case "DESCENDING":
      return filteredMovies
        .sort((movie1, movie2) => {
          return movie1.name.localeCompare(movie2.name);
        })
        .reverse();

    case "LOAD_MOVIES":
      return action.arr;

    case "ADD_MOVIE":
      return [...filteredMovies, action.movie];
  }
};

const Main = () => {
  const [filteredMovies, dispatch] = useReducer(reducer, initialMovies);
  const [displayHeader, setDisplayHeader] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const IndexOfLastMovie = currentPage * moviesPerPage;
  const IndexOfFirstMovie = IndexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    IndexOfFirstMovie,
    IndexOfLastMovie
  );
  const render = useRef(0);

  const loadData = async () => {
    let data;
    const response = await fetch("https://api.tvmaze.com/shows");
    data = await response.json();
    return data;
  };

  useEffect(() => {
    loadData().then((data) => {
      AllMovies = data.map((element) => ({
        img: element.image.medium,
        name: element.name,
        lang: element.language,
      }));
      console.log(AllMovies, "inside useEffect");
      dispatch({ type: "LOAD_MOVIES", arr: AllMovies });
    });
  }, []);

  useEffect(() => {
    render.current += 1;
    console.log("called");
  });

  const props = {
    AllMovies: AllMovies,
    setDisplayHeader: setDisplayHeader,
    setMoviesPerPage: setMoviesPerPage,
    setCurrentPage: setCurrentPage,
    currentPage: currentPage,
    // IndexOfFirstMovie: IndexOfFirstMovie,
    // IndexOfLastMovie: IndexOfLastMovie,
    moviesPerPage: moviesPerPage,
  };

  return (
    <div className="main">
      <MoviesContext.Provider value={{ filteredMovies, dispatch }}>
        <Header {...props} />
        <Movies currentMovies={currentMovies} />
      </MoviesContext.Provider>
    </div>
  );
};

export default Main;
