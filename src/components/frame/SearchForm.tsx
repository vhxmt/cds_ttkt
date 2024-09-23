'use client';
import React, { useState } from 'react';

interface SearchFormProps {
  onSearchResults: (results: any[]) => void; // Function to handle search results
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      console.error('Search query is empty.');
      return; // Avoid sending an empty query
    }

    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        onSearchResults(data); // Pass search results to the parent component
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
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
