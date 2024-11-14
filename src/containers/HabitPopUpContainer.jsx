/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [recommendations, setRecommendations] = useState({});

  const [aiModalVisible, setAiModalVisible] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const navigate = useNavigate();

  const createHabitsUrl = `http://localhost:5001/api/habits?name=default_user&seed_genres=${checkedGenres}&target_valence=${valenceValue / 100}&target_energy=${energyValue / 100}&target_danceability=${danceabilityValue / 100}&habit_name=${habitNameInputValue}`;
  const fetchRecommendationsUrl = `http://localhost:5001/api/spotify_recommendations?seed_genres=${checkedGenres}&target_valence=${valenceValue / 100}&target_energy=${energyValue / 100}&target_danceability=${danceabilityValue / 100}`;

  const openInnerPopUp = () => setInnerVisibility(true);
  const closeInnerPopUp = () => setInnerVisibility(false);

  const openAiModal = () => setAiModalVisible(true);
  const closeAiModal = () => setAiModalVisible(false);

  const handleAiPromptChange = (event) => {
    setAiPrompt(event.target.value);
  };

  const makeRequest = async (url, method, body = null) => {
    console.log('Sending data to server...');
    try {
      const options = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      if (body) {
        options.body = JSON.stringify(body);
      }
      const response = await fetch(url, options);
      if (!response.ok) {
        console.error(
          'An error occurred while fetching data: ',
          response.statusText
        );
        return null;
      }
      const result = await response.json();
      console.log(`Received response from server: `, result);
      return result;
    } catch (error) {
      console.error('Failed to send request to server.', error);
      return null;
    }
  };

  const handleAiSubmit = async (event) => {
    event.preventDefault();
    const response = await makeRequest(
      'http://localhost:5001/api/ask_ai',
      'POST',
      { prompt: aiPrompt }
    );
    closeAiModal();
    if (response) {
      setEnergyValue(response.target_energy * 100);
      setDanceabilityValue(response.target_danceability * 100);
      setValenceValue(response.target_valence * 100);
      setCheckedGenres(response.seed_genres.split(','));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await makeRequest(createHabitsUrl, 'POST');
    const response = await makeRequest(fetchRecommendationsUrl, 'GET');
    closeInnerPopUp();
    if (response && response.recommendations) {
      setRecommendations(response.recommendations[0]);
      const recommendationsString = JSON.stringify(response.recommendations[0]);
      navigate(
        `/vibe?recommendations=${encodeURIComponent(recommendationsString)}`
      );
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

  return (
    <div className='fixed inset-0 w-full h-screen flex flex-col justify-center items-center bg-black bg-opacity-25'>
      <div className='relative p-8 w-full max-w-2xl bg-gray-950 rounded-3xl'>
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
          energyValue={energyValue}
          danceabilityValue={danceabilityValue}
          valenceValue={valenceValue}
        />
        <form
          onSubmit={handleSubmit}
          className='flex justify-between mt-6 px-4 sm:px-8 w-full max-w-2xl mx-auto'
        >
          <button onClick={closePopUp} className=''>
            Cancel
          </button>
          <button type='submit' className=''>
            GO
          </button>
          <button type='button' onClick={openAiModal} className=''>
            Ask AI
          </button>
        </form>
        {aiModalVisible && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-6 rounded'>
              <form onSubmit={handleAiSubmit}>
                <textarea
                  value={aiPrompt}
                  onChange={handleAiPromptChange}
                  placeholder='Enter your prompt here...'
                  className='w-full h-24 p-2 border border-gray-300 rounded'
                />
                <div className='flex justify-end mt-4'>
                  <button type='button' onClick={closeAiModal} className='mr-2'>
                    Cancel
                  </button>
                  <button type='submit'>Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitPopUpContainer;
