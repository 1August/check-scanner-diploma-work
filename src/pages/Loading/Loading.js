import { View } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'
import { useSafeAreaViewStyles } from '../../hooks/useSafeAreaViewStyles'

export const Loading = () => {
	const theme = useTheme()
	const safeAreaViewStyles = useSafeAreaViewStyles()

	return (
		<View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, safeAreaViewStyles.safeAreaView]}>
			<ActivityIndicator theme={theme} size={'small'}/>
		</View>
	)
}
