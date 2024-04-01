import SearchBar from './Components/SearchBar/SearchBar'
import searchImages from './Components/API/API';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import LoadMoreBtn from './Components/LoadMoreBtn/LoadMoreBtn';

import { useState, useRef } from 'react'
import './App.css'
import 'normalize.css';
import { toast, Toaster } from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner';
import Modal from 'react-modal';




function App() {

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchWord, setSearchWord] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const containerRef = useRef(null);
 


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
    if (containerRef.current) {
      containerRef.current.lastChild.scrollIntoView({ behavior: 'smooth' })
    }
  } catch (error) {
    console.error('Error fetching images:', error.message);
    toast.error('Failed to fetch images');
  } finally {
    setLoading(false);
  }
};


  

  
  

  return (
    <>
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <SearchBar onSubmit={onSubmit} />
   
        {!images || images.length === 0 ? <ImageGallery images={[]} /> : <ImageGallery ref={containerRef} images={images} />}
    
      {loading && <TailSpin />}
      {page < totalPages && <LoadMoreBtn  onClick={onClick} />}
      
      
        
    </>
  )
}

export default App
