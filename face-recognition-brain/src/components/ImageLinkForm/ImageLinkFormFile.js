import React from 'react';
import '../../App.css';
import './ImageLinkForm.css';

const ImageLinkFormFile = ({ handleInputChange, onButtonSubmit }) => {
  return (
    <React.Fragment>
      <input onChange={handleInputChange} className='f4 pa2 w-70 center' type='file' />
      <button
        onClick={onButtonSubmit}
        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
      >
        <span className="f5 measure-narrow center">Detect</span>
      </button>
    </React.Fragment>
  );
}

export default ImageLinkFormFile;
