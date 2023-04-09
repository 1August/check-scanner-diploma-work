import { AppRegistry, Dimensions, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import {
	MD3DarkTheme as DarkTheme,
	MD3LightTheme as DefaultTheme,
	Provider as PaperProvider,
} from 'react-native-paper'
import { useEffect, useState } from 'react'
import { HomeStackPage } from './src/pages/HomeStackPage/HomeStackPage'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { AccountStackPage } from './src/pages/AccountStackPage/AccountStackPage'
import { QRScannerStackPage } from './src/pages/QRScannerStackPage/QRScannerStackPage'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'

export const BASE_URL = 'https://ec7f-46-34-195-73.eu.ngrok.io'

/*
	TODO: Add gorhom/react-native-bottom-sheet
 */

const lightTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		// primary: 'hsl(230, 75%, 50%)',
		// secondary: 'hsl(15, 100%, 50%)',
		// background: '#eee',
	},
}
const darkTheme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		// primary: 'rgb(255, 255, 255)',
		// secondary: 'coral',
	},
}

/**
 * In iOS devices, screenHeight === windowHeight.
 * In Android devices with bottom navigator bar, screen height === windowHeight + statusBarHeight +
 * bottomNavigatorBarHeight.
 * In Android devices without bottom navigator bar, bottomNavigatorBarHeight is zero.
 */
const SCREEN_HEIGHT = Dimensions.get('screen').height
const WINDOW_HEIGHT = Dimensions.get('window').height
const BOTTOM_NAVIGATION_BAR_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT - StatusBar.currentHeight

export default function App() {
	const [isDarkTheme, setIsDarkTheme] = useState(false)
	const [theme, setTheme] = useState(darkTheme)

	useEffect(() => {
		if (isDarkTheme) {
			setTheme(darkTheme)
		} else {
			setTheme(lightTheme)
		}
	}, [isDarkTheme])

	const s = StyleSheet.create({
		app: {
			flex: 1,
		},
	})

	const Tab = createMaterialBottomTabNavigator()

	return (
		<Provider store={store}>
			<PaperProvider theme={theme}>
				<SafeAreaView style={{ flex: 1 }}>
					<View style={s.app}>
						<NavigationContainer theme={theme}>
							<Tab.Navigator>
								<Tab.Screen
									name={'HomeStackPage'} component={HomeStackPage}
									options={{
										tabBarIcon: 'home',
										title: 'Home',
									}}
								/>
								<Tab.Screen
									name={'QRScannerStackPage'} component={QRScannerStackPage}
									options={{
										tabBarIcon: 'qrcode-scan',
										title: 'QR Scan',
									}}
								/>
								<Tab.Screen
									name={'AccountStackPage'}
									children={() =>
										<AccountStackPage
											isDarkTheme={isDarkTheme}
											setIsDarkTheme={setIsDarkTheme}
										/>
									}
									options={{
										tabBarIcon: 'account',
										title: 'Account',
									}}/>
							</Tab.Navigator>
						</NavigationContainer>
					</View>
				</SafeAreaView>
			</PaperProvider>
		</Provider>
	)
}

AppRegistry.registerComponent('Counted', App)
