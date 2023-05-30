import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	favourites: [],
	loading: false,
	error: null,
}

export const favouritesSlice = createSlice({
	name: 'favourites',
	initialState,
	reducers: {
		setFavouritesSuccess: (state, action) => {
			state.favourites = action.payload
		},
		setLoading: (state, action) => {
			state.loading = action.payload
		},
		setError: (state, action) => {
			state.loading = action.payload
		},
	},
})

export const { setFavouritesSuccess, setError, setLoading } = favouritesSlice.actions
export const { reducer: favouritesReducer } = favouritesSlice
