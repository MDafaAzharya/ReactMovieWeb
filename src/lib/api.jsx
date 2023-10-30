import axios from "axios";

export const Api = async (genreId, pages) => {
    try {
        const movie = await axios.get(`${import.meta.env.VITE_BASE_URL}/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${genreId}&page=${pages}`);
        return movie.data.results
    }catch(e){
        console.log(e)
    }
}

export const getGenres = async (apiKey) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/genre/movie/list?api_key=${apiKey}`);
      return response.data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  export const Image = async () => {
    try {
        const img = await axios.get(`${import.meta.env.VITE_BASE_URL}/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&page=2`);
        return img.data.results;
    }catch(e){
        console.log(e)
    }
}

export const SearchMovie = async (query) => {
  console.log("Id Movie:", query);
    try {
        const dtl = await axios.get(`${import.meta.env.VITE_BASE_URL}/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${query}`);
        return dtl.data.results
    }catch(e){
        console.log(e)
    }
}