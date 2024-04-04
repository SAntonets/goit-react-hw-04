import ImageCard from '../ImageCard/ImageCard'
import css from "./ImageGallery.module.css";
import clsx from 'clsx';
import { forwardRef, useEffect, useRef } from 'react';

const ImageGallery = forwardRef(({ images, openModal}, ref) => {
  const lastImageRef = useRef(null); 

  useEffect(() => {
    
    if (lastImageRef.current) {
      lastImageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [images]); 

  if (!Array.isArray(images)) {
    console.error("Images is not an array!");
    return null; 
  }

  return (
    <ul className={css.ImageGallery} ref={ref}>
      {images.map((image, index) => (
        <li key={image.id} ref={index === images.length - 1 ? lastImageRef : null}>
          <ImageCard image={image} handleClick={openModal}/>
        </li>
      ))}
    </ul>
  );
});

ImageGallery.displayName = 'ImageGallery'; 

export default ImageGallery;
