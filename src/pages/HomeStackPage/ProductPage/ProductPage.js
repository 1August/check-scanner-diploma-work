import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Card, Text, useTheme } from 'react-native-paper'
import { useEffect, useRef, useState } from 'react'
import { BASE_URL } from '../../../../App'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../../../lib/api'
import { addToCart, removeFromCart } from '../../../redux/slices/cartSlice'
import { Loading } from '../../Loading/Loading'

export const ProductPage = ({ navigation, route }) => {
	const theme = useTheme()
	const token = useSelector(state => state.auth.token)
	const [product, setProduct] = useState(null)
	const dispatch = useDispatch()

	// const controller = useRef(new AbortController())
	const [loading, setLoading] = useState(false)

	const cart = useSelector(state => state.cart.cart)
	const hasInCart = cart.findIndex(prod => prod.id === route.params.product.id) !== -1

	useEffect(() => {
		setLoading(true)
		const url = `${BASE_URL}/api/kaspi/productInfo?url=${route.params.product.url}`

		// TODO: Save this product in hash to load faster

		api
			.get(url, {
				headers: {
					Authorization: token,
				},
				// signal: controller.current.signal
			})
			.then(res => {
				console.log({ res: res.data.data })
				setProduct(res.data.data)
			})
			.catch(error => {
				alert(error.message)
			})
			.finally(() => {
				setLoading(false)
			})

		return () => {
			// controller.current.abort()
		}
	}, [route.params.product])

	const s = StyleSheet.create({
		container : {

		}
	})

	async function handleToggleToCartPress() {
		if (!hasInCart){
			return dispatch(addToCart(route.params.product))
		}
		dispatch(removeFromCart(route.params.product))
	}

	if (loading) return <Loading/>
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={s.statisticsPage}>
				<ScrollView>
					<View style={s.container}>
						<Button
							icon={hasInCart ? 'cart-remove' : 'cart-plus'}
							children={hasInCart ? 'Remove from cart' : 'Move to cart'}
							mode={'outlined'}
							onPress={handleToggleToCartPress}
						/>
						<Card>
							<Card.Cover
								theme={{ roundness: 1 }}
								source={{ uri: product?.imgLink || 'https://picsum.photos/700' }}
								style={{
									height: 128,
									width: '100%',

									flex: 1,
									justifySelf: 'center',
									alignSelf: 'center',
								}}
							/>
							<Card.Title title={product?.name} theme={theme}/>
						</Card>
						<Text>{JSON.stringify(product)}</Text>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}
