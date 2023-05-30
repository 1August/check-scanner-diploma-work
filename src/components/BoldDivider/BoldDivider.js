import { Divider, useTheme } from 'react-native-paper'

export const BoldDivider = () => {
	const theme = useTheme()

	return <Divider
		style={{ height: 10, backgroundColor: theme.colors.surfaceVariant }}
	/>
}
