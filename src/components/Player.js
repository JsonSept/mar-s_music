import React from 'react';

const Player = ({ currentSong, audioRef }) => {
  return (
    <div className='player-container'>
      <audio controls ref={audioRef} src={currentSong}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Player;
