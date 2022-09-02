

const LOAD_ALL = "albums/LOAD";
const USERS = "albums/USERS";
const EDIT = "albums/EDIT";
const ADD = "albums/ADD";
const DELETE = "albums/DELETE";


const loadAllAlbums = (list) => ({
	type: LOAD_ALL,
	list,
});

const loadUserAlbums = (ownedAlbums) => ({
    type: USERS,
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

export const addAlbum = (album) => async (dispatch) => {
	const response = await fetch('/api/songs', {
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

export const editsong = (album) => async dispatch => {
	console.log(album)
	const response = await fetch(`/api/albums/${album.id}`, {
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
const sortList = (list) => {
	return list
		.sort((albumA, albumB) => {
			return albumA.id - albumB.id;
		})
		.map((album) => album.id);
};

const initialState = {
	// list: []
};
const albumReducer = (state = initialState, action) => {
	switch (action.type) {
        case LOAD_ALL:
            const albums = {};
            console.log(action);
			action.list.Albums.forEach((album) => {
				albums[album.id] = album;
			})
            return {
                ...albums,
                ...state
            }
			default:
			return state;
	}
};

export default albumReducer;
