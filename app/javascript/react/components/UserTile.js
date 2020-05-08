import React from 'react'

const UserTile = props => {
  return(
    <div className="user-head">
      <img className="user-img" src={props.userInfo.profile_photo.url} />
      <h3 className="user-name">{props.userInfo.username}</h3>
      <div>{props.userInfo.email}</div>
      <div>Melodies: {props.melodies.length}</div>
    </div>
  )
}

export default UserTile
