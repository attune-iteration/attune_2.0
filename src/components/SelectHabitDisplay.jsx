/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import VibePopUpContainer from '../containers/VibePopUpContainer.jsx';

const SelectHabitDisplay = ({handleSelectOptionChange, habits}) => {
  const [dropdownOption, setDropdownOption] = useState('Select a Habit');
  const [visibility, setVisibility] = useState(false);

  // on mount, fetch the habits
  useEffect(() => {
    // Going to comment this out really quickly to do some testing - 
    // feel free to uncomment when needed
    // onMount();
  }, []);

  const openPopUp = () => setVisibility(true);
  const closePopUp = () => setVisibility(false);

  const options = [
    { label: 'Habit Name 1', value: 'Value 1' },
    { label: 'Habit Name 2', value: 'Value 2' },
    { label: 'Habit Name 3', value: 'Value 3' },
  ];

  const handleChange = (event) => {
    setDropdownOption(event.target.value);
    console.log('Select habit clicked:', event.target.value);
  };

  return (
    <div>
      <select
        className='place-items-start bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded mr-6'
        value={dropdownOption}
        placeholder='Choose an existing habit'
        onChange={handleChange}
        onClick={handleSelectOptionChange}
      >
       <option value="" selected>Select A Habit</option>
        {habits && habits.map((habit, index) => (
          <option key={index} value={habit.habit_name}> 
            {habit.habit_name}
          </option>
        ))}
      </select>
      <button onClick={openPopUp} className='rounded border-2 border-blue-500 px-4 py-1 text-gray-200' >GO</button>
      {visibility && <VibePopUpContainer closePopUp={closePopUp} />}
    </div>
  );
};

export default SelectHabitDisplay;
