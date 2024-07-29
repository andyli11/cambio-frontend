import React from 'react';

interface ImageData {
  creation_time: string;
  file_binary: string;
  file_name: string;
  text_content: string;
  type_of_file: string;
}

interface ImageCardProps {
  image: ImageData;
}

// Utility function to count words
const countWords = (text: string): number => {
  return text.split(/\s+/).filter(word => word.length > 0).length;
};

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const isLongText = countWords(image.text_content) > 50;

  const handleImageClick = () => {
    // Create a temporary link element and open it in a new tab
    const link = document.createElement('a');
    link.href = image.file_binary;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };  

  return (
    <div className='max-w-lg rounded-2xl overflow-hidden shadow-lg bg-white text-black text-sm'>
      <img
        src={image.file_binary}
        alt={image.file_name}
        className='w-full hover:opacity-75 cursor-pointer'
        onClick={handleImageClick}
      />
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
