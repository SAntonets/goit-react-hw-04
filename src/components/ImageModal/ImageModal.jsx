
import Modal from 'react-modal';

const ImageModal = ({ images, modalImageId, closeModal, modalIsOpen }) => {
    

    const image = images.find(image => image.id === modalImageId);

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Image Modal"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)'
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: '200px',
                    minHeight: '200px',
                    maxWidth: '90%',
                    maxHeight: '90%',
                    padding: '20px',
                    borderRadius: '8px',
                    backgroundColor: '#1f1f1f',
                    border: 'none',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }
            }}
            shouldCloseOnOverlayClick={true}
        >
            {image && (
                <img
                    src={image.urls.regular}
                    alt={image.alt_description}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
            )}
        </Modal>
    );
};

export default ImageModal;
