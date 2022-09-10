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
        <NavLink exact to="/songs">Songs</NavLink>
        <NavLink to='/albums'>Albums</NavLink>
        <div className='my-stuff'><MyStuff user={sessionUser} className='my-stuff-dropdown'></MyStuff></div>
        <div><ProfileButton user={sessionUser} className='profile-button'/></div>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to='/songs'><DemoUser>Demo Login</DemoUser></NavLink>

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
