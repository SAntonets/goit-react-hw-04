import SearchBar from './Components/SearchBar/SearchBar'
import searchImages from './Components/API/API';
import ImageGallery from './Components/ImageGallery/ImageGallery';

import { useState } from 'react'
import './App.css'
import 'normalize.css';
import { toast, Toaster } from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner'




function App() {

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
 

  const onSubmit = async (searchText) => {
    try {
    setImages([]);
    setLoading(true);
    const dataImages = await searchImages(searchText); 
    setImages(dataImages);
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
      {!images || images.length === 0 ? <ImageGallery images={[]} /> : <ImageGallery images={images} />}
      {loading && <TailSpin />}
      
        
    </>
  )
}

export default App
