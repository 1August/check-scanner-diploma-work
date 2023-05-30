import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { Button, Portal, Text, useTheme } from 'react-native-paper'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage'
import qrHelper from '../../assets/qrHelper.png'
import { useFocusEffect } from '@react-navigation/native'
import { SCREEN_HEIGHT } from '../../constants/screen.constants'
import { useSelector } from 'react-redux'

export const QRScanner = ({ navigation }) => {
	const strings = useSelector(state => state.localization.strings)
	const theme = useTheme()

	const [qrHelperVisible, setQrHelperVisible] = useState(false)

	const [hasPermission, setHasPermission] = useState(false)
	const [scanned, setScanned] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync()
			setHasPermission(status === 'granted')
		})()
	}, [])

	useFocusEffect(() => {
		setQrHelperVisible(true)

		return () => {
			setQrHelperVisible(false)
		}
	})

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true)
		if (data == null) {
			setError('Can not find cheque!')
		}
		navigation.navigate('QRScanEditPage', { url: data })
	}

	const handleRetryPress = () => {
		setError('')
		setScanned(false)
	}

	const s = StyleSheet.create({
		scanOverlay: {
			position: 'absolute',
			top: centerOfScreenInPercent,
			left: 32,
			right: 32,
		},
		scanOverlayText: {
			backgroundColor: 'white',
			padding: 10,
			borderRadius: 5,
		},
		qrHelperWrapper: {
			width: '100%',

			position: 'absolute',
			top: SCREEN_HEIGHT / 2 - 128 - 48,

			justifyContent: 'center',
			alignItems: 'center',
		},
		qrHelper: {},
		qrHelperText: {
			color: theme.colors.onPrimary,
			marginTop: 32,
		},
	})

	if (error) return <ErrorPage navigation={navigation} message={error} onGoHomePress={() => navigation.reset()}/>
	if (hasPermission === null) return <Text>Requesting for camera permission</Text>
	if (hasPermission === false) return <Text>No access to camera</Text>
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'flex-end',
			}}>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>
			{scanned && error && (
				<View style={[s.scanOverlay, { backgroundColor: theme.colors.background }]}>
					<View style={{ padding: 16 }}>
						<View>
							<View>
								<Text>Error. {error}</Text>
							</View>
							<View>
								<Button theme={theme} onPress={handleRetryPress}>Retry</Button>
							</View>
						</View>
					</View>
				</View>
			)}
			<Portal>
				{
					qrHelperVisible && <View
						style={s.qrHelperWrapper}
					>
						<Image source={qrHelper} style={s.qrHelper}/>
						<Text
							style={s.qrHelperText}
							variant={'headlineMedium'}
						>
							{strings.scanQRCodeInYourCheque}
						</Text>
					</View>
				}
			</Portal>
		</View>
	)
}


const centerOfScreenInPercent = `${50 - Math.round(30 / Dimensions.get('screen').height * 100)}%`
