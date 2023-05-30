import { FlatList, StyleSheet, View } from 'react-native'
import { Card, useTheme } from 'react-native-paper'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ErrorPage } from '../ErrorPage/ErrorPage'
import { Loading } from '../Loading/Loading'
import { api } from '../../lib/api'
import { useSafeAreaViewStyles } from '../../hooks/useSafeAreaViewStyles'

export const MagnumDiscountsPage = ({ navigation, route }) => {
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
			getMagnumDiscounts()
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
	})

	function handleProductPress(product) {
		navigation.navigate('ProductPage', { product })
	}

	function getMagnumDiscounts() {
		setLoading(true)
		setError('')
		setStatus(null)

		const url = '/api/supermarket/magnum/catalog'
		api
			.get(url, { headers: { Authorization: token } })
			.then(res => {
				setStatus(res.status)
				if (res.data?.data == null) return
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

		getMagnumDiscounts()
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
					renderItem={({ item }) => {
						const uri = 'https://magnum.kz:1337' + item?.attributes?.image?.data?.[0]?.attributes?.url

						return (
							<Card
								key={item.id}
								style={s.product}
								mode={'elevated'}
								elevation={0}
							>
								<Card.Cover
									source={{ uri: uri.href }}
									resizeMode={'contain'}
									style={{ backgroundColor: theme.colors.background }}
								/>
								<Card.Title
									title={item?.attributes?.name}
									subtitle={`${item?.attributes?.final_price} тг`}
									titleNumberOfLines={2}
									subtitleNumberOfLines={2}
								/>
							</Card>
						)
					}}
				/>
			</View>
		</View>
	)
}
