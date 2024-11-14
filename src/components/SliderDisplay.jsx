/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const SliderDisplay = ({
  targets,
  handleSliderChange,
  energyValue,
  danceabilityValue,
  valenceValue,
}) => {
  const getValueForTarget = (id) => {
    if (id === 1) return energyValue;
    if (id === 2) return danceabilityValue;
    if (id === 3) return valenceValue;
    return 0;
  };

  return (
    <div>
      {targets.map((target) => (
        <div key={target.id} className='mb-6'>
          <p className='mb-1 text-lg font-bold text-gray-200'>{target.label}</p>
          <div className='relative w-full'>
            <input
              type='range'
              min='0'
              max='100'
              value={getValueForTarget(target.id)}
              onChange={(event) => handleSliderChange(target.id, event)}
              className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mb-2'
            />
            <div className='flex justify-between space-x-16 text-sm text-white dark:text-gray-400'>
              <span className='text-xs text-white dark:text-gray-400 left-0 -bottom-8'>
                Less {target.label}
              </span>
              <span className='text-xs text-white dark:text-gray-400 right-0 -bottom-8'>
                More {target.label}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SliderDisplay;
