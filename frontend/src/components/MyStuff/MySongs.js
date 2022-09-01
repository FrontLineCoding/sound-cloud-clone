import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import CreateSongForm from '../Songs/CreateSongForm';
import SongDetail from '../Songs/SongDetail';
import { userSongs } from '../Navigation/MyStuff';
import Fab from '../Songs/Fab';


const MySongs = ({user}) => {
    const username = useSelector(state => state.session.user.username);
    const [showForm, setShowForm] = useState(false);


    if (!userSongs) {
        return null;
      }

    return (
        <main>
            <nav>
            <Fab hidden={showForm} onClick={() => setShowForm(true)} />
                {userSongs.map((song) => {
                    return(
                        <NavLink key={song.id} to={`/${username}/songs/${song.id}`}>
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
            <Route path={`/${username}/songs/:songId`}>
                <SongDetail/>
            </Route>
            )}
        </main>
    )
}

export default MySongs;
