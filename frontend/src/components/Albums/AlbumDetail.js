import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAlbumById } from "../../store/albums";
import '../Songs/ListSongs.css';


const AlbumDetail = () => {
    const dispatch = useDispatch();
    const { albumId } = useParams();
    const album = useSelector(state => state.albums[albumId]);


    useEffect(() => {
        dispatch(getAlbumById(albumId));
    }, [dispatch]);


    return (
        <div className="song-detail">
            {/* <img src={album.previewImage}/> */}
            <h2>{album.title}</h2>
            {/* <h3>{album.Artist.username}</h3> */}
            <p>{album.description}</p>
            {/* <p>{album.Album.title}</p> */}
        </div>
    )
}

export default AlbumDetail;
