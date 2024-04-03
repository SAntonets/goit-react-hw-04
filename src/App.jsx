import 'normalize.css';
import { toast, Toaster } from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner';
import { useState, useRef, useEffect} from 'react'
import Modal from 'react-modal';


import SearchBar from './components1/SearchBar/SearchBar'
import searchImages from './components1/API/API';
import ImageGallery from './components1/ImageGallery/ImageGallery';
import LoadMoreBtn from './components1/LoadMoreBtn/LoadMoreBtn';
import ModalWindow from './components1/ModalWindow/ModalWindow';


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


 Modal.setAppElement('#root');


  const onSubmit = async (searchText) => {
    setSearchWord(searchText);
    try {
    setImages([]);
    setLoading(true);
    const data = await searchImages(searchText, page); 
      setImages(data.images);
      setTotalPages(data.total)
  } catch (error) {
    console.error('Error fetching images:', error.message);
    toast.error('Failed to fetch images');
  } finally {
      setLoading(false);
      }
  };


const onClick = async () => {
  try {
    setLoading(true);
    const nextPageImages = await searchImages(searchWord, page + 1);
    setImages(prevImages => [...prevImages, ...nextPageImages.images]);
    setPage(prevPage => prevPage + 1);
    const lastLiElement = document.getElementById(`image-${nextPageImages.images[nextPageImages.images.length - 1].id}`);
    lastLiRef.current = lastLiElement;
  } catch (error) {
    console.error('Error fetching images:', error.message);
    toast.error('Failed to fetch images');
  } finally {
    setLoading(false);
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
    
      {loading && <TailSpin />}
      {page < totalPages && <LoadMoreBtn onClick={onClick} />}
      

      <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={customStyles}
      >
          < ModalWindow images={images} imgId={imgId} />
      </Modal>
    </>
      
        
    </>
  )
}

export default App
