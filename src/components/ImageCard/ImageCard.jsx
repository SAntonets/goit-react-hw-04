import css from "./ImageCard.module.css";
import clsx from 'clsx';

const ImageCard = ({ image, handleClick, setImgId}) => {
  return (
    <div  >
      <img onClick={() => { handleClick(); setImgId(image.id);}} className={css.ImageCard} src={image.urls.small} alt={image.alt_description} />
    </div>
  );
};

export default ImageCard;