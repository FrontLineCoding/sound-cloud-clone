import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSongById } from "../../store/songs";
import './ListSongs.css'


const SongDetail = () => {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const song = useSelector(state => state.song[songId]);

    useEffect(() => {
        dispatch(getSongById(songId));
    }, [dispatch]);


    return (
        <div className="song-detail">
            <img src={song.previewImage}/>
            <h2>{song.title}</h2>
            {/* <h3>{song.Artist.username}</h3> */}
            <p>{song.description}</p>
            {/* <p>{song.Album.title}</p> */}
        </div>
    )
}

export default SongDetail;
