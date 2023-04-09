import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { Card, Searchbar, Text, useTheme } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../../../../App'
import axios from 'axios'
import { Loading } from '../../Loading/Loading'

export const HomePage = ({ navigation, route }) => {
	const theme = useTheme()

	const [searchQuery, setSearchQuery] = useState('')
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)

	const s = StyleSheet.create({
		homePage: {
			flex: 1,

			backgroundColor: theme.colors.background,

			paddingTop: StatusBar.currentHeight,
			paddingBottom: 16,
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

	// const markets = [
	// 	{
	// 		id: 1,
	// 		name: 'Small',
	// 		description: 'Lorem ipsum dolor sit amet.',
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Galmart',
	// 		description: 'Lorem ipsum dolor sit amet.',
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'Magnum',
	// 		description: 'Lorem ipsum dolor sit amet.',
	// 	},
	// ]

	const handleSearch = () => {
		navigation.navigate('SearchPage', { searchQuery })
	}

	// const handleMarketPress = (market) => {
	// 	navigation.navigate('Supermarket', {
	// 		id: market.id,
	// 		name: market.name,
	// 	})
	// }

	const handleProductPress = (product) => {
		console.log(`Clicked product ${product.id}`)

		navigation.navigate('Product', { ...product })
	}

	useEffect(() => {
		if (!products.length) {
			setLoading(true)
			const url = `${BASE_URL}/api/data/top`

			axios.get(url, {
					headers: {
						'Cache-Control': 'no-cache',
						Pragma: 'no-cache',
						Expires: '0',
					},
				})
				.then(res => {
					setProducts(res.data.data || [])
				})
				.finally(() => {
					setLoading(false)
				})
		}
	}, [products])

	if (loading) return <Loading/>
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={s.homePage}>
				<ScrollView>
					<View style={s.container}>
						<Searchbar
							value={searchQuery} onChangeText={setSearchQuery}
							placeholder={'Search here'}
							onSubmitEditing={handleSearch}
							style={s.searchbar} clearIcon={'close'} theme={theme}
						/>
						{/*<View style={s.markets}>*/}
						{/*{*/}
						{/*	markets.map(market => (*/}
						{/*		<Card*/}
						{/*			theme={theme} mode={'elevated'} onPress={() => handleMarketPress(market)}*/}
						{/*			key={market.id} style={s.market}*/}
						{/*		>*/}
						{/*			<Card.Title*/}
						{/*				theme={theme} title={market.name} subtitle={market.description}*/}
						{/*				right={() => <Button icon={'chevron-right'}/>}*/}
						{/*				subtitleNumberOfLines={1}*/}
						{/*			/>*/}
						{/*		</Card>*/}
						{/*	))*/}
						{/*}*/}
						{/*</View>*/}
						<View style={s.products}>
							{
								products?.map(product => (
									<Card
										key={product.id}
										style={s.product} theme={theme} onPress={() => handleProductPress(product)}
									>
										<Card.Cover
											theme={{ roundness: 1 }}
											source={{ uri: 'https://picsum.photos/700' }}
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
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}
