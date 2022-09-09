import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import ListSongs from '../Songs/ListSongs';
import MyStuff from './MyStuff';
import './Navigation.css';
import DemoUser from '../DemoUser/DemoUser';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink exact to="/">Home</NavLink>
        <NavLink to='/albums'>Albums</NavLink>
        <MyStuff user={sessionUser} className='my-stuff-dropdown'></MyStuff>
        <ProfileButton user={sessionUser} className='profile-button'/>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to='/'><DemoUser>Demo Login</DemoUser></NavLink>

      </>
    );
  }

  return (
    <div>
      <ul className='nav-bar'>
        <li className='nav-items'>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
