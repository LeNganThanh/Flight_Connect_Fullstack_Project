import Button from './Button.js';
import toast, { Toaster } from 'react-hot-toast';
import { FlightsContext } from '../context/FlightsContext.js';
import React, { useContext } from 'react';

export default function Settings(props) {
  const [state, dispatch] = useContext(FlightsContext);
  const { user } = state;
  const updateUser = e => {
    e.preventDefault();

    const data = new FormData(e.target);

    fetch(`http://localhost:1338/users/${user._id}`, {
      method: 'PATCH',
      headers: { token: localStorage.getItem('token') },
      body: data,
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        if (result.success) {
          toast.success('Successfully Signed Up!');
          dispatch({
            type: 'setUser',
            user: result.data,
          });
          setTimeout(() => {
            props.setSettings(false);
          }, 2000);
        } else {
          toast.error(JSON.stringify(result.message));
        }
      });
  };
  return (
    <div className={props.className}>
        <Button>Sign Out</Button>
      <form onSubmit={updateUser}>
        <div>
          <label>First Name:</label>
          <input type="text" id="firstName" name="firstName" required></input>
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" id="lastName" name="lastName" required></input>
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            minLength="8"
          ></input>
        </div>

        <div>
          <label>Profile Image:</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            id="profileImage"
          ></input>
        </div>
        <Button>Submit</Button>
      </form>
      <Toaster position="top-center" />
    </div>
  );
}
