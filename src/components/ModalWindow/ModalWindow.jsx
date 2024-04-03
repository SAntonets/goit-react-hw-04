import css from "./ModalWindow.module.css"

const ModalWindow = ({ images, imgId }) => {
    const foundImage = (id) => {
    const found = images.find(image => image.id === id);
    return found;
    };
    
    const img = foundImage(imgId);

    if (!foundImage) {
        return <div>Image not found</div>;
    }

    return (
        
            <img className={css.ModalImg} src={img.urls.regular} alt={img.alt_description} />
        
    );
}

export default ModalWindow;
  

