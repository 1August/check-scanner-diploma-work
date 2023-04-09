import { StatusBar, View } from 'react-native'
import { QRScanner } from '../../components/QRScanner/QRScanner'

export const QRScannerPage = ({ navigation }) => {
	return(
		<View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
			<QRScanner navigation={navigation}/>
		</View>
	)
}
