/* eslint-disable no-unused-vars */
import React from 'react';
import MainContainer from './containers/MainContainer.jsx';
import VibePopUpContainer from './containers/VibePopUpContainer.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<MainContainer/>}/>
          <Route path='/vibe' element={<VibePopUpContainer/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
