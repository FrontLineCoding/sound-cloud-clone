import { csrfFetch } from "./csrf";


const LOAD_ALL = "albums/LOAD";
const USERS_ALBUMS = "albums/USERS";
const EDIT = "albums/EDIT";
const ADD = "albums/ADD";
const DELETE = "albums/DELETE";


const loadAllAlbums = (list) => ({
	type: LOAD_ALL,
	list,
});

const loadUserAlbums = (ownedAlbums) => ({
    type: USERS_ALBUMS,
    ownedAlbums
})

const edit = (types) => ({
	type: EDIT,
	types,
});

const add = (album) => ({
	type: ADD,
	album,
});

const deleteAlbum = (id) => ({
	type: DELETE,
	id
})


export const getAlbums = () => async (dispatch) => {
	const response = await fetch(`/api/albums`);

	if (response.ok) {
		const list = await response.json();
		dispatch(loadAllAlbums(list));
	}
};

export const getUserAlbums = () => async (dispatch) => {
    const promise = await fetch('/api/albums/session/user');
    if(promise.ok){
        const promisedAlbums = await promise.json();
        dispatch(loadUserAlbums(promisedAlbums));
    }
}

export const getAlbumById = (id) => async (dispatch) => {
	const response = await fetch(`/api/albums/${id}`);

	if(response.ok){
		const album = await response.json();
		dispatch(add(album))
	}
}

export const addAlbum = (album) => async (dispatch) => {
	const response = await csrfFetch('/api/albums', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(album)
	});

	if(response.ok){
		const album = await response.json();
		dispatch(add(album));
		return album;
	}
}

export const editAlbum = (album, albumId) => async dispatch => {
	const response = await csrfFetch(`/api/albums/${albumId}`, {
		method: 'PUT',
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify(album)
	});

	if(response.ok){
		const album = await response.json();
		dispatch(add(album));
		return album;
	}
}
export const deleteUserAlbum = (albumId) => async dispatch => {
	const response = await csrfFetch(`/api/albums/${albumId}`,{
		method: 'DELETE'
		}
	);
	if(response.ok){
		const returnValue = response.json();
		dispatch(deleteAlbum(albumId))
		return returnValue;
	}
}

const initialState = {
	// list: []
};
const albumReducer = (state = initialState, action) => {
	switch (action.type) {
        case LOAD_ALL:
            const albums = {};
			action.list.Albums.forEach((album) => {
				albums[album.id] = album;
			})
            return {
                ...albums,
                ...state
            }
			case ADD:
				if (!state[action.album.id]) {
					const newState = {
						...state,
						[action.album.id]: action.album,
					};
					return newState;
				}
				return {
					...state,
					[action.album.id]: {
						...state[action.album.id],
						...action.album,
					},
				};
			case DELETE:
				const newState = { ...state };
				delete newState[action.id];
				return newState;
			case EDIT:
				return {
					...state,
					[action.album.id]: action.album
				}
			case USERS_ALBUMS:
				const userAlbums = {};
				action.ownedAlbums.Albums.forEach((album) => {
					userAlbums[album.id] = album;
				})
				return {
					...state,
					...userAlbums,
				}
				default:
				return state;
	}
};

export default albumReducer;
