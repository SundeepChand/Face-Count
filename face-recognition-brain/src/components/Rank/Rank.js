import React from 'react';

const Rank = ({ name, uploads}) => {
  return (
    <div>
      <div className='white f3'>
        {`${name}, you have made`}
      </div>
      <div className='white f1'>
        {uploads}
      </div>
      <div className='white f3'>
        {'uploads so far'}
      </div>
    </div>
  );
}

export default Rank;
