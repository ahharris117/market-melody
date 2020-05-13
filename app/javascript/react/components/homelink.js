import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
const HomeLink = props => {

  let linkEl;
  if (props.aLink) {
    linkEl = (<a href={props.aLink}><Card.Body>{props.text}</Card.Body></a>);
  } else {
    linkEl = (<Link to={props.link}><Card.Body>{props.text}</Card.Body></Link>);
  }
  return(
    <Card className="homelink">
      {linkEl}
    </Card>
  )
}

export default HomeLink
