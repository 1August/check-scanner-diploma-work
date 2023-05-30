import { ScrollView, StyleSheet, View } from 'react-native'
import { Divider, IconButton, RadioButton, Switch, Text, useTheme } from 'react-native-paper'
import { useSafeAreaViewStyles } from '../../hooks/useSafeAreaViewStyles'
import { useDispatch, useSelector } from 'react-redux'
import { saveLocalizationLanguage } from '../../services/localization.service'

export const SettingsPage = ({ navigation, route, setIsDarkTheme }) => {
	const theme = useTheme()
	const isDarkMode = theme.dark
	const safeAreaViewStyles = useSafeAreaViewStyles()

	const strings = useSelector(state => state.localization.strings)
	const language = useSelector(state => state.localization.lang)
	const dispatch = useDispatch()

	const settings = [
		{
			name: strings.darkMode,
			icon: isDarkMode ? 'moon-waxing-crescent' : 'white-balance-sunny',
			element: <Switch
				theme={theme} value={isDarkMode}
				onValueChange={handleSwitchTheme}
			/>,
		},
		{
			name: strings.language,
			icon: 'alphabetical-variant',
			element: <RadioButton.Group
				onValueChange={value => handleChangeLanguage(value)}
				value={language}
			>
				<RadioButton.Item
					label={'kz'}
					value={'kz'}
					status={language === 'kz' ? 'checked' : 'unchecked'}
				/>
				<RadioButton.Item
					label={'en'}
					value={'en'}
					status={language === 'en' ? 'checked' : 'unchecked'}
				/>
			</RadioButton.Group>,
		},
	]

	function handleChangeLanguage(lang) {
		dispatch(saveLocalizationLanguage(lang))
	}

	const s = StyleSheet.create({
		container: {
			flex: 1,
		},
		settingsRow: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',

			marginHorizontal: 16,
			marginVertical: 8,
		},
		settingRowTitleWrapper: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center',
		},
		settingTitle: {
			width: '70%',
		},
	})

	function handleSwitchTheme() {
		setIsDarkTheme(prev => !prev)
	}

	return (
		<ScrollView>
			<View style={s.container}>
				<View style={s.settings}>
					{
						settings.map(setting => (
							<View
								key={setting.name}
								style={s.settingsRowWrapper}
							>
								<View style={s.settingsRow}>
									<View
										style={s.settingRowTitleWrapper}
									>
										<IconButton icon={setting.icon} theme={theme}/>
										<Text
											theme={theme}
											variant={'titleLarge'}
											style={s.settingTitle}
										>
											{setting.name}
										</Text>
									</View>
									<View>
										{setting.element}
									</View>
								</View>
								<Divider/>
							</View>
						))
					}
				</View>
			</View>
		</ScrollView>
	)
}
