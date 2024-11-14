/* eslint-disable no-unused-vars */
import React from 'react';
import MainContainer from './containers/MainContainer.jsx';
import VibePopUpContainer from './containers/VibePopUpContainer.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
		<Router>
			<div className='bg-gradient-to-r from-slate-950 to-blue-950'>
				<Routes>
					<Route
						path='/'
						element={<MainContainer />}
					/>
					<Route
						path='/vibe'
						element={<VibePopUpContainer />}
					/>
				</Routes>
			</div>
		</Router>
  );
}

export default App;
