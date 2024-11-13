import React from 'react'

const ChooseGenrePopUpContainer = ({ closeInnerPopUp }) => {

    const handleSubmit = async event => {
      event.preventDefault();

    } 

    return (
      <div>
        <form></form>
        <button onClick={closeInnerPopUp}></button>
      </div>
    )
  }
  
  export default ChooseGenrePopUpContainer;