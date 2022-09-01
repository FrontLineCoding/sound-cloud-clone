import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';

function MyStuff({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
        <button onClick={openMenu} className='my-stuff-button'>
            My Stuff
        </button>
        <div>
        {showMenu && (
            <ul className="my-stuff-dropdown">
                <li>
                    <NavLink to={`/${user.username}/songs`}>My Songs</NavLink>
                </li>
            </ul>
        )}
        </div>
    </>
  );
}

export default MyStuff;
