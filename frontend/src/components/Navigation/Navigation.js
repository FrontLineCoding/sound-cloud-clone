import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import ListSongs from '../Songs/ListSongs';
import MyStuff from './MyStuff';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <MyStuff user={sessionUser} className='my-stuff-dropdown'></MyStuff>
        <ProfileButton user={sessionUser} className='profile-button'/>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div>
      <ul>
        <li className='nav-items'>
          <NavLink exact to="/">Home</NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
