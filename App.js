import { AppRegistry, Dimensions, StatusBar, StyleSheet, View } from 'react-native'
import { SignupPage } from './src/pages/SignupPage/SignupPage'
import { SigninPage } from './src/pages/SigninPage/SigninPage'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import {
	MD3DarkTheme as DarkTheme,
	MD3LightTheme as DefaultTheme,
	Provider as PaperProvider,
} from 'react-native-paper'
import { useEffect, useState } from 'react'
import { HomeStackPage } from './src/pages/HomeStackPage/HomeStackPage'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

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
	const [isDarkTheme, setIsDarkTheme] = useState(true)
	const [theme, setTheme] = useState(darkTheme)

	// const [index, setIndex] = useState(0)
	// const routes = [
	//     { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home' },
	//     { key: 'signin', title: 'Login', focusedIcon: 'close', unfocusedIcon: 'close' },
	//     { key: 'signup', title: 'Register', focusedIcon: 'close', unfocusedIcon: 'close' },
	// ]
	//
	// const renderScene = BottomNavigation.SceneMap({
	//     home: HomeStackPage,
	//     signin: SigninPage,
	//     signup: SignupPage,
	// })

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
				<View style={s.app}>
					<NavigationContainer theme={theme}>
						<Tab.Navigator>
							<Tab.Screen name={'Home'} component={HomeStackPage} options={{
								tabBarIcon: 'home'
							}}/>
							<Tab.Screen name={'SignUp'} component={SignupPage} options={{
								tabBarIcon: 'close'
							}}/>
							<Tab.Screen name={'SignIn'} component={SigninPage} options={{
								tabBarIcon: 'close'
							}}/>

							{/*<Tab.Screen name={'Supermarket'} component={SupermarketPage} options={{*/}
							{/*    tabBarBadge: false*/}
							{/*}}/>*/}
						</Tab.Navigator>

						{/*<BottomNavigation*/}
						{/*    navigationState={{ index, routes }}*/}
						{/*    onIndexChange={setIndex}*/}
						{/*    renderScene={renderScene}*/}
						{/*    theme={theme}*/}
						{/*/>*/}
					</NavigationContainer>
				</View>
			</PaperProvider>
		</Provider>
	)
}

AppRegistry.registerComponent('Counted', App)