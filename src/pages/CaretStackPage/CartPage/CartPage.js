import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

export const CartPage = ({ navigation, route }) => {
	const cart = useSelector(state => state.cart.cart)

	useEffect(() => {
		const focusHandler = navigation.addListener('focus', () => {
			console.log('Cart re-rendered')
		})

		return focusHandler
	}, [navigation])

	const s = StyleSheet.create({
		cart: {},
		cartItem: {},
	})

	return (
		<View>
			<Text>Cart page</Text>
			<View style={s.cart}>
				{
					cart.map(item => (
						<View
							key={item.id}
							style={s.cartItem}
						>
							<Text>{JSON.stringify(item)}</Text>
						</View>
					))
				}
			</View>
		</View>
	)
}
