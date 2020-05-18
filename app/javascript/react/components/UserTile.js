import React from 'react'

const UserTile = props => {
  return(
    <>
      <img className="user-img" src={props.userInfo.profile_photo.url} />
      <h3>{props.userInfo.username}</h3>
      <div>{props.userInfo.email}</div>
      <div>Melodies: {props.melodies.length}</div>
    </>
  );
};

export default UserTile
