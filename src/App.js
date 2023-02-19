import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/Movielist";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBar";
import RemoveFavourite from "./components/RemoveFavourite";
import AddFavourites from "./components/AddFavourites";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=1a52470a`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  const addFavouriteMovie = (movie) => {
    const newFavouritesList = [...favourites, movie];
    setFavourites(newFavouritesList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouritesList = favourites.filter(
      (favourites) => favourites.imdbID !== movie.imdbID
    );
    setFavourites(newFavouritesList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movie={movies}
          handleFavouriteClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        ></MovieList>
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row">
        <MovieList
          movie={favourites}
          handleFavouriteClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourite}
        ></MovieList>
      </div>
    </div>

    // <Router>
    //   <Switch>
    //     <Route path=></Route>
    //   </Switch>
    // </Router>
  );
}

export default App;
