import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSongById } from "../../store/songs";


const SongDetail = () => {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const song = useSelector(state => state.song[songId]);

    useEffect(() => {
        dispatch(getSongById(songId));
    }, [dispatch]);

    return (
        <>
            <h2>{song.title}</h2>
        </>
    )
}

export default SongDetail;
