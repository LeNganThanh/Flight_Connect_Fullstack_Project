import React from 'react';

const DropDown = (props) => {

  return (
    <div>
      <div>{props.dataSource ? props.dataSource.data.map(
        city => {
          return (
            <p key={city.id}>{city.name}</p>
          )
        }
      ) : 'hi'}</div>
    </div>
  )
}

export default DropDown
