"use client";
import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import ImageCard from './components/ImageCard';
import axios from 'axios';

interface ImageData {
  creation_time: string;
  file_binary: string;
  file_name: string;
  text_content: string;
  type_of_file: string;
}

const App: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = "https://deploying-to-heroku-101-3e887d6094a2.herokuapp.com/"
        const response = await axios.get(URL);
        console.log(response)
        setImages(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
          console.error('Error fetching data:', error.message);
        } else {
          setError('An unexpected error occurred');
          console.error('Unexpected error:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="mt-8 mb-8 justify-content flex justify-center"><FileUpload/></div>
      <div className="container mx-auto">
        {loading ? <h1 className="text-6xl text-center mx-auto mt-64">Loading...</h1> : <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <ImageCard key={index} image={image}></ImageCard>
          ))}
        </div>}
      </div>
    </div>
  );
}

export default App;
