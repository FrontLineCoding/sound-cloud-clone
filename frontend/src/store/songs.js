import { csrfFetch } from "./csrf";


const LOAD_ALL = "songs/LOAD";
const EDIT = "songs/EDIT";
const ADD = "songs/ADD";
const DELETE = "songs/DELETE";


const loadAllSongs = (list) => ({
	type: LOAD_ALL,
	list,
});

const edit = (types) => ({
	type: EDIT,
	types,
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

export const editsong = (song) => async dispatch => {
	console.log(song)
	const response = await fetch(`/api/songs/${song.id}`, {
		method: 'PUT',
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify(song)
	});

	if(response.ok){
		const song = await response.json();
		dispatch(add(song));
		return song;
	}
}
const sortList = (list) => {
	return list
		.sort((songA, songB) => {
			return songA.id - songB.id;
		})
		.map((song) => song.id);
};

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
			default:
			return state;
	}
};

export default songReducer;
