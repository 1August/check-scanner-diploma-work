import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Card, Text, useTheme } from 'react-native-paper'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../App'
import { Loading } from '../Loading/Loading'
import { useSelector } from 'react-redux'
import { ErrorPage } from '../ErrorPage/ErrorPage'

export const SearchPage = ({ navigation, route }) => {
	const theme = useTheme()
	const token = useSelector(state => state.auth.token)

	const [products, setProducts] = useState([])
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	function loadProducts() {
		setLoading(true)
		setError('')

		axios.post(`${BASE_URL}/api/kaspi/search`, {
			query: route.params.searchQuery,
		}, { headers: { Authorization: token } })
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

	const handleProductPress = (product) => {
		console.log('Product pressed', product)
	}

	if (loading) {
		return <Loading/>
	}

	if (error) {
		return <ErrorPage
			message={error}
			onGoHomePress={() => navigation.popToTop()}
			navigation={navigation}
		/>
	}

	if (!products.length) {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={{ flex: 1 }}>
					<ScrollView>
						<View style={s.container}>
							<View style={s.products}>
								<Text theme={theme}>Product not fount!</Text>
							</View>
						</View>
					</ScrollView>
				</View>
			</SafeAreaView>
		)
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1 }}>
				<ScrollView>
					<View style={s.container}>
						<View style={s.products}>
							{
								products.map((product, i) => (
									<Card
										style={s.product}
										theme={theme}
										onPress={() => handleProductPress(product)}
										key={i}
									>
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
