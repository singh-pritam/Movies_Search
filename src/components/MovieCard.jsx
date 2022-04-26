import React from "react";
import "./MovieCard.css";

const MovieCard = ({ img, name, lang }) => {
  return (
    <div class="movie_card">
      <img src={img} />
      <figcaption>
        <h2 className="name">{name}</h2>
        <p>Language: {lang}</p>
      </figcaption>
    </div>
  );
};

export default MovieCard;
