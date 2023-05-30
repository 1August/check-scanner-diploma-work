import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Divider, IconButton, Text, useTheme } from 'react-native-paper'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Loading } from '../Loading/Loading'
import { ErrorPage } from '../ErrorPage/ErrorPage'
import { NoDataPage } from '../NoDataPage/NoDataPage'
import { api } from '../../lib/api'
import { useFocusEffect } from '@react-navigation/native'
import { useSafeAreaViewStyles } from '../../hooks/useSafeAreaViewStyles'

export const ChequesPage = ({ navigation }) => {
	const theme = useTheme()
	const safeAreaViewStyles = useSafeAreaViewStyles()
	const token = useSelector(state => state.auth.token)

	const strings = useSelector(state => state.localization.strings)

	const [cheques, setCheques] = useState([])

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [status, setStatus] = useState(null)
	const [refreshing, setRefreshing] = useState(false)

	const s = StyleSheet.create({
		container: {
			flex: 1,
		},
		chequeRow: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',

			marginHorizontal: 16,
		},
		chequeTitleWrapper: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center',
		},
		chequeId: {
			marginVertical: 8,
		},
		chequeTotal: {
			color: theme.colors.outline,
		},
		chequeDate: {
			marginBottom: 8,
		},
	})

	useEffect(() => {
		if (error) return
		if (cheques.length) return

		getUserCheques()
	}, [])

	useFocusEffect(() => {
		navigation.setOptions({
			title: `${strings.cheques} (${cheques.length})`,
		})
	})

	function getUserCheques() {
		setLoading(true)
		setError('')
		setStatus(null)

		const url = '/api/user/cheques'
		api.get(url, { headers: { Authorization: token } })
			.then(res => {
				setStatus(res.status)
				if (res.data.data == null) return

				setCheques(res.data.data)
			})
			.catch(error => {
				setError(error.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	function handleChequePress(cheque) {
		navigation.navigate('ChequePage', { cheque: JSON.stringify(cheque) })
	}

	const onRefresh = useCallback(async () => {
		setRefreshing(true)

		getUserCheques()
		setRefreshing(false)
	}, [])

	if (loading) return <Loading/>
	if (error) return <ErrorPage
		message={error}
		navigation={navigation}
		onGoHomePress={navigation.popToTop}
	/>
	if (cheques.length === 0) return <NoDataPage
		message={strings.noInformationFound}
		onRefreshAction={getUserCheques}
	/>
	return (
		<ScrollView
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
			}
		>
			<View style={s.container}>
				<View style={s.cheques}>
					{
						cheques.map(cheque => (
							<View
								key={cheque?._id}
								style={s.chequeRowWrapper}
							>
								<TouchableOpacity
									style={s.chequeRow}
									onPress={() => handleChequePress(cheque)}
								>
									<View style={s.chequeTitleWrapper}>
										<View>
											<IconButton icon={'playlist-check'}/>
										</View>
										<View>
											<Text
												variant={'titleLarge'}
												style={s.chequeId}
											>
												{cheque.chequeId}
											</Text>
											<Text
												variant={'titleMedium'}
												style={s.chequeTotal}
											>
												{cheque.total} {strings.currency}
											</Text>
											<Text
												variant={'titleSmall'}
												style={s.chequeDate}
											>
												{new Date(cheque.date).toDateString()}
											</Text>
										</View>
									</View>
									<IconButton icon={'chevron-right'}/>
								</TouchableOpacity>
								<Divider/>
							</View>
						))
					}
				</View>
			</View>
		</ScrollView>
	)
}
