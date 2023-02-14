import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	email: '',
	password: '',
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.email = action.payload.email,
			state.password = action.payload.password
		},
	},
})

export const { setCredentials } = authSlice.actions
export const { reducer: authReducer } = authSlice