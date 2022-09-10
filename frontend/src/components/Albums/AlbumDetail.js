import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAlbumById } from "../../store/albums";
import '../Songs/ListSongs.css';

let songs;
const AlbumDetail = () => {
    const dispatch = useDispatch();
    const { albumId } = useParams();
    const album = useSelector(state => state.albums[albumId]);
    songs = useSelector(state => {
        const songsArr = Object.values(state.song);
        return songsArr;
    });

    const albumSongs = [];
    songs.map(song => {
        if(song.albumId === parseInt(albumId)){
            albumSongs.push(song);
        }else{
            return
        }
    });
    console.log(albumSongs);


    useEffect(() => {
        dispatch(getAlbumById(albumId));
    }, [dispatch]);


    return (
        <div className="song-detail">
            <h2>{album.title}</h2>
            <p>{album.description}</p>
            <div className="album-song-div">Songs in this album:
                {albumSongs.map((song) => {
                    return <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
                })}
            </div>
        </div>
    )
}

export default AlbumDetail;
