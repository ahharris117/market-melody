import React, { useState } from 'react'

import Form from 'react-bootstrap/Form'

const FormSelect = props => {
  const optionList = props.array.map((item, index) => {
    return(
      <option key={index}>
        {item}
      </option>
    )
  })
  let initialValue = ( <option></option> )
  if (props.includeEmptyValue === false) {
    initialValue = ""
  }
  return(
    <Form.Group>
      <Form.Label>{props.label}</Form.Label>

      <Form.Control as="select" id={props.id} value={props.value} onChange={props.onChangeHandler}>
        {initialValue}
        {optionList}
      </Form.Control>
    </Form.Group>
  )
}

export default FormSelect
