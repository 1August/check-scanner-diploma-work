import axios from 'axios'
import { BASE_URL } from '../../App'
import { store } from '../redux/store'
import { logout } from '../redux/slices/authSlice'

const { dispatch } = store

axios.interceptors.response.use(
	response => response,
	error => {
		const { status } = error.response
		if (status === 403) {
			dispatch(logout())
		}
		return Promise.reject(error)
	},
)

export const api = axios
	.create({
		headers: {
			'Cache-Control': 'no-cache',
			Pragma: 'no-cache',
			Expires: '0',
		},
		baseURL: BASE_URL,
	})
