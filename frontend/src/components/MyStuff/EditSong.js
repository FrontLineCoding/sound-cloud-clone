import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editSong } from "../../store/songs";


const EditSongForm = ( {editing, setEditing}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {songId} = useParams();
    const sessionUserId = useSelector(state => state.session.user.id);
    const username = useSelector(state => state.session.user.username);
    const albums = useSelector(state => Object.values(state.albums));
    const albumsObj = useSelector(state => state.albums);
    const userAlbums = []
    albums.map((album) => {
        if(album.userId === sessionUserId) userAlbums.push(album)
    });
    const editingSong = useSelector(state => state.song[songId]);

    const [title, setTitle] = useState(`${editingSong.title}`);
    const [description, setDescription] = useState(`${editingSong.description}`);
    const [previewImage, setPreviewImage] = useState(`${editingSong.previewImage}`);
    const [audioURL, setAudioURL] = useState(`${editingSong.url}`);


    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePreviewImage = (e) => setPreviewImage(e.target.value);
    const updateAudioURL = (e) => setAudioURL(e.target.value);



    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            description,
            imageUrl: previewImage,
            url: audioURL
        };

        let updatedSong = await dispatch(editSong(payload, songId));
        if(updatedSong){
            history.push(`/${username}/songs/${updatedSong.id}`);
        }
        setEditing(false);
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        setEditing(false);
      };

      return (
            <section className="new-form-holder centered middled">
                <form className="create-song-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={updateTitle} />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={updateDescription} />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={previewImage}
                        onChange={updatePreviewImage} />
                    <input
                        type="text"
                        placeholder="Audio URL"
                        value={audioURL}
                        onChange={updateAudioURL} />
                    <button type="submit">Update Song</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </section>
        )
}

export default EditSongForm;
