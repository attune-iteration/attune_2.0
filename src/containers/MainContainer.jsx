/* eslint-disable no-unused-vars */
import React from 'react';

import WelcomeDisplay from '../components/WelcomeDisplay.jsx';
import CreateHabitDisplay from '../components/CreateHabitDisplay.jsx';
import SelectHabitDisplay from '../components/SelectHabitDisplay.jsx';

const MainContainer = () => {
	return (
		<div>
			<WelcomeDisplay />
			<CreateHabitDisplay />
			<SelectHabitDisplay />
		</div>
	);
};

export default MainContainer;
