import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	id: null,
	name: null,
	email: null,
	token: null,
	loading: false,
	error: null,
	status: null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.id = action.payload.id
			state.name = action.payload.name
			state.email = action.payload.email
			state.token = action.payload.token
		},
		setLoading: (state, action) => {
			state.loading = action.payload
		},
		setError: (state, action) => {
			state.error = action.payload
		},
		setStatus: (state, action) => {
			state.status = action.payload
		},
	},
})

export const { setAuth, setError, setLoading, setStatus } = authSlice.actions
export const { reducer: authReducer } = authSlice
