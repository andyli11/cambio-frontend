import React from 'react';

// structure of the ImageData type
interface ImageData {
  creation_time: string;
  file_binary: string;
  file_name: string;
  text_content: string;
  type_of_file: string;
}

// props that ImageCard will receive
interface ImageCardProps {
  image: ImageData;
}

// count the number of words in a given text
const countWords = (text: string): number => {
  return text.split(/\s+/).filter(word => word.length > 0).length;
};

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  
  // text content is considered long if more than 50 words
  const isLongText = countWords(image.text_content) > 50;

  // determine file type
  const isImage = image.type_of_file.startsWith('image/');
  const isPDF = image.type_of_file === 'application/pdf';

  // open the file in a new tab when clicked
  const handleFileClick = () => {
    const link = document.createElement('a');
    link.href = image.file_binary; 
    link.target = '_blank'; // Open the link in a new tab
    document.body.appendChild(link); 
    link.click(); // Programmatically click the link
    document.body.removeChild(link);
  };

  return (
    <div className='max-w-lg rounded-2xl overflow-hidden shadow-lg bg-white text-black text-sm'>
      {isImage ? (
        // Render an image element if the file is an image
        <img
          src={image.file_binary}
          alt={image.file_name} 
          className='w-full hover:opacity-75 cursor-pointer'
          onClick={handleFileClick} 
        />
      ) : isPDF ? (
        // Render a placeholder for PDF files
        <div
          onClick={handleFileClick} 
          className='w-full h-64 bg-gray-200 flex items-center justify-center cursor-pointer hover:opacity-75'
        >
          <p className='text-center text-gray-700'>Click to view PDF</p>
        </div>
      ) : (
        // Other file types
        <div
          onClick={handleFileClick} 
          className='w-full h-64 bg-gray-200 flex items-center justify-center cursor-pointer hover:opacity-75'
        >
          <p className='text-center text-gray-700'>Download {image.file_name}</p>
        </div>
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-purple-500 text-xl mb-2">
          {image.file_name}
        </div>
        <ul>
          <li>
            <strong>File Type:</strong> {image.type_of_file}
          </li>
          <li>
            <strong>Text Content:</strong>
            <div className={isLongText ? "max-h-60 overflow-y-scroll" : ""}>
              {image.text_content}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ImageCard;
