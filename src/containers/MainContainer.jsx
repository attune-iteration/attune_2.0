/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import WelcomeDisplay from '../components/WelcomeDisplay.jsx';
import CreateHabitDisplay from '../components/CreateHabitDisplay.jsx';
import SelectHabitDisplay from '../components/SelectHabitDisplay.jsx';

const MainContainer = () => {
  const [habits, setHabits] = useState([]);

  const getHabitsUrl = 'http://localhost:5001/api/habits/all?name=default_user';

  const handleSelectOptionChange = async (event) => {
    const response = await makeRequest(getHabitsUrl, 'GET');
    if (response && response.habits) setHabits(response.habits);
  };

  const makeRequest = async (url, method) => {
    console.log('Sending data to server...');
    // const preferenceData = {
    //   habit_name: habitNameInputValue,
    //   seed_genres: checkedGenres,
    //   target_energy: energyValue / 100,
    //   target_danceability: danceabilityValue / 100,
    //   target_valence: valenceValue / 100,
    // };
    // console.log(preferenceData);

    try {
      const response = await fetch(url, {
        method: method,
        credentials: 'include',
      });
      if (!response.ok) {
        console.error('An error occurred while fetching data: ', response.statusText);
      }
      const result = await response.json();
      console.log(`Preference data has been sent to the server via a ${method} request and received the following response: `, result);
      return result;
    } catch (error) {
      console.error('Failed to send POST request to server.', error);
    }
  };

  function signup() {
    let usnm = document.getElementById('usernameInput').value;
    let pass = document.getElementById('passwordInput').value;
    console.log(usnm);
    fetch(`http://localhost:5001/api/signup?username=${usnm}&password=${pass}`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((resp) => {
        // console.log(resp.headers);
        // console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
  function login() {
    let usnm = document.getElementById('usernameInput').value;
    let pass = document.getElementById('passwordInput').value;
    fetch(`http://localhost:5001/api/login?username=${usnm}&password=${pass}`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((resp) => {
        // console.log(resp.headers);
        // console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div className='flex items-center justify-center h-screen flex-col font-sans box-border'>
      <WelcomeDisplay />
      <CreateHabitDisplay makeRequest={makeRequest} handleSelectOptionChange={handleSelectOptionChange} />
      <p className='mb-12 mt-12 text-gray-200 text-xl'>
        <strong>OR</strong>
      </p>
      <SelectHabitDisplay handleSelectOptionChange={handleSelectOptionChange} habits={habits} />

      <br />

      <input id='usernameInput' placeholder='username' type='text'></input>
      <br />
      <input id='passwordInput' placeholder='password' type='text'></input>
      <br />
      <button onClick={login} className='rounded border-2 border-blue-500 px-4 py-1 text-gray-200'>
        login
      </button>
      <br />
      <button onClick={signup} className='rounded border-2 border-blue-500 px-4 py-1 text-gray-200'>
        signup
      </button>
    </div>
  );
};

export default MainContainer;
