import React, { useState, useEffect } from 'react'
import FormSelect from './FormSelect'
const Form = props => {
  const [formData, setFormData] = useState({
    stock: "",
    scale: "",
    interval: ""
  })
  const [ matches, setMatches ] = useState([])

  let intervals = ["Daily", "Weekly", "Monthly"]

  let scaleOptionNames = props.scales.map((scale) => {
    return scale.name
  })
  

  let stockOptions = ""
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
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value
    })
    fetch(`/api/v1/stocks?stock=${event.currentTarget.value}` , {
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
      let matchArray = []
      if (body.bestMatches) {
        body.bestMatches.forEach((match) => {
          matchArray.push(
            { symbol: match["1. symbol"],
            name: match["2. name"] }
          )
        })
      }
      setMatches(matchArray)
    })
  }

  const onChangeHandler = event => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const handleNameSelect = event => {
    setFormData()
  }

  const onSubmitHandler = event => {
    event.preventDefault()
    props.submitForm(formData)
  }

  return(
    <form onSubmit={onSubmitHandler} className="form callout">
      <div className="datalist">
        <label htmlFor="stock">Stock Symbol
          <input type="text" id="stock" onChange={symbolChangeHandler} list="data" value={formData.stock} />
          <datalist id="data">
            <option></option>
            {stockOptions}
          </datalist>
          <p className="help-text">Select from autofill options</p>
        </label>
      </div>
      <FormSelect
        label="Scale"
        array={scaleOptionNames}
        id="scale"
        value={formData.scale}
        onChangeHandler={onChangeHandler}
      />

      <FormSelect
        label="Interval"
        array={intervals}
        id="interval"
        value={formData.interval}
        onChangeHandler={onChangeHandler}
      />
      <div>{props.error}</div>
      <div className="button-group float-right">
        <input className="button" type="submit" value="Submit" />
      </div>
    </form>
  )
}

export default Form
