import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import clsx from 'clsx';

const ImageGallery = ({ images }) => {
  if (!Array.isArray(images)) {
    console.error("Images is not an array!");
    return null; 
  }

  return (
    <ul className={css.ImageGallery}>
      {images.map((image, index) => (
        <li key={index}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;