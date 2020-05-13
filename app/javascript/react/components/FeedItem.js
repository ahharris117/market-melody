import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MelodyPlayer from './MelodyPlayer'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

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

  if (props.melody.likes.length > 0 && props.currentUser) {
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
    <Col sm={12} lg={6}>
      <Card key={props.melody.id} className="feed-tile">
        <MelodyPlayer classStyle="play" name={nameLink} melody={props.melody.get_melody}/>
        <Card.Body>
          <div className="feed-info">
            <Card.Text>{parsedDate}</Card.Text>
            <div className="feed-like"><i className={`${liked} fas fa-heart`} onClick={likeMelody}></i>{props.melody.likes.length}</div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default FeedItem
