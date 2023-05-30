import { createSlice } from '@reduxjs/toolkit'
import en from '../../constants/localization/en.localization.json'
import kz from '../../constants/localization/kz.localization.json'

export const languages = { en, kz }

export const initialState = {
	strings: languages.en,
	lang: 'en'
}

export const availableLanguages = Object.keys(languages)

export const localizationSlice = createSlice({
	name: 'localization',
	initialState,
	reducers: {
		changeLanguage: (state, action) => {
			const candidateLanguage = action.payload
			if (availableLanguages.includes(candidateLanguage)){
				state.strings = languages[candidateLanguage]
				state.lang = candidateLanguage
			}
		}
	},
})


export const { changeLanguage } = localizationSlice.actions
export const { reducer: localizationReducer } = localizationSlice
