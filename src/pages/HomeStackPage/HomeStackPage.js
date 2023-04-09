import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomePage } from './HomePage/HomePage'
import { SupermarketPage } from './SupermarketPage/SupermarketPage'
import { ProductPage } from './ProductPage/ProductPage'
import { useTheme } from 'react-native-paper'
import { SearchPage } from '../SearchPage/SearchPage'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth, logout, loginSuccess } from '../../redux/slices/authSlice'
import { useEffect } from 'react'

export const HomeStackPage = () => {
	const theme = useTheme()

	const dispatch = useDispatch()
	const token = useSelector(state => state.auth.token)

	useEffect(() => {
		dispatch(checkAuth())
	}, [])

	const Stack = createNativeStackNavigator()

	const stackBaseStyles = {
		headerTitleStyle: { color: theme.colors.primary },
		headerStyle: { backgroundColor: theme.colors.background },
		headerTintColor: theme.colors.primary,
	}

	return (
		<Stack.Navigator>
			<Stack.Screen name={'Home'} component={HomePage} options={{
				headerShown: false,
			}}/>
			<Stack.Screen name={'Supermarket'} component={SupermarketPage} options={({ route, navigation }) => ({
				title: route.params.name,
				...stackBaseStyles,
				// header: () => {
				// 	return (
				// 		<Appbar.Header theme={theme}>
				// 			<Appbar.BackAction onPress={() => navigation.goBack()}/>
				// 			<Appbar.Content title={route.params.name}/>
				// 		</Appbar.Header>
				// 	)
				// },
			})}/>
			<Stack.Screen name={'Product'} component={ProductPage} options={({ route, navigation }) => ({
				title: route.params.name,
				...stackBaseStyles,
			})}/>
			<Stack.Screen
				name={'SearchPage'} component={SearchPage} options={({ navigation, route }) => ({
				title: route.params?.searchQuery || 'Search',
				...stackBaseStyles,
			})}
			/>
		</Stack.Navigator>
	)
}
