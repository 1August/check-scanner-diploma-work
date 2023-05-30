import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { QRScannerPage } from '../QRScannerPage/QRScannerPage'
import { QRScanEditPage } from '../QRScanEditPage/QRScanEditPage'
import { useSelector } from 'react-redux'
import { useStackHeaderStyles } from '../../hooks/useStackHeaderStyles'
import { useFocusEffect } from '@react-navigation/native'

export const QRScannerStackPage = ({ navigation }) => {
	const token = useSelector(state => state.auth.token)
	const headerStyles = useStackHeaderStyles()

	const Stack = createNativeStackNavigator()

	useFocusEffect(() => {
		if (!token) {
			navigation.navigate('AccountStackPage', {
				screen: 'SigninPage',
			})
		}
	})

	return (
		<Stack.Navigator initialRouteName={'QRScannerPage'}>
			<Stack.Screen
				name={'QRScannerPage'}
				component={QRScannerPage}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name={'QRScanEditPage'}
				component={QRScanEditPage}
				options={({ route }) => ({
					title: route.params?.url,
					...headerStyles,
				})}
			/>
		</Stack.Navigator>
	)
}
