import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Soundwave from 'images/soundwave.jpg'
import HomeLink from './homelink'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

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
    .then((response) => {
      return response.json()
    })
    .then((body) => {
      if (body !== null) {
        setCurrentUser(body)
      }
    })
  }, [])

  let homeLink = "";
  if (currentUser === false) {
    homeLink = (
      <HomeLink text="Sign up" aLink={'/users/sign_up'} />
    )
  } else {
    homeLink = (
      <HomeLink text="Profile" link={`/users/${currentUser.user.id}`} />
    )
  }
  
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
  )
}

export default Home
