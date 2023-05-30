import { initialState, setFavouritesSuccess, setError, setLoading } from '../redux/slices/favouritesSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setRef } from '@mui/material'

export const addToFavourites = (product) => async (dispatch, getState) => {
	dispatch(setLoading(true))

	try {
		const favourites = getState().favourites.favourites
		const newFavourites = favourites.concat(product)

		await AsyncStorage.setItem('favourites', JSON.stringify(newFavourites))
		dispatch(setFavouritesSuccess(newFavourites))
		dispatch(setError(null))
	} catch (error) {
		dispatch(setError(error?.message))
	} finally {
		dispatch(setLoading(false))
	}
}

export const removeFromFavourites = (product) => async (dispatch, getState) => {
	dispatch(setLoading(true))

	try {
		const favourites = getState().favourites.favourites
		const filteredFavourites = favourites.filter(prod => prod.id !== product.id)

		await AsyncStorage.removeItem('favourites')
		await AsyncStorage.setItem('favourites', JSON.stringify(filteredFavourites))
		dispatch(setFavouritesSuccess(filteredFavourites))
		dispatch(setError(null))
	} catch (error) {
		dispatch(setError(error?.message))
	} finally {
		dispatch(setLoading(false))
	}
}

export const clearFavourites = () => async dispatch => {
	dispatch(setLoading(true))

	try {
		await AsyncStorage.removeItem('favourites')
		dispatch(setFavouritesSuccess(initialState.favourites))
		dispatch(setError(null))
	} catch (error) {
		dispatch(setError(error?.message))
	} finally {
		dispatch(setLoading(false))
	}
}

export const checkFavouritesStorage = () => async (dispatch) => {
	dispatch(setLoading(true))

	try {
		const favouritesString = await AsyncStorage.getItem('favourites')
		if (!favouritesString) return
		const favourites = JSON.parse(favouritesString)
		dispatch(setFavouritesSuccess(favourites ?? initialState.favourites))
		setError(null)
	} catch (error) {
		dispatch(setError(error.message))
	} finally {
		dispatch(setLoading(false))
	}
}
