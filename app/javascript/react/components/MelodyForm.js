import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import FormSelect from './FormSelect'
import ErrorList from './ErrorList'

const MelodyForm = props => {
  const [formData, setFormData] = useState({
    stock: "",
    scale: "",
    interval: ""
  })
  const [ matches, setMatches ] = useState([])
  const [ errors, setErrors ] = useState({})

  const intervals = ["Daily", "Weekly", "Monthly"];

  let scaleOptionNames = props.scales.map(scale => scale.name);

  let stockOptions = "";
  if (matches.length > 0) {
    stockOptions = matches.map((stock) => {
      return(
        <option key={stock.symbol}>
          {stock.symbol + " - " + stock.name}
        </option>
      )
    })
  }

  const symbolChangeHandler = event => {
    const currentTarget = event.currentTarget
    setFormData({
      ...formData,
      [currentTarget.id]: currentTarget.value
    })
    fetch(`/api/v1/stocks?stock=${currentTarget.value}` , {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then((body) => {
      let matchArray = [];
      if (body.bestMatches) {
        body.bestMatches.forEach((match) => {
          matchArray.push({
              symbol: match["1. symbol"],
              name: match["2. name"]
          })
        })
      }
      setMatches(matchArray);
    })
  };

  const onChangeHandler = event => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value
    })
  };

  const handleNameSelect = event => setFormData();

  const validateForm = () => {
    const submitErrors = {};
    const requiredFields = ["stock", "scale", "interval"]
    requiredFields.forEach((field) => {
      if (formData[field].trim() === "") {
        submitErrors[field] = "can't be blank"
      }
    })
    setErrors(submitErrors);
    return _.isEmpty(submitErrors);
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    if (validateForm()) {
      props.submitForm(formData);
    }
  };

  return(
    <Form onSubmit={onSubmitHandler}>
      <ErrorList errors={errors} />
      <div>{props.requestError}</div>
      <Form.Group>
        <Form.Label>Stock Symbol</Form.Label>
          <Form.Control type="text" id="stock" onChange={symbolChangeHandler} list="stock-name-data" value={formData.stock} />
            <datalist id="stock-name-data">
              <option></option>
              {stockOptions}
            </datalist>
          <Form.Text>Select from autofill options</Form.Text>
      </Form.Group>

      <FormSelect
        label="Scale"
        show={props.show}
        includeEmptyValue={true}
        array={scaleOptionNames}
        id="scale"
        value={formData.scale}
        onChangeHandler={onChangeHandler}
      />

      <FormSelect
        label="Interval"
        includeEmptyValue={true}
        array={intervals}
        id="interval"
        value={formData.interval}
        onChangeHandler={onChangeHandler}
      />

      <Button className="button" type="submit" value="Submit">Submit</Button>
    </Form>
  );
};

export default MelodyForm
