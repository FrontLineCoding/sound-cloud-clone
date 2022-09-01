import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { songs } from '../Songs/ListSongs';

export const userSongs = []
function MyStuff({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  // console.log(songs);
  if(songs && !userSongs.length){
      songs.map((song) => {
        if(song.userId === user.id) {userSongs.push(song)}
        else{return}
      })
      console.log(userSongs);
  }

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
                    <NavLink to={`/${user.username}/songs`}>My Songs</NavLink>
                </li>
            </ul>
        )}
        </div>
    </>
  );
}

export default MyStuff;
