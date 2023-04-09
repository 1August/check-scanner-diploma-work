import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Card, Searchbar, Text, useTheme } from 'react-native-paper'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../App'
import { Loading } from '../Loading/Loading'

export const SearchPage = ({ navigation, route }) => {
	const theme = useTheme()

	const [products, setProducts] = useState([])
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	function loadProducts() {
		setLoading(true)

		axios.post(`${BASE_URL}/api/supermarket/search`, {
			query: route.params.searchQuery,
		})
			.then(res => {
				setProducts(res.data.data)
			}, error => {
				console.log(error.message)
				setError(error.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	useEffect(() => {
		if (!products.length) {
			loadProducts()
		}
	}, [])


	if (loading) {
		return <Loading/>
	}

	if (error) {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={{ flex: 1 }}>
					<Text>Error. {error}</Text>
				</View>
			</SafeAreaView>
		)
	}

	if (!products.length) {
		return <Text theme={theme}>Product not fount!</Text>
	}

	const handleProductPress = (product) => {
		console.log('Product pressed', product)
	}

	const s = StyleSheet.create({
		container: {
			flex: 1,
			paddingHorizontal: 16,
			paddingTop: 16,
		},
		searchbar: {
			marginBottom: 16,
		},
		products: {
			flexWrap: 'wrap',
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		product: {
			marginBottom: 12,
			width: '48%',

			shadowColor: '#000',
			shadowOffset: {
				width: 2,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,

			elevation: 5,
		},

	})

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1 }}>
				<ScrollView>
					<View style={s.container}>
						<View style={s.products}>
							{
								products.map((product, i) => (
									<Card style={s.product} theme={theme} onPress={() => handleProductPress(product)}
										  key={i}>
										<Card.Cover
											theme={{ roundness: 1 }}
											source={{ uri: 'https://picsum.photos/700' }}
										/>
										<Card.Title title={product.name} theme={theme}/>
										{/*<Card.Content theme={theme}>*/}
										{/*	<Text theme={theme} style={{ marginBottom: 8 }}>*/}
										{/*		{product.description}*/}
										{/*	</Text>*/}
										{/*</Card.Content>*/}
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
