import css from "./ImageCard.module.css";
import clsx from 'clsx';

const ImageCard = ({ image, handleClick, setImgId}) => {
  return (
    <div onClick={() => { handleClick(); setImgId(image.id);}} >
      <img className={css.ImageCard} src={image.urls.small} alt={image.alt_description} />
    </div>
  );
};

export default ImageCard;