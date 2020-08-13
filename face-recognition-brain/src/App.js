import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/SignIn/Signin'
import Register from './components/Register/Register'
import Confirm from './components/Confirm/Confirm'
import Spinner from './components/Spinner/Spinner'
import { storage } from './firebase/firebase'
import Particles from 'react-particles-js'
import axios from 'axios'
import log from './utils/logger'

const particlesOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#eeeeee'
    },
    opacity: {
      value: 0.50475511365002,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 2,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#d9d9d9',
      opacity: 0.8,
      width: 2
    }
  }
}

const App = () => {
  const [inputUrl, setInputUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [boxes, setBoxes] = useState([])

  const [email, setEmail] = useState('')

  const [route, setRoute] = useState('signin')
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState(null)

  // For file input
  const [inputFile, setInputFile] = useState(null)

  // For spinner
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChangeUrl = (event) => {
    log(event.target.value)
    setInputUrl(event.target.value)
  }

  const handleInputChangeFile = event => {
    log(event.target.files[0])
    setImageUrl(URL.createObjectURL(event.target.files[0]))
    setInputFile(event.target.files[0])
    setInputUrl('')
    setBoxes([])
  }

  const resetState = () => {
    setInputUrl('')
    setImageUrl('')
    setBoxes([])
    setUser(null)
    setIsSignedIn(false)
  }

  const calculateFaceLocations = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions
    const image = document.getElementById('input-image')
    const width = Number(image.width)
    const height = Number(image.height)
    if (!clarifaiFaces) {
      return []
    }
    return clarifaiFaces.map(face => {
      const faceBox = face.region_info.bounding_box
      return {
        id: face.id,
        leftCol: faceBox.left_col * width,
        rightCol: width - faceBox.right_col * width,
        topRow: faceBox.top_row * height,
        bottomRow: height - faceBox.bottom_row * height
      }
    })
  }

  const displayFaceBox = (box) => {
    setBoxes(box)
    log(box)
  }

  const onButtonSubmitUrl = () => {
    if (inputUrl !== '') {
      log('click')
      log(inputUrl)
      setImageUrl(inputUrl)
      log(imageUrl)
      setIsLoading(true)
      axios
        .post('/imageurl', { input: inputUrl })
        .then(response => response.data)
        .then(response => {
          // log(response)
          if (!response.error) {
            axios.put('/image', {
              id: user.id
            })
            .then(response => {
              loadUser(response.data)
            })
            .catch(log)
          }
          displayFaceBox(calculateFaceLocations(response))
        })
        .then(() => {
          log('Done processing')
          setIsLoading(false)
        })
        .catch(error => {
          log(error)
        })
    }
  }

  const onButtonSubmitFile = (event) => {
    event.preventDefault()
    if(inputFile === '' || inputFile.type.split('/')[0] !== 'image') {
      alert(`Please upload an image file.`)
      return
    }

    log('File upload started')
    setIsLoading(true)
    const uploadTask = storage.ref(`/images/${user.email}/${inputFile.name}`).put(inputFile)
    uploadTask.on('state_changed',
      (snapShot) => {
        log(snapShot)
      }, (err) => {
        log(err)
      }, () => {
        storage.ref(`images/${user.email}`).child(inputFile.name).getDownloadURL()
          .then(fireBaseUrl => {
            log(fireBaseUrl)
            setInputUrl(fireBaseUrl)
            axios
              .post('/imageurl', { input: fireBaseUrl })
              .then(response => response.data)
              .then(response => {
                // log(response)
                if (!response.error) {
                  axios.put('/image', {
                    id: user.id
                  })
                  .then(response => {
                    loadUser(response.data)
                  })
                  .catch(log)
                }
                displayFaceBox(calculateFaceLocations(response))
              })
              .then(() => {
                log('Done processing')
                setIsLoading(false)
              })
              .catch(error => {
                log(error)
              })
          })
    })
  }

  const onRouteChange = (route) => {
    setRoute(route)
    if (route === 'signin') {
      setIsSignedIn(false)
    } else if (route === 'home') {
      setIsSignedIn(true)
    }
  }

  const loadUser = (user) => {
    setUser(user)
    log(user)
  }

  log('re-rendered')
  // https://samples.clarifai.com/face-det.jpg
  return (
    <div className="App">
      <Particles className='particles' params={particlesOptions} />
      <Spinner isLoading={isLoading} />
      <Navigation resetState={resetState} signedIn={isSignedIn} onRouteChange={onRouteChange} loadUser={loadUser} />
      { route === 'home' ?
        <div className="content">
          <Logo />
          <Rank name={user === null ? '' : user.name} uploads={user === null ? '' : user.entries} />
          <ImageLinkForm
            value={inputUrl}
            handleInputChangeUrl={handleInputChangeUrl}
            onButtonSubmitUrl={onButtonSubmitUrl}
            handleInputChangeFile={handleInputChangeFile}
            onButtonSubmitFile={onButtonSubmitFile}
          />

          <FaceRecognition boxes={boxes} imageUrl={imageUrl} inputUrl={inputUrl} />
        </div>
        :
        ((route === 'signin')
          ? <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
          : ((route === 'confirm')
              ? <Confirm email={email} setIsLoading={setIsLoading} />
              : <Register setUserEmail={setEmail} onRouteChange={onRouteChange} setIsLoading={setIsLoading} />)
        )
      }
    </div>
  );
}

export default App;
