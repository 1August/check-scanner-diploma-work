import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Appbar, Divider, IconButton, Text, useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { logout } from '../../services/auth.service'
import { useSafeAreaViewStyles } from '../../hooks/useSafeAreaViewStyles'

const accountFields = (strings) => ({
	unauthorized: [
		{
			label: strings.settings,
			disabled: false,
			navigate: 'SettingsPage',
			icon: 'cog',
		},
		{
			label: strings.aboutUs,
			disabled: true,
			icon: 'information',
			// information-variant
		},
		{
			label: strings.help,
			disabled: true,
			icon: 'help-circle',
			// help
		},
	],
	authorized: [
		{
			label: strings.forecast,
			disabled: false,
			navigate: 'ForecastPage',
			icon: 'align-horizontal-left',
		},
		{
			label: strings.cheques,
			disabled: false,
			navigate: 'ChequesPage',
			icon: 'beaker-check',
		},
		{
			label: strings.settings,
			disabled: false,
			navigate: 'SettingsPage',
			icon: 'cog',
		},
		{
			label: strings.aboutUs,
			disabled: true,
			icon: 'information',
			// information-variant
		},
		{
			label: strings.help,
			disabled: true,
			icon: 'help-circle',
			// help
		},
	],
})

export const AccountPage = ({ navigation }) => {
	const theme = useTheme()
	const strings = useSelector(state => state.localization.strings)

	const safeAreaViewStyles = useSafeAreaViewStyles()

	const name = useSelector(state => state.auth.name)
	const email = useSelector(state => state.auth.email)
	const token = useSelector(state => state.auth.token)
	const dispatch = useDispatch()

	const [fields, setFields] = useState(accountFields(strings).unauthorized)

	useFocusEffect(() => {
		navigation.setOptions({
			title: email ?
				`${strings.welcome}, ${name || email}` :
				`${strings.welcome}!`,
			headerBackButtonMenuEnabled: false,
			headerRight: () => token ?
				<Appbar.Action
					style={{ marginRight: 'auto' }}
					icon={'logout'}
					onPress={() => {
						dispatch(logout())
					}}
				/> :
				<Appbar.Action
					style={{ marginRight: 'auto' }}
					icon={'login'}
					onPress={() => navigation.navigate('AccountStackPage', {
						screen: 'SigninPage',
					})}
				/>,
		})
	})

	useEffect(() => {
		if (token == null)
			return setFields(() => accountFields(strings).unauthorized)

		setFields(() => accountFields(strings).authorized)
	}, [token])

	const s = StyleSheet.create({
		container: {
			flex: 1,
		},
		accountFields: {},
		accountFieldsRowWrapper: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',


			paddingHorizontal: 8,
		},
		accountFieldsRow: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center',
		},
	})

	return (
		<View>
			<ScrollView>
				<View style={s.container}>
					<View style={s.accountFields}>
						{
							fields.map(row => (
								<View key={row.label}>
									<TouchableOpacity
										disabled={row.disabled}
										onPress={() => navigation.navigate(row.navigate)}
										style={s.accountFieldsRowWrapper}
									>
										<View
											style={s.accountFieldsRow}
										>
											<IconButton icon={row.icon}/>
											<Text variant={'titleMedium'} style={row.disabled && {color: theme.colors.outline}}>
												{row.label}
											</Text>
										</View>
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
	)
}
