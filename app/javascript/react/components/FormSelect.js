import React, { useState } from 'react'

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
    <div className="select">
      <label>
        {props.label}
        <select id={props.id} value={props.value} onChange={props.onChangeHandler}>
          {initialValue}
          {optionList}
        </select>
      </label>
    </div>
  )
}

export default FormSelect
