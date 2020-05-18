import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import Soundwave from 'images/soundwave.jpg'
import HomeLink from './HomeLink'

const Home = props => {
  const [ currentUser, setCurrentUser ] = useState(false)

  useEffect(() => {
    fetch('/api/v1/users' , {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(body => body && setCurrentUser(body))
  }, [])

  const homeLink = currentUser ? <HomeLink text="Profile" link={`/users/${currentUser.user.id}`} />
                               : <HomeLink text="Sign up" aLink={'/users/sign_up'} />;

  return(
    <div>
      <div>
        <img className="main-image" src={Soundwave} />
      </div>
      <h3 className="homeline">Hear Your Portfolio</h3>
      <Container>
        <Row style={{justifyContent: "center"}}>
          <Col sm={10} lg={4}><HomeLink text="Create" link={"/melodies/new"}/></Col>
          <Col sm={10} lg={4}>{homeLink}</Col>
          <Col sm={10} lg={4}><HomeLink text="Feed" link={"/melodies"} /></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home
