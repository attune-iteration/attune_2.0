 /* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import VibePopUpContainer from '../containers/VibePopUpContainer.jsx';

const SelectHabitDisplay = () => {

  const [ dropdownOption, setDropdownOption ] = useState('Select a Habit');
  const [ visibility, setVisibility ] = useState(false);

  const openPopUp = () => setVisibility(true);
  const closePopUp = () => setVisibility(false);

  const options = [
		{ label: 'Habit Name 1', value: 'Value 1' },
		{ label: 'Habit Name 2', value: 'Value 2' },
		{ label: 'Habit Name 3', value: 'Value 3' }
  ];

  const handleChange = event => {
    setDropdownOption(event.target.value);
  }

  return (
    <div>
      <select value={dropdownOption} onChange={handleChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button onClick={openPopUp}>GO</button>
      {visibility && (
        <VibePopUpContainer closePopUp={closePopUp} />
      )}
    </div>
  )
};

export default SelectHabitDisplay;