import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Divider, IconButton, Text, useTheme } from 'react-native-paper'
import { useCallback, useEffect, useState } from 'react'
import { api } from '../../lib/api'
import { useSelector } from 'react-redux'
import { NoDataPage } from '../NoDataPage/NoDataPage'
import { Loading } from '../Loading/Loading'
import { ErrorPage } from '../ErrorPage/ErrorPage'
import { Chart, HorizontalAxis, Line, Tooltip, VerticalAxis } from 'react-native-responsive-linechart'
import { BoldDivider } from '../../components/BoldDivider/BoldDivider'
import { useSafeAreaViewStyles } from '../../hooks/useSafeAreaViewStyles'

export const ChartPage = ({ navigation, route }) => {
	const theme = useTheme()
	const token = useSelector(state => state.auth.token)
	const safeAreaViewStyles = useSafeAreaViewStyles()

	const strings = useSelector(state => state.localization.strings)

	const [dateToTotal, setDateToTotal] = useState([])
	const XAxis = dateToTotal.length > 0 && dateToTotal.reduce((X, cord) => [Math.min(cord.x, X[0]), Math.max(cord.x, X[1])], [dateToTotal[0].x, dateToTotal[0].x])
	const YAxis = dateToTotal.length > 0 && dateToTotal.reduce((Y, cord) => [Math.min(cord.y, Y[0]), Math.max(cord.y, Y[1])], [dateToTotal[0].y, dateToTotal[0].y])

	const [midEachProduct, setMidEachProduct] = useState([])

	const [sortDirection, setSortDirection] = useState('ascending')

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [status, setStatus] = useState(null)
	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		if (error) return
		if (dateToTotal.length > 0) return

		getUserCheques()
	}, [])

	function transformDateToTotal(cheques) {
		return cheques.reduce((data, cheque) => {
			const date = new Date(cheque.date).getTime()
			const total = Math.round(cheque.total)

			return [...data, { x: date, y: total }]
		}, [])
	}

	function transformMidEachProduct(cheques) {
		return cheques.reduce((data, cheque) => {
			const productsAndPrices = cheque.chequeRows.map(product => ({ name: product.name, cost: product.cost }))

			return [...data, ...productsAndPrices]
		}, [])
	}

	function getUserCheques() {
		setLoading(true)
		setError('')
		setStatus(null)

		const url = '/api/user/cheques'
		api
			.get(url, { headers: { Authorization: token } })
			.then(res => {
				setStatus(res.status)
				if (!res.data.data) return

				const dateToTotal = transformDateToTotal(res.data.data)
				const midEachProduct = transformMidEachProduct(res.data.data)

				setDateToTotal(dateToTotal)
				setMidEachProduct(midEachProduct.sort(sortProductName))
			})
			.catch(error => {
				setError(error.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	function sortProductName(a, b) {
		return sortDirection === 'ascending' ?
			String(a.name).localeCompare(b.name) :
			String(b.name).localeCompare(a.name)
	}

	function toggleSortDirection() {
		setSortDirection(prev => prev === 'ascending' ? 'descending' : 'ascending')
		setMidEachProduct(prev => prev.sort(sortProductName))
	}

	const onRefresh = useCallback(() => {
		setRefreshing(true)

		getUserCheques()
		setRefreshing(false)
	}, [])

	const s = StyleSheet.create({
		container: {},
		chartContainer: {
			marginBottom: 32,
		},
		chartTitle: {
			paddingHorizontal: 16,
			marginTop: 16,
		},
		dateToTotal: {},
		midEachProductWrapper: {},
		midEachProductHeader: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		midEachProductHeaderProductName: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center',

			width: '75%',
		},
		midEachProductHeaderCost: {
			paddingRight: 16,

			width: '25%',
			textAlign: 'right',
		},
		midEachProductRow: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',

			paddingHorizontal: 16,
			paddingVertical: 6,
		},
		midEachProductProductName: {
			width: '75%',
		},
		midEachProductProductCost: {
			width: '25%',
			textAlign: 'right',
		},
	})

	if (loading) return <Loading/>
	if (error) return <ErrorPage
		onRefresh={getUserCheques}
		navigation={navigation}
		message={error}
		onGoHomePress={navigation.popToTop}
	/>
	if (dateToTotal.length === 0) return <NoDataPage
		message={strings.noInformationFound}
		onRefreshAction={getUserCheques}
	/>
	return (
		<View>
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
				}
			>
				<View style={s.container}>
					<View style={[s.dateToTotalWrapper, s.chartContainer]}>
						<Text
							variant={'titleLarge'}
							style={s.chartTitle}
						>
							{strings.purchaseDatePerTotalPrice}
						</Text>
						<ScrollView
							style={s.dateToTotal}
							horizontal={true}
						>
							<Chart
								style={{ height: 24 * dateToTotal.length, width: 64 * dateToTotal.length }}
								data={dateToTotal}
								xDomain={{ min: XAxis[0], max: XAxis[1] }}
								yDomain={{ min: 0, max: YAxis[1] }}
								padding={{ left: 64, bottom: 24, right: 64, top: 24 }}
							>
								<VerticalAxis
									tickCount={10}
									theme={{
										labels: {
											formatter: n => n.toFixed(0) + ` ${strings.currency}`,
											label: {
												color: theme.colors.onBackground,
											},
										},
									}}
								/>
								<HorizontalAxis
									tickCount={10}
									theme={{
										labels: {
											formatter: n => new Date(n).toDateString(),
											label: {
												color: theme.colors.onBackground,
											},
										},
									}}
								/>
								{/*<Area*/}
								{/*	theme={{*/}
								{/*		gradient: {*/}
								{/*			from: { color: theme.colors.secondaryContainer },*/}
								{/*			to: { color: theme.colors.secondaryContainer, opacity: 0.4 },*/}
								{/*		},*/}
								{/*	}}*/}
								{/*/>*/}
								<Line
									tooltipComponent={<Tooltip/>}
									theme={{
										stroke: {
											color: theme.colors.primary, width: 0,
										},
										scatter: { default: { width: 5, height: 5, rx: 5 } },
									}}
								/>
							</Chart>
						</ScrollView>
					</View>
					<BoldDivider/>
					<View style={s.dateToTotalWrapper}>
						<Text
							variant={'titleLarge'}
							style={s.chartTitle}
						>
							{strings.costForEachProduct}
						</Text>
						<View
							style={s.midEachProductWrapper}
						>
							<View style={s.midEachProductHeader}>
								<TouchableOpacity
									onPress={toggleSortDirection}
									style={s.midEachProductHeaderProductName}
								>
									<IconButton
										icon={sortDirection === 'ascending' ? 'chevron-up' : 'chevron-down'}
									/>
									<Text
										variant={'titleLarge'}
									>
										{strings.productName}
									</Text>
								</TouchableOpacity>
								<Text
									variant={'titleMedium'}
									style={s.midEachProductHeaderCost}
								>
									{strings.cost}
								</Text>
							</View>
							{
								midEachProduct.length === 0 ?
									<Text>{strings.youHaveNotScannedAnyCheque}</Text> :
									<View>
										{
											midEachProduct.map(product => (
												<View
													key={product.name}
												>
													<View style={s.midEachProductRow}>
														<Text
															style={s.midEachProductProductName}
														>
															{product.name}
														</Text>
														<Text
															style={s.midEachProductProductCost}
														>
															{product.cost} {strings.currency}
														</Text>
													</View>
													<Divider/>
												</View>
											))
										}
									</View>
							}
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}
