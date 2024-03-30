import axios from 'axios';

const ACCESS_KEY = 'PId6GjeQ_obh_Sys5wkx9HFhQRvv3YmIj74Modod6jY'; 
async function searchImages(query) {
  const url = `https://api.unsplash.com/search/photos`;
  
  try {
    const response = await axios.get(url, {
      params: {
        query: query,
      },
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`
      }
    });
    const images = response.data.results;
    return images; 
    
  } catch (error) {
    console.error('Error fetching images:', error.message);
    throw new Error('Failed to fetch images');
  }
}

export default searchImages;