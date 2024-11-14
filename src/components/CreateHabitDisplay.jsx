/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import HabitPopUpContainer from '../containers/HabitPopUpContainer.jsx';

const CreateHabitDisplay = ({makeRequest}) => {
  const [visibility, setVisibility] = useState(false);

  const openPopUp = () => setVisibility(true);
  const closePopUp = () => setVisibility(false);

  return (
    <div>
      {/* {!visibility ? (
        <button
          onClick={openPopUp}
          className='bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded opacity-85'
        >
          Create A New Habit
        </button>
      ) : (
        <HabitPopUpContainer closePopUp={closePopUp} />
      )} */}
      <button
        onClick={openPopUp}
        className='bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded opacity-85'
      >
        Create A New Habit
      </button>
      {visibility && <HabitPopUpContainer closePopUp={closePopUp} makeRequest={makeRequest}/>}
    </div>
  );
};

export default CreateHabitDisplay;
