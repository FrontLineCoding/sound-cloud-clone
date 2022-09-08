import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editAlbum } from "../../store/albums";
import { editSong } from "../../store/songs";


const EditAlbum = ( {editing, setEditing}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {albumId} = useParams();
    // const sessionUserId = useSelector(state => state.session.user.id);
    const username = useSelector(state => state.session.user.username);
    // const albums = useSelector(state => Object.values(state.albums));
    // const albumsObj = useSelector(state => state.albums);
    // const userAlbums = []
    // albums.map((album) => {
    //     if(album.userId === sessionUserId) userAlbums.push(album)
    // });
    const editingAlbum = useSelector(state => state.albums[albumId]);

    const [title, setTitle] = useState(`${editingAlbum.title}`);
    const [description, setDescription] = useState(`${editingAlbum.description}`);
    const [previewImage, setPreviewImage] = useState(`${editingAlbum.previewImage}`);


    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePreviewImage = (e) => setPreviewImage(e.target.value);



    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            description,
            imageUrl: previewImage,
        };

        let updatedAlbum = await dispatch(editAlbum(payload, albumId));
        if(updatedAlbum){
            history.push(`/${username}/albums/${updatedAlbum.id}`);
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
                    <button type="submit">Update Album</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </section>
        )
}

export default EditAlbum;
