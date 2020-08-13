import React, { useState } from 'react'
import axios from 'axios'
import log from '../../utils/logger'

const Confirm = ({ email, setIsLoading }) => {
  const [disabled, setDisabled] = useState(true)
  const disableTime = 3

  const toggleDisabled = (isDisabled) => {
    setDisabled(isDisabled)
  }

  const onResendClick = () => {
    log(email)
    setIsLoading(true)
    setDisabled(true)
    window.setTimeout(() => {
      toggleDisabled(false)
    }, disableTime * 60 * 1000)
    axios
      .post('/resend', { email })
      .then(response => {
        log(response.data)
        setIsLoading(false)
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

  window.setTimeout(() => {
    toggleDisabled(false)
  }, disableTime * 60 * 1000)

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-80-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <p className="f4">
            A verification link has been sent to your registered email address.
            Kindly follow the link to activate your account. You may close this
            tab after your receive the mail.
          </p>
          <p className="f5 b">
            (If you don't receive an email within 3 minutes, then try clicking the button below.)
          </p>
          <br />
          <button
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            onClick={onResendClick}
            disabled={disabled}
          >
            Resend Mail
          </button>
        </div>
      </main>
    </article>
  );
}

export default Confirm;
