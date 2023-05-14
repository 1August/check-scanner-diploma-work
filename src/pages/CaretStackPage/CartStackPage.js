import { useTheme } from 'react-native-paper'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useDispatch, useSelector } from 'react-redux'
import { CartPage } from './CartPage/CartPage'

export const CartStackPage = () => {
	const theme = useTheme()
	const Stack = createNativeStackNavigator()

	const token = useSelector(state => state.auth.token)
	const dispatch = useDispatch()

	const stackBaseStyles = {
		headerTitleStyle: { color: theme.colors.primary },
		headerStyle: { backgroundColor: theme.colors.background },
		headerTintColor: theme.colors.primary,
	}

	return (
		<Stack.Navigator initialRouteName={'Account'}>
			<Stack.Screen
				name={'CartPage'}
				component={CartPage}
				options={({ route, navigation }) => ({
					...stackBaseStyles,
					title: 'Cart',
					headerBackButtonMenuEnabled: false,
				})}
			/>
		</Stack.Navigator>
	)
}
