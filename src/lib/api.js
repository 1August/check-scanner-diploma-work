import axios, { AxiosError } from 'axios'

export const BASE_URL = 'https://57c2-146-158-67-233.in.ngrok.io'

export const api = axios
	.create({
		headers: {
			'Cache-Control': 'no-cache',
			Pragma: 'no-cache',
			Expires: '0',
		},
		baseURL: BASE_URL,
		params: {
			timestamp: Date.now(),
		},
	})

api.interceptors.response.use(
	response => {
		if ([400, 401, 402, 403, 404].includes(response.status)) {
			throw new Error(`User error: ${response.status}`)
		}
		return response
	},
	error => error.isAxiosError ? AxiosError.from(error) : error,
)
