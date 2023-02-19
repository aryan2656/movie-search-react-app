import React from "react";

function MovieList(props) {
  const FavouriteComponent = props.favouriteComponent;
  return (
    <>
      {props.movie.map((movie, index) => (
        <div className="image-container d-flex justify-content-start m-3">
          <img src={movie.Poster} alt="movie" onClick={}/>
          <div
            onClick={() => props.handleFavouriteClick(movie)}
            className="overlay d-flex align-items-center justify-content"
          >
            <FavouriteComponent />
          </div>
        </div>
      ))}
    </>
  );
}

export default MovieList;
