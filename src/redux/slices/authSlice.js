import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from 'jwt-decode'

const initialState = {
	id: null,
	email: null,
	token: null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			return {
				id: action.payload.id,
				email: action.payload.email,
				token: action.payload.token,
			}
		},
		logout: () => {
			return {
				id: null,
				email: null,
				token: null,
			}
		},
	},
})

export const { loginSuccess, logout } = authSlice.actions
export const { reducer: authReducer } = authSlice

export const checkAuth = () => async (dispatch) => {
	try {
		const authData = await AsyncStorage.getItem('auth')
		if (!authData) {
			alert('Unauthorized!')
			return dispatch(logout())
		}

		const auth = JSON.parse(authData)
		const decoded = jwt_decode(auth.token)
		console.log({decoded})
		if (decoded.exp * 1000 < Date.now()) {
			alert('Unauthorized!')
			return dispatch(logout())
		}

		dispatch(loginSuccess(auth))
	} catch (error) {
		console.log('Error checking auth:', error)
	}
}
