import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSongById } from "../../store/songs";
import './MyStuff.css';

const MySongDetail = () => {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const song = useSelector(state => state.song[songId]);

    useEffect(() => {
        dispatch(getSongById(songId));
    }, [dispatch]);

    return (
        <div className="song-detail">
            <div className="action-buttons">
                <button>Edit</button>
                <button>Delete</button>
            </div>
            <h2>{song.title}</h2>
        </div>
    )
}

export default MySongDetail;
