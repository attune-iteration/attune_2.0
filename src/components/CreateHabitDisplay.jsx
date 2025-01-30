/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import HabitPopUpContainer from '../containers/HabitPopUpContainer.jsx';

const CreateHabitDisplay = ({makeRequest}) => {
  const [visibility, setVisibility] = useState(false);

  const openPopUp = () => setVisibility(true);
  const closePopUp = () => setVisibility(false);

  return (
		<div className='mb-6'>
			<button
				onClick={openPopUp}
				className='bg-teal-500 border-2 border-teal-500 hover:bg-teal-700 hover:border-2 hover:border-teal-500 active:bg-teal-800 text-gray-100 font-bold py-2 px-4 rounded'
			>
				Create New Habit
			</button>
			{visibility && <HabitPopUpContainer closePopUp={closePopUp} />}
		</div>
  );
}

export default CreateHabitDisplay;
