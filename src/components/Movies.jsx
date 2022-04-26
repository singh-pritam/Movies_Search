import React from "react";
import MovieCard from "./MovieCard";
import "./Movies.css";

const Movies = ({ currentMovies }) => {
  return (
    <div className="movies">
      {currentMovies.map((movie, i) => (
        <MovieCard key={i} {...movie} />
      ))}
    </div>
  );
};

export default Movies;
