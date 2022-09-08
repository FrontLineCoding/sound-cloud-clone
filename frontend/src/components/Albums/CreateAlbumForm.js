import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addAlbum } from "../../store/albums";


const CreateAlbumForm = ( {hideForm}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const sessionUserId = useSelector(state => state.session.user.id);
    const username = useSelector(state => state.session.user.username);
    // const albums = useSelector(state => Object.values(state.albums));
    // const userAlbums = []
    // albums.map((album) => {
    //     if(album.userId === sessionUserId) userAlbums.push(album)
    // })

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    // const [audioURL, setAudioURL] = useState('');
    // const [albumId, setAlbumId] = useState(userAlbums[0].id);


    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePreviewImage = (e) => setPreviewImage(e.target.value);
    // const updateAudioURL = (e) => setAudioURL(e.target.value);
    // const updateAlbumId = (e) => setAlbumId(e.target.value);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            description,
            imageUrl: previewImage,
        };

        let createdAlbum = await dispatch(addAlbum(payload));
        if(createdAlbum){
            history.push(`/${username}/albums/${createdAlbum.id}`);
        }
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
                    <button type="submit">Create new Album</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </section>
        )
}

export default CreateAlbumForm;
