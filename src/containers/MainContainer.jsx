/* eslint-disable no-unused-vars */
import React from 'react';

import WelcomeDisplay from '../components/WelcomeDisplay.jsx';
import CreateHabitDisplay from '../components/CreateHabitDisplay.jsx';
import SelectHabitDisplay from '../components/SelectHabitDisplay.jsx';

const MainContainer = () => {
	return (
		<div className='flex items-center justify-center h-screen flex-col font-sans text-teal-400'>
			<WelcomeDisplay />
			<CreateHabitDisplay />
			<p className='mb-6 text-3xl'><strong>OR</strong></p>
			<p className='mb-2'>Choose your existing habit</p>
			<SelectHabitDisplay />
		</div>
	);
};

export default MainContainer;
