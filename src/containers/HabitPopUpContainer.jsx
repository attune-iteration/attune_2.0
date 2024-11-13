/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import ChooseGenreDisplay from '../components/ChooseGenreDisplay.jsx';
import SliderDisplay from '../components/SliderDisplay.jsx';

const HabitPopUpContainer = ({ visibility, openPopUp, closePopUp }) => {
  
  const [innerVisibility, setInnerVisibility] = useState(false);

  const openInnerPopUp = () => setInnerVisibility(true);
  const closeInnerPopUp = () => setInnerVisibility(false);

  const handleSubmit = async event => {
    event.preventDefault();
    closeInnerPopUp();
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Habit name...'></input>
        <button onClick={openInnerPopUp}>
        {visibility && (
          <ChooseGenreDisplay closeInnerPopUp={closeInnerPopUp}/>
        )}
        </button>
        <p>Display Selected Genre Here</p>
        <SliderDisplay />
        <button onClick={closePopUp}>Cancel</button>
        <button type='submit'>GO</button>
      </form>
    </div>
  )
}

export default HabitPopUpContainer;