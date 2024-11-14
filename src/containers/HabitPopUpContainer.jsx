/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ChooseGenrePopUpContainer from '../containers/ChooseGenrePopUpContainer.jsx';
import SliderDisplay from '../components/SliderDisplay.jsx';
import HabitNameDisplay from '../components/HabitNameDisplay.jsx';

const HabitPopUpContainer = ({ visibility, openPopUp, closePopUp, makeRequest }) => {
	// Genres Placeholders
	const genres = [
		{ id: 1, label: 'Rock' },
		{ id: 2, label: 'Pop' },
		{ id: 3, label: 'R-n-b' },
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
	const fetchRecommendationsUrl = `http://localhost:5001/api/spotify_recommendations?seed_genres=${checkedGenres}&target_valence=${valenceValue / 100}&target_energy=${energyValue / 100}&target_danceability=${danceabilityValue / 100}&limit=1`;
	const askAiUrl = 'http://localhost:5001/api/ask_ai';
	const openInnerPopUp = () => setInnerVisibility(true);
	const closeInnerPopUp = () => setInnerVisibility(false);

	const openAiModal = () => setAiModalVisible(true);
	const closeAiModal = () => setAiModalVisible(false);

	const handleAiPromptChange = (event) => {
		setAiPrompt(event.target.value);
	  };

	
	  const handleAiSubmit = async (event) => {
		event.preventDefault();
		const response = await makeRequest(
			askAiUrl,
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
		// const response = await makeRequest(fetchRecommendationsUrl, 'GET');
    // console.log('Response', response);
		// closeInnerPopUp();
		// if (response && response.recommendations) {
		// 	setRecommendations(response.recommendations[0]);
		// 	const recommendationsString = JSON.stringify(
		// 		response.recommendations[0]
		// 	);
		// 	navigate(
		// 		`/vibe?recommendations=${encodeURIComponent(recommendationsString)}`
		// 	);
		// }
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
				<button className='bg-slate-900 hover:bg-slate-800 p-2 rounded-lg text-teal-500' onClick={openInnerPopUp}>Choose Genres</button>
				{innerVisibility && (
					<ChooseGenrePopUpContainer
						genres={genres}
						closeInnerPopUp={closeInnerPopUp}
						handleCheckBoxChange={handleCheckBoxChange}
						checkedGenres={checkedGenres}
					/>
				)}
				<p>
					<strong className='text-teal-400'>Selected Genres:</strong>
				</p>
				{checkedGenres.map((checkedGenre, index) => (
					<span className='text-gray-200' key={index}>{checkedGenre}, </span>
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
					<button
						onClick={closePopUp}
						type='button'
					>
						Cancel
					</button>
					<button
						type='submit'
					>
						GO
					</button>
					<button type='button' onClick={openAiModal} className=''>
            Ask AI
          </button>
				</form>
			</div>
		</div>

	);
};

export default HabitPopUpContainer;
