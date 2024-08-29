"use client";
import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';
import Uploader from './components/Uploader'
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Define the structure of the ImageData type
interface ImageData {
  creation_time: string;
  file_binary: string;
  file_name: string;
  text_content: string;
  type_of_file: string;
}

const App: React.FC = () => {
  /*
  STATES:
    - images:           list of images fetched from the API
    - filteredImages:   list of images filtered by search term
    - loading:          loading state while fetching data
    - error:            error messages encountered during data fetching
    - term:             current search term input by the user
  */
  const [images, setImages] = useState<ImageData[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [term, setTerm] = useState<string>('');
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);

  // fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = process.env.NEXT_PUBLIC_API_URL;

        if (!URL) {
          throw new Error('API URL is not defined');
        }

        // Make a GET request to the API to fetch images
        const response = await axios.get(URL);

        setImages(response.data);
        setFilteredImages(response.data);

      } catch (error) {
        // Handle any errors encountered during the API request
        if (axios.isAxiosError(error)) {
          setError(error.message);
          console.error('Error fetching data:', error.message);
        } else {
          setError('An unexpected error occurred');
          console.error('Unexpected error:', error);
        }
      } finally {
        // Set loading to false after the data fetch is complete
        setLoading(false);
      }
    };

    if (uploadComplete) {
      fetchData();
      setUploadComplete(false);
    } else {
      fetchData();
    }
  }, [uploadComplete]);

  // filter images based on the search term
  useEffect(() => {
    if (term) {
      // filter with file name or text content
      const filtered = images.filter(image =>
        image.file_name.toLowerCase().includes(term.toLowerCase()) ||
        image.text_content.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredImages(filtered);
    } else {
      // If no search term is provided, show all images
      setFilteredImages(images);
    }
  }, [term, images]); // Dependencies: this effect runs whenever `term` or `images` changes

  return (
    <div>
      {/* Render the FileUpload component */}
      <div className="mt-8 mb-8 flex justify-center">
        {/* <FileUpload /> */}
        <Uploader setUploadComplete={setUploadComplete}/>
      </div>

      {/* Main container for the image search and display */}
      <div className="container mx-auto">
        {/* Render the ImageSearch component, passing the setTerm function to update the search term */}
        <ImageSearch searchText={(text: string) => setTerm(text)} />

        {/* Conditional rendering: show loading indicator while fetching data */}
        {loading ? (
          <h1 className="text-6xl text-center mx-auto mt-64">Loading...</h1>
        ) : (
          // Display the filtered images using the ImageCard component
          <div className="grid grid-cols-3 gap-4">
            {filteredImages.map((image, index) => (
              <ImageCard key={index} image={image}></ImageCard>
            ))}
          </div>
        )}

        {/* Display any error messages */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default App;
