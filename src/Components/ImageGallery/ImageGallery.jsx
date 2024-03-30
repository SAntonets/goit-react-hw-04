import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images }) => {
  if (!images || images.length === 0) {
    return null; 
  }

  return (
    <ul>
      {images.map((image, index) => (
        <li key={index}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;