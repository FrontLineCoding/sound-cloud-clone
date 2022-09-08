import { useEffect, useReducer, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import CreateSongForm from '../Songs/CreateSongForm';
import Fab from '../Songs/Fab';
import {getUserAlbums} from '../../store/albums'
import MyAlbumDetail from './MyAlbumDetail';
import CreateAlbumForm from '../Albums/CreateAlbumForm';


const MyAlbums = ({user}) => {
    const dispatch = useDispatch();
    const username = useSelector(state => state.session.user.username);
    const sessionUserId = useSelector(state => state.session.user.id);
    const userAlbums = [];
    const allAlbums = useSelector(state => Object.values(state.albums))
    const [showForm, setShowForm] = useState(false);

    allAlbums.map(album => {
        if(album.userId === sessionUserId){
            userAlbums.push(album)
        }else{
            return
        }
    })

    // useEffect(() => {
    //     console.log('gettingUserAlbums');
    //     dispatch(getUserAlbums());
    // },[dispatch]);

    if(!userAlbums){
        return null;
    }

    return (
        <main>
            <nav>
            <Fab hidden={showForm} onClick={() => setShowForm(true)} />
                {userAlbums.map((album) => {
                    return(
                        <NavLink key={album.id} to={`/${username}/albums/${album.id}`}>
                            <div className='song-container'>
                                <h2 className='song-title'>{album.title}</h2>
                            </div>
                        </NavLink>
                    )
                })}
            </nav>
            {showForm ? (
            <CreateAlbumForm hideForm={() => setShowForm(false)} />
            ) : (
            <Route path={`/${username}/albums/:albumId`}>
                <MyAlbumDetail hideForm={() => setShowForm(false)}/>
            </Route>
            )}
        </main>
    )
}

export default MyAlbums;
