import React, { useState, useEffect } from 'react'

import FeedItem from './FeedItem'
import SortForm from './SortForm'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Feed = props => {
  const [ melodies, setMelodies ] = useState([])
  const [ currentUser, setCurrentUser ] = useState(false)
  const [ currentUserLikes, setCurrentUserLikes ] = useState([])
  const [ sortBy, setSortBy ] = useState("Date (Newest)")
  const [ feedContainer, setFeedContainer ] = useState([])

  useEffect(() => {
    fetch('/api/v1/feeds', {
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
      setMelodies(body.melodies.melodies)
      setCurrentUser(body.currentUser)
      setCurrentUserLikes(body.currentUserLikes)
    })
  }, [])

  const likeMethod = (payload) => {
    let method = {
      type: "post"
    }
    if(currentUserLikes.length > 0 && currentUserLikes) {
      currentUserLikes.forEach((like) => {
        if (like.melody_id === payload.melody_id) {
          method = {
            type: "delete",
            like_id: like.id
          }
        }
      })
    }
    return method
  }

  const handleLike = (payload) => {
    let method = likeMethod(payload)
    if (method.type === "post") {
      fetch('/api/v1/likes', {
        credentials: "same-origin",
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
      .then((response) => {
        return response.json()
      })
      .then((body) => {
        setMelodies(body.melodies.melodies)
        setCurrentUser(body.currentUser)
        setCurrentUserLikes(body.currentUserLikes)
      })
    } else {
      fetch(`/api/v1/likes/${method.like_id}`, {
        credentials: "same-origin",
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
      .then((response) => {
        return response.json()
      })
      .then((body) => {
        setMelodies(body.melodies.melodies)
        setCurrentUser(body.currentUser)
        setCurrentUserLikes(body.currentUserLikes)
      })
    }
  }

  const sortItems = (sortValue) => {
      setSortBy(sortValue)
  }

  useEffect(() => {
    if (sortBy === "Most Likes") {
    let newMelodies = melodies.sort(function(a, b) {
        return b.likes.length - a.likes.length
      })
      setMelodies(newMelodies)
    } else if (sortBy === "Date (Oldest)") {
      let newMelodies = melodies.sort(function(a, b) {
        let dateA = new Date(a.created_at)
        let dateB = new Date(b.created_at)
          return dateA - dateB
        })
        setMelodies(newMelodies)
    } else if (sortBy === "Date (Newest)") {
      let newMelodies = melodies.sort(function(a, b) {
        let dateA = new Date(a.created_at)
        let dateB = new Date(b.created_at)
          return dateB - dateA
        })
        setMelodies(newMelodies)
    }
    if (melodies.length) {
      setFeedContainer(melodies.map((melody) => {
        return(
          <FeedItem
            currentUser={currentUser}
            melody={melody}
            key={melody.id}
            handleLike={handleLike}
            currentUserLikes={currentUserLikes}
          />
        )}));
    }
  }, [melodies, currentUser, currentUserLikes, sortBy])

  return(
    <div className="feed">
      <div className="sort">
        <SortForm sortItems={sortItems} />
      </div>

      <Container>
        <Row>
          {feedContainer}
        </Row>
      </Container>
    </div>
  )
}

export default Feed
