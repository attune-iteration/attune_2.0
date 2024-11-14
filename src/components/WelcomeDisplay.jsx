/* eslint-disable no-unused-vars */
import React from 'react';

import logo from '../assets/patrice.png'

const WelcomeDisplay = () => {
	return (
		<div className='text-center'>
			<h1 className='font-bold text-7xl leading-loose tracking-tight hover:tracking-wide'>
				<strong>A T T U N E</strong>
			</h1>
      <div>
			  <img src={logo}></img>
      </div>
		</div>
	);
};

export default WelcomeDisplay;
