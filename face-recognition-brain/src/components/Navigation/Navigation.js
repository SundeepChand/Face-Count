import React from 'react';

const Navigation = ({ onRouteChange, loadUser, signedIn, resetState }) => {
  if (signedIn) {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p
          onClick={() => {
            resetState()
            loadUser(null)
            onRouteChange('signin')
          }}
          className='flex link dim black underline pa3 pointer'
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <div>
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('signin')} className='flex link dim black underline pa3 pointer'>Sign In</p>
          <p onClick={() => onRouteChange('register')} className='flex link dim black underline pa3 pointer'>Register</p>
        </nav>
      </div>
    )
  }
}

export default Navigation;
