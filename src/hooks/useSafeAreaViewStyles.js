import { StatusBar, Platform, StyleSheet } from 'react-native'

export const useSafeAreaViewStyles = () => {
	return StyleSheet.create({
		safeAreaView: {
			flex: 1,
			paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
		}
	})
}
