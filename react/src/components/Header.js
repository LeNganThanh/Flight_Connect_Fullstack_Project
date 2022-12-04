import classes from './Header.module.css';
import logo from '../media/logo-5.png';
import { useState } from 'react';
const Header = () => {

  const [register, setRegister] = useState(false)
  const [login, setLogin] = useState(false)
  const [loggedIn] = useState(false)

  const toggleRegister = () => {
    setRegister(register => !register)
    if (login) {
      setLogin(login => !login)
    }
  }
  const toggleLogin = () => {
    setLogin(login => !login)
    if (register) {
      setRegister(register => !register)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <div className={classes.headerText}>
          <span>
            <img className={classes['logo-img']} src={logo} alt="logo" />
          </span>
        </div>

        {!loggedIn ?
          <div className={classes.headerText}>
          <button className={classes.user} onClick={toggleRegister} >Register</button> {/* Need functions */}
          <button className={classes.user} onClick={toggleLogin} >Login</button>
        </div>
        : null}

        <div className={register ? classes.registerOn : classes.registerOff}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores consequuntur quod veritatis maxime pariatur dignissimos, deleniti esse, voluptatibus numquam, alias animi fugit? At alias exercitationem error dolore inventore rem impedit harum a aliquid ad nesciunt eius recusandae numquam, suscipit itaque fugiat mollitia nisi qui! Eum tenetur rerum accusantium! Ipsam illo repudiandae cum. Dolores esse iure dignissimos placeat, voluptatem illo necessitatibus ea quia tempora incidunt aut libero praesentium, culpa a quas adipisci exercitationem velit, facilis maxime! Vero autem, ab cumque corrupti qui, totam animi assumenda id nemo molestias nesciunt eveniet quibusdam libero amet inventore aspernatur deleniti, quisquam repudiandae minus. Nostrum dignissimos sapiente iste culpa ipsa optio et delectus. Impedit quos ipsam delectus distinctio fugiat reprehenderit minima veritatis autem vero voluptas, doloremque ipsa ea eligendi beatae? Reiciendis laudantium voluptatem soluta esse sit atque corporis omnis libero ipsum, perferendis tempora nulla fuga facere cupiditate ratione? Alias nemo mollitia maxime minima magni error repellat eveniet sapiente. Eaque ad sunt hic deleniti ducimus officiis maxime inventore ex ipsa explicabo, earum distinctio dolorum consequuntur suscipit expedita aliquid repudiandae omnis minima? Adipisci voluptatem ullam accusantium ducimus saepe nostrum sit repellendus recusandae! Autem voluptatum ea ad ipsam animi, reiciendis iure sit at facilis saepe consequuntur. Sit eligendi nesciunt nihil obcaecati soluta labore. Recusandae, deserunt repellat. Quaerat fugit laborum iure porro totam temporibus ab saepe, in accusamus beatae nisi aliquam ad? Architecto perspiciatis repellendus quia minus nihil voluptatum quasi atque iure cumque doloremque eos, ratione quaerat ipsum nesciunt corporis, magnam enim explicabo et consequuntur eveniet laudantium error sequi modi autem. Nostrum illo eveniet consectetur dolorum officia quam, perspiciatis minus vero atque asperiores repellat pariatur distinctio dolorem? Hic, eum impedit mollitia tenetur quidem repellat accusantium dolorum modi provident itaque, quaerat veniam iure odit maiores corporis consequatur voluptas, reprehenderit quos nisi totam blanditiis nam? Provident, nam consectetur praesentium voluptate soluta nostrum! 
        </div>
        <div className={login ? classes.loginOn : classes.loginOff}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores consequuntur quod veritatis maxime pariatur dignissimos, deleniti esse, voluptatibus numquam, alias animi fugit? At alias exercitationem error dolore inventore rem impedit harum a aliquid ad nesciunt eius recusandae numquam, suscipit itaque fugiat mollitia nisi qui! Eum tenetur rerum accusantium! Ipsam illo repudiandae cum. Dolores esse iure dignissimos placeat, voluptatem illo necessitatibus ea quia tempora incidunt aut libero praesentium, culpa a quas adipisci exercitationem velit, facilis maxime! Vero autem, ab cumque corrupti qui, totam animi assumenda id nemo molestias nesciunt eveniet quibusdam libero amet inventore aspernatur deleniti, quisquam repudiandae minus. Nostrum dignissimos sapiente iste culpa ipsa optio et delectus. Impedit quos ipsam delectus distinctio fugiat reprehenderit minima veritatis autem vero voluptas, doloremque ipsa ea eligendi beatae? Reiciendis laudantium voluptatem soluta esse sit atque corporis omnis libero ipsum, perferendis tempora nulla fuga facere cupiditate ratione? Alias nemo mollitia maxime minima magni error repellat eveniet sapiente. Eaque ad sunt hic deleniti ducimus officiis maxime inventore ex ipsa explicabo, earum distinctio dolorum consequuntur suscipit expedita aliquid repudiandae omnis minima? Adipisci voluptatem ullam accusantium ducimus saepe nostrum sit repellendus recusandae! Autem voluptatum ea ad ipsam animi, reiciendis iure sit at facilis saepe consequuntur. Sit eligendi nesciunt nihil obcaecati soluta labore. Recusandae, deserunt repellat. Quaerat fugit laborum iure porro totam temporibus ab saepe, in accusamus beatae nisi aliquam ad? Architecto perspiciatis repellendus quia minus nihil voluptatum quasi atque iure cumque doloremque eos, ratione quaerat ipsum nesciunt corporis, magnam enim explicabo et consequuntur eveniet laudantium error sequi modi autem. Nostrum illo eveniet consectetur dolorum officia quam, perspiciatis minus vero atque asperiores repellat pariatur distinctio dolorem? Hic, eum impedit mollitia tenetur quidem repellat accusantium dolorum modi provident itaque, quaerat veniam iure odit maiores corporis consequatur voluptas, reprehenderit quos nisi totam blanditiis nam? Provident, nam consectetur praesentium voluptate soluta nostrum! 
          
        </div>

      </div>
      
    </div>
  );
};

export default Header;
