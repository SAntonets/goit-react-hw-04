
import { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Loader from './components/Loader/Loader';
import ImageModal from './components/ImageModal/ImageModal';
import searchImages from './components/API/API';
import './App.css';
import Modal from 'react-modal';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchWord, setSearchWord] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [errorDownload, setErrorDownload] = useState(false);
  const [modalImageId, setModalImageId] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  Modal.setAppElement('#root');

  useEffect(() => {
    fetchImages();
  }, [page, searchWord]);

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
    } catch (error) {
      toast.error('Failed to fetch images');
      setErrorDownload(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (searchText) => {
    setSearchWord(searchText);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const openModal = (id) => {
    setModalImageId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalImageId(null);
    setIsOpen(false);
  };

  return (
    <div className="app">
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      {errorDownload && <ErrorMessage />}
      {loading && <Loader />}
      {page < totalPages && <LoadMoreBtn onClick={handleLoadMore} />}
      {modalImageId && <ImageModal images={images} modalImageId={modalImageId} closeModal={closeModal} modalIsOpen={modalIsOpen} />}
    </div>
  );
}

export default App;
