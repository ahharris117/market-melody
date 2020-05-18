import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import FeedItem from './FeedItem'
import SortForm from './SortForm'

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
    .then(response => response.json())
    .then((body) => {
      const { melodies, currentUser, currentUserLikes } = body;
      setMelodies(melodies.melodies)
      setCurrentUser(currentUser)
      setCurrentUserLikes(currentUserLikes)
    })
  }, [])

  const selectLikeMethod = (payload) => {
    let method = { type: "post" }
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
    return method;
  }

  const handleLike = (payload) => {
    let method = selectLikeMethod(payload)
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
      .then(response => response.json())
      .then((body) => {
        const { melodies, currentUser, currentUserLikes } = body;
        setMelodies(melodies.melodies)
        setCurrentUser(currentUser)
        setCurrentUserLikes(currentUserLikes)
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
      .then(response => response.json())
      .then((body) => {
        const { melodies, currentUser, currentUserLikes } = body;
        setMelodies(melodies.melodies)
        setCurrentUser(currentUser)
        setCurrentUserLikes(currentUserLikes)
      })
    }
  };

  const sortItems = (sortValue) => {
      setSortBy(sortValue)
  };

  useEffect(() => {
    let newMelodies = [];
    if (sortBy === "Most Likes") {
      newMelodies = melodies.sort((a, b) => {
        return b.likes.length - a.likes.length
      })
    } else if (sortBy === "Date (Oldest)") {
      newMelodies = melodies.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at)
      })
    } else if (sortBy === "Date (Newest)") {
      newMelodies = melodies.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })
    }
    setMelodies(newMelodies)
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
  );
};

export default Feed
