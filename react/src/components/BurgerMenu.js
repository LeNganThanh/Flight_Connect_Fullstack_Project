import React from 'react'
import Button from './Button.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function BurgerMenu(props) {
  return (
    
    <Button className={props.className} onClick={props.onClick}><FontAwesomeIcon icon= {faBars} /></Button>
  )
}
