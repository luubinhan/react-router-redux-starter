import React from 'react'
import PropTypes from 'prop-types'

import './FourZeroFour.css'

const FourZeroFour = ({title = '404', message = 'Không tìm thấy trang bạn yêu cầu'}) => {
  return (
    <div className="fourzerofour">
      <h1>{title}</h1>
      <p>{message}</p><br />
    </div>
  )
}
FourZeroFour.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string
}
export default FourZeroFour;
