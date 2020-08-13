import React, { useRef } from 'react';

const ImageLinkFormURL = ({ value, handleInputChange, onButtonSubmit }) => {
  const inputField = useRef(null)

  return (
    <React.Fragment>
      <input ref={inputField} onClick={() => { inputField.current.select() }} placeholder={'Enter URL'} value={value} onChange={handleInputChange} className='f4 pa2 w-70 center' type='text' />
      <button
        onClick={onButtonSubmit}
        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
      >
        <span className="f5 measure-narrow center">Detect</span>
      </button>
    </React.Fragment>
  );
}

export default ImageLinkFormURL
