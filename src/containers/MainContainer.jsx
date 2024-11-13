/* eslint-disable no-unused-vars */
import React from 'react';

import WelcomeDisplay from '../components/WelcomeDisplay.jsx';
import CreateHabitDisplay from '../components/CreateHabitDisplay.jsx';
import SelectHabitDisplay from '../components/SelectHabitDisplay.jsx';

const MainContainer = () => {
	return (
		<div className='flex items-center justify-center h-screen flex-col bg-gradient-to-r from-slate-950 to-blue-950 font-sans text-teal-400'>
			<WelcomeDisplay />
			<CreateHabitDisplay />
			<SelectHabitDisplay />
		</div>
	);
};

export default MainContainer;
