import Button from './Button.js';
import toast, { Toaster } from 'react-hot-toast';
import {FlightsContext} from '../context/FlightsContext'
import { useContext } from 'react';

export default function Login(props) {
    const [state, dispatch] = useContext(FlightsContext)

  const loginUser = e => {
    e.preventDefault();

   const data = JSON.stringify({email: e.target.email.value, password: e.target.password.value})
    console.log(data);
    fetch('http://localhost:1338/users/login', { method: 'POST', headers: {'Content-Type': 'application/json'},body: data })
      .then(res => {
        const token = res.headers.get('token')
        localStorage.setItem('token', token)
        return res.json()
      })
      .then(result => {
        console.log(result);
        if (result.success) {
          toast.success('Successfully Logged In!');
          dispatch({
            type: 'setUser',
            user: result.data
          })
          setTimeout(() => {
            props.setRegister(false);
           dispatch({
            type: 'setLogin',
            login: false
           })
            props.setLoggedIn(true)
          }, 2000);
        } else {
          toast.error(JSON.stringify(result.message));
        }
      });
  };
  return (
    <div className={props.className}>
      <form onSubmit={loginUser}>
        <div>
          <label>Email:</label>
          <input type="email" id="email" name="email" required></input>
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

        <Button>Submit</Button>
      </form>
      <Toaster position="top-center" />
    </div>
  );
}
