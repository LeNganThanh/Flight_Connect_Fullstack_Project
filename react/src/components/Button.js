import React from 'react'
import classes from './Button.module.css'

export default function Button(props) {
  return (
    <button>{props.children}</button>
  )
}
