import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from 'jwt-decode'
import { initialState, setAuth, setError, setLoading, setStatus } from '../redux/slices/authSlice'
import { api } from '../lib/api'

export const register = ({ name, email, password }) => async dispatch => {
	dispatch(setLoading(true))
	dispatch(setError(''))
	dispatch(setStatus(null))

	const url = '/api/auth/signup'

	api
		.post(url, { name, email, password })
		.then(res => {
			dispatch(setStatus(res.status))
			if ([400, 401, 402, 403, 404].includes(res.status)) throw new Error('Invalid data!')
			if (res.status !== 201) throw new Error('Server error. Please, try again')

			dispatch(setLoading(false))
			dispatch(login({ email, password }))
		})
		.catch(err => {
			dispatch(setLoading(false))
			dispatch(setError(err.message))
		})
}

export const login = ({ email, password }) => async (dispatch) => {
	dispatch(setLoading(true))
	dispatch(setStatus(null))

	const url = '/api/auth/signin'
	api
		.post(url, { email, password })
		.then(async res => {
			dispatch(setStatus(res.status))
			const decoded = jwt_decode(res.data.data)
			const auth = { id: decoded.userId, name: decoded.name, email: decoded.email, token: res.data.data }

			await AsyncStorage.setItem('auth', res.data.data)

			dispatch(setLoading(false))
			dispatch(setError(null))
			dispatch(setAuth(auth))
		})
		.catch(error => {
			dispatch(setError(error.message))
			dispatch(setLoading(false))
		})
}

export const checkAuth = () => async dispatch => {
	try {
		dispatch(setLoading(true))
		dispatch(setStatus(null))

		const token = await AsyncStorage.getItem('auth')
		if (token == null) {
			dispatch(setLoading(false))
			dispatch(setStatus(401))
			dispatch(setError('Unauthorized'))
			return
		}

		const decoded = jwt_decode(token)
		if (decoded.exp * 1000 < Date.now()) {
			dispatch(setLoading(false))
			dispatch(setStatus(401))
			dispatch(setError('Token expired'))
			return
		}

		const auth = {
			id: decoded.userId,
			name: decoded.name,
			email: decoded.email,
			token,
		}

		dispatch(setLoading(false))
		dispatch(setError(null))
		dispatch(setAuth(auth))
	} catch (error) {
		dispatch(setLoading(false))
		console.log('Error checking auth:', error)
	}
}

export const logout = () => async (dispatch) => {
	try {
		dispatch(setLoading(true))

		await AsyncStorage.removeItem('auth')

		dispatch(setLoading(false))
		dispatch(setError(null))
		dispatch(setAuth(initialState))
	} catch (error) {
		dispatch(setLoading(false))
		dispatch(setError(error.message))
	}
}
