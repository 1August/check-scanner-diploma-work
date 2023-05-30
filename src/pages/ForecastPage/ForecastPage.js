import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Divider, IconButton, List, ProgressBar, Searchbar, Text, useTheme } from 'react-native-paper'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Loading } from '../Loading/Loading'
import { ErrorPage } from '../ErrorPage/ErrorPage'
import { NoDataPage } from '../NoDataPage/NoDataPage'
import { api } from '../../lib/api'
import { BoldDivider } from '../../components/BoldDivider/BoldDivider'
import { useSafeAreaViewStyles } from '../../hooks/useSafeAreaViewStyles'

export const ForecastPage = ({ navigation }) => {
	const theme = useTheme()
	const safeAreaViewStyles = useSafeAreaViewStyles()
	const token = useSelector(state => state.auth.token)

	const strings = useSelector(state => state.localization.strings)

	const [searchQuery, setSearchQuery] = useState('')

	const [products, setProducts] = useState([])
	const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
	const [sortDirection, setSortDirection] = useState('ascending')

	const redProgressedProducts = filteredProducts.filter(product => {
		let progress = product.predictedDate.getTime() / Date.now()
		return progress < 0.9999
	})
	const orangeProgressedProducts = filteredProducts.filter(product => {
		let progress = product.predictedDate.getTime() / Date.now()
		return 0.9999 <= progress && progress < 1.0001
	})
	const greenProgressedProducts = filteredProducts.filter(product => {
		let progress = product.predictedDate.getTime() / Date.now()
		return 1.0001 <= progress
	})

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [status, setStatus] = useState(null)
	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		if (products.length > 0) return
		getForecast()
	}, [])

	function getForecast() {
		setLoading(true)
		setError('')
		setStatus(null)

		const url = '/api/user/predict'
		api
			.get(url, { headers: { Authorization: token } })
			.then(res => {
				setStatus(res.status)
				if (res.data?.data == null) return
				const predictedProducts = res.data.data.map(product => ({
					...product,
					predictedDate: new Date(product.predictedDate),
				}))
				setProducts(predictedProducts.sort(sortPredictedProducts))
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

	function sortPredictedProducts(a, b) {
		return sortDirection === 'ascending' ?
			a.predictedDate.getTime() - b.predictedDate.getTime() :
			b.predictedDate.getTime() - a.predictedDate.getTime()
	}

	function handleToggleSortDirection() {
		setSortDirection(prev => prev === 'ascending' ? 'descending' : 'ascending')
		setProducts(prev => prev.sort(sortPredictedProducts))
	}

	const onRefresh = useCallback(async () => {
		setRefreshing(true)

		getForecast()
		setRefreshing(false)
	}, [])

	const s = StyleSheet.create({
		searchbar: {
			margin: 16,
		},
		forecastPage: {},
		container: {},
		accordion: {
			borderBottomWidth: 1,
			borderColor: theme.colors.outline,
		},
		sortDirection: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		product: {
			marginBottom: 8,
		},
		predictionDate: {
			marginBottom: 16,
		},
		forecastRow: {
			marginVertical: 20,
			paddingHorizontal: 16,
		},
		forecastRowTitle: {
			marginBottom: 12,
		},
		forecastRowProgress: {
			marginBottom: 8,
		},
		forecastRowNextPurchase: {
			color: '#999',
		},
	})

	if (loading) return <Loading/>
	if (products.length === 0) return <NoDataPage
		message={strings.noInformationFound}
		onRefreshAction={getForecast}
	/>
	if (error) return <ErrorPage message={error} navigation={navigation} onGoHomePress={() => navigation.goBack()}/>
	return (
		<View style={s.forecastPage}>
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
				}
			>
				<View style={s.container}>
					<Searchbar
						theme={theme}
						value={searchQuery}
						onChangeText={setSearchQuery}
						placeholder={strings.searchByName}
						style={s.searchbar}
						clearIcon={'close'}
						loading={loading}
					/>
					<BoldDivider/>
					<View style={s.products}>
						<List.AccordionGroup>
							<List.Accordion
								title={strings.oldPurchases}
								id={1}
								titleStyle={{ color: 'red' }}
								style={s.accordion}
							>
								<View style={s.sortDirection}>
									<TouchableOpacity
										onPress={handleToggleSortDirection}
										style={s.sortDirection}
									>
										<IconButton
											icon={sortDirection === 'ascending' ? 'chevron-up' : 'chevron-down'}
										/>
										<Text>{strings.date}</Text>
									</TouchableOpacity>
								</View>
								{
									redProgressedProducts.map(product => {
										const predictedDate = product.predictedDate.toDateString()

										return (
											<View style={s.forecastRowWrapper}>
												<View style={s.forecastRow}>
													<Text
														variant={'titleMedium'}
														style={s.forecastRowTitle}
													>
														{product.name}
													</Text>
													<ProgressBar
														style={s.forecastRowProgress}
														color={'red'}
														progress={100}
													/>
													<Text
														style={s.forecastRowNextPurchase}
													>
														{strings.nextPurchase}: {predictedDate}
													</Text>
												</View>
												<Divider/>
											</View>
										)
									})
								}
							</List.Accordion>
							<List.Accordion
								title={strings.currentNeeds}
								id={2}
								titleStyle={{ color: 'orange' }}
								style={s.accordion}
							>
								<View style={s.sortDirection}>
									<TouchableOpacity
										onPress={handleToggleSortDirection}
										style={s.sortDirection}
									>
										<IconButton
											icon={sortDirection === 'ascending' ? 'chevron-up' : 'chevron-down'}
										/>
										<Text>{strings.date}</Text>
									</TouchableOpacity>
								</View>
								{
									orangeProgressedProducts.map(product => {
										const predictedDate = product.predictedDate.toDateString()

										return (
											<View style={s.forecastRowWrapper}>
												<View style={s.forecastRow}>
													<Text
														variant={'titleMedium'}
														style={s.forecastRowTitle}
													>
														{product.name}
													</Text>
													<ProgressBar
														style={s.forecastRowProgress}
														color={'orange'}
														progress={100}
													/>
													<Text
														style={s.forecastRowNextPurchase}
													>
														{strings.nextPurchase}: {predictedDate}
													</Text>
												</View>
												<Divider/>
											</View>
										)
									})
								}
							</List.Accordion>
							<List.Accordion
								title={strings.futurePurchases}
								id={3}
								titleStyle={{ color: 'limegreen' }}
								style={s.accordion}
							>
								<View style={s.sortDirection}>
									<TouchableOpacity
										onPress={handleToggleSortDirection}
										style={s.sortDirection}
									>
										<IconButton
											icon={sortDirection === 'ascending' ? 'chevron-up' : 'chevron-down'}
										/>
										<Text>{strings.date}</Text>
									</TouchableOpacity>
								</View>
								{
									greenProgressedProducts.map(product => {
										const predictedDate = product.predictedDate.toDateString()

										return (
											<View style={s.forecastRowWrapper}>
												<View style={s.forecastRow}>
													<Text
														variant={'titleMedium'}
														style={s.forecastRowTitle}
													>
														{product.name}
													</Text>
													<ProgressBar
														style={s.forecastRowProgress}
														color={'limegreen'}
														progress={100}
													/>
													<Text
														style={s.forecastRowNextPurchase}
													>
														{strings.nextPurchase}: {predictedDate}
													</Text>
												</View>
												<Divider/>
											</View>
										)
									})
								}
							</List.Accordion>
						</List.AccordionGroup>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}
