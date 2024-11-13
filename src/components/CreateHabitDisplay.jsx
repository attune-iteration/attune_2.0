 /* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import HabitPopUpContainer from '../containers/HabitPopUpContainer.jsx';

const CreateHabitDisplay = () => {

  const [visibility, setVisibility ] = useState(false);

  const openPopUp = () => setVisibility(true);
  const closePopUp = () => setVisibility(false);
  
  return (
    <div>
      <button 
      onClick={openPopUp}
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Create New Habit
      </button>
      {visibility && (
        <HabitPopUpContainer closePopUp={closePopUp} />
      )}
    </div>
  )
}

export default CreateHabitDisplay;