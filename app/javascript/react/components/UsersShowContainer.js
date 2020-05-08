import React, { useState, useEffect } from 'react'
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
        return response.json()
      }
    })
    .then((body) => {
      setUserInfo({
        id: body.user.id,
        username: body.user.username,
        profile_photo: body.user.profile_photo,
        email: body.user.email
      })
      setMelodies(body.user.melodies)
      setCurrentUser(body.currentUser)
    })
  }, [])

  let melodyTiles = "";
  if(melodies.length > 0) {
    melodyTiles = melodies.map((melody) => {
      return(
        <MelodyTile key={melody.id} melody={melody} />
      )
    })
  }
  return(
    <div className="user-show">
      <div className="user-tile">
        <UserTile userInfo={userInfo} melodies={melodies}/>
        {melodyTiles}
      </div>
    </div>
  )

}

export default UsersShowContainer
