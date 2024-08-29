import React, { useState, ChangeEvent } from 'react';

interface ImageSearchProps {
  searchText: (text: string) => void;
}

// handle search input and trigger searchText function
const ImageSearch: React.FC<ImageSearchProps> = ({ searchText }) => {
  
  // track user input
  const [text, setText] = useState<string>('');

  // search during input changes
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value; 
    setText(newText);
    searchText(newText.trim());
  };

  return (
    <div className='max-w-sm rounded overflow-hidden my-10 mx-auto'>
      <form className='w-full max-w-sm'>
        <div className='flex items-center border-b-2 border-purple-500 py-2'>
          {/* Input field for entering the search term */}
          <input 
            onChange={onChange}
            className='appearance-none bg-transparent border-none w-full text-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none' 
            type='text' 
            placeholder='Search Image Term...' 
            value={text} // Bind the input value to the state
          />
          <button 
            className='flex-shrink-0 bg-purple-800 hover:bg-purple-900 border-purple-800 hover:border-purple-900 text-sm border-4 text-white py-1 px-2 rounded hover:cursor-pointer' 
            type='submit'
            disabled // Disabled because the search is handled on keypress, not form submission
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageSearch;
