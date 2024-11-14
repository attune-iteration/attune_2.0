/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

// import PickGenreDisplay from '../components/PickGenreDisplay.jsx'

const ChooseGenrePopUpContainer = ({
  genres,
  closeInnerPopUp,
  handleCheckBoxChange,
  checkedGenres,
}) => {
  return (
		<div className='fixed inset-0 w-full h-screen flex flex-col justify-center items-center text-center bg-black bg-opacity-30 z-10'>
			<div className='relative p-8 w-full max-w-2xl max-h-96 bg-gray-950 rounded-3xl overflow-scroll'>
				<ul className='flex flex-wrap'>
					{genres.map((genre) => (
						<div
							className='flex basis-1/3'
							key={genre.id}
						>
							<li>
								<input
									type='checkbox'
									id={genre.id}
									checked={checkedGenres.includes(
										genre.label
									)}
									onChange={() =>
										handleCheckBoxChange(genre.label)
									}
								/>
								<label htmlFor={genre.id}> {genre.text}</label>
							</li>
						</div>
					))}
				</ul>
				<button
					className='bg-slate-900 hover:bg-slate-800 p-4 rounded-lg'
					onClick={closeInnerPopUp}
				>
					Back
				</button>
			</div>
		</div>
  );

  // return (
  //   <div>
  //     <PickGenreDisplay />
  //     <button onClick={closeInnerPopUp}>Cancel</button>
  //   </div>
  // )
};

export default ChooseGenrePopUpContainer;
