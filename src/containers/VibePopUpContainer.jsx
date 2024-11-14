/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

import VibeDisplay from '../components/VibeDisplay.jsx';
import { useLocation } from 'react-router-dom';

const VibePopUpContainer = ({ closePopUp }) => {
  
  // Note for Funan: this is data for the fetched Spotify song
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search); 
  const recommendations = queryParams.get('recommendations'); 
  const parsedRecommendations = recommendations ? JSON.parse(decodeURIComponent(recommendations)) : null;
  console.log('Parsed Recommendations: ', parsedRecommendations);
  
  return (
    <div>
      <VibeDisplay />
      <button onClick={closePopUp}>Back</button>
    </div>
  )
};

export default VibePopUpContainer;