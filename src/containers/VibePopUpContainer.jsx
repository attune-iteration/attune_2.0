/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

import VibeDisplay from '../components/VibeDisplay.jsx';

const VibePopUpContainer = ({ closePopUp }) => {

  return (
    <div>
      <VibeDisplay />
      <button onClick={closePopUp}>Back</button>
    </div>
  )
};

export default VibePopUpContainer;