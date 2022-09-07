import { useEffect, useReducer, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import CreateSongForm from '../Songs/CreateSongForm';
import MySongDetail from './MySongDetail';
import Fab from '../Songs/Fab';
import EditSongForm from './EditSong';
import {getUserAlbums, loadUserAlbums} from '../../store/albums'


const MyAlbums = ({user}) => {
    const dispatch = useDispatch();
    const username = useSelector(state => state.session.user.username);
    const sessionUserId = useSelector(state => state.session.user.id);

    useEffect(() => {
        dispatch(getUserAlbums());
    },[dispatch]);

    return (
        <main>
            <nav>
            <Fab hidden={showForm} onClick={() => setShowForm(true)} />
                {userSongs.map((song) => {
                    return(
                        <NavLink key={song.id} to={`/${username}/songs/${song.id}`}>
                            <div className='song-container'>
                                <h2 className='song-title'>{song.title}</h2>
                            </div>
                        </NavLink>
                    )
                })}
            </nav>
            {showForm ? (
            <CreateSongForm hideForm={() => setShowForm(false)} />
            ) : (
            <Route path={`/${username}/songs/:songId`}>
                <MySongDetail hideForm={() => setShowForm(false)}/>
            </Route>
            )}
        </main>
    )
}

export default MyAlbums;
