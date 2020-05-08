import React from 'react'
import { Link } from 'react-router-dom'

const MelodyTile = props => {

  return(
    <div className="melody-tile">
      <Link to={`/melodies/${props.melody.id}`}>
        <h5>{props.melody.get_name}</h5>
        <div>{props.melody.stock.name} - {props.melody.stock.interval}</div>
      </Link>
    </div>
  )
}

export default MelodyTile
