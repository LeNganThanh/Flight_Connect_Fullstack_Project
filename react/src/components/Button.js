import React from "react";

export default function Button(props) {
  return <button className={props.className} onClick={props.onClick} value={props.value}>{props.children}</button>;
}
