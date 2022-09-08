import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteUserAlbum, getAlbumById } from "../../store/albums";
import '../MyStuff/MyStuff.css';
import EditAlbum from "./EditAlbum";

const MyAlbumDetail = ({hideForm}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { albumId } = useParams();
    const album = useSelector(state => state.albums[albumId]);
    console.log(album);
    const username = useSelector(state => state.session.user.username);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        dispatch(getAlbumById(albumId));
    }, [dispatch]);

    const deleteAlbumButton = () => {
        dispatch(deleteUserAlbum(albumId));
        history.push(`/${username}/albums`)
    }

    const editAlbumButton = () => {
        setEditing(true);
    }

    return (
        <>
            {editing ? (
            <EditAlbum editing={editing} setEditing={setEditing}/>
            ) : (
                <div className="song-detail">
                    <div className="action-buttons">
                        <button onClick={editAlbumButton}>Edit</button>
                        <button onClick={deleteAlbumButton}>Delete</button>
                    </div>
                    {/* <img src={album.previewImage}/>
                    <h2>{album.title}</h2>
                    <h3>{album.Artist.username}</h3>
                    <p>{album.description}</p> */}
                    <p>{album.title}</p>
                </div>
            )}
        </>

    )
}

export default MyAlbumDetail;
