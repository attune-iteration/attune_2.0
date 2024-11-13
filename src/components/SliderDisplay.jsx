/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const SliderDisplay = ({ targets, handleSliderChange }) => {

  const targetValue = 0;
    return (
      <div>
        {targets.map((target) => (
          <div key={target.id}>
            <p>{target.label}</p>
            <input 
            type='range' 
            min='0' max='100' 
            defaultValue = '50'
            onChange={(event) => handleSliderChange(target.id, event)}
            />
          </div>
        ))
      }
      </div>
    )
  }
  
  export default SliderDisplay;


