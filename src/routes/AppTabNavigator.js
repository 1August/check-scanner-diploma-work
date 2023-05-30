import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { HomeStackPage } from '../pages/HomeStackPage/HomeStackPage'
import { QRScannerStackPage } from '../pages/QRScannerStackPage/QRScannerStackPage'
import { FavouritesStackPage } from '../pages/FavouritesStackPage/FavouritesStackPage'
import { AccountStackPage } from '../pages/AccountStackPage/AccountStackPage'
import { useSelector } from 'react-redux'

export const AppTabNavigator = ({setIsDarkTheme}) => {
	const theme = useTheme()
	const strings = useSelector(state => state.localization.strings)

	const Tab = createMaterialBottomTabNavigator()
	const appTabScreens = [
		{
			name: 'HomeStackPage',
			children: (props) => <HomeStackPage {...props}/>,
			options: {
				tabBarIcon: 'home',
				title: strings.home,
			},
		},
		{
			name: 'QRScannerStackPage',
			children: (props) => <QRScannerStackPage {...props}/>,
			options: {
				tabBarIcon: 'qrcode-scan',
				title: strings.qrScan,
			},
		},
		{
			name: 'FavouritesStackPage',
			children: (props) => <FavouritesStackPage {...props}/>,
			options: {
				tabBarIcon: 'heart',
				title: strings.favourites,
			},
		},
		{
			name: 'AccountStackPage',
			children: (props) => <AccountStackPage setIsDarkTheme={setIsDarkTheme} {...props}/>,
			options: {
				tabBarIcon: 'account',
				title: strings.account,
			},
		},
	]

	return(
		<NavigationContainer theme={theme}>
			<Tab.Navigator initialRouteName={'HomeStackPage'}>
				{
					appTabScreens.map(screen => (
						<Tab.Screen
							key={screen.name}
							name={screen.name}
							children={screen.children}
							options={screen.options}
						/>
					))
				}
			</Tab.Navigator>
		</NavigationContainer>
	)
}
