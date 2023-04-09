import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Card, Text, useTheme } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../../../../App'
import axios from 'axios'
import { Loading } from '../../Loading/Loading'

export const SupermarketPage = ({ navigation, route }) => {
	const theme = useTheme()

	const [products, setProducts] = useState([])

	useEffect(() => {
		const id = route.params.id

		const url = `${BASE_URL}/api/supermarket/${id}/products`
		axios.get(url)
			.then(res => {
				setProducts(res.data.data)
			})
			.catch(error => {
				alert(error.message)
			})
	}, [route.params.id, route.params.name])

	const s = StyleSheet.create({
		container: {
			flex: 1,
			paddingHorizontal: 16,
			paddingTop: 16,
		},
	})

	if (!products.length) {
		return <Loading/>
	}
	return (
		<View>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={s.homePage}>
					<ScrollView>
						<View style={s.container}>
							<View style={s.products}>
								{
									products?.map(product => (
										<Card
											style={s.product} theme={theme}
											onPress={() => handleProductPress(product)}
											key={product.id}
										>
											<Card.Cover
												theme={{ roundness: 1 }}
												source={{ uri: 'https://picsum.photos/700' }}
											/>
											<Card.Title title={product.name} theme={theme}/>
											<Card.Content theme={theme}>
												<Text theme={theme} style={{ marginBottom: 8 }}>
													{product.description}
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
		</View>
	)
}
