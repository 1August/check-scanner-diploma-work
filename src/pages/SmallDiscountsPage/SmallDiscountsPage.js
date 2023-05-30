import { FlatList, StyleSheet, View } from 'react-native'
import { Card, Text, useTheme } from 'react-native-paper'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ErrorPage } from '../ErrorPage/ErrorPage'
import { Loading } from '../Loading/Loading'
import { api } from '../../lib/api'
import { useSafeAreaViewStyles } from '../../hooks/useSafeAreaViewStyles'

export const SmallDiscountsPage = ({ navigation, route }) => {
	const theme = useTheme()
	const token = useSelector(state => state.auth.token)
	const safeAreaViewStyles = useSafeAreaViewStyles()

	const [products, setProducts] = useState([])

	const [refreshing, setRefreshing] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [status, setStatus] = useState(null)

	useEffect(() => {
		if (error) return
		if (status === 304) return
		if (products.length === 0) {
			getSmallDiscounts()
		}
	}, [])

	const s = StyleSheet.create({
		discounts: {
			flex: 1,
		},
		container: {},
		products: {
			paddingTop: 16,
		},
		discountsRow: {
			justifyContent: 'space-between',
			paddingHorizontal: 16,
		},
		product: {
			flex: 1,
			marginBottom: 16,
		},
		oldPrice: {
			color: theme.colors.outline,
			textDecorationLine: 'line-through',
		},
	})

	function handleProductPress(product) {
		navigation.navigate('ProductPage', { product })
	}

	function getSmallDiscounts() {
		setLoading(true)
		setError('')
		setStatus(null)

		const url = '/api/supermarket/small/catalog'
		api
			.get(url, { headers: { Authorization: token } })
			.then(res => {
				setStatus(res.status)
				if (res.data.data == null) return
				if (res.status !== 200) throw new Error('Error on getting catalog')

				setProducts(res.data.data)
			})
			.catch(error => {
				setError(error.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const onRefresh = useCallback(async () => {
		setRefreshing(true)

		getSmallDiscounts()
		setRefreshing(false)
	}, [])

	if (loading) return <Loading/>
	if (error) return <ErrorPage navigation={navigation} message={error} onGoHomePress={() => navigation.goBack()}/>
	return (
		<View style={s.discounts}>
			<View style={s.container}>
				<FlatList
					refreshing={refreshing}
					onRefresh={onRefresh}

					style={s.products}
					contentContainerStyle={s.discountsRow}
					numColumns={2}

					data={products}
					renderItem={({ item }) => (
						<Card
							key={item.name}
							style={s.product}
							mode={'elevated'}
							elevation={0}
						>
							<Card.Cover
								source={{ uri: item.imgLink }}
								resizeMode={'contain'}
								style={{ backgroundColor: theme.colors.background }}
							/>
							<Card.Title
								title={item.name}
								titleNumberOfLines={2}
								subtitleNumberOfLines={2}
							/>
							<Card.Content>
								<View>
									<Text style={s.oldPrice}>
										{item.oldPrice} тг
									</Text>
									<Text
										variant={'titleLarge'}
									>
										{item.price} тг
									</Text>
									<Text>
										{item.date}
									</Text>
								</View>
							</Card.Content>
						</Card>
					)}
				/>
			</View>
		</View>
	)
}
