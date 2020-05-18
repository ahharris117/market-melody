import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import UserTile from './UserTile'
import MelodyTile from './MelodyTile'

const UsersShowContainer = props => {
  const [ userInfo, setUserInfo ] = useState({
    id: "",
    username: "",
    profile_photo: ""
  })
  const [ melodies, setMelodies ] = useState([])
  const [ currentUser, setCurrentUser ] = useState({})

  useEffect(() => {
    let id = props.match.params.id
    fetch(`/api/v1/users/${id}` , {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((body) => {
      const { user, currentUser } = body
      setUserInfo({
        id: user.id,
        username: user.username,
        profile_photo: user.profile_photo,
        email: user.email
      });
      setMelodies(user.melodies);
      setCurrentUser(currentUser);
    })
  }, [props.match.params.id])

  return(
    <Container fluid className="user-container">
      <Row>
        <Col sm={3} className="user-tile">
          <UserTile userInfo={userInfo} melodies={melodies}/>
        </Col>

        <Col sm={8} className="melody-tile">
          {melodies.length > 0 && melodies.map((melody) => {
            return(
              <MelodyTile key={melody.id} melody={melody} />
            )
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default UsersShowContainer
