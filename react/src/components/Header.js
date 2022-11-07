import classes from './Header.module.css';
import logo from '../media/logo-5.png';
import Nav from './NavHeader'
const Header = () => {
  return (
    <div className={classes.container}>
      <div className={classes.main}>
      <div className={classes.headerText}>
        <span>
          <img className={classes['logo-img']} src={logo} alt="logo" />
        </span>
      </div>

      <div className={classes.headerText}>
        <button>Register</button> {/* Need functions */}
        <button>Login</button>
      </div>
      </div>
       <Nav/> 
    </div>
  );
};

export default Header;
