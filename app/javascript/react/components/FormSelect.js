import React, { useState } from 'react'

const FormSelect = props => {
  const optionList = props.array.map((item, index) => {
    return(
      <option key={index}>
        {item}
      </option>
    )
  })
  return(
    <div className="select">
      <label>
        {props.label}
        <select id={props.id} value={props.value} onChange={props.onChangeHandler}>
          <option></option>
          {optionList}
        </select>
      </label>
    </div>
  )
}

export default FormSelect
