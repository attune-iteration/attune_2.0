/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import VibePopUpContainer from '../containers/VibePopUpContainer.jsx';

const SelectHabitDisplay = () => {
  const [dropdownOption, setDropdownOption] = useState('Select a Habit');
  const [visibility, setVisibility] = useState(false);

  const openPopUp = () => setVisibility(true);
  const closePopUp = () => setVisibility(false);

  const options = [
    { label: 'Habit Name 1', value: 'Value 1' },
    { label: 'Habit Name 2', value: 'Value 2' },
    { label: 'Habit Name 3', value: 'Value 3' },
  ];

  const handleChange = (event) => {
    setDropdownOption(event.target.value);
  };

  return (
		<div>
			<select
				className='bg-teal-500 border-2 border-teal-500 hover:bg-teal-700 hover:border-2 hover:border-teal-500 text-white font-bold py-2 px-4 rounded m-4'
				value={dropdownOption}
				onChange={handleChange}
			>
				{options.map((option) => (
					<option
						key={option.value}
						value={option.value}
					>
						{option.label}
					</option>
				))}
			</select>
			<button
				className='bg-teal-700 border-2 border-teal-700 hover:bg-teal-800 hover:border-2 hover:border-teal-700 text-white font-bold py-3 px-6 rounded m-4'
				onClick={openPopUp}
			>
				GO
			</button>
			{visibility && <VibePopUpContainer closePopUp={closePopUp} />}
		</div>
  );
};

export default SelectHabitDisplay;
