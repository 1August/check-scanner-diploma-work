import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AccountPage } from '../AccountPage/AccountPage'
import { SigninPage } from '../SigninPage/SigninPage'
import { SignupPage } from '../SignupPage/SignupPage'
import { ChequesPage } from '../ChequesPage/ChequesPage'
import { ChequePage } from '../ChequePage/ChequePage'
import { ForecastPage } from '../ForecastPage/ForecastPage'
import { SettingsPage } from '../SettingsPage/SettingsPage'
import { useStackHeaderStyles } from '../../hooks/useStackHeaderStyles'
import { useSelector } from 'react-redux'

export const AccountStackPage = ({ setIsDarkTheme }) => {
	const strings = useSelector(state => state.localization.strings)

	const Stack = createNativeStackNavigator()
	const headerStyle = useStackHeaderStyles()

	const accountStackScreens = [
		{
			name: 'AccountPage',
			children: props => <AccountPage {...props}/>,
			options: {
				...headerStyle,
			},
		},
		{
			name: 'SigninPage',
			children: props => <SigninPage  {...props}/>,
			options: {
				headerShown: false,
				...headerStyle,
			},
		},
		{
			name: 'SignupPage',
			children: props => <SignupPage {...props}/>,
			options: {
				headerShown: false,
				...headerStyle,
			},
		},
		{
			name: 'ForecastPage',
			children: props => <ForecastPage {...props}/>,
			options: {
				title: strings.forecast,
				...headerStyle,
			},
		},
		{
			name: 'ChequesPage',
			children: props => <ChequesPage {...props}/>,
			options: {
				title: strings.cheques,
				...headerStyle,
			},
		},
		{
			name: 'ChequePage',
			children: props => <ChequePage {...props}/>,
			options: {
				title: strings.cheque,
				...headerStyle,
			},
		},
		{
			name: 'SettingsPage',
			children: props => <SettingsPage {...props} setIsDarkTheme={setIsDarkTheme}/>,
			options: {
				title: strings.settings,
				...headerStyle,
			},
		},
	]

	return (
		<Stack.Navigator initialRouteName={'AccountPage'}>
			{
				accountStackScreens.map(screen => (
					<Stack.Screen
						key={screen.name}
						name={screen.name}
						children={screen.children}
						options={screen.options}
					/>
				))
			}
		</Stack.Navigator>
	)
}
