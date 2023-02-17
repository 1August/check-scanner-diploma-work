import { View } from 'react-native'
import { Text } from 'react-native-paper'

export const ProductPage = ({ navigation, route }) => {
	return (
		<View>
			<Text>{route.params.name} page</Text>
		</View>
	)
}