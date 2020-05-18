import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

const HomeLink = props => {
  const linkEl = props.aLink ? (<a href={props.aLink}><Card.Body>{props.text}</Card.Body></a>)
                             : (<Link to={props.link}><Card.Body>{props.text}</Card.Body></Link>);

  return(
    <Card className="homelink">
      {linkEl}
    </Card>
  );
};

export default HomeLink
