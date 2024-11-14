/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'


const HabitName = ({ handleInputChange, habitNameInputValue }) => {

    return (
		<div className='text-center'>
			<form>
				<p className='pb-5 text-teal-500'>
					<strong>NAME YOUR HABIT</strong>
				</p>
				<input
					className='bg-zinc-900 border-2 border-zinc-800 p-2 rounded-2xl text-gray-200'
					type='text'
					onChange={handleInputChange}
					value={habitNameInputValue}
					placeholder='Habit name...'
				/>
			</form>
		</div>
	);
  }
  
  export default HabitName;