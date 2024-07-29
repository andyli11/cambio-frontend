"use client";
import React, { useState, useEffect } from 'react';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [data, setData] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/');
        if (response.ok) {
          const result = await response.json();
          if (Array.isArray(result)) {
            setData(result);
            setFilteredData(result); // Initially display all data
          } else {
            console.error('Data is not an array:', result);
          }
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      setFilteredData(
        data.filter(item =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, data]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Adding a slight delay to allow click events to register
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  return (
    <div className="relative">
      <div className="block mb-2">
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="border p-2 w-full text-black"
          placeholder="Search..."
        />
      </div>
      {isFocused && (
        <div className="absolute top-full left-0 w-full border bg-white max-h-60 overflow-y-auto">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div key={index} className="p-2 hover:bg-gray-200">
                {item}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
