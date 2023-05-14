import { RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { Card, Divider, Searchbar, Text, useTheme } from 'react-native-paper'
import { useCallback, useEffect, useState } from 'react'
import { BASE_URL } from '../../../../App'
import axios from 'axios'
import { Loading } from '../../Loading/Loading'
import { ErrorPage } from '../../ErrorPage/ErrorPage'
import { HomePageServices } from '../../../components/HomePageServices/HomePageServices'

export const HomePage = ({ navigation, route }) => {
	const theme = useTheme()

	const [searchQuery, setSearchQuery] = useState('')
	const [products, setProducts] = useState([])
	// const controller = useRef(new AbortController())

	const [status, setStatus] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		const handler = navigation.addListener('focus', () => {
			console.log('Home page updated')
		})

		return () => {
			handler()
			setRefreshing(false)
			// controller.current.abort()
		}
	}, [])

	const s = StyleSheet.create({
		homePage: {
			flex: 1,

			backgroundColor: theme.colors.background,

			paddingTop: StatusBar.currentHeight,
			// paddingBottom: 16,
		},
		container: {
			flex: 1,
			paddingHorizontal: 16,
			paddingTop: 16,
		},
		header1: {
			fontSize: 16,
			color: theme.colors.primary,
		},
		header2: {
			fontSize: 14,
			color: theme.colors.primary,
		},
		header3: {
			fontSize: 12,
			color: theme.colors.primary,
		},
		text: {
			color: theme.colors.primary,
		},

		searchbar: {
			marginBottom: 16,
		},
		markets: {},
		market: {
			marginBottom: 8,
		},
		marketText: {},
		marketIcon: {},
		productsWrapper: {
			marginTop: 16
		},
		products: {
			marginTop: 16,

			flexWrap: 'wrap',
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		product: {
			marginBottom: 12,
			width: '48%',

			// backgroundColor: '#fff',
			// borderRadius: theme.roundness,


			shadowColor: '#000',
			shadowOffset: {
				width: 2,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,

			elevation: 5,
		},
		productImage: {
			borderRadius: 0,
		},
	})

	const handleSearch = () => {
		navigation.navigate('SearchPage', { searchQuery })
	}

	const handleProductPress = (product) => {
		navigation.navigate('ProductPage', { product })
	}

	const getTopProducts = async () => {
		setLoading(true)

		const url = `${BASE_URL}/api/data/top`
		return axios.get(url, {
			headers: {
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				Expires: '0',
			},
			// signal: controller.current.signal
		})
			.then(res => {
				setStatus(res.status)
				// console.log('RES------------------', res.data)

				setProducts(res.data.data || [])
			})
			.catch(error => {
				setError(error?.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const onRefresh = useCallback(async () => {
		setRefreshing(true)
		setSearchQuery('')

		await getTopProducts()
		setRefreshing(false)
	}, [])

	useEffect(() => {
		if (loading) return
		if (error) return
		if (products.length) return
		if ([200, 201].includes(status)) return;
		getTopProducts()
	}, [products])

	function handleGoHomePress () {
		setError('')
		getTopProducts()
	}

	if (error) return <ErrorPage navigation={navigation} message={error} onGoHomePress={handleGoHomePress}/>
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={s.homePage}>
				<ScrollView
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
					}
				>
					<View style={s.container}>
						<Searchbar
							value={searchQuery} onChangeText={setSearchQuery}
							placeholder={'Search here'}
							onSubmitEditing={handleSearch}
							style={s.searchbar} clearIcon={'close'} theme={theme}
						/>
						<HomePageServices
							navigation={navigation}
							route={route}
						/>
						<Divider/>
						<View style={s.productsWrapper}>
							<Text
								variant={'headlineLarge'}
							>
								Top products
							</Text>
							<View style={s.products}>
								{
									loading ?
										<Loading/> :
										products.map(product => (
											<Card
												key={product.id}
												style={s.product} theme={theme} onPress={() => handleProductPress(product)}
											>
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
												<Card.Title title={product.name} theme={theme}/>
												<Card.Content theme={theme}>
													<Text theme={theme} style={{ marginBottom: 8 }}>
														{product.price}
													</Text>
												</Card.Content>
											</Card>
										))
								}
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}


{/*<View style={s.markets}>*/
}
{/*{*/
}
{/*	markets.map(market => (*/
}
{/*		<Card*/
}
{/*			theme={theme} mode={'elevated'} onPress={() => handleMarketPress(market)}*/
}
{/*			key={market.id} style={s.market}*/
}
{/*		>*/
}
{/*			<Card.Title*/
}
{/*				theme={theme} title={market.name} subtitle={market.description}*/
}
{/*				right={() => <Button icon={'chevron-right'}/>}*/
}
{/*				subtitleNumberOfLines={1}*/
}
{/*			/>*/
}
{/*		</Card>*/
}
{/*	))*/
}
{/*}*/
}
{/*</View>*/
}
