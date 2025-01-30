/* eslint-disable no-unused-vars */
import React from 'react';

import logo from '../assets/patrice.png';

const WelcomeDisplay = () => {
  return (
		<div className='flex flex-col items-center justify-center'>
			<h1 className='font-bold text-5xl tracking-tight hover:tracking-wide'>
				<strong>A T T U N E</strong>
			</h1>
				<img
					src={logo}
					className='w-24 opacity-25 py-11'
			  />
		</div>
  );
};

export default WelcomeDisplay;
