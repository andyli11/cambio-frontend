"use client";
import React from 'react';
import { UploadButton } from "@bytescale/upload-widget-react";

const FileUpload: React.FC = () => {
  // configuration options for the upload widget
  const options = {
    apiKey: "public_kW15cArD9hSLXaqrkzpuZ3EzwkUp",
    maxFileCount: 1000,
    editor: {
      images: {
        crop: false
      }
    },
    locale: {
      "finishBtn": "Extract Content",
    }
  };

  // upload image to backend on complete
  const handleComplete = async (files: { fileUrl: string }[]) => {
    const fileUrls = files.map(x => x.fileUrl); // Extract file URLs from the uploaded files
  
    try {

      const URL = `${process.env.NEXT_PUBLIC_API_URL}/upload`;

      if (!URL) {
        throw new Error('API URL is not defined');
      }

      // POST request to the upload endpoint
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: fileUrls }),
      });
  
      if (response.ok) {
        // successful response
        const data = await response.json();
        console.log('Files uploaded successfully:', data);
        alert(`Files uploaded successfully: ${JSON.stringify(data)}`);
        window.location.reload(); // Reload the page to reflect the uploaded files
      } else {
        // failed response
        console.error('Failed to upload files:', response.statusText);
        // alert('Failed to upload files.');
      }
    } catch (error) {
      // Catch and log any errors that occur during the upload process
      console.error('Error uploading files:', error);
      alert('Error uploading files.');
    }
  };
  
  return (
    <div className="bg-white w-60 h-10 rounded-lg flex items-center justify-center">
      <UploadButton options={options} onComplete={handleComplete}>
        {({ onClick }) => (
          <button 
            onClick={onClick} 
            className="bg-white text-blue-500 py-2 px-4 rounded"
          >
            Upload a file...
          </button>
        )}
      </UploadButton>
    </div>
  );
}

export default FileUpload;
