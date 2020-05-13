import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
const NavBar = props => {
  const [ currentUser, setCurrentUser] = useState("")
  useEffect(() => {
    fetch("/api/v1/users" , {
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
      setCurrentUser(body)
    })
  }, [])

  let userLink = ""
  if(currentUser) {
    userLink = (
      <Nav.Item className="mr-sm-4"><Link to={`/users/${currentUser.user.id}`}>{currentUser.user.username}</Link></Nav.Item>
    )
  }
  return(
    <Navbar collapseOnSelect variant="dark" expand="sm" fixed="top" className="p-sm-4">
      <Navbar.Brand className="mr-sm-4"><Link to="/"><h3>Market Melody</h3></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item className="mr-sm-4"><Link to="/melodies/new">Create</Link></Nav.Item>
            <Nav.Item className="mr-sm-4"><Link to="/melodies">Feed</Link></Nav.Item>
            {userLink}
          </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
