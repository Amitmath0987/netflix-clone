import React, { useState, useEffect } from "react";
import axios from "../../axios";
import request from "../../request";
import { Cancel } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import "./Banner.css";
// import Modal from "@material-ui/core/Modal";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
function Banner() {
  const [movie, setMovie] = useState([]);
  const [bannerUrl, setBannerUrl] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(request.fetchTrending);
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
      return response;
    }
    fetchData();
  }, []);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  const handleTrailer = (movie) => {
    if (bannerUrl) {
      setBannerUrl("");
    } else {
      movieTrailer(
        movie?.name ||
          movie?.title ||
          movie?.original_name ||
          movie?.original_title
      )
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setBannerUrl(urlParams.get("v"));
        })
        .catch((error) =>
          alert(`This vedio is not available, So keep Watching Next Trailer `)
        );
    }
  };
  const opts = {
    // position: "fixed",
    // top: "0",
    height: "390",
    width: "100%",

    // margin: " 0 100px",

    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
          https://image.tmdb.org/t/p/original/${movie?.backdrop_path}
        )`,
        backgroundPosition: "center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_title}
        </h1>
        <div className="banner__buttons">
          <button
            className="banner__button"
            onClick={() => {
              return [handleTrailer(movie), setOpen(!open)];
            }}
          >
            {bannerUrl ? "Stop" : "Play"}
          </button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner__fadedBottom" />
      {open && (
        <div className="banner__trailer">
          <IconButton
            onClick={() => {
              setBannerUrl("");
              setOpen(false);
            }}
          >
            <Cancel style={{ color: "white" }} />
          </IconButton>

          <YouTube videoId={bannerUrl} opts={opts} />
        </div>
      )}
    </header>
  );
}

export default Banner;
