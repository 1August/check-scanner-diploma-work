import { ScrollView, StyleSheet, View } from 'react-native'
import { Card, useTheme } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { NoDataPage } from '../../pages/NoDataPage/NoDataPage'
import { api } from '../../lib/api'
import { useSelector } from 'react-redux'
import { Loading } from '../../pages/Loading/Loading'
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage'

export const ProductPageRelatedProducts = ({ navigation, route, productName }) => {
	const theme = useTheme()
	const strings = useSelector(state => state.localization.strings)

	const token = useSelector(state => state.auth.token)

	const [foundProducts, setFoundProducts] = useState([])

	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [status, setStatus] = useState(null)

	useEffect(() => {
		if (foundProducts.length > 0) return

		searchProducts()
	}, [])

	function searchProducts() {
		setLoading(true)
		setError('')
		setStatus(null)

		const url = '/api/kaspi/search'
		api
			.post(url, { query: productName }, { headers: { Authorization: token } })
			.then(res => {
				setStatus(res.status)
				if (res.status !== 200) throw new Error('Error with search')
				if (res.data.data == null) return
				setFoundProducts(res.data.data)
			}, error => {
				setError(error.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const handleProductPress = (product) => {
		navigation.navigate('ProductPage', { product })
	}

	const s = StyleSheet.create({
		relatedProductsWrapper: {},
		realtedProducts: {},
		products: {
			padding: 16,
		},
		product: {
			width: 256,
			marginRight: 16,
		},
		productCardCover: {
			height: 144,
			backgroundColor: theme.colors.background,
		},
	})

	if (loading) return <Loading/>
	if (error) return <ErrorPage
		message={error}
		onGoHomePress={navigation.popToTop}
		navigation={navigation}
	/>
	if (foundProducts.length === 0) return <NoDataPage
		onRefreshAction={searchProducts}
		message={strings.noInformationFound}
	/>
	return (
		<View style={s.relatedProductsWrapper}>
			<View style={s.realtedProducts}>
				<ScrollView
					horizontal
					style={s.products}
				>
					{
						foundProducts.map(product => (
							<Card
								key={product.id || product.name}
								style={s.product}
								onPress={() => handleProductPress(product)}
								mode={'elevated'}
								elevation={0}
							>
								<Card.Cover
									source={{ uri: product?.imgLink }}
									resizeMode={'contain'}
									style={s.productCardCover}
								/>
								<Card.Title
									theme={theme}
									title={product.name}
									subtitle={`${product.price} тг`}
									titleNumberOfLines={2}
									subtitleNumberOfLines={2}
								/>
							</Card>
						))
					}
				</ScrollView>
			</View>
		</View>
	)
}
