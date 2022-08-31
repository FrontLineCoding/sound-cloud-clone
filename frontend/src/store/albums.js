

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

const add = (pokemon) => ({
	type: ADD,
	pokemon,
});

const deleteAlbum = (id) => ({
	type: DELETE,
	id
})


export const getAlbums = () => async (dispatch) => {
	const response = await fetch(`/api/albums`);

	if (response.ok) {
		const list = await response.json();
		// console.log(list);
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

// export const getPokemonById = (id) => async (dispatch) => {
// 	const response = await fetch(`/api/pokemon/${id}`);

// 	if(response.ok){
// 		const pokemon = await response.json();
// 		dispatch(addOnePokemon(pokemon))
// 	}
// }

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
		// case LOAD_ALL:
		// 	const allSongs = {};
		// 	console.log(action.list.Songs);
		// 	action.list.Songs.forEach((song) => {
		// 		allSongs[song.id] = song;
		// 	});
		// 	return {
		// 		...allSongs,
		// 		...state,
		// 		// list: sortList(action.list),
		// 	};
        case USERS:
            const usersAlbums = {};
            console.log(action);
			action.ownedAlbums.Albums.forEach((album) => {
				usersAlbums[album.id] = album;
			})
            return {
                ...usersAlbums,
                ...state
            }

		// case ADD:
		// 	if (!state[action.pokemon.id]) {
		// 		const newState = {
		// 			...state,
		// 			[action.pokemon.id]: action.pokemon,
		// 		};
		// 		const pokemonList = newState.list.map((id) => newState[id]);
		// 		pokemonList.push(action.pokemon);
		// 		newState.list = sortList(pokemonList);
		// 		return newState;
		// 	}
		// 	return {
		// 		...state,
		// 		[action.pokemon.id]: {
		// 			...state[action.pokemon.id],
		// 			...action.pokemon,
		// 		},
		// 	};
		// case LOAD_ONE:
		// 	if(state[action.pokemon.id] === action.id) {
		// 		return state[action.pokemon]
		// 	}
			default:
			return state;
	}
};

export default albumReducer;
