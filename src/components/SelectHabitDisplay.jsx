/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import VibePopUpContainer from '../containers/VibePopUpContainer.jsx';

const SelectHabitDisplay = ({ handleSelectOptionChange, habits }) => {
  const [dropdownOption, setDropdownOption] = useState('Select a Habit');
  const [visibility, setVisibility] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [selectedHabit, setSelectedHabit] = useState(null);

  const makeRequest = async (url, method) => {
    console.log('Sending data to server...');
    // const preferenceData = {
    //   habit_name: habitNameInputValue,
    //   seed_genres: checkedGenres,
    //   target_energy: energyValue / 100,
    //   target_danceability: danceabilityValue / 100,
    //   target_valence: valenceValue / 100,
    // };
    // console.log(preferenceData);

    try {
      const response = await fetch(url, {
        method: method,
        credentials: 'include',
      });
      if (!response.ok) {
        console.error('An error occurred while fetching data: ', response.statusText);
      }
      const result = await response.json();
      console.log(`Preference data has been sent to the server via a ${method} request and received the following response: `, result);
      return result;
    } catch (error) {
      console.error('Failed to send POST request to server.', error);
    }
  };

  // on mount, fetch the habits
  useEffect(() => {
    // Going to comment this out really quickly to do some testing -
    // feel free to uncomment when needed
    // onMount();
  }, []);

  const openPopUp = () => setVisibility(true);
  const closePopUp = () => setVisibility(false);

  const handleChange = (event) => {
    setDropdownOption(event.target.value);
    const habit = habits.find((habit) => habit.habit_name === event.target.value);
    setSelectedHabit(habit);
    console.log('Selected Habit:', habit);
  };

  const handleGoClick = async () => {
    if (selectedHabit) {
      // Ensure the genres are available and properly formatted
      const genres = selectedHabit.genre_names || selectedHabit.seed_genres;
      const seedGenres = Array.isArray(genres) ? genres.join(',') : genres;

      const fetchRecommendationsUrl = `http://localhost:5001/api/spotify_recommendations?seed_genres=${seedGenres}&target_valence=${selectedHabit.target_valence}&target_energy=${selectedHabit.target_energy}&target_danceability=${selectedHabit.target_danceability}&limit=1`;

      const response = await makeRequest(fetchRecommendationsUrl, 'GET');

      if (response && response.recommendations) {
        setRecommendations(response.recommendations);
        openPopUp();
      }
    }
  };

  return (
    <div>
      <select className='place-items-start bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded mr-6' value={dropdownOption} placeholder='Choose an existing habit' onChange={handleChange} onClick={handleSelectOptionChange}>
        <option value='' selected>
          Select A Habit
        </option>
        {habits &&
          habits.map((habit, index) => (
            <option key={index} value={habit.habit_name}>
              {habit.habit_name}
            </option>
          ))}
      </select>
      <button onClick={handleGoClick} className='rounded border-2 border-blue-500 px-4 py-1 text-gray-200'>
        GO
      </button>
      {visibility && <VibePopUpContainer closePopUp={closePopUp} recommendations={recommendations} />}
    </div>
  );
};

export default SelectHabitDisplay;
