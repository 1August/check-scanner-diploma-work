import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomePage } from './HomePage/HomePage'
import { SupermarketPage } from './SupermarketPage/SupermarketPage'
import { ProductPage } from './ProductPage/ProductPage'

export const HomeStackPage = () => {
	const Stack = createNativeStackNavigator()

	return (
		<Stack.Navigator>
			<Stack.Screen name={'Home'} component={HomePage} options={{ headerShown: false }}/>
			<Stack.Screen name={'Supermarket'} component={SupermarketPage} options={{
				// headerTitle
			}}/>
			<Stack.Screen name={'Product'} component={ProductPage}/>
		</Stack.Navigator>
	)
}