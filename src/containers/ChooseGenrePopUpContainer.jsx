/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

// import PickGenreDisplay from '../components/PickGenreDisplay.jsx'

const ChooseGenrePopUpContainer = ({
  genres,
  closeInnerPopUp,
  handleCheckBoxChange,
  checkedGenres,
}) => {
  return (
    <div >
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            <input
              type='checkbox'
              id={genre.id}
              checked={checkedGenres.includes(genre.label)}
              onChange={() => handleCheckBoxChange(genre.label)}
            />
            <label htmlFor={genre.id}>{genre.label}</label>
          </li>
        ))}
      </ul>
      <button onClick={closeInnerPopUp}>Back</button>
    </div>
  );

  // return (
  //   <div>
  //     <PickGenreDisplay />
  //     <button onClick={closeInnerPopUp}>Cancel</button>
  //   </div>
  // )
};

export default ChooseGenrePopUpContainer;
