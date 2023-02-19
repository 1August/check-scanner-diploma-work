import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomePage } from './HomePage/HomePage'
import { SupermarketPage } from './SupermarketPage/SupermarketPage'
import { ProductPage } from './ProductPage/ProductPage'
import { Appbar, useTheme } from 'react-native-paper'

export const HomeStackPage = () => {
	const theme = useTheme()

	const Stack = createNativeStackNavigator()

	const stackBaseStyles = {
		headerTitleStyle: { color: theme.colors.primary },
		headerStyle: { backgroundColor: theme.colors.background },
		headerTintColor: theme.colors.primary
	}

	return (
		<Stack.Navigator>
			<Stack.Screen name={'Home'} component={HomePage} options={{
				headerShown: false
			}}/>
			<Stack.Screen name={'Supermarket'} component={SupermarketPage} options={({ route, navigation }) => ({
				title: route.params.name,
				...stackBaseStyles,
				header: () => {
					return(
						<Appbar.Header theme={theme}>
							<Appbar.BackAction onPress={() => navigation.goBack()}/>
							<Appbar.Content title={route.params.name}/>
						</Appbar.Header>
					)
				}
			})}/>
			<Stack.Screen name={'Product'} component={ProductPage} options={({ route, navigation }) => ({
				title: route.params.name,
				...stackBaseStyles,
				header: () => {
					return(
						<Appbar.Header theme={theme}>
							<Appbar.BackAction onPress={() => navigation.goBack()}/>
							<Appbar.Content title={route.params.name}/>
						</Appbar.Header>
					)
				}
			})}/>
		</Stack.Navigator>
	)
}