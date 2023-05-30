import { FlatList, Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Card, IconButton, Text, useTheme } from 'react-native-paper'
import { useCallback, useEffect, useState } from 'react'
import { api } from '../../lib/api'
import { useDispatch, useSelector } from 'react-redux'
import { Loading } from '../Loading/Loading'
import { ErrorPage } from '../ErrorPage/ErrorPage'
import { addToFavourites, removeFromFavourites } from '../../services/favourites.service'
import { useFocusEffect } from '@react-navigation/native'
import { useSafeAreaViewStyles } from '../../hooks/useSafeAreaViewStyles'

export const TopProductsPage = ({ navigation, route }) => {
	const [topProductsPageVisible, setTopProductsPageVisible] = useState(false)
	const safeAreaViewStyles = useSafeAreaViewStyles()


	const theme = useTheme()
	const token = useSelector(state => state.auth.token)
	const dispatch = useDispatch()

	const favourites = useSelector(state => state.favourites.favourites)

	const [products, setProducts] = useState([])

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [status, setStatus] = useState(null)
	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		if (products.length > 0) return
		getTopProducts()
	}, [])

	useFocusEffect(() => {
		setTopProductsPageVisible(true)
		return () => setTopProductsPageVisible(false)
	})

	function handleProductPress(product) {
		navigation.navigate('ProductPage', { product })
	}

	function handleItemHeartPress(item, hasInFavourites) {
		if (hasInFavourites) {
			dispatch(removeFromFavourites(item))
			return
		}
		dispatch(addToFavourites(item))
	}

	function getTopProducts() {
		setLoading(true)
		setError('')
		setStatus(null)

		const url = `/api/kaspi/top/extended`
		api
			.get(url, { headers: { Authorization: token } })
			.then(res => {
				setStatus(res.status)
				if (res.data.data == null) return

				setProducts(res.data.data)
			})
			.catch(error => {
				setError(error.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const onRefresh = useCallback(() => {
		setRefreshing(true)

		setLoading(false)
		setError('')
		setStatus(null)

		getTopProducts()
		setRefreshing(false)
	}, [])

	const s = StyleSheet.create({
		topProductsPage: {
			// flex: 1,
		},
		container: {
			// flex: 1,
		},
		products: {
			// flex: 1,
		},
		product: {
			width: '48%',

			marginVertical: 20,
			paddingHorizontal: 16,
		},
		productImg: {
			marginBottom: 16,
		},
		productImgCard: {
			backgroundColor: theme.colors.background,
		},
		productInfo: {
			flex: 1,
		},
		productInfoHead: {
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		productInfoHeadTitleGroup: {
			width: '75%',
		},
		productInfoHeadSubtitle: {
			color: '#bbb',
		},
		productInfoHeadIcon: {},
		productInfoFooter: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		productInfoFooterPrice: {},
	})

	if (loading) return <Loading/>
	if (error) return <ErrorPage
		message={error}
		navigation={navigation}
		onGoHomePress={navigation.popToTop}
		onRefresh={getTopProducts}
	/>
	return topProductsPageVisible ? (
		<View style={s.topProductsPage}>
			<View style={s.container}>
				<FlatList
					refreshing={refreshing}
					onRefresh={onRefresh}

					style={s.products}
					numColumns={2}

					data={products}
					renderItem={({ item }) => {
						const hasInFavourites = favourites.findIndex(prod => prod.id === item.id) !== -1

						return (
							<TouchableOpacity
								key={item.id?.toString()}
								style={s.product}
								onPress={() => handleProductPress(item)}
							>
								<View style={s.productImg}>
									<Card
										mode={'elevated'}
										elevation={0}
									>
										<Card.Cover
											style={s.productImgCard}
											resizeMode={'contain'}
											source={{ uri: item.imgLink }}
										/>
									</Card>
								</View>
								<View style={s.productInfo}>
									<View style={s.productInfoHead}>
										<View
											style={s.productInfoHeadTitleGroup}
										>
											<Text
												variant={'bodySmall'}
												style={s.productInfoHeadSubtitle}
											>
												{item.id}
											</Text>
											<Text
												variant={'titleMedium'}
											>
												{item.name}
											</Text>
										</View>
										<IconButton
											icon={'heart'}
											iconColor={hasInFavourites ? 'red' : undefined}
											style={s.productInfoHeadIcon}
											onPress={() => handleItemHeartPress(item, hasInFavourites)}
										/>
									</View>
									<View style={s.productInfoFooter}>
										<Text
											variant={'titleLarge'}
											style={s.productInfoFooterPrice}
										>
											{item.price} тг
										</Text>
										<Button
											icon={'link-variant'}
											children={'Kaspi'}
											mode={'text'}
											onPress={() => Linking.openURL(item?.url)}
										/>
									</View>
								</View>
							</TouchableOpacity>
						)
					}}
				/>
			</View>
		</View>
	) : null
}
