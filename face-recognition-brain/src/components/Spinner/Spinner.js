import React from 'react'
import Loader from 'react-loader-spinner'
import './spinner.css'
import '../../App.css'

const Spinner = ({ isLoading }) => {
  return (
    <div className='container' style={{ display: isLoading ? 'inherit' : 'none' }}>
      <h3 className='message'>Processing...</h3>
      <div className='spinner'>
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={140}
          width={140}
        />
      </div>
    </div>
  )
}

export default Spinner
