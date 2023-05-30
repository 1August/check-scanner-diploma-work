import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Divider, IconButton, Text, useTheme } from 'react-native-paper'
import { useCallback, useEffect, useState } from 'react'
import { ServiceUnavailableErrorPage } from '../../pages/ServiceUnavailableErrorPage/ServiceUnavailableErrorPage'
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage'
import { api } from '../../lib/api'
import { Loading } from '../../pages/Loading/Loading'
import { NoDataPage } from '../../pages/NoDataPage/NoDataPage'
import { useSelector } from 'react-redux'

export const HomePagePersonalizedProducts = ({ navigation, route }) => {
	const token = useSelector(state => state.auth.token)
	const strings = useSelector(state => state.localization.strings)

	const [lastCheque, setLastCheque] = useState(null)

	const [status, setStatus] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		if (error) return
		if (lastCheque != null) return
		if (token == null) return
		getLastChequeProducts()
	}, [token])

	function handleGoHomePress() {
		setError('')
		getLastChequeProducts()
	}

	function getLastChequeProducts() {
		setLoading(true)
		setError('')
		setStatus(null)

		const url = '/api/user/cheques/last'
		api
			.get(url, { headers: { Authorization: token } })
			.then(res => {
				setStatus(res.status)
				if (res.data.data == null) return
				setLastCheque(res.data.data)
			})
			.catch(error => {
				setStatus(error.response?.status)
				setError(error.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	function handleProductSearch(product) {
		navigation.navigate('SearchPage', { searchQuery: product.name })
	}

	const onRefresh = useCallback(() => {
		setRefreshing(true)

		getLastChequeProducts()
		setRefreshing(false)
	}, [])

	const s = StyleSheet.create({
		personalizedProductsWrapper: {
			paddingBottom: 16,
		},
		personalizedProducts: {},
		personalizedProductsTitleWrapper: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center',

			padding: 8,
		},
		personalizedProductsTitle: {},
		products: {},
		productWrapper: {},
		product: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',

			paddingLeft: 16,
			paddingRight: 8,
			paddingVertical: 8,
		},
		productName: {
			width: '70%',
		},
	})

	if (loading) return <Loading/>
	if (status === 503) return <ServiceUnavailableErrorPage navigation={navigation}/>
	if (lastCheque == null) return <NoDataPage
		message={strings.noInformationFound}
		onRefreshAction={getLastChequeProducts}
	/>
	if (error) return <ErrorPage
		navigation={navigation}
		message={error}
		onGoHomePress={handleGoHomePress}
		onRefresh={getLastChequeProducts}
	/>
	return (
		<ScrollView
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
			}
			style={s.personalizedProductsWrapper}
		>
			<View style={s.container}>
				<View style={s.personalizedProducts}>
					<View style={s.personalizedProductsTitleWrapper}>
						<IconButton icon={'account-details'}/>
						<Text
							style={s.personalizedProductsTitle}
							variant={'headlineMedium'}
						>
							{strings.offersForYou}
						</Text>
					</View>
					<View style={s.products}>
						{
							lastCheque.chequeRows.map(product => (
								<TouchableOpacity
									key={product.name}
									onPress={() => handleProductSearch(product)}
									style={s.productWrapper}
								>
									<View style={s.product}>
										<Text style={s.productName}>{product.name}</Text>
										<IconButton icon={'chevron-right'}/>
									</View>
									<Divider/>
								</TouchableOpacity>
							))
						}
					</View>
				</View>
			</View>
		</ScrollView>
	)
}
