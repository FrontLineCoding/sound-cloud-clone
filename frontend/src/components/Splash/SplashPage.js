import { NavLink } from "react-router-dom";
import DemoUser from "../DemoUser/DemoUser";
import {cur} from '../../App'

const SplashPage = () => {


    return (
        <div className="main-box">
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
            <NavLink to='/'><DemoUser>Demo Login</DemoUser></NavLink>
        </div>
    )
}

export default SplashPage;
