import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Divider, IconButton, Switch, Text, useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'

const accountFields = [
	{
		label: 'Statistics',
		disabled: false,
		navigate: 'StatisticsPage',
	},
	{
		label: 'Checks',
		disabled: false,
		navigate: 'ChecksPage',
	},
	{
		label: 'Edit account',
		disabled: true,
	},
	{
		label: 'Settings',
		disabled: false,
		navigate: 'SettingsPage',
	},
	{
		label: 'About us',
		disabled: true,
	},
	{
		label: 'Help',
		disabled: true,
	},
]

export const AccountPage = ({ navigation, route, isDarkTheme, setIsDarkTheme }) => {
	const theme = useTheme()

	const auth = useSelector(state => state.auth)

	const s = StyleSheet.create({
		container: {
			flex: 1,
			paddingHorizontal: 16,
			paddingTop: 16,
		}
	})

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View>
				<ScrollView>
					<View style={s.container}>
						<Text
							theme={theme}
							style={{ marginBottom: 16 }}
							variant={'titleLarge'}
						>
							User: {auth.email || 'Unauthorized'}
						</Text>
						<View style={s.accountFields}>
							{
								auth.token && accountFields.map(row => (
									<View key={row.label}>
										<TouchableOpacity
											disabled={row.disabled}
											style={{
												flexDirection: 'row',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
											onPress={() => navigation.navigate(row.navigate)}
										>
											<Text theme={theme} variant={'titleMedium'}>
												{row.label}
											</Text>
											<IconButton icon={'chevron-right'}/>
										</TouchableOpacity>
										<Divider/>
									</View>
								))
							}
						</View>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}

const s = StyleSheet.create({
	container: {
		// flex: 1,
		paddingHorizontal: 16,
		paddingTop: 16,
	},
})
