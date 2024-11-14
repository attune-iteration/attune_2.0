/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const VibeDisplay = ({ recommendations }) => {
  return (
    <div className='text-gray-200 text-center'>
      <h3>Here's The Vibe!</h3>
      {recommendations &&
        recommendations.map((song, index) => (
          <div key={index}>
            <img src={song.artwork} alt={`${song.name} artwork`} />
            <p>
              {song.name} by {song.artist}
            </p>
          </div>
        ))}
    </div>
  );
};

export default VibeDisplay;
