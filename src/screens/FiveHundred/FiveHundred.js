import React from 'react'

import './FiveHundred.css'

const FiveHundred = (props) => {
  return (
    <div className="five-hundred">
      <div className="inner">
        <div className="display4">500</div>
        <div className="display2">Internal server error</div>
        <div className="sub-heading mb-30">We are working towards creating something better.</div>
        <a className="btn btn-primary" href="/">Back to home</a>
      </div>
    </div>
  )
}

export default FiveHundred;
