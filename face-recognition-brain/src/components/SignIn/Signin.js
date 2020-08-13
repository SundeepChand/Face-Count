import React, { useState } from 'react'
import axios from 'axios'
import log from '../../utils/logger'

const Signin = ({ onRouteChange, loadUser }) => {
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const onFormSubmit = (event) => {
    event.preventDefault()
    log(signInEmail)
    log(signInPassword)
    axios
      .post('/signin', {
        email: signInEmail,
        password: signInPassword
      })
      .then(response => {
        log(response)
        if (response.data.tokenerror) {
          alert('This account is not verified. Please visit the link sent to your email. If you haven\'t received an email, then kindly try re-registering.')
          return
        }
        loadUser(response.data)
        onRouteChange('home')
      })
      .catch(error => {
        log(error)
        alert('Invalid credentials entered. If you haven\'t registered yet, switch to register to create an account.')
      })
  }

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <form onSubmit={onFormSubmit}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={(event) => { setSignInEmail(event.target.value) }}
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
                  onChange={(event) => { setSignInPassword(event.target.value) }}
                  required
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
          </form>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange('register')}
              href="#0" className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
}

export default Signin;
