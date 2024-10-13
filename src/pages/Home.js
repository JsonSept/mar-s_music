import React, { useState, useRef } from 'react';
import Player from '../components/Player';
import SongCard from '../components/SongCard';
import Search from '../pages/Search';
import '../App.css';  // Import the CSS file for dark mode toggle styling

const Home = () => {
  const [currentSong, setCurrentSong] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [volume, setVolume] = useState(1); // Default volume is set to 100%
  const [darkMode, setDarkMode] = useState(true); // Dark mode state
  const [songName, setSongName] = useState("");

  const audioRef = useRef(null); // Reference to audio element

  const songs = [
    { title: "Rocketeer", url: "/assets/songs/Far East Movement, Ryan Tedder - Rocketeer (Lyrics).mp3" },
    { title: "Fly N Ghetto", url: "/assets/songs/Ayo & Teo - Fly N Ghetto (Lyrics).mp3" }
  ];

  useState(() => setFilteredSongs(songs), []);
  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      const fileType = file.type;
      const validAudioTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav']; // Add more if needed
  
      // Check if the selected file is a valid audio file
      if (validAudioTypes.includes(fileType)) {
        const objectURL = URL.createObjectURL(file); // Create a URL for the file
        setCurrentSong(objectURL); // Set the URL as the source for the player
        setSongName(file.name); // Display the file name
      } else {
        alert('Please upload a valid MP3 or audio file'); // Show an alert for invalid files
      }
    }
  };
  

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume; // Adjust volume of audio element
    }
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'home-container dark' : 'home-container light'}>
      <h2>Home</h2>

      {/* Dark Mode Toggle Button */}
      <div className={`toggle-container ${darkMode ? 'dark' : 'light'}`}>
        <button className='toggle-button' onClick={toggleDarkMode}>
          <div className={`toggle-switch ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <span className="circle"></span>
          </div>
          <span className='toggle-label'>
            {darkMode ? 'Dark Mode' : 'Light Mode'}
          </span>
        </button>
      </div>

      {/* Add Search component */}
      <Search songs={songs} setFilteredSongs={setFilteredSongs} />

      {/* Display the filtered list of songs */}
      <div className='song-list'>
        {filteredSongs.map((song, index) => (
          <SongCard key={index} song={song} setCurrentSong={setCurrentSong} />
        ))}
      </div>

      {/* File input to select local music file */}
      <div className='file-input'>
        <label htmlFor="file-upload">Upload a song from your device:</label>
        <input 
          id="file-upload" 
          type="file" 
          accept="audio/mp3*"  // Accept only audio files
          onChange={handleFileUpload} 
        />
      </div>

      {/* Display the song name */}
      {songName && <h3>Now Playing: {songName}</h3>}

      {/* Volume Control */}
      <div className='volume-control'>
        <label>Volume: {Math.round(volume * 100)}%</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>

      {/* Player with volume */}
      <Player currentSong={currentSong} audioRef={audioRef} />
    </div>
  );
};

export default Home;
