import AsyncStorage from '@react-native-async-storage/async-storage'

export async function saveThemeMode(theme) {
	try {
		await AsyncStorage.setItem('theme', theme)
	} catch (error) {
		alert('Had some troubles when saving theme mode.')
	}
}

export async function getThemeMode() {
	try {
		return await AsyncStorage.getItem('theme')
	} catch (error) {
		alert('Had some troubles when reading theme mode.')
	}
}
