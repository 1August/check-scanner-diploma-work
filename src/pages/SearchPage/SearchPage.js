import { FlatList, Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Card, IconButton, Searchbar, Text, useTheme } from 'react-native-paper'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorPage } from '../ErrorPage/ErrorPage'
import { NoDataPage } from '../NoDataPage/NoDataPage'
import { addToFavourites, removeFromFavourites } from '../../services/favourites.service'
import { Loading } from '../Loading/Loading'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '../../lib/api'
import { useSafeAreaViewStyles } from '../../hooks/useSafeAreaViewStyles'

export const SearchPage = ({ navigation, route }) => {
	const theme = useTheme()
	const safeAreaViewStyles = useSafeAreaViewStyles()
	const strings = useSelector(state => state.localization.strings)

	const token = useSelector(state => state.auth.token)
	const favourites = useSelector(state => state.favourites.favourites)

	const [searchQuery, setSearchQuery] = useState(route.params.searchQuery)

	const dispatch = useDispatch()

	const [products, setProducts] = useState([])

	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [status, setStatus] = useState(null)
	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		if (!products.length) {
			loadProducts()
		}
	}, [])

	useFocusEffect(() => {
		navigation.setOptions({
			headerTitle: (...props) => <View
				style={{
					width: '80%',
				}}
			>
				<Searchbar
					inputStyle={{
						height: 32,
						lineHeight: 32,
						minHeight: 32,
					}}
					placeholder={'Search'}
					value={searchQuery.toString()}
					onChangeText={setSearchQuery}
					style={{
						height: 32,
						lineHeight: 32,
						minHeight: 32,
					}}
					onSubmitEditing={() => navigation.push('SearchPage', { searchQuery })}
				/>
			</View>,
		})
	})

	const s = StyleSheet.create({
		container: {
			flex: 1,
		},
		products: {},
		// productWrapper: {},
		product: {
			// flexDirection: 'row',
			// justifyContent: 'space-between',
			// alignItems: 'center',

			width: '48%',

			marginVertical: 20,
			paddingHorizontal: 16,
		},
		productImg: {
			// 	marginRight: 16,
			marginBottom: 16,
		},
		productImgCard: {
			// width: 112,
			// height: 112,
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

	function handleProductPress(product) {
		navigation.navigate('ProductPage', { product })
	}

	function loadProducts() {
		setLoading(true)
		setError('')
		setStatus(null)

		const url = '/api/kaspi/search'
		api
			.post(url, { query: route.params.searchQuery }, { headers: { Authorization: token } })
			.then(res => {
				setStatus(res.status)
				if (res.status !== 200) throw new Error('Error with search')
				if (res.data.data == null) return
				setProducts(res.data.data)
			}, error => {
				setError(error.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	function handleItemHeartPress(item, hasInFavourites) {
		if (hasInFavourites) {
			dispatch(removeFromFavourites(item))
			return
		}
		dispatch(addToFavourites(item))
	}

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		loadProducts()
		setRefreshing(false)
	}, [])

	if (loading) return <Loading/>
	if (error) return <ErrorPage
		message={error}
		onGoHomePress={navigation.popToTop}
		navigation={navigation}
	/>
	if (products.length === 0) return <NoDataPage
		message={strings.noInformationFound}
		onRefreshAction={() => loadProducts()}
	/>
	return (
		<View style={{ flex: 1 }}>
			<View style={s.container}>
				<View style={s.products}>
					<FlatList
						refreshing={refreshing}
						onRefresh={onRefresh}
						data={products}
						numColumns={2}
						renderItem={({ item }) => {
							const hasInFavourites = favourites.findIndex(prod => prod.id === item.id) !== -1

							return (
								<TouchableOpacity
									key={item.id.toString()}
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
												source={{ uri: item?.imgLink }}
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
		</View>
	)
}
