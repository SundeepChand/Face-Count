import React, { useState } from 'react';
import axios from 'axios'
import log from '../../utils/logger'

const Register = ({ setUserEmail, onRouteChange, setIsLoading }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onFormSubmit = (event) => {
    event.preventDefault()
    log(email)
    log(password)
    log(name)
    setIsLoading(true)
    setUserEmail(email)
    axios
      .post('/register', {
        email,
        password,
        name
      })
      .then(response => {
        log(response.data)
        setIsLoading(false)
        onRouteChange('confirm')
      })
      .catch(error => {
        log(error)
        setIsLoading(false)
        if (error.response.status === 500) {
          alert('Unable to send email')
        } else {
          alert('An account with the same email id already exists. Try using a different email.')
        }
      })
  }

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <form onSubmit={onFormSubmit}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={(event) => { setName(event.target.value) }}
                  required
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={(event) => { setEmail(event.target.value) }}
                required
              />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(event) => { setPassword(event.target.value) }}
                  required
                  minLength={8}
                  maxLength={16}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </form>

          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange('signin')}
              href="#0" className="f6 link dim black db pointer"
            >
              Sign In
            </p>
          </div>
        </div>
      </main>
    </article>
  );
}

export default Register;
