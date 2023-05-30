import { FlatList, Linking, StyleSheet, View } from 'react-native'
import { Card, useTheme } from 'react-native-paper'
import { useCallback, useEffect, useState } from 'react'
import { Loading } from '../../pages/Loading/Loading'
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage'
import { useSelector } from 'react-redux'
import { api } from '../../lib/api'

export const EffectiveSales = ({ navigation }) => {
	const theme = useTheme()
	const token = useSelector(state => state.auth.token)

	const [products, setProducts] = useState([])

	const [refreshing, setRefreshing] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [status, setStatus] = useState(null)

	useEffect(() => {
		if (error) return
		if (status === 304) return
		if (products.length > 0) return

		getEffectiveSales()
	}, [])

	const s = StyleSheet.create({
		container: {
			paddingTop: 16,
		},
		promotionSales: {},
		sales: {
			alignItems: 'stretch',

			paddingHorizontal: 16,
		},
		sale: {
			width: '48%',

			marginBottom: 16,
		},
		salesCardCover: {
			backgroundColor: theme.colors.background,
		},
	})

	function getEffectiveSales() {
		setLoading(true)
		setError('')
		setStatus(null)

		const url = '/api/supermarket/magnum/stocks/effective'
		api
			.get(url, { headers: { Authorization: token } })
			.then(res => {
				if (res.status === 503) {
					throw new Error('Service unavailable')
				}
				if (res.status === 304) {
					throw new Error('Request returned previous result')
				}
				if (res.data.data == null) return
				setProducts(res.data.data)
			})
			.catch(error => {
				setError(error)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const onRefresh = useCallback(async () => {
		setRefreshing(true)

		getEffectiveSales()
		setRefreshing(false)
	}, [])

	if (loading) return <Loading/>
	if (error) return <ErrorPage navigation={navigation} message={error} onGoHomePress={() => navigation.goBack()}/>
	return (
		<View style={s.effectiveSales}>
			<View style={s.container}>
				<View style={s.promotionSales}>
					{
						<FlatList
							contentContainerStyle={s.sales}
							columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
							numColumns={2}
							refreshing={refreshing}
							onRefresh={onRefresh}
							data={products}
							renderItem={({ item }) => (
								<View
									style={s.sale}
								>
									<Card
										key={item.id}
										mode={'elevated'}
										elevation={0}
										onPress={() => Linking.openURL(item.stockLink)}
									>
										<Card.Cover
											style={s.salesCardCover}
											source={item.stockImg}
											resizeMode={'contain'}
										/>
									</Card>
								</View>
							)}
						/>
					}
				</View>
			</View>
		</View>
	)
}
