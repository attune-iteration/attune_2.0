/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'


const HabitName = ({ handleInputChange, habitNameInputValue }) => {

    return (
		<div>
			<form>
				<p>
					<strong>Name your habit:</strong>
				</p>
				<input
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