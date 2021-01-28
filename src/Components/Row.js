import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const baseURL = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLargerRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState();
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleTrailer = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        movie?.original_name ||
          movie?.name ||
          movie?.title ||
          movie?.original_title
      )
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) =>
          alert(`This vedio is not available, So keep Watching Next Trailer `)
        );
    }
  };
  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            onClick={() => handleTrailer(movie)}
            className={`row__poster ${isLargerRow && "row__posterLarge"}`}
            key={movie.id}
            src={`${baseURL}${
              isLargerRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={
              movie?.name ||
              movie?.title ||
              movie?.original_name ||
              movie?.original_title
            }
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
