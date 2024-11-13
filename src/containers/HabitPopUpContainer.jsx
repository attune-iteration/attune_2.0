/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import ChooseGenrePopUpContainer from '../containers/ChooseGenrePopUpContainer.jsx';
import SliderDisplay from '../components/SliderDisplay.jsx';
import HabitNameDisplay from '../components/HabitNameDisplay.jsx';

const HabitPopUpContainer = ({ visibility, openPopUp, closePopUp }) => {
  // Genres Placeholders
  const genres = [
    { id: 1, label: 'rock' },
    { id: 2, label: 'pop' },
    { id: 3, label: 'r-n-b' },
  ];

  // Targets Placeholder
  const targets = [
    { id: 1, label: 'Energy' },
    { id: 2, label: 'Danceability' },
    { id: 3, label: 'Valence' },
  ];

  const [innerVisibility, setInnerVisibility] = useState(false);
  const [habitNameInputValue, setHabitNameInputValue] = useState('');
  const [checkedGenres, setCheckedGenres] = useState([]);
  const [energyValue, setEnergyValue] = useState(0);
  const [danceabilityValue, setDanceabilityValue] = useState(0);
  const [valenceValue, setValenceValue] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  const createHabitsUrl = `http://localhost:5001/api/habits?name=default_user&seed_genres=${checkedGenres}&target_valence=${valenceValue / 100}&target_energy=${energyValue / 100}&target_danceability=${danceabilityValue / 100}&habit_name=${habitNameInputValue}`;
  const fetchRecommendationsUrl = `http://localhost:5001/api/spotify_recommendations?seed_genres=${checkedGenres}&target_valence=${valenceValue / 100}&target_energy=${energyValue / 100}&target_danceability=${danceabilityValue / 100}`;

  const openInnerPopUp = () => setInnerVisibility(true);
  const closeInnerPopUp = () => setInnerVisibility(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await makeRequest(createHabitsUrl, 'POST');
    closeInnerPopUp();
    const response = await makeRequest(fetchRecommendationsUrl, 'GET');
	if (response) {
		setRecommendations(response)
		console.log(recommendations);
	} 
  };

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setHabitNameInputValue(event.target.value);
  };

  const handleCheckBoxChange = (genreLabel) => {
    setCheckedGenres((prevCheckedGenres) => {
      if (prevCheckedGenres.includes(genreLabel)) {
        return prevCheckedGenres.filter((id) => id !== genreLabel);
      } else {
        return [...prevCheckedGenres, genreLabel];
      }
    });
  };

  const handleSliderChange = (targetId, event) => {
    if (targetId === targets[0].id) {
      handleEnergySliderChange(event);
    } else if (targetId === targets[1].id) {
      handleDanceabilitySliderChange(event);
    } else {
      handleValenceSliderChange(event);
    }
  };

  const handleEnergySliderChange = (event) => {
    setEnergyValue(event.target.value);
  };

  const handleDanceabilitySliderChange = (event) => {
    setDanceabilityValue(event.target.value);
  };

  const handleValenceSliderChange = (event) => {
    setValenceValue(event.target.value);
  };

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
      });
      if (!response.ok) {
        console.error(
          'An error occurred while fetching data: ',
          response.statusText
        );
      }
      const result = await response;
      console.log(
        `Preference data has been sent to the server via a ${method} request and received the following response: `,
        result
      );
      return result;
    } catch (error) {
      console.error('Failed to send POST request to server.', error);
    }
  };

  return (
    <div>
      <HabitNameDisplay
        handleInputChange={handleInputChange}
        habitNameInputValue={habitNameInputValue}
      />
      <button onClick={openInnerPopUp}>Choose Genres</button>
      {innerVisibility && (
        <ChooseGenrePopUpContainer
          genres={genres}
          closeInnerPopUp={closeInnerPopUp}
          handleCheckBoxChange={handleCheckBoxChange}
          checkedGenres={checkedGenres}
        />
      )}
      <p>
        <strong>Selected Genre:</strong>
      </p>
      {checkedGenres.map((checkedGenre, index) => (
        <span key={index}>{checkedGenre}, </span>
      ))}
      <SliderDisplay
        targets={targets}
        handleSliderChange={handleSliderChange}
      />
      <form onSubmit={handleSubmit}>
        <button onClick={closePopUp}>Cancel</button>
        <button type='submit'>GO</button>
      </form>
    </div>
  );
};

export default HabitPopUpContainer;
