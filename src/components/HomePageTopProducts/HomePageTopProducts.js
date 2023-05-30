import { StyleSheet, View } from 'react-native'
import { Button, Card, IconButton, Text, useTheme } from 'react-native-paper'
import { Loading } from '../../pages/Loading/Loading'
import { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import { useSelector } from 'react-redux'
import { ServiceUnavailableErrorPage } from '../../pages/ServiceUnavailableErrorPage/ServiceUnavailableErrorPage'
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage'
import { NoDataPage } from '../../pages/NoDataPage/NoDataPage'

export const HomePageTopProducts = ({ navigation, route }) => {
	const theme = useTheme()
	const token = useSelector(state => state.auth.token)
	const strings = useSelector(state => state.localization.strings)

	const [products, setProducts] = useState([])

	const [status, setStatus] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		if (error) return
		if (products.length) return
		getTopProducts()
	}, [products])

	const handleProductPress = (product) => {
		navigation.navigate('ProductPage', { product })
	}

	const getTopProducts = () => {
		setLoading(true)
		setError('')
		setStatus(null)

		const url = '/api/kaspi/top'
		api
			.get(url, { headers: { Authorization: token } })
			.then(res => {
				if (res.status == null) return
				setStatus(res.status)
				if (!res.data.data) return
				setProducts(res.data.data)
			})
			.catch(error => {
				setStatus(error.response?.status)
				setError(error.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	function handleGoHomePress() {
		setError('')
		getTopProducts()
	}

	const s = StyleSheet.create({
		productsWrapper: {
			marginTop: 8,
		},
		topProductsWrapper: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',

			paddingHorizontal: 8,
		},
		topProductsTitleWrapper: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		products: {
			paddingHorizontal: 16,
			marginTop: 16,

			flexWrap: 'wrap',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'stretch',
		},
		product: {
			marginBottom: 16,
			width: '48%',
		},
	})

	if (loading) return <Loading/>
	if (status === 503) return <ServiceUnavailableErrorPage navigation={navigation}/>
	if (error) return <ErrorPage
		navigation={navigation}
		message={error}
		onGoHomePress={handleGoHomePress}
		onRefresh={getTopProducts}
	/>
	if (products.length === 0) return <NoDataPage
		message={strings.noInformationFound}
		onRefreshAction={getTopProducts}
	/>
	return (
		<View style={s.productsWrapper}>
			<View style={s.topProductsWrapper}>
				<View style={s.topProductsTitleWrapper}>
					<IconButton icon={'shopping'}/>
					<Text variant={'headlineMedium'}>{strings.topProducts}</Text>
				</View>
				<Button
					mode={'text'}
					onPress={() => navigation.navigate('TopProductsPage')}
				>
					{strings.viewAll}
				</Button>
			</View>
			<View style={s.products}>
				{
					loading ?
						<Loading/> :
						products.map(product => (
							<Card
								key={product.id || product.name}
								style={s.product}
								theme={theme}
								onPress={() => handleProductPress(product)}
								mode={'elevated'}
								elevation={0}
							>
								<Card.Cover
									source={{ uri: product?.imgLink }}
									resizeMode={'contain'}
									style={{ height: 192, backgroundColor: theme.colors.background }}
								/>
								<Card.Title
									theme={theme}
									title={product.name}
									subtitle={`${product.price} ${strings.currency}`}
									titleNumberOfLines={2}
									subtitleNumberOfLines={2}
								/>
							</Card>
						))
				}
			</View>
		</View>
	)
}
