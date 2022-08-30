import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import {getSongs} from '../../store/songs'
import CreateSongForm from './CreateSongForm';
import SongDetail from './SongDetail';
import Fab from './Fab';
import './ListSongs.css'

const ListSongs = () => {
    const dispatch = useDispatch();

    const songs = useSelector(state => {
        const songArr = Object.values(state.song)
        // console.log(songArr);
        // return state.song.list.map(songId => state.song[songId]);
        return songArr
      });
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        dispatch(getSongs());
    },[dispatch]);

    if (!songs) {
        return null;
      }

    return (
        // <>
        //     {songs.map((song) => {
        //         return (
        //             <div className='song-container'>
        //                 <h2 className='song-title'>{song.title}</h2>
        //                 <p className='song-description'>{song.description}</p>
        //             </div>
        //         )
        //     })}
        // </>
        <main>
            <nav>
            <Fab hidden={showForm} onClick={() => setShowForm(true)} />
                {songs.map((song) => {
                    return(
                        <NavLink key={song.id} to={`/songs/${song.id}`}>
                            <div className='song-container'>
                                <h2 className='song-title'>{song.title}</h2>
                                <p className='song-description'>{song.description}</p>
                            </div>
                        </NavLink>
                    )
                })}
            </nav>
            {showForm ? (
            <CreateSongForm hideForm={() => setShowForm(false)} />
            ) : (
            <Route path="/song/:songId">
                <SongDetail/>
            </Route>
            )}
        </main>
    )
}

export default ListSongs;
