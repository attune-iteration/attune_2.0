/* eslint-disable no-unused-vars */
import React from 'react';

import logo from '../assets/patrice.png';

const WelcomeDisplay = () => {
  return (
    <div className='text-center text-teal-400'>
      <div className='flex justify-center'>
        <img src={logo} className='w-24 opacity-25'></img>
      </div>
      <h1 className='font-bold text-7xl leading-loose tracking-tight hover:tracking-wide mb-20'>
        <strong>A T T U N E</strong>
      </h1>
      <div></div>
    </div>
  );
};

export default WelcomeDisplay;
