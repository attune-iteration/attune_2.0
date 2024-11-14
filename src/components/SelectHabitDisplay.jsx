/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import VibePopUpContainer from '../containers/VibePopUpContainer.jsx';

const SelectHabitDisplay = ({
  handleSelectOptionChange,
  habits,
  makeRequest,
}) => {
  const [dropdownOption, setDropdownOption] = useState('Select a Habit');
  const [visibility, setVisibility] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [selectedHabit, setSelectedHabit] = useState(null);

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
    const habit = habits.find(
      (habit) => habit.habit_name === event.target.value
    );
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
			<select
				className='bg-teal-500 border-2 border-teal-500 hover:bg-teal-700 hover:border-2 hover:border-teal-500 active:bg-teal-800 text-gray-100 font-bold py-2 px-4 rounded m-4'
				value={dropdownOption}
				placeholder='Choose an existing habit'
				onChange={handleChange}
				onClick={handleSelectOptionChange}
			>
				<option
					value=''
					selected
				>
					Select A Habit
				</option>
				{habits &&
					habits.map((habit, index) => (
						<option
							key={index}
							value={habit.habit_name}
						>
							{habit.habit_name}
						</option>
					))}
			</select>
			<button
				className='bg-teal-400 border-2 border-teal-400 hover:bg-teal-600 hover:border-2 hover:border-teal-400 active:bg-teal-800 text-gray-100 font-bold py-3 px-6 rounded m-4'
				onClick={openPopUp}
			>
				GO
			</button>
			{visibility && <VibePopUpContainer closePopUp={closePopUp} />}
		</div>
  );
};

export default SelectHabitDisplay;
