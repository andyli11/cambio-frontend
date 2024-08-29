"use client";
import React, { useState, useEffect, useCallback } from 'react';
import UploadProgress from './UploadProgress';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

interface UploaderProps {
    setUploadComplete: (value: boolean) => void;
  }

const Uploader: React.FC<UploaderProps> = ({setUploadComplete}) => {
    const [show, setShow] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const toggleShow = () => {
        setShow(!show);
        setFiles([]);
    }

    // Handle when the modal is shown or hidden
    useEffect(() => {
        document.body.style.overflow = show ? 'hidden' : '';
    }, [show]);

    // React Dropzone configuration
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'image/*': ['.jpeg', '.png', '.jpg', '.gif'],
        },
        maxFiles:20
     });

    // Function to remove a file
    const removeFile = (indexToRemove: number) => {
        setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    };

    // Function to handle file upload
    const extractText = () => {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}/upload`;
        if (!URL) {
            throw new Error('API URL is not defined');
        }

        const formData = new FormData();
        files.forEach((file) => {
            formData.append('file', file); // Use the same key 'file' for all files
        });

        axios.post(URL, formData)
            .then(response => {
                console.log('Files uploaded successfully:', response.data);
                setFiles([]);
                window.location.reload();
                setTimeout(() => {
                    setUploadComplete(true);
                }, 1000);  // 1000ms = 1 second delay
            })
            .catch(error => console.error('Error uploading files:', error));
        
        setShow(false);
    };

    return (
        <div>
            <div className={`relative ${show ? 'z-0' : 'z-[2000]'}`}>
                <button
                    className="text-blue-500 bg-white text-sm rounded-lg px-8 py-2 text-center"
                    onClick={toggleShow}
                >
                    Upload a file...
                </button>
            </div>

            <div className={`fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full max-h-2xl z-[1000] overflow-auto font-[sans-serif] ${show ? 'opacity-100' : 'scale-0'}`}>
                {/* Overlay */}
                <div
                    className={`fixed inset-0 bg-[rgba(0,0,0,0.5)] transition-opacity duration-300 ease-in-out ${
                        show ? 'opacity-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                    onClick={toggleShow}
                />

                {/* Modal */}
                <div
                    className={`w-full max-w-2xl bg-white shadow-lg rounded-lg p-4 relative transform transition-all duration-300 ease-in-out ${
                        show ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                <div
                {...getRootProps()}
                className={`rounded-lg border-2 border-dashed p-4 min-h-[240px] flex flex-col items-center justify-center text-center cursor-pointer transition duration-200 ease-in-out ${
                    isDragActive ? 'border-blue-500 bg-gray-200 bg-opacity-50' : 'border-gray-300'
                }`}
                >
                <input {...getInputProps()} />
                <div>
                    {/* Cloud icon and prompt */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 mb-4 fill-gray-600 inline-block" viewBox="0 0 32 32">
                        <path
                        d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                        data-original="#000000"
                        />
                        <path
                        d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                        data-original="#000000"
                        />
                    </svg>
                    <h4 className="text-sm text-gray-600">Drag & Drop or <span className="text-blue-600">click to select files</span> to upload</h4>
                </div>
                </div>
                    <div className="mt-4">
                        {files.map((file, index) => (
                            <UploadProgress key={index} file={file} removeFile={() => removeFile(index)} />
                        ))}
                    </div>

                    <div className="pt-4 flex justify-between gap-4">
                        <button type="button"
                            className="w-full px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200" onClick={toggleShow}>Cancel</button>
                        <button type="button"
                            className="w-full px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600" onClick={extractText}>Extract Text</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Uploader;
