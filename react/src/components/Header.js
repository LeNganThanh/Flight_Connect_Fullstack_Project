import classes from './Header.module.css';
import logo from '../media/logo-5.png';
import Button from './Button';
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
          <Button className={classes.user}>Register</Button> {/* Need functions */}
          <Button className={classes.user}>Login</Button>
        </div>
      </div>
      
    </div>
  );
};

export default Header;
