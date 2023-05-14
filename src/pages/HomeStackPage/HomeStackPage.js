import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomePage } from './HomePage/HomePage'
import { ProductPage } from './ProductPage/ProductPage'
import { useTheme } from 'react-native-paper'
import { SearchPage } from '../SearchPage/SearchPage'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from '../../redux/slices/authSlice'
import { useEffect } from 'react'
import { SalesPage } from '../SalesPage/SalesPage'

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
		<Stack.Navigator initialRouteName={'HomePage'}>
			<Stack.Screen
				name={'HomePage'}
				component={HomePage}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name={'ProductPage'}
				component={ProductPage}
				options={({ route, navigation }) => ({
					title: route.params?.name,
					...stackBaseStyles,
				})}
			/>
			<Stack.Screen
				name={'SearchPage'}
				component={SearchPage}
				options={({ navigation, route }) => ({
					title: route.params?.searchQuery || 'Search',
					...stackBaseStyles,
				})}
			/>
			<Stack.Screen
				name={'SalesPage'}
				component={SalesPage}
				options={{
					title: 'Sales',
					...stackBaseStyles,
				}}
			/>

			{/*<Stack.Screen name={'Supermarket'} component={SupermarketPage} options={({ route, navigation }) => ({*/}
			{/*	title: route.params.name,*/}
			{/*	...stackBaseStyles,*/}
			{/*	// header: () => {*/}
			{/*	// 	return (*/}
			{/*	// 		<Appbar.Header theme={theme}>*/}
			{/*	// 			<Appbar.BackAction onPress={() => navigation.goBack()}/>*/}
			{/*	// 			<Appbar.Content title={route.params.name}/>*/}
			{/*	// 		</Appbar.Header>*/}
			{/*	// 	)*/}
			{/*	// },*/}
			{/*})}/>*/}
		</Stack.Navigator>
	)
}
