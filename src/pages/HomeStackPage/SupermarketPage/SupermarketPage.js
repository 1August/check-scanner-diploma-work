import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useEffect } from 'react'

export const SupermarketPage = ({ navigation, route }) => {
	const theme = useTheme()

	useEffect(() => {

	}, [navigation])

	return (
		<View>
			<Text theme={theme}>{route.params.name} Page</Text>
		</View>
	)
}