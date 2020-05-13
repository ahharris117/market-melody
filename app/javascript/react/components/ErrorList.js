import React from 'react'
import _ from 'lodash'
import Alert from 'react-bootstrap/Alert'
const ErrorList = props => {
  const errantFields = Object.keys(props.errors)
  if (errantFields.length > 0) {
    let index = 0
    const listItems = errantFields.map((field) => {
      index++
      return(
        <li key={index}>
          {_.startCase(field)} {props.errors[field]}
        </li>
      )
    })
    return(
      <Alert>
        <ul>{listItems}</ul>
      </Alert>
    )
  } else {
    return ''
  }
}

export default ErrorList
