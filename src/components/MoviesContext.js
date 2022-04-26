import React from "react";

const MoviesContext = React.createContext({
  filteredMovies: [],
  dispatch: () => {},
});

export default MoviesContext;
