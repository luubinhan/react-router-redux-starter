import React from 'react'

import './FourZeroThree.css'

const FourZeroThree = (props) => {
  return (
    <div className="four-zero-three">
      <div className="inner">
        <div className="display4">403</div>
        <div className="display2">Access Denied</div>
        <div className="sub-heading mb-30">Sorry, but you don't have permission to access this page</div>
        <a className="btn btn-primary" href="/">Back to home</a>
      </div>
    </div>
  )
}

export default FourZeroThree;
