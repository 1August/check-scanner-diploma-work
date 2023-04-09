import { SafeAreaView, View } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'

export const Loading = () => {
	const theme = useTheme()

	return(
		<SafeAreaView style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
			<View style={{ flex: 1 }}>
				<ActivityIndicator theme={theme} size={'small'}/>
			</View>
		</SafeAreaView>
	)
}
