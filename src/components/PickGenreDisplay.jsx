import React from 'react';

const PickGenreDisplay = ({habitName, handleClick}) => {
  return (
    <div>
      PickGenreDisplay: HELLO!
      <Popup>
        <div className='modal'>
          <div className='content'>
            <h3>Pick your genres:</h3>
            <input type='checkbox'>Rock</input>
            <input type='checkbox'>Pop</input>
            <input type='checkbox'>R&B</input>
            <input type='checkbox'>Classical</input>
            <input type='checkbox'>Electronic</input>
            <input type='checkbox'>Dubstep</input>
            <input type='checkbox'>Country</input>
            <input type='checkbox'>Hip-Hop</input>
            <input type='checkbox'>Blues</input>
            <input type='checkbox'>K-Pop</input>
            <input type='checkbox'>Salsa</input>
            <button type='button' onClick={handleClick}>OK</button>
          </div>
        </div>
      </Popup>
    </div>
  )
}

export default PickGenreDisplay;