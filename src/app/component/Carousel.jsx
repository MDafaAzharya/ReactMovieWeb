import { useState,useEffect } from "react";
import { Carousel } from "@material-tailwind/react";
import { Image } from "../../lib/api";

export function CarouselDefault() {
  const [MovieImage, setMovieImage] = useState([]);

  useEffect(() => {
    Image()
    .then((results) => {
      setMovieImage(results.slice(0, 3));
    })
    .catch((error) => console.error(error));
}, []);

  return (
    <Carousel className="">
     {MovieImage.map((img, i) => (
        <img
          key={img.id}
          src={`${import.meta.env.VITE_IMAGE_URL}/${img.backdrop_path}`}
          className="h-96 w-full object-cover lg:object-fit border-4 border-pink-300"
        />
      ))}
    </Carousel>
  );
}