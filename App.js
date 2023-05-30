import { AppRegistry, SafeAreaView, StyleSheet, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import { getThemeMode, saveThemeMode } from './src/services/theme.service'
import { darkTheme, lightTheme } from './src/constants/theme.constants'
import { AppTabNavigator } from './src/routes/AppTabNavigator'
import { useSafeAreaViewStyles } from './src/hooks/useSafeAreaViewStyles'

/*
	TODO: Add gorhom/react-native-bottom-sheet
 */

export default function App() {
	console.disableYellowBox = true

	const [isDarkTheme, setIsDarkTheme] = useState(false)
	const [theme, setTheme] = useState(lightTheme)

	const safeAreaViewStyles = useSafeAreaViewStyles()

	useEffect(() => {
		getThemeMode()
			.then(themeMode => {
				if (themeMode === 'dark') return setIsDarkTheme(true)
				setIsDarkTheme(false)
			})
	}, [])

	useEffect(() => {
		if (isDarkTheme) {
			saveThemeMode('dark')
			return setTheme(darkTheme)
		}
		saveThemeMode('light')
		setTheme(lightTheme)
	}, [isDarkTheme])

	const s = StyleSheet.create({
		app: {
			flex: 1,
		},
	})

	return (
		<SafeAreaView
			style={safeAreaViewStyles.safeAreaView}
		>
			<Provider store={store}>
				<PaperProvider theme={theme}>
					<View style={s.app}>
						<AppTabNavigator setIsDarkTheme={setIsDarkTheme}/>
					</View>
				</PaperProvider>
			</Provider>
		</SafeAreaView>
	)
}

AppRegistry.registerComponent('Counted', App)
