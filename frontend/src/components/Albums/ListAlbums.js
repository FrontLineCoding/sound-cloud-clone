import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route } from "react-router-dom";
import { getAlbums } from "../../store/albums";
import CreateSongForm from "../Songs/CreateSongForm";
import AlbumDetail from "./AlbumDetail";

let albums;
const ListAlbums = () => {
    const dispatch = useDispatch();

    albums = useSelector(state => {
        const albumsArr = Object.values(state.albums)
        return albumsArr
      });
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        dispatch(getAlbums());
    },[dispatch]);

    if (!albums) {
        return null;
      }

    return (
        <main>
            <nav>
            {/* <Fab hidden={showForm} onClick={() => setShowForm(true)} /> */}
            <h3>All Albums</h3>
                {albums.map((album) => {
                    return(
                        <NavLink key={album.id} to={`/albums/${album.id}`}>
                            <div className='song-container'>
                                <h2 className='song-title'>{album.title}</h2>
                                {/* <p className='song-description'>{song.description}</p> */}
                            </div>
                        </NavLink>
                    )
                })}
            </nav>
            {showForm ? (
            <CreateSongForm hideForm={() => setShowForm(false)} />
            ) : (
            <Route path="/albums/:albumId">
                <div className='song-detail'>
                    {/* <SongDetail/> */}
                    <AlbumDetail />
                    {/* <Comments/> */}
                </div>
            </Route>
            )}
        </main>
    )
}


export default ListAlbums;
