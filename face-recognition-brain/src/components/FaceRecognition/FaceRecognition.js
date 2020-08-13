import React from 'react';
import './FaceRecognition.css';

const generateBoxes = (boxes) => {
  return boxes.map(box =>
    <div
      key={box.id}
      className='bounding-box'
      style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}
    >
    </div>)
}

const generateMessage = (num) => {
  if (num === 0) {
    return 'There aren\'t any people in your image.'
  } else if (num === 1) {
    return 'There is only 1 person in your image.'
  } else {
    return `There are ${num} people in your image.`
  }
}

const FaceRecognition = ({ imageUrl, inputUrl, boxes }) => {
  return (
    <div>
      {
        imageUrl === '' || inputUrl === '' ?
          <p></p> :
          <p style={{ paddingTop: '14px' }} className='f4 measure center b'>
            { generateMessage(boxes.length) }
          </p>
      }
      <div className='center ma'>
        <div style={{padding: '15px'}} className='absolute mt2'>
          <img id='input-image' src={imageUrl} alt='' width='450px' height='auto' />
          <div>
            {generateBoxes(boxes)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaceRecognition;
