import React, { useState, useEffect } from 'react'

const Form = props => {
  const [formData, setFormData] = useState({
    stock: "",
    scale: ""
  })
  let scaleNames = props.scales.map((scale) => {
    return(
      <option key={scale.id}>
        {scale.name}
      </option>
    )
  })

  const onChangeHandler = event => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value
    })
    console.log(formData)
  }

  const onSubmitHandler = event => {
    event.preventDefault()
    props.submitForm(formData)
  }
  return(
    <form onSubmit={onSubmitHandler} className="form callout">
      <label htmlFor="stock">
        Search for Companies
        <input onChange={onChangeHandler} type="text" id="stock" value={formData.stock} />
      </label>

      <div className="select">
        <label>
          Scale
          <select id="scale" value={formData.scale} onChange={onChangeHandler}>
            <option></option>
            {scaleNames}
          </select>
        </label>
      </div>
      <div>{props.error}</div>
      <div className="button-group float-right">
        <input className="button" type="submit" value="Submit" />
      </div>
    </form>


  )
}

export default Form
