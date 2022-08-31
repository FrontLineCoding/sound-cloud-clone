

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
		// console.log(list);
		dispatch(loadAllSongs(list));
	}
};

// export const getPokemonById = (id) => async (dispatch) => {
// 	const response = await fetch(`/api/pokemon/${id}`);

// 	if(response.ok){
// 		const pokemon = await response.json();
// 		dispatch(addOnePokemon(pokemon))
// 	}
// }

export const addSong = (song, albumId) => async (dispatch) => {
	const response = await fetch(`/api/albums/${albumId}/songs`, {
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
			// console.log(action.list.Songs);
			action.list.Songs.forEach((song) => {
				allSongs[song.id] = song;
			});
			return {
				...allSongs,
				...state,
				// list: sortList(action.list),
			};

		case ADD:
			if (!state[action.song.id]) {
				const newState = {
					...state,
					[action.song.id]: action.song,
				};
				const songList = newState.list.map((id) => newState[id]);
				songList.push(action.song);
				// newState.list = sortList(pokemonList);
				return newState;
			}
			return {
				...state,
				[action.pokemon.id]: {
					...state[action.pokemon.id],
					...action.pokemon,
				},
			};
		// case LOAD_ONE:
		// 	if(state[action.pokemon.id] === action.id) {
		// 		return state[action.pokemon]
		// 	}
			default:
			return state;
	}
};

export default songReducer;
