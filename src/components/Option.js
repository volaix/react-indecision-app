
import React from 'react'

const Option = (props) => (
    <div className="option">
<div>
<p className="option__text">
  {props.count}. {props.optionText}
</p>
</div>
      <button
      className="button button--link"
       onClick={(e) => {
        props.handleDeleteOption(props.optionText)
      }
      }>Delete</button>
    </div>
  )

export default Option