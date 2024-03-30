import SearchBar from './Components/SearchBar/SearchBar'
import searchImages from './Components/API/API';
import ImageGallery from './Components/ImageGallery/ImageGallery';

import { useState } from 'react'
import './App.css'
import 'normalize.css';
import { toast, Toaster } from 'react-hot-toast';



function App() {


  const onSubmit = (searchText) => {
    searchImages(searchText)
    return images;
  };
  
  return (
    <>
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <SearchBar onSubmit={onSubmit} />
      <ImageGallery images={images}/>
      
        
    </>
  )
}

export default App
