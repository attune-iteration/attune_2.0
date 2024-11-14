/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ChooseGenrePopUpContainer from '../containers/ChooseGenrePopUpContainer.jsx';
import SliderDisplay from '../components/SliderDisplay.jsx';
import HabitNameDisplay from '../components/HabitNameDisplay.jsx';

const HabitPopUpContainer = ({ visibility, openPopUp, closePopUp }) => {
	// Genres Placeholders
	const genres = [
		{ id: 1, label: 'acoustic', text: 'Acoustic' },
		{ id: 2, label: 'afrobeat', text: 'Afrobeat' },
		{ id: 3, label: 'alt-rock', text: 'Alternative Rock' },
		{ id: 4, label: 'alternative', text: 'Alternative' },
		{ id: 5, label: 'ambient', text: 'Ambient' },
		{ id: 6, label: 'anime', text: 'Anime' },
		{ id: 7, label: 'black-metal', text: 'Black Metal' },
		{ id: 8, label: 'bluegrass', text: 'Bluegrass' },
		{ id: 9, label: 'blues', text: 'Blues' },
		{ id: 10, label: 'bossanova', text: 'Bossa Nova' },
		{ id: 11, label: 'brazil', text: 'Brazil' },
		{ id: 12, label: 'breakbeat', text: 'Breakbeat' },
		{ id: 13, label: 'british', text: 'British' },
		{ id: 14, label: 'cantopop', text: 'Canto Pop' },
		{ id: 15, label: 'chicago-house', text: 'Chicago House' },
		{ id: 16, label: 'children', text: 'Children' },
		{ id: 17, label: 'chill', text: 'Chill' },
		{ id: 18, label: 'classical', text: 'Classical' },
		{ id: 19, label: 'club', text: 'Club' },
		{ id: 20, label: 'comedy', text: 'Comedy' },
		{ id: 21, label: 'country', text: 'Country' },
		{ id: 22, label: 'dance', text: 'Dance' },
		{ id: 23, label: 'dancehall', text: 'Dancehall' },
		{ id: 24, label: 'death-metal', text: 'Death Metal' },
		{ id: 25, label: 'deep-house', text: 'Deep House' },
		{ id: 26, label: 'detroit-techno', text: 'Detroit Techno' },
		{ id: 27, label: 'disco', text: 'Disco' },
		{ id: 28, label: 'disney', text: 'Disney' },
		{ id: 29, label: 'drum-and-bass', text: 'Drum and Bass' },
		{ id: 30, label: 'dub', text: 'Dub' },
		{ id: 31, label: 'dubstep', text: 'Dubstep' },
		{ id: 32, label: 'edm', text: 'EDM' },
		{ id: 33, label: 'electro', text: 'Electro' },
		{ id: 34, label: 'electronic', text: 'Electronic' },
		{ id: 35, label: 'emo', text: 'Emo' },
		{ id: 36, label: 'folk', text: 'Folk' },
		{ id: 37, label: 'forro', text: 'Forro' },
		{ id: 38, label: 'french', text: 'French' },
		{ id: 39, label: 'funk', text: 'Funk' },
		{ id: 40, label: 'garage', text: 'Garage' },
		{ id: 41, label: 'german', text: 'German' },
		{ id: 42, label: 'gospel', text: 'Gospel' },
		{ id: 43, label: 'goth', text: 'Goth' },
		{ id: 44, label: 'grindcore', text: 'Grindcore' },
		{ id: 45, label: 'groove', text: 'Groove' },
		{ id: 46, label: 'grunch', text: 'Grunch' },
		{ id: 47, label: 'guitar', text: 'Guitar' },
		{ id: 48, label: 'happy', text: 'Happy' },
		{ id: 49, label: 'hard-rock', text: 'Hard Rock' },
		{ id: 50, label: 'hardcore', text: 'Hardcore' },
		{ id: 51, label: 'hardstyle', text: 'Hardstyle' },
		{ id: 52, label: 'heavy-metal', text: 'Heavy Metal' },
		{ id: 53, label: 'hip-hop', text: 'Hip-Hop' },
		{ id: 54, label: 'holidays', text: 'Holidays' },
		{ id: 55, label: 'honky-tonk', text: 'Honky Tonk' },
		{ id: 56, label: 'house', text: 'House' },
		{ id: 57, label: 'idm', text: 'IDM' },
		{ id: 58, label: 'indian', text: 'Indian' },
		{ id: 59, label: 'indie', text: 'Indie' },
		{ id: 60, label: 'indie-pop', text: 'Indie Pop' },
		{ id: 61, label: 'industrial', text: 'Industrial' },
		{ id: 62, label: 'iranian', text: 'Iranian' },
		{ id: 63, label: 'j-dance', text: 'J-Dance' },
		{ id: 64, label: 'j-idol', text: 'J-Idol' },
		{ id: 65, label: 'j-pop', text: 'J-Pop' },
		{ id: 66, label: 'j-rock', text: 'J-Rock' },
		{ id: 67, label: 'jazz', text: 'Jazz' },
		{ id: 68, label: 'k-pop', text: 'K-Pop' },
		{ id: 69, label: 'kids', text: 'Kids' },
		{ id: 70, label: 'latin', text: 'Latin' },
		{ id: 71, label: 'latino', text: 'Latino' },
		{ id: 72, label: 'malay', text: 'Malay' },
		{ id: 73, label: 'mandopop', text: 'Mandopop' },
		{ id: 74, label: 'metal', text: 'Metal' },
		{ id: 75, label: 'metal-misc', text: 'Metal Misc.' },
		{ id: 76, label: 'metalcore', text: 'Metalcore' },
		{ id: 77, label: 'minimal-techno', text: 'Minimal Techno' },
		{ id: 78, label: 'movies', text: 'Movies' },
		{ id: 79, label: 'mpb', text: 'MPB' },
		{ id: 80, label: 'new-age', text: 'New Age' },
		{ id: 81, label: 'new-release', text: 'New Release' },
		{ id: 82, label: 'opera', text: 'Opera' },
		{ id: 83, label: 'pagode', text: 'Pagode' },
		{ id: 84, label: 'party', text: 'Party' },
		{ id: 85, label: 'philippines-opm', text: 'Philippines OPM' },
		{ id: 86, label: 'piano', text: 'Piano' },
		{ id: 87, label: 'pop', text: 'Pop' },
		{ id: 88, label: 'pop-film', text: 'Pop-Film' },
		{ id: 89, label: 'post-dubstep', text: 'Post Dubstep' },
		{ id: 90, label: 'power-pop', text: 'Power-Pop' },
		{ id: 91, label: 'progressive-house', text: 'Progressive House' },
		{ id: 92, label: 'psych-rock', text: 'Psych Rock' },
		{ id: 93, label: 'punk', text: 'Punk' },
		{ id: 94, label: 'punk-rock', text: 'Punk Rock' },
		{ id: 95, label: 'r-n-b', text: 'R&B' },
		{ id: 96, label: 'rainy-day', text: 'Rainy Day' },
		{ id: 97, label: 'reggae', text: 'Reggae' },
		{ id: 98, label: 'reggaeton', text: 'Reggaeton' },
		{ id: 99, label: 'road-trip', text: 'Road Trip' },
		{ id: 100, label: 'rock', text: 'Rock' },
		{ id: 101, label: 'rock-n-roll', text: 'Rock-n-Roll' },
		{ id: 102, label: 'rockabilly', text: 'Rockabilly' },
		{ id: 103, label: 'romance', text: 'Romance' },
		{ id: 104, label: 'sad', text: 'Sad' },
		{ id: 105, label: 'salsa', text: 'Salsa' },
		{ id: 106, label: 'samba', text: 'Samba' },
		{ id: 107, label: 'sertanejo', text: 'Sertanejo' },
		{ id: 108, label: 'show-tunes', text: 'Show Tunes' },
		{ id: 109, label: 'singer-songwriter', text: 'Singer/Songwriter' },
		{ id: 110, label: 'ska', text: 'SKA' },
		{ id: 111, label: 'sleep', text: 'Sleep' },
		{ id: 112, label: 'songwriter', text: 'Songwriter' },
		{ id: 113, label: 'soul', text: 'Soul' },
		{ id: 114, label: 'soundtracks', text: 'Soundtracks' },
		{ id: 115, label: 'spanish', text: 'Spanish' },
		{ id: 116, label: 'study', text: 'Study' },
		{ id: 117, label: 'summer', text: 'Summer' },
		{ id: 118, label: 'swedish', text: 'Swedish' },
		{ id: 119, label: 'synth-pop', text: 'Synth-Pop' },
		{ id: 120, label: 'tango', text: 'Tango' },
		{ id: 121, label: 'techno', text: 'Techno' },
		{ id: 122, label: 'trance', text: 'Trance' },
		{ id: 123, label: 'trip-hop', text: 'Trip-Hop' },
		{ id: 124, label: 'turkish', text: 'Turkish' },
		{ id: 125, label: 'work-out', text: 'Workout' },
		{ id: 126, label: 'world-music', text: 'World Music' },
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
		<div
			className={`fixed inset-0 w-full h-screen flex flex-col justify-center items-center text-center bg-black bg-opacity-30`}
		>
			<div className='relative p-8 w-full max-w-2xl bg-gray-950 rounded-3xl'>
				<HabitNameDisplay
					handleInputChange={handleInputChange}
					habitNameInputValue={habitNameInputValue}
				/>
				<br></br>
				<button
					className='bg-slate-900 hover:bg-slate-800 active:bg-slate-700 p-4 rounded-lg'
					onClick={openInnerPopUp}
				>
					Choose Genres
				</button>
				{innerVisibility && (
					<ChooseGenrePopUpContainer
						genres={genres}
						closeInnerPopUp={closeInnerPopUp}
						handleCheckBoxChange={handleCheckBoxChange}
						checkedGenres={checkedGenres}
					/>
				)}
				<p className='leading-10 text-teal-500'>
					<strong>Selected Genre:</strong>
				</p>
				<div className='border-2 border-gray-900 rounded-xl p-2'>
					{checkedGenres.map((checkedGenre, index) => (
						<span key={index}>{checkedGenre}, </span>
					))}
				</div>
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
						className='bg-slate-900 hover:bg-slate-800 active:bg-slate-700 p-4 rounded-lg'
					>
						Cancel
					</button>
					<button
						type='submit'
						className='bg-slate-900 hover:bg-slate-800 active:bg-slate-700 p-4 rounded-lg'
					>
						GO
					</button>
					<button
						type='button'
						onClick={openAiModal}
						className='bg-slate-900 hover:bg-slate-800 active:bg-slate-700 p-4 rounded-lg'
					>
						Ask AI
					</button>
				</form>
				{aiModalVisible && (
					<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
						<div className='bg-gray-900 p-6 w-1/2 h-1/4 rounded-3xl'>
							<form onSubmit={handleAiSubmit}>
								<textarea
									value={aiPrompt}
									onChange={handleAiPromptChange}
									placeholder='Enter your prompt here...'
									className='w-full h-48 p-2 border-2 border-gray-700 bg-gray-800 text-teal-500 rounded-xl'
								/>
								<div className='flex justify-end mt-4'>
									<button
										type='button'
										onClick={closeAiModal}
										className='bg-slate-800 hover:bg-slate-700 active:bg-slate-600 p-4 rounded-lg mx-4'
									>
										Cancel
									</button>
									<button
										className='bg-slate-800 hover:bg-slate-700 active:bg-slate-600 p-4 rounded-lg mx-4'
										type='submit'
									>
										Submit
									</button>
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
