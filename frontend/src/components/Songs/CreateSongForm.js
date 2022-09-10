import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addSong } from "../../store/songs";
import './FormStyling.css'


const CreateSongForm = ( {hideForm}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUserId = useSelector(state => state.session.user.id);
    const username = useSelector(state => state.session.user.username);
    const albums = useSelector(state => Object.values(state.albums));
    const userAlbums = []
    albums.map((album) => {
        if(album.userId === sessionUserId) userAlbums.push(album)
    })

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [audioURL, setAudioURL] = useState('');
    const [albumId, setAlbumId] = useState(userAlbums[0].id);
    const [errors, setErrors] = useState([]);


    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePreviewImage = (e) => setPreviewImage(e.target.value);
    const updateAudioURL = (e) => setAudioURL(e.target.value);
    const updateAlbumId = (e) => setAlbumId(e.target.value);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            description,
            imageUrl: previewImage,
            url: audioURL
        };

        let createdSong = await dispatch(addSong(payload, albumId))
        .catch(async (res) => {
            const data = await res.json();
            console.log(data);
            if(data && data.errors) setErrors(data.errors)
        });
        if(createdSong){
            history.push(`/${username}/songs/${createdSong.id}`);
            hideForm();
        }
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
      };

    const errorsArr = Object.values(errors);
      return (
            <section className="new-form-holder centered middled">
                <form className="create-song-form" onSubmit={handleSubmit}>
                    <ul>
                         {errorsArr.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
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
                    <select onClick={updateAlbumId} onChange={updateAlbumId} value={albumId}>
                        {
                            userAlbums.map(album =>
                            <option key={album.id} value={album.id}>{album.title}</option>
                            )
                        }
                    </select>
                    <button type="submit">Create new Song</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </section>
        )
}

export default CreateSongForm;
