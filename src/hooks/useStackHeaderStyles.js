import { useTheme } from 'react-native-paper'

export const useStackHeaderStyles = () => {
	const theme = useTheme()

	return {
		headerTitleStyle: { color: theme.colors.primary },
		headerStyle: { backgroundColor: theme.colors.background },
		headerTintColor: theme.colors.primary,
	}
}
