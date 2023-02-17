import { StatusBar, View } from 'react-native'
import { QRScanner } from '../../components/QRScanner/QRScanner'

export const QRScannerPage = () => {
	return(
		<View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
			<QRScanner/>
		</View>
	)
}