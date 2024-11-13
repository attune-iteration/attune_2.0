/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'


const HabitName = ({ handleInputChange, habitNameInputValue }) => {

    return (
      <div>
        <form>
        <p>Name your habit:</p>
          <input
            type='text'
            onChange={handleInputChange}
            value={habitNameInputValue}
            placeholder='Your habit here...'
          />
        </form>
      </div>
    )
  }
  
  export default HabitName;