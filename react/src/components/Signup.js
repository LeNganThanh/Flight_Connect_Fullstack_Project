import Button from './Button.js';
import toast, {Toaster} from 'react-hot-toast'

export default function Signup(props) {
  
  const registerUser = e => {
    e.preventDefault();
 
    
    const data = new FormData(e.target);
   

    fetch('http://localhost:1338/users', { method: 'POST', body: data })
      .then(res => res.json())
      .then(result => {
        console.log(result);
         if(result.success){
            toast.success('Successfully Signed Up!')
            setTimeout(() => {
                props.setRegister(false)
                props.setLogin(true)
            }, 2000)
            }else{
                toast.error(JSON.stringify(result.message))
            }
      });
  };
  return (
    <div className={props.className}>
      <form onSubmit={registerUser}>
        <div>
          <label>First Name:</label>
          <input type="text" id="firstName" name="firstName" required/>
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" id="lastName" name="lastName" required/>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" id="email" name="email" required/>
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            minLength="8"
          />
        </div>

        <div>
          <label>Profile Image:</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            id="profileImage"
          />
        </div>
        <Button>Submit</Button>
      </form>
      <Toaster position='top-center'/>
    </div>
  );
}
