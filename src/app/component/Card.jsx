import { useState, useEffect } from "react";
import { Api } from "../../lib/api";
import { getGenres } from "../../lib/api";
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetail from "./Detail";
import { CarouselDefault } from "./Carousel";
import axios from "axios";

const Card = () => {
  const [popularMovie, setPopular] = useState([]);
  const [genreMovies, setGenreMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [showCard, setShowCard] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=0d12dc45d21e4ed7e110b9ad8d1e293e&query=${searchTerm}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

  

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    getGenres(apiKey)
      .then((data) => {
        setGenreMovies(data.slice(0, 5));
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // Ketika `selectedGenre` berubah, panggil fungsi untuk mengambil film berdasarkan genre yang dipilih
    if (selectedGenre) {
      fetchMoviesByGenre(selectedGenre, currentPage);
    } else {
      fetchAllMovies(currentPage);
    }
  }, [selectedGenre, currentPage]);

  const fetchMoviesByGenre = (genreId, pages) => {
    // Panggil API untuk mengambil daftar film berdasarkan genre
    Api(genreId, pages)
      .then((result) => {
        setPopular(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchAllMovies = (pages) => {
    // Panggil API untuk mengambil semua film
    Api(null, pages) // Gunakan nilai null atau parameter yang sesuai
      .then((result) => {
        setPopular(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const ListGenre = () => {
    return (
      <ul className="text-lg text-gray-400 font-semibold lg:flex justify-start grid sm:justify-items-center sm:grid-cols-3 grid-cols-2 justify-items-center">
        <li
          className={`hover:text-white hover:bg-pink-300 rounded-full py-1 lg:px-5 sm:px-8  ${
            selectedGenre === null ? "bg-pink-300 text-white" : ""
          }`}
        >
          <a href="#" onClick={() => setSelectedGenre(null)}>
            All
          </a>
        </li>
        {genreMovies.map((m, i) => (
          <li
            className={`hover:text-white hover:bg-pink-300 hover:transform hover:scale-105 hover:transition-transform rounded-full py-1 lg:px-5 sm:px-8 ${
              selectedGenre === m.id ? "bg-pink-300 text-white" : ""
            }`}
            key={m.id}
          >
            <a href="#" onClick={() => setSelectedGenre(m.id)}>
              {m.name}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  const Search = () => {
    return (
      <div className="flex mx-auto">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search Movie"
          className="border-2 border-pink-300 p-1 rounded-md w-48 md:w-52 hover:border-pink-400 active:border-pink-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className="bg-pink-300 rounded-md w-8 text-white px-2 hover:opacity-80 "><AiOutlineSearch/></button>
      </div>
    );
  };

  const List = () => {
    const handleMovieClick = () => {
      setShowCard(false);
    };

    // Memeriksa apakah searchResults ada dan tidak kosong
    if (searchResults && searchResults.length > 0) {
      return searchResults.map((m, i) => {
        return (
          <div
            className="rounded-md  transform hover:scale-110 transition-transform duration-300 ease-in-out"
            key={m.id}
            onClick={handleMovieClick}
          >
            <Link to={`/movie/${m.id}`}>
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/${m.backdrop_path}`}
                alt=""
                className="rounded-lg h-60 w-auto object-cover"
              />
            </Link>
            <div className="px-2 font-bold mt-1">
              <h3 className="text-slate-900">{m.title}</h3>
            </div>
          </div>
        );
      });
    } else {
      const filteredMovies = selectedGenre
        ? popularMovie.filter((movie) =>
            movie.genre_ids.includes(selectedGenre)
          )
        : popularMovie;
      return filteredMovies.map((m, i) => {
        return (
          <div
            className="rounded-md  transform hover:scale-110 transition-transform duration-300 ease-in-out"
            key={m.id}
            onClick={handleMovieClick}
          >
            <Link to={`/movie/${m.id}`}>
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/${m.backdrop_path}`}
                alt=""
                className="rounded-lg h-60 w-auto object-cover "
              />
            </Link>
            <div className="px-2 font-bold mt-1">
              <h3 className="text-slate-900">{m.title}</h3>
            </div>
          </div>
        );
      });
    }
  };

  const Pagination = () => {
    const totalPages = 5; // Gantilah dengan jumlah total halaman yang sesuai

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
    return (
      <div className="flex justify-center gap-10 py-5">
        <ul className="flex items-center gap-10">
          <li
            className={`bg-pink-300 text-white rounded-full p-2 h-8 w-8 ${
              currentPage === 1
                ? "opacity-70 cursor-not-allowed"
                : "hover:opacity-70"
            }`}
            onClick={() => {
              if (currentPage > 1) {
                handlePageChange(currentPage - 1); // Halaman sebelumnya
              }
            }}
          >
            <AiOutlineLeft />
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`hover:bg-pink-300 rounded-full px-2 hover:text-white ${
                currentPage === index + 1 ? "bg-pink-300 text-white" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              <a href="#">{index + 1}</a>
            </li>
          ))}
          <li
            className={`bg-pink-300 text-white rounded-full p-2 h-8 w-8 ${
              currentPage === totalPages
                ? "opacity-70 cursor-not-allowed"
                : "hover:opacity-70"
            }`}
            onClick={() => {
              if (currentPage < totalPages) {
                handlePageChange(currentPage + 1); // Halaman berikutnya
              }
            }}
          >
            <AiOutlineRight />
          </li>
        </ul>
      </div>
    );
  };

  return (
    <>
      <BrowserRouter>
        {showCard && (
          <div>
            <CarouselDefault />
            <div className="lg:px-28 sm:px-0">
              <div className="flex justify-center lg:justify-start pt-5 sm:flex sm:justify-center">
                <p className="font-bold text-3xl text-gray-600">
                  {" "}
                  Browse by Category{" "}
                </p>
              </div>
              <div className="py-4 lg:flex lg:justify-between ">
                <ListGenre />
                <div className="flex mx-auto lg:mt-0 mt-5">
                  <Search />
                </div>
              </div>
              <div className="grid lg:grid-cols-5 lg:px-2 py-3 sm:grid-cols-3 grid-cols-1 sm:px-8 px-8 justify-center sm:justify-center gap-5 ">
                <List />
              </div>
              <Pagination />
            </div>
          </div>
        )}
        {!showCard && (
          <Routes>
            <Route path="/" element={<Card searchResults={searchResults} />} />
            <Route path="/movie/:movieId" element={<MovieDetail />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};
export default Card;
