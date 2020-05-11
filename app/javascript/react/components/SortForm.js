import React, { useState } from 'react'
import FormSelect from './FormSelect'
const SortForm = props => {
  const [ sortValue, setSortValue ] = useState("Date (Newest)")
  const sortOptions = ["Date (Newest)", "Date (Oldest)", "Most Likes"];

  const sortChangeHandler = (event) => {
    setSortValue(event.currentTarget.value)
    props.sortItems(event.currentTarget.value);
  }

  return(
    <form className="sort-by">
      <FormSelect
        includeEmptyValue={false}
        array={sortOptions}
        id={1}
        value={sortValue}
        label="Sort by"
        onChangeHandler={sortChangeHandler}
      />
    </form>
  )
}

export default SortForm
