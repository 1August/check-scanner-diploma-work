import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { BarCodeScanner } from 'expo-barcode-scanner'

export const QRScanner = ({ navigation, route }) => {
	const theme = useTheme()

	const [hasPermission, setHasPermission] = useState(null)
	const [scanned, setScanned] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync()
			setHasPermission(status === 'granted')
		})()
	}, [])

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true)
		navigation.navigate('QRScanEditPage', { url: data })
	}

	const handleRetryPress = () => {
		setError('')
		setScanned(false)
	}

	if (hasPermission === null) return <Text>Requesting for camera permission</Text>
	if (hasPermission === false) return <Text>No access to camera</Text>
	return (
		<View
			style={{
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'flex-end',
			}}>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>
			{scanned && error && (
				<View style={[styles.scanOverlay, { backgroundColor: theme.colors.background }]}>
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
		</View>
	)
}


const centerOfScreenInPercent = `${50 - Math.round(30 / Dimensions.get('screen').height * 100)}%`
const styles = StyleSheet.create({
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
})
