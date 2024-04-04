import 'normalize.css';
import { toast, Toaster } from 'react-hot-toast';
import { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import SearchBar from './components/SearchBar/SearchBar';
import searchImages from './components/API/API';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Loader from './components/Loader/Loader';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchWord, setSearchWord] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const containerRef = useRef(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [imgId, setImgId] = useState("");
  const lastLiRef = useRef(null);
  const [errorDownload, setErrorDownload] = useState(false);

  Modal.setAppElement('#root');

  useEffect(() => {
    fetchImages();
  }, [page, searchWord]);

  useEffect(() => {
    if (lastLiRef.current) {
      lastLiRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [images]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await searchImages(searchWord, page);
      if (page === 1) {
        setImages(data.images);
      } else {
        setImages(prevImages => [...prevImages, ...data.images]);
      }
      setTotalPages(data.total);
    } catch {
      toast.error('Failed to fetch images');
      setErrorDownload(true);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (searchText) => {
    setSearchWord(searchText);
    setPage(1);
  };

  const onClick = async () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  function openModal(imgId) {
    setIsOpen(true);
    setImgId(imgId);
  }

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 1000
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
      maxWidth: '100%',
      maxHeight: '100vh',
      padding: '20px',
      borderRadius: '8px',
      backgroundColor: '#1f1f1f',
      border: 'none',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    }
  };

  return (
  <>
    <Toaster position="top-center" reverseOrder={false} />
    <SearchBar onSubmit={onSubmit} />
    {images.length > 0 && <ImageGallery ref={containerRef} images={images} openModal={openModal} setImgId={setImgId} />}
    {errorDownload && <ErrorMessage />}
    {loading && <Loader />}
    {page < totalPages && <LoadMoreBtn onClick={onClick} />}
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel="Image Modal"
      style={customStyles}
      shouldCloseOnOverlayClick={true}
    >
      <ImageModal images={images} imgId={imgId} />
    </Modal>
  </>
);
}

export default App;
