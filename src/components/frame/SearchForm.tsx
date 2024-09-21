'use client';
import React, { useState } from 'react';

const SearchForm: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your search logic here or call an API
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="line2 flex justify-end mb-2">
      <form id="_77_fm" onSubmit={handleSearch} className="flex">
        <input
          className="border border-gray-400 p-2 rounded-l-md"
          id="_77_keywords"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm ..."
        />
        <button type="submit" className="bg-gray-300 p-2 rounded-r-md">
          <i className="fa fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
