import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AccountPage } from './AccountPage/AccountPage'
import { SigninPage } from '../SigninPage/SigninPage'
import { SignupPage } from '../SignupPage/SignupPage'
import { Appbar, useTheme } from 'react-native-paper'
import { logout } from '../../redux/slices/authSlice'
import { ChecksPage } from '../ChecksPage/ChecksPage'
import { CheckPage } from '../CheckPage/CheckPage'
import { useDispatch, useSelector } from 'react-redux'
import { StatisticsPage } from '../StatisticsPage/StatisticsPage'
import { SettingsPage } from '../SettingsPage/SettingsPage'

export const AccountStackPage = ({ setIsDarkTheme }) => {
	const theme = useTheme()
	const Stack = createNativeStackNavigator()

	const token = useSelector(state => state.auth.token)
	const dispatch = useDispatch()

	const stackBaseStyles = {
		headerTitleStyle: { color: theme.colors.primary },
		headerStyle: { backgroundColor: theme.colors.background },
		headerTintColor: theme.colors.primary,
	}

	return (
		<Stack.Navigator initialRouteName={'Account'}>
			<Stack.Screen
				name={'Account'}
				component={AccountPage}
				options={({ navigation }) => ({
					// headerRight: LogoutButton,
					...stackBaseStyles,
					// header: AccountHeader,
					title: 'Account',
					headerBackButtonMenuEnabled: false,
					headerRight: () => token ?
						<Appbar.Action
							style={{ marginRight: 'auto' }}
							icon={'logout'}
							onPress={() => {
								dispatch(logout())
								navigation.navigate('HomeStackPage')
							}}
						/> :
						<Appbar.Action
							style={{ marginRight: 'auto' }}
							icon={'login'}
							onPress={() => navigation.navigate('Signin')}
						/>,
				})}
			/>

			<Stack.Screen name={'Signin'} component={SigninPage} options={{
				headerShown: false,
				...stackBaseStyles,
			}}/>
			<Stack.Screen name={'Signup'} component={SignupPage} options={{
				headerShown: false,
				...stackBaseStyles,
			}}/>

			<Stack.Screen name={'StatisticsPage'} component={StatisticsPage} options={{
				...stackBaseStyles,
				title: 'Statistics',
			}}/>
			<Stack.Screen name={'ChecksPage'} component={ChecksPage} options={{
				...stackBaseStyles,
				title: 'Checks',
			}}/>
			<Stack.Screen name={'CheckPage'} component={CheckPage} options={({ route }) => ({
				title: route.params.check.checkId,
				...stackBaseStyles,
			})}/>
			<Stack.Screen name={'SettingsPage'} children={({ navigation, route }) => (
				<SettingsPage
					navigation={navigation}
					route={route}
					setIsDarkTheme={setIsDarkTheme}
				/>
			)}
						  options={({ route }) => ({
							  ...stackBaseStyles,
							  title: 'Settings',
						  })}/>
		</Stack.Navigator>
	)
}
