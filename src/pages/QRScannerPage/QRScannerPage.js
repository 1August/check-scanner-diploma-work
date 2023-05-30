import { StatusBar, StyleSheet, View } from 'react-native'
import { QRScanner } from '../../components/QRScanner/QRScanner'
import { useFocusEffect } from '@react-navigation/native'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export const QRScannerPage = ({ navigation }) => {
	const [showQRScannerPage, setShowQRScannerPage] = useState(false)

	useFocusEffect(() => {
		setShowQRScannerPage(true)

		return () => {
			setShowQRScannerPage(false)
		}
	})

	const s = StyleSheet.create({
		qrScannerPage: {
			flex: 1,
			marginTop: StatusBar.currentHeight,
		},
	})

	return showQRScannerPage ? (
		<View style={s.qrScannerPage}>
			<QRScanner navigation={navigation}/>
		</View>
	) : null
}
