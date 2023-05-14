import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { Switch, Text, useTheme } from 'react-native-paper'
import { View } from 'react-native'

export const SettingsPage = ({ navigation, route, setIsDarkTheme }) => {
	const theme = useTheme()
	const isDarkMode = theme.mode === 'dark'

	const s = StyleSheet.create({
		container: {
			flex: 1,
			paddingHorizontal: 16,
		}
	})

	function handleSwitchTheme () {
		setIsDarkTheme(prev => !prev)
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView>
				<View style={s.container}>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
						<Text theme={theme}>Dark mode</Text>
						<Switch
							theme={theme} value={isDarkMode}
							onValueChange={handleSwitchTheme}
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
