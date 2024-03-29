import { csrfFetch } from "./csrf";


const LOAD_ALL = "songs/LOAD";
const USERS = "songs/USERS";
const EDIT = "songs/EDIT";
const ADD = "songs/ADD";
const DELETE = "songs/DELETE";


const loadAllSongs = (list) => ({
	type: LOAD_ALL,
	list,
});

const loadUserSongs = (ownedSongs) => ({
    type: USERS,
    ownedSongs
})

const edit = (song) => ({
	type: EDIT,
	song,
});

const add = (song) => ({
	type: ADD,
	song,
});

const deleteSong = (id) => ({
	type: DELETE,
	id
})


export const getSongs = () => async (dispatch) => {
	const response = await fetch(`/api/songs`);

	if (response.ok) {
		const list = await response.json();
		dispatch(loadAllSongs(list));
	}
};

export const getUserSongs = () => async (dispatch) => {
	const promise = await fetch('/api/songs/session/user');
    if(promise.ok){
        const promisedSongs = await promise.json();
        dispatch(loadUserSongs(promisedSongs));
    }
}

export const getSongById = (id) => async (dispatch) => {
	const response = await fetch(`/api/songs/${id}`);

	if(response.ok){
		const song = await response.json();
		dispatch(add(song))
	}
}
export const addSong = (song, albumId) => async (dispatch) => {
	const response = await csrfFetch(`/api/albums/${albumId}/songs`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(song)
	});

	if(response.ok){
		const song = await response.json();
		dispatch(add(song));
		return song;
	}
}

export const editSong = (song, songId) => async dispatch => {
	const response = await csrfFetch(`/api/songs/${songId}`, {
		method: 'PUT',
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify(song)
	});

	if(response.ok){
		const song = await response.json();
		dispatch(edit(song));
		return song;
	}
}

export const deleteUserSong = (songId) => async dispatch => {
	const response = await csrfFetch(`/api/songs/${songId}`,{
		method: 'DELETE'
		}
	);
	if(response.ok){
		const returnValue = response.json();
		dispatch(deleteSong(songId))
		return returnValue;
	}
}


const initialState = {
	// list: []
};
const songReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_ALL:
			const allSongs = {};
			action.list.Songs.forEach((song) => {
				allSongs[song.id] = song;
			});
			return {
				...allSongs,
				...state,
			};

		case ADD:
			if (!state[action.song.id]) {
				const newState = {
					...state,
					[action.song.id]: action.song,
				};
				return newState;
			}
			return {
				...state,
				[action.song.id]: {
					...state[action.song.id],
					...action.song,
				},
			};
		case DELETE:
			const newState = { ...state };
			delete newState[action.id];
			return newState;
		case EDIT:
			return {
				...state,
				[action.song.id]: action.song
			}
		default:
			return state;
	}
};

export default songReducer;
