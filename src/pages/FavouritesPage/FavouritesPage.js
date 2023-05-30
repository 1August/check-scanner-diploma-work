import { FlatList, Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Card, Divider, IconButton, Text, useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { NoDataPage } from '../NoDataPage/NoDataPage'
import { Loading } from '../Loading/Loading'
import { ErrorPage } from '../ErrorPage/ErrorPage'
import { checkFavouritesStorage, removeFromFavourites } from '../../services/favourites.service'
import { useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useSafeAreaViewStyles } from '../../hooks/useSafeAreaViewStyles'

export const FavouritesPage = ({ navigation, route }) => {
	const theme = useTheme()
	const safeAreaViewStyles = useSafeAreaViewStyles()

	const strings = useSelector(state => state.localization.strings)

	const dispatch = useDispatch()

	const favourites = useSelector(state => state.favourites.favourites)

	const loading = useSelector(state => state.favourites.loading)
	const error = useSelector(state => state.favourites.error)

	useEffect(() => {
		dispatch(checkFavouritesStorage())
	}, [])

	useFocusEffect(() => {
		navigation.setOptions({
			title: `${strings.favourites} (${favourites.length})`,
		})
	})

	function handleProductPress(product) {
		navigation.navigate('ProductPage', { product })
	}

	function removeProductFromFavourites(product) {
		dispatch(removeFromFavourites(product))
	}

	const s = StyleSheet.create({
		container: {},
		favourites: {},
		product: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',

			marginVertical: 20,
			paddingHorizontal: 16,
		},
		productImg: {
			marginRight: 16,
		},
		productImgCard: {
			width: 112,
			height: 112,
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
	})

	if (loading) return <Loading/>
	if (error) return <ErrorPage
		message={error}
		navigation={navigation}
		onGoHomePress={() => navigation.navigate('FavouritesPage')}
	/>
	if (favourites.length === 0) return <NoDataPage
		message={strings.noInformationFound}
		showRefreshButton={false}
	/>
	return (
		<View>
			<View style={s.container}>
				<View style={s.favourites}>
					<FlatList
						data={favourites}
						renderItem={({ item }) => (
							<View
								key={item.id.toString()}
								style={s.productWrapper}
							>
								<TouchableOpacity
									style={s.product}
									onPress={() => handleProductPress(item)}
								>
									<View style={s.productImg}>
										<Card
											mode={'contained'}
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
												iconColor={'red'}
												style={s.productInfoHeadIcon}
												onPress={() => removeProductFromFavourites(item)}
											/>
										</View>
										<View style={s.productInfoFooter}>
											<Text
												variant={'titleLarge'}
												style={s.productInfoFooterPrice}
											>
												{item.price} {strings.currency}
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
								<Divider/>
							</View>
						)}
					/>
				</View>
			</View>
		</View>
	)
}
