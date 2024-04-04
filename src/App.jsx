import 'normalize.css';
import { toast, Toaster } from 'react-hot-toast';

import { useState, useRef, useEffect} from 'react'
import Modal from 'react-modal';


import SearchBar from './components/SearchBar/SearchBar';
import searchImages from './components/API/API';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Loader from './components/Loader/Loader';


import './App.css'








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
    async function fetchImages() {
      try {
        setLoading(true);
      } catch {
        toast.error('Failed to fetch images');
        setErrorDownload(true);
      } finally {
        setLoading(false);
      }
    }
      fetchImages();
    
  }, [images, searchWord]);


  const onSubmit = async (searchText) => {
    setSearchWord(searchText);
    setImages([]);
    const data = await searchImages(searchText, page); 
      setImages(data.images);
      setTotalPages(data.total)
  }  
  


  const onClick = async () => {
    if (page < totalPages) {
      const nextPageImages = await searchImages(searchWord, page + 1);
      setImages(prevImages => [...prevImages, ...nextPageImages.images]);
      setPage(prevPage => prevPage + 1);
      const lastLiElement = document.getElementById(`image-${nextPageImages.images[nextPageImages.images.length - 1].id}`);
      lastLiRef.current = lastLiElement;
    }
  
};


useEffect(() => {
  if (lastLiRef.current) {
    lastLiRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
}, [images]);
  
  
  function openModal() {
    setIsOpen(true);

  }

  function afterOpenModal() {

  }

  function closeModal() {
    setIsOpen(false);
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
        <Toaster
       position="top-center"
        reverseOrder={false}
        />
        <SearchBar onSubmit={onSubmit} />
   
      {!images || images.length === 0 ? <ImageGallery images={[]} /> : <ImageGallery ref={containerRef} images={images} openModal={openModal} setImgId={setImgId} />}
      {errorDownload && <ErrorMessage/>}
      {loading && <Loader />}
      {page < totalPages && <LoadMoreBtn onClick={onClick} />}
      

      <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={customStyles}
      >
          < ImageModal images={images} imgId={imgId} />
      </Modal>
    </>
      
        
    </>
  )
}

export default App
