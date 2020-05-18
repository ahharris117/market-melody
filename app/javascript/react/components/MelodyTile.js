import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

const MelodyTile = props => {
  return(
    <Card className="melody-card">
      <Card.Body>
        <Card.Title>
          <Link to={`/melodies/${props.melody.id}`}>{props.melody.get_name}</Link>
        </Card.Title>
        <Card.Text>{props.melody.stock.name} - {props.melody.stock.interval}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MelodyTile
