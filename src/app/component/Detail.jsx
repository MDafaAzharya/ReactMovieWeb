import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Impor axios
import {AiOutlineLogout} from 'react-icons/ai'


const MovieDetail = () => {
  const { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);

  useEffect(() => {
    // Mengambil detail film menggunakan ID film dari URL
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=0d12dc45d21e4ed7e110b9ad8d1e293e`
      )
      .then((response) => {
        setMovieDetail(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [movieId]);

  if (!movieDetail) {
    return <div>Loading...</div>;
  }

  return (
      <div>
        <div>
          <img src={`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`} alt={movieDetail.title} className="w-full h-96 object-cover"/>
          <div className="lg:absolute top-40 left-0 w-full lg:h-40 grid grid-rows-4 absolute h-32">
            <h1 className="text-gray-300 lg:text-4xl flex lg:justify-start lg:font-bold lg:ms-28 mb-80
                          text-3xl justify-center
            ">{movieDetail.title}</h1>
            <p  className="text-gray-300 text-2xl font-medium flex justify-center lg:ms-28 mb-28 pt-2 lg:justify-start">{movieDetail.popularity}</p>
            <p  className="text-gray-300 text-96 font-thin flex me-auto lg:ms-28 mb-28 lg:w-3/6 lg:text-left text-center lg:px-0 px-10 pt-3 ">{movieDetail.overview}</p>
          <div className="flex lg:justify-start lg:ms-28 lg:mt-32 justify-center mt-40 md:mt-20">
          <button className="text-gray-300 text-96 font-bold  bg-pink-300 h-10 py-1 px-3 rounded-md hover:text-pink-300 border-2 border-pink-300 hover:bg-transparent"> 
              Watch Trailer
            </button>
            <button className="text-gray-300 text-96 font-bold mx-5 border-white border-2 h-10 px-3 py-1 rounded-md hover:bg-white hover:text-pink-300">
              Add To Watchlist
            </button>
          </div>
          </div>
        </div>
      <div className="lg:px-28 sm:px-10 px-10">
      <div className=" py-5">
          <ul className="text-lg text-gray-400 font-semibold lg:flex justify-start grid sm:justify-items-center sm:grid-cols-3 grid-cols-2 justify-items-center">
            <li className="text-white bg-pink-300 rounded-full py-1 lg:px-5 sm:px-8 ">
              Overview
            </li>
            <li className="hover:text-white hover:bg-pink-300 rounded-full py-1 lg:px-5 sm:px-8">
              Character
            </li>
            <li className="hover:text-white hover:bg-pink-300 rounded-full py-1 lg:px-5 sm:px-8">
              Review
            </li>
          </ul>
      </div>
      <div className="">
          <h1 className="flex justify-start font-bold text-2xl">
            Synopsis
            <hr className="w-10/12 font-bold border-gray-400 border-1 my-auto flex ms-3" />
          </h1>
          <p className="py-4">{movieDetail.overview}</p>
        </div>
        <div>
          <h1 className="flex justify-start font-bold text-2xl">
            Movie Info
            <hr className="w-10/12 font-bold border-gray-400 border-1 my-auto flex ms-3" />
          </h1>
          <p className="mt-4"> Title : {movieDetail.title} </p>
          <p> Genre : {movieDetail.genres[0].name}</p>
          <p> Languange : {movieDetail.spoken_languages[0].name}</p>
          <p> Release Date : {movieDetail.release_date} </p>
          <p> Tagline : {movieDetail.tagline }</p>
          <p> Country : {movieDetail.production_countries[0].name} </p>
          <p> Producer : {movieDetail.production_companies[0].name}</p>
        </div>
        <a href="/" className="flex justify-start mt-5 hover:bg-pink-300 w-28 p-2 rounded-full">
            <AiOutlineLogout className="w-6 h-6"/> <p className="text-xl px-1"> Back </p>
        </a>
      </div>
    </div>
   
  );
};

export default MovieDetail;
