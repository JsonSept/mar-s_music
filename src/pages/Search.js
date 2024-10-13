import React, { useState } from 'react';

const Search = ({ songs, setFilteredSongs }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter the songs array based on the search term
    const filtered = songs.filter(song =>
      song.title.toLowerCase().includes(term)
    );

    // Update the filteredSongs state in the parent component
    setFilteredSongs(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a song..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
