 /* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import HabitPopUpContainer from '../containers/HabitPopUpContainer.jsx';

const CreateHabitDisplay = () => {

  const [visibility, setVisibility ] = useState(false);

  const openPopUp = () => setVisibility(true);
  const closePopUp = () => setVisibility(false);
  
  return (
    <div>
      <button onClick={openPopUp}>Create New Habit</button>
      {visibility && (
        <HabitPopUpContainer closePopUp={closePopUp} />
      )}
    </div>
  )
}

export default CreateHabitDisplay;