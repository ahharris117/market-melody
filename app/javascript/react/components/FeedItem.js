import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MelodyPlayer from './MelodyPlayer'

const FeedItem = props => {
  const likeMelody = event => {
    if (props.currentUser) {
      let payload = {
        melody_id: props.melody.id,
        user_id: props.currentUser.id
      }
      props.handleLike(payload)
    }
  }
  let liked = ""

  if (props.melody.likes.length > 0 ) {
    props.melody.likes.forEach((vote) => {
      // debugger;
      if(vote.user_id === props.currentUser.id) {
        liked = "red"
      }
    })
  }
  let createdAtDate = new Date(props.melody.created_at)
  const parseDate = dateObject => {
    return `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear()}`
  }

  let nameLink = (<Link to={`/melodies/${props.melody.id}`}>{props.melody.get_name}</Link>);

  let parsedDate = parseDate(createdAtDate)
  return(
    <div className="play-container" key={props.melody.id}>
      <div><i className={`${liked} fas fa-heart`} onClick={likeMelody}></i>{props.melody.likes.length}</div>
      <MelodyPlayer classStyle="play" name={nameLink} melody={props.melody.get_melody}/>
      <div>{parsedDate}</div>
    </div>
  )
}

export default FeedItem
