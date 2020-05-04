import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const HomeLink = props => {

  return(
    <div className="cell small-12 medium-4">
      <Link to={props.link}>
        <div className="homelink">{props.text}</div>
      </Link>
    </div>
  )
}

export default HomeLink
