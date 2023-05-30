import { Linking, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Modal, Portal, Text, useTheme } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Loading } from '../Loading/Loading'
import { ErrorPage } from '../ErrorPage/ErrorPage'
import { api } from '../../lib/api'
import QRCode from 'react-native-qrcode-svg'
import { NoDataPage } from '../NoDataPage/NoDataPage'
import { useSafeAreaViewStyles } from '../../hooks/useSafeAreaViewStyles'

export const QRScanEditPage = ({ navigation, route }) => {
	const theme = useTheme()
	const token = useSelector(state => state.auth.token)
	const safeAreaViewStyles = useSafeAreaViewStyles()

	const strings = useSelector(state => state.localization.strings)

	const initialNewProduct = {
		name: '',
		cost: 0,
		count: 1,
		overall: 0,
	}
	const [cheque, setCheque] = useState(null)
	const chequeDate = (cheque?.date && new Date(cheque.date)) ?? new Date()
	const [newProduct, setNewProduct] = useState({ ...initialNewProduct })
	const [productIdToRemove, setProductIdToRemove] = useState(null)

	const [requestModalVisible, setRequestModalVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => <Button
				children={strings.save}
				onPress={() => saveChequeInAccount()}
				mode={'text'} theme={theme}
			/>,
		})
	}, [navigation, cheque])

	useEffect(() => {
		setLoading(true)
		setError('')

		const url = '/api/cheques/scan'
		api
			.post(url, { url: route.params.url }, { headers: { Authorization: token } })
			.then(res => {
				setCheque(res.data.data)
			})
			.catch(error => {
				setError(error.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [route.params.url])

	useEffect(() => {
		setNewProduct(prev => ({ ...prev, overall: +prev.cost * +prev.count }))
	}, [newProduct.count, newProduct.cost])

	useEffect(() => {
		if (cheque?.chequeRows == null) {
			return
		}
		setCheque(prev => ({ ...prev, total: prev.chequeRows.reduce((sum, prod) => sum + +prod.overall, 0) }))
	}, [cheque?.chequeRows])

	function saveChequeInAccount() {
		setLoading(true)
		setError('')

		const url = '/api/cheques'
		api
			.post(url, { cheque: { ...cheque, url: route.params.url } }, { headers: { Authorization: token } })
			.then(res => {
				if (res.status !== 201) throw new Error('Error on save cheque!')
			})
			.catch(error => {
				setError(error.message)
			})
			.finally(() => {
				setLoading(false)
				setCheque(null)
				navigation.navigate('AccountStackPage')
			})
	}

	function handleConfirmRemove() {
		setCheque(prev => ({ ...prev, chequeRows: prev.chequeRows.filter(row => row._id !== productIdToRemove) }))
		setProductIdToRemove(null)
		setRequestModalVisible(false)
	}

	function handleCancelRemove() {
		setProductIdToRemove(null)
		setRequestModalVisible(false)
	}

	const s = StyleSheet.create({
		qrScanEditPage: {
			flex: 1,

			backgroundColor: theme.colors.background,
		},
		container: {
			flex: 1,
			padding: 16,
		},
		cheque: {
			marginHorizontal: 16,

			borderWidth: 1,
			borderStyle: 'dashed',
			borderColor: theme.colors.outline,

			borderRadius: 8,
		},
		chequeHeader: {
			borderTopLeftRadius: 8,
			borderTopRightRadius: 8,
		},
		chequeHeaderButton: {},
		chequeTitle: {
			fontSize: 22,
			lineHeight: 24,
		},

		chequeRow: {
			paddingHorizontal: 16,
			paddingVertical: 12,
		},
		chequeRowBorderBottom: {
			borderStyle: 'dashed',
			borderBottomWidth: 1,
			borderColor: theme.colors.outline,
		},
		chequeRowProductDescription: {
			color: theme.colors.outline,
		},
		productRowBottom: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		chequeRowCost: {
			textAlign: 'right',
		},
		chequeFooter: {
			backgroundColor: theme.dark ?
				theme.colors.secondaryContainer :
				theme.colors.success,

			flex: 1,
			flexDirection: 'column',

			paddingVertical: 32,
			paddingHorizontal: 16,
		},
		chequeFooterText: {
			color: theme.colors.onSuccess,
		},
		chequeTotal: {
			fontSize: 48,
		},
		qrCodeWrapper: {
			backgroundColor: theme.colors.background,

			paddingVertical: 16,

			justifyContent: 'center',
			alignItems: 'center',

			borderBottomLeftRadius: 8,
			borderBottomRightRadius: 8,
		},

		modalContent: {
			backgroundColor: '#fff',
			marginHorizontal: 32,
			paddingTop: 24,
			paddingBottom: 32,
			paddingHorizontal: 24,
		},
	})

	if (loading) return <Loading/>
	if (error) return <ErrorPage
		message={error}
		navigation={navigation}
		onGoHomePress={navigation.popToTop()}
	/>
	if (cheque == null) return <NoDataPage
		message={strings.noInformationFound}
		onRefreshAction={navigation.popToTop}
	/>
	return (
		<View style={s.qrScanEditPage}>
			<ScrollView style={{ flex: 1 }}>
				<View style={s.container}>
					<View style={s.cheque}>
						<View style={s.chequeHeader}>
							<Button
								style={s.chequeHeaderButton}
								mode={'text'}
								icon={'link-variant'}
								labelStyle={s.chequeTitle}
								contentStyle={{ paddingVertical: 8, flexDirection: 'row-reverse' }}
								onPress={() => Linking.openURL(cheque?.url || '')}
							>
								{strings.cheque}
							</Button>
						</View>
						<View>
							<View style={s.chequeFooter}>
								<View>
									<Text
										style={[s.chequeTotal, s.chequeFooterText]}
									>
										{cheque.total} {strings.currency}
									</Text>
								</View>
								<View>
									<Text
										style={[s.chequeFooterText]}
									>
										Date: {chequeDate.toDateString()}
									</Text>
								</View>
							</View>
						</View>
						<View style={s.chequeBody}>
							{
								cheque.chequeRows.map(row => (
										<View
											key={row._id || row.name}
											style={[s.chequeRow, s.chequeRowBorderBottom]}
										>
											<View>
												<Text
													variant={'bodyMedium'}
													style={s.chequeRowProductDescription}
												>
													Product name
												</Text>
												<Text
													variant={'titleMedium'}
												>
													{row.name}
												</Text>
											</View>
											<View
												style={s.productRowBottom}
											>
												<Text
													style={s.chequeRowCost}
												>
													{row.cost} тг x {row.count} =
												</Text>
												<Text variant={'bodyLarge'}>
													{row.overall} тг
												</Text>
											</View>
										</View>
									),
								)
							}
						</View>
						<View style={s.qrCodeWrapper}>
							<QRCode
								backgroundColor={theme.colors.background}
								color={theme.dark ? theme.colors.onPrimaryContainer : theme.colors.primary}
								value={cheque.url}
							/>
						</View>
					</View>
				</View>
			</ScrollView>
			<Portal>
				<Modal
					visible={requestModalVisible}
					onDismiss={() => {
						setRequestModalVisible(false)
					}}
					contentContainerStyle={s.modalContent}
					theme={theme}
				>
					<View>
						<Text
							variant={'titleLarge'}
							style={{ marginBottom: 16 }}
						>
							Remove product from cheque list?
						</Text>
						<View style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}>
							<Button
								style={{ width: '48%' }}
								theme={theme}
								children={'Cancel'}
								mode={'outlined'}
								onPress={handleCancelRemove}
							/>
							<Button
								theme={theme}
								children={'Confirm'}
								labelStyle={{ color: '#fff' }}
								style={{ backgroundColor: 'red', width: '48%' }}
								mode={'contained'}
								onPress={handleConfirmRemove}
							/>
						</View>
					</View>
				</Modal>
			</Portal>
		</View>
	)
}
