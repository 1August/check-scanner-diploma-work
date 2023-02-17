import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { BarCodeScanner } from 'expo-barcode-scanner'

export const QRScanner = () => {
	const theme = useTheme()

	const [hasPermission, setHasPermission] = useState(null)
	const [scanned, setScanned] = useState(false)

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync()
			setHasPermission(status === 'granted')
		})()
	}, [])

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true)
		alert(`Bar code with type ${type} and data ${data} has been scanned!`)
	}

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>
	}

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
			{scanned && (
				<View style={[styles.scanOverlay, { backgroundColor: theme.colors.background }]}>
					<Text theme={theme}>Scanned Successfully!</Text>
					{/*<Text style={styles.scanOverlayText}></Text>*/}
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
		left: '20%',
		right: '20%',
		alignItems: 'center',
		paddingVertical: 15,
	},
	scanOverlayText: {
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 5,
	},
})