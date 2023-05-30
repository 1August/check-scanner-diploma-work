import AsyncStorage from '@react-native-async-storage/async-storage'
import { availableLanguages, changeLanguage } from '../redux/slices/localizationSlice'

export const saveLocalizationLanguage = (language) => async dispatch => {
	try {
		if (!availableLanguages.includes(language)) return
		await AsyncStorage.setItem('lang', language)
		dispatch(changeLanguage(language))
	} catch (error) {

	}
}

export const checkLocalizationLanguage = () => async dispatch => {
	try {
		const lang = await AsyncStorage.getItem('lang')
		if (lang == null) return
		dispatch(changeLanguage(lang))
	} catch (error) {

	}
}
