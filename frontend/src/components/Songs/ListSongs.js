import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import {getSongs, getUserSongs} from '../../store/songs'
import { getAlbums } from '../../store/albums';
import CreateSongForm from './CreateSongForm';
import SongDetail from './SongDetail';
import Fab from './Fab';
import './ListSongs.css'

export let songs;
const ListSongs = () => {
    const dispatch = useDispatch();

    songs = useSelector(state => {
        const songArr = Object.values(state.song)
        return songArr
      });
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        dispatch(getSongs());
        dispatch(getAlbums());
    },[dispatch]);

    if (!songs) {
        return null;
      }

    return (
        <main>
            <nav>
            <Fab hidden={showForm} onClick={() => setShowForm(true)} />
                {songs.map((song) => {
                    return(
                        <NavLink key={song.id} to={`/songs/${song.id}`}>
                            <div className='song-container'>
                                <h2 className='song-title'>{song.title}</h2>
                                {/* <p className='song-description'>{song.description}</p> */}
                            </div>
                        </NavLink>
                    )
                })}
            </nav>
            {showForm ? (
            <CreateSongForm hideForm={() => setShowForm(false)} />
            ) : (
            <Route path="/songs/:songId">
                <SongDetail/>
            </Route>
            )}
        </main>
    )
}

export default ListSongs;
