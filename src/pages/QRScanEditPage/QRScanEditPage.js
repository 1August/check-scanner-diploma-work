import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput, useTheme } from 'react-native-paper'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../App'
import { useSelector } from 'react-redux'
import { Loading } from '../Loading/Loading'

export const QRScanEditPage = ({ navigation, route }) => {
	const theme = useTheme()
	const token = useSelector(state => state.auth.token)

	const [check, setCheck] = useState({
		checkId: null,
		checkRows: [],
		total: null,
		date: null,
	})
	const [modalShown, setModalShown] = useState(false)
	const [snackBarShown, setSnackbarShown] = useState(false)
	const [newProduct, setNewProduct] = useState({
		name: '',
		cost: '',
		count: '1',
		overall: '0',
	})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {

	}, [])

	useEffect(() => {
		setLoading(true)

		const url = `${BASE_URL}/api/checks/scan`
		axios.post(url, { url: route.params.url }, {
			headers: {
				Authorization: token,
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				Expires: '0',
			},
		})
			.then(res => {
				console.log({ res })
				if (res.status !== 200 && res.status !== 201) throw new Error(res.data.message)
				setCheck(res.data.data)
			})
			.catch(error => {
				console.log(error)
				setError('It seems you scanned this check before!')
			})
			.finally(() => {
				setLoading(false)
			})
	}, [route.params.url])

	useEffect(() => {
		setNewProduct(prev => ({ ...prev, overall: String(+prev.cost * +prev.count) }))
	}, [newProduct.cost, newProduct.count])

	// Auto-close snackbar after 5s
	// useEffect(() => {
	// 	if (snackBarShown)
	// 		setTimeout(() => setSnackbarShown(false), 5000)
	// }, [snackBarShown])

	// useEffect(() => {
	// 	// TODO: CHANGE TOTAL PRICE WHEN ADD NEW PRODUCT
	// }, [products])

	const s = StyleSheet.create({
		qrScanEditPage: {
			flex: 1,

			backgroundColor: theme.colors.background,
		},
		container: {
			flex: 1,
			paddingHorizontal: 16,
			paddingTop: 16,
		},
		product: {
			marginBottom: 8,
		},
		productRow: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},


		FAB: {
			position: 'absolute',
			right: 16,
			bottom: 96,
		},
		modalContent: {
			backgroundColor: '#fff',
			marginHorizontal: 32,
			paddingVertical: 16,
			paddingHorizontal: 32,
		},
	})

	function removeProduct(id) {
		setCheck(check => ({ ...check, checkRows: check.checkRows.filter(row => row._id !== id) }))
	}

	function handleChange({ name, value }) {
		setNewProduct(prev => ({ ...prev, [name]: value }))
	}

	function submitModal() {
		setModalShown(false)
		setCheck(check => ({ ...check, checkRows: [...check.checkRows, newProduct] }))
		setNewProduct({
			name: '',
			cost: '',
			count: '1',
			overall: '0',
		})
	}

	function saveCheckInAccount() {
		setLoading(true)
		setError('')

		const url = `${BASE_URL}/api/checks/save`

		axios.post(url, { check }, {
			headers: {
				Authorization: token,
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				Expires: '0',
			},
		})
			.then(res => {
				if (res.status !== 201) throw new Error('Error on save check!')

				navigation.navigate('AccountStackPage')
			})
			.catch(error => {
				console.log(error.message)
				setError(error.message)
			})
			.finally(() => {
				setLoading(false)
				setCheck(null)
			})
	}

	if (loading) return <Loading/>
	if (error) {
		return (
			<View style={{ flex: 1 }}>
				<Text>{error}</Text>
			</View>
		)
	}

	/*
	TODO: Check: sometimes product.number/product.count
	 */
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={s.qrScanEditPage}>
				<ScrollView style={{ flex: 1 }}>
					<View style={s.container}>
						<View>
							{
								!check?.checkRows?.length ?
									<Text>There is no scanned data!</Text> :
									check?.checkRows?.map(product => (
										<View key={product?._id} style={s.product}>
											<View style={s.productRow}>
												<View>
													<View>
														<Text theme={theme}>
															{product.name}
														</Text>
													</View>
													<View>
														<Text theme={theme}>
															{product.cost} x {product.number} = {product.overall}
														</Text>
													</View>
												</View>
												<View>
													<IconButton
														icon={'delete'}
														onPress={() => removeProduct(product?._id)}
													/>
												</View>
											</View>
											<Divider/>
										</View>
									))
							}
							<View>
								<Text>Date: {check?.date}</Text>
								<Text>Total: {check?.total}</Text>
							</View>
							<View>
								<Button
									children={'Ok'}
									onPress={saveCheckInAccount}
									mode={'outlined'} theme={theme}
								/>
							</View>
						</View>
					</View>
				</ScrollView>
				<Portal
					onUnmount={(...args) => {
						console.log(args)
					}}
				>
					<FAB icon={'plus'} style={s.FAB} theme={theme} onPress={() => setModalShown(true)}/>
					<Modal
						visible={modalShown}
						onDismiss={() => setModalShown(false)}
						contentContainerStyle={s.modalContent}
						theme={theme}
					>
						<View>
							<View>
								<TextInput
									theme={theme}
									value={newProduct.name}
									onChangeText={name => handleChange({ name: 'name', value: name })}
									placeholder={'Enter product name'}
								/>
								<TextInput
									theme={theme}
									value={newProduct.cost}
									onChangeText={cost => handleChange({ name: 'cost', value: cost })}
									placeholder={'Cost'} keyboardType={'number-pad'}
								/>
								<TextInput
									theme={theme}
									value={newProduct.count}
									onChangeText={count => handleChange({ name: 'count', value: count })}
									placeholder={'Count'} keyboardType={'number-pad'}
								/>
								<TextInput
									theme={theme}
									value={newProduct.overall} placeholder={'Overall'}
									disabled={true} keyboardType={'number-pad'}
								/>
							</View>
							<View>
								<Button
									children={'Ok'}
									onPress={submitModal}
									mode={'outlined'} theme={theme}
								/>
							</View>
						</View>
					</Modal>
					{/*<Snackbar*/}
					{/*	visible={snackBarShown}*/}
					{/*	onDismiss={() => setSnackbarShown(false)}*/}
					{/*	action={{*/}
					{/*		label: 'Ok',*/}
					{/*		onPress: () => {*/}
					{/*			setSnackbarShown(false)*/}
					{/*		},*/}
					{/*	}}*/}
					{/*>*/}
					{/*	Some text from Snackbar after scan qr edit*/}
					{/*</Snackbar>*/}
				</Portal>
			</View>
		</SafeAreaView>
	)
}
