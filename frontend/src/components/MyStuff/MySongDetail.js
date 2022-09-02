import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editSong, getSongById } from "../../store/songs";
import { deleteUserSong } from "../../store/songs";
import EditSongForm from "./EditSong";
import './MyStuff.css';

const MySongDetail = ({hideForm}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId } = useParams();
    const song = useSelector(state => state.song[songId]);
    const username = useSelector(state => state.session.user.username);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        dispatch(getSongById(songId));
    }, [dispatch]);

    const deleteSongButton = () => {
        dispatch(deleteUserSong(songId));
        history.push(`/${username}/songs`)
    }

    const editSongButton = () => {
        setEditing(true);
    }

    return (
        <>
            {editing ? (
            <EditSongForm editing={editing} setEditing={setEditing}/>
            ) : (
                <div className="song-detail">
                    <div className="action-buttons">
                        <button onClick={editSongButton}>Edit</button>
                        <button onClick={deleteSongButton}>Delete</button>
                    </div>
                    <img src={song.previewImage}/>
                    <h2>{song.title}</h2>
                </div>
            )}
        </>

    )
}

export default MySongDetail;
