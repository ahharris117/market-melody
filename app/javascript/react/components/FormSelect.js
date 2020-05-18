import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'

const FormSelect = props => {
  const optionList = props.array.map((item, index) => {
    return(
      <option key={index}>
        {item}
      </option>
    );
  });

  return(
    <Form.Group>
      <Form.Label>
        {props.label} {props.show && <i className="fas fa-info-circle" onClick={props.show}></i>}
      </Form.Label>
      <Form.Control as="select" id={props.id} value={props.value} onChange={props.onChangeHandler}>
        {props.includeEmptyValue ? <option></option> : ""}
        {optionList}
      </Form.Control>
    </Form.Group>
  );
};

export default FormSelect
