import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


const CreateSongForm = ( {hideForm}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUserId = useSelector(state => state.session.user.id);
    console.log(sessionUserId);
    //need current user for userID, and album choices
    //collect albums for current user for album choices
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [audioURL, setAudioURL] = useState('');

    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePreviewImage = (e) => setPreviewImage(e.target.value);
    const updateAudioURL = (e) => setAudioURL(e.target.value);

    //need to make getUserAlbums
    // useEffect(() => {
    //     dispatch(getUserAlbums());
    // }, [dispatch])
    const getUserAlbums = async() => {
        const promiseAlbums = await fetch('/api/albums/session/user');
        console.log(promiseAlbums);
        if(promiseAlbums.ok){
            const returnAlbums = await promiseAlbums.json();
            console.log(returnAlbums);
            return returnAlbums;
        }
    }
    const albums = getUserAlbums();
    console.log(albums);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            // albumId,
            title,
            description,
            previewImage,
            audioURL
        };

        // let createdSong = await dispatch(addSong(payload));
        // if(createdSong){
        //     history.push(`/songs/${createdSong.id}`);
        // }
        hideForm();
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
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
                    {/* <select onChange={updateAlbum} value={album}>
                        {
                        // pokeTypes.map(type =>
                        // <option key={type}>{type}</option>
                        // )
                        }
                    </select> */}
                    <button type="submit">Create new Song</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </section>
        )
}

export default CreateSongForm;
