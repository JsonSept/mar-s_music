import React from 'react';

const SongCard = ({ song, setCurrentSong }) => {
  const handleClick = () => {
    setCurrentSong(song.url);
  };

  return (
    <div className="song-card" onClick={handleClick}>
      <img src={song.image} alt={song.title} />
      <h3>{song.title}</h3>
    </div>
  );
};

export default SongCard;
