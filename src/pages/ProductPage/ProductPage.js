import { Linking, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Card, Divider, IconButton, Text, useTheme } from 'react-native-paper'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../../lib/api'
import { Loading } from '../Loading/Loading'
import { ErrorPage } from '../ErrorPage/ErrorPage'
import { addToFavourites, removeFromFavourites } from '../../services/favourites.service'
import { BoldDivider } from '../../components/BoldDivider/BoldDivider'
import { ProductPageRelatedProducts } from '../../components/ProductPageRelatedProducts/ProductPageRelatedProducts'
import { NoDataPage } from '../NoDataPage/NoDataPage'
import { useFocusEffect } from '@react-navigation/native'
import { useSafeAreaViewStyles } from '../../hooks/useSafeAreaViewStyles'

export const ProductPage = ({ navigation, route }) => {
	const theme = useTheme()
	const token = useSelector(state => state.auth.token)
	const strings = useSelector(state => state.localization.strings)

	const [product, setProduct] = useState(null)
	const toSearchString = product?.name.split(' ').slice(0, 2).join(' ')
	const dispatch = useDispatch()
	const safeAreaViewStyles = useSafeAreaViewStyles()

	const [status, setStatus] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [refreshing, setRefreshing] = useState(false)

	const favourites = useSelector(state => state.favourites.favourites)
	const hasInFavourites = favourites.findIndex(prod => prod.id === route.params.product.id) !== -1

	useFocusEffect(() => {
		navigation.setOptions({
			headerRight: () => <Button
				mode={'text'}
				icon={'link-variant'}
				onPress={() => Linking.openURL(product?.url)}
			>
				Kaspi
			</Button>,
		})
	})

	useEffect(() => {
		if (product != null && product.id === route.params.product.id) return
		getProductInfo()
	}, [route.params])

	const s = StyleSheet.create({
		container: {},
		marginBottom: {
			marginBottom: 8,
		},
		marginHorizontal: {
			marginHorizontal: 16,
		},
		productInfoHeader: {
			paddingTop: 32,
		},
		productImage: {
			paddingHorizontal: 96,

			height: 320,
			backgroundColor: theme.colors.background,
		},

		productSpecificationsWrapper: {
			paddingBottom: 16,
		},
		productSpecifications: {},
		productSpecificationsTitle: {
			padding: 16,
		},
		productPriceWrapper: {
			paddingVertical: 8,

			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		productSpecificationWrapper: {},
		productSpecification: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center',
		},
		productSpecificationText: {
			width: '80%',
		},


		productSellerWrapper: {
			paddingBottom: 16,
		},
		productSellerTitle: {
			padding: 16,
		},
		sellers: {},
		seller: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center',

			paddingVertical: 16,
		},
		sellerInfo: {},

		buttonGroup: {
			flexDirection: 'row',
			justifyContent: 'flex-end',
			alignItems: 'center',
		},
	})

	function getProductInfo() {
		setLoading(true)
		setError('')
		setStatus(null)

		const url = `/api/kaspi/productInfo?url=${route.params.product.url}`
		api
			.get(url, { headers: { Authorization: token } })
			.then(res => {
				setStatus(res.status)
				if (res.status === 401) throw new Error('Please, authorize')
				if (res.status !== 200) throw new Error('Can not get product.')
				setProduct(res.data.data)
			})
			.catch(error => {
				if (error.response?.status) {
					setStatus(error.response.status)
				}
				setError(error.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	async function handleToggleToFavouritesPress() {
		if (!hasInFavourites) {
			return dispatch(addToFavourites(product))
		}
		dispatch(removeFromFavourites(product))
	}

	const onRefresh = useCallback(() => {
		setRefreshing(true)

		getProductInfo()
		setRefreshing(false)
	}, [])

	if (loading) return <Loading/>
	if (error) return <ErrorPage message={error} navigation={navigation} onGoHomePress={() => navigation.goBack()}/>
	if (product == null) return <NoDataPage
		message={strings.noInformationFound}
		onRefreshAction={getProductInfo}
	/>
	return (
		<View style={s.statisticsPage}>
			<ScrollView
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
			>
				<View style={s.container}>
					<View style={s.product}>
						<Card>
							<Card.Cover
								source={{ uri: product?.imgLink }}
								resizeMode={'contain'}
								style={s.productImage}
							/>
						</Card>
						<View style={s.productInfoHeader}>
							<Text
								variant={'labelMedium'}
								style={[s.marginBottom, s.marginHorizontal]}
							>
								ID: {product?.id}
							</Text>
							<Text
								variant={'headlineMedium'}
								style={[s.marginBottom, s.marginHorizontal]}
							>
								{product?.name}
							</Text>
							<Divider/>
							<View style={s.productPriceWrapper}>
								<View>
									<Text
										variant={'headlineMedium'}
										style={[s.marginHorizontal]}
									>
										{product?.price} {strings.currency}
									</Text>
								</View>
								<View style={s.buttonGroup}>
									<Button
										mode={'text'}
										icon={'heart'}
										children={hasInFavourites ? strings.removeFromFavourites : strings.moveToFavourites}
										onPress={handleToggleToFavouritesPress}
									/>
								</View>
							</View>
						</View>
						<BoldDivider/>
						<View style={s.productSpecificationsWrapper}>
							<Text
								style={s.productSpecificationsTitle}
								variant={'headlineSmall'}
							>
								{strings.specifications}
							</Text>
							<View
								style={s.productSpecifications}
							>
								<Divider/>
								{
									product.shortSpecifications.map(specification => {
										const specificationItem = specification
											.split(' ')
											.map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
											.join(' ')
										return (
											<View
												key={specification}
												style={s.productSpecificationWrapper}
											>
												<View
													style={s.productSpecification}
												>
													<IconButton
														icon={'check-bold'}
													/>
													<Text
														variant={'titleMedium'}
														style={s.productSpecificationText}
													>
														{specificationItem}
													</Text>
												</View>
											</View>
										)
									})
								}
							</View>
						</View>
						<BoldDivider/>
						<View style={s.productSellerWrapper}>
							<View style={s.productSellerTitleWrapper}>
								<Text
									style={s.productSellerTitle}
									variant={'headlineSmall'}
								>
									{strings.sellers}
								</Text>
							</View>
							<Divider/>
							<View style={s.sellers}>
								{
									product.sellers.map(seller => (
										<View
											key={seller.name}
											style={s.sellerWrapper}
										>
											<View style={s.seller}>
												<IconButton
													icon={'truck-delivery'}
												/>
												<View
													style={s.sellerInfo}
												>
													<Text
														variant={'titleLarge'}
														style={s.marginBottom}
													>
														{seller.name} - {seller.price} {strings.currency}
													</Text>
													<Text
														variant={'titleMedium'}
														style={s.marginBottom}
													>
														{seller.deliveryOption}
													</Text>
													<Text>
														{seller.ratingCount}
													</Text>
												</View>
											</View>
											<Divider/>
										</View>
									))
								}
							</View>
						</View>
						<BoldDivider/>
						<ProductPageRelatedProducts productName={toSearchString} navigation={navigation} route={route}/>
						<BoldDivider/>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}
