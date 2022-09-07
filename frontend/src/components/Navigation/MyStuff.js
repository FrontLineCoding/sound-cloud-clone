import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';

export const userSongs = []
function MyStuff({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const username = useSelector(state => state.session.user.username);



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


  return (
    <>
        <button onClick={openMenu} className='my-stuff-button'>
            My Stuff
        </button>
        <div>
        {showMenu && (
            <ul className="my-stuff-dropdown">
                <li>
                    <NavLink className='my-stuff' to={`/${username}/songs`}>My Songs</NavLink>
                    <NavLink className='my-stuff' to={`/${username}/albums`}>My Albums</NavLink>
                </li>
            </ul>
        )}
        </div>
    </>
  );
}

export default MyStuff;
