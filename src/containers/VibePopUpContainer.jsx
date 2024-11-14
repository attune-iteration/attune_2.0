/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

import VibeDisplay from '../components/VibeDisplay.jsx';
import { useLocation } from 'react-router-dom';

const VibePopUpContainer = ({ closePopUp }) => {

  // const [visibility, setVisibility] = useState(false);

  // const openPopUp = () => setVisibility(true);
  // const closePopUp = () => setVisibility(false);
  
  // Note for Funan: this is data for the fetched Spotify song
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search); 
  const recommendations = queryParams.get('recommendations'); 
  const parsedRecommendations = recommendations ? JSON.parse(decodeURIComponent(recommendations)) : null;
  console.log('Parsed Recommendations: ', parsedRecommendations);
  
  return (
		<div className='fixed inset-0 w-full h-screen flex flex-col justify-center items-center bg-black bg-opacity-25'>
			<div className='relative p-8 w-full max-w-2xl bg-gray-950 rounded-3xl'>
      <VibeDisplay closePopUp={closePopUp}/>
      <button onClick={closePopUp}>Back</button>
    </div>
    </div>
  )
};

export default VibePopUpContainer;