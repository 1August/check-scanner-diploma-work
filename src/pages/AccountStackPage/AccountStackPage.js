import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AccountPage } from './AccountPage/AccountPage'
import { SigninPage } from '../SigninPage/SigninPage'
import { SignupPage } from '../SignupPage/SignupPage'
import { Appbar, useTheme } from 'react-native-paper'
import { logout } from '../../redux/slices/authSlice'
import { ChecksPage } from '../ChecksPage/ChecksPage'
import { CheckPage } from '../CheckPage/CheckPage'
import { useDispatch, useSelector } from 'react-redux'

export const AccountStackPage = ({ isDarkTheme, setIsDarkTheme }) => {
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
		<Stack.Navigator>
			<Stack.Screen
				name={'Account'}
				children={({ route, navigation }) =>
					<AccountPage
						route={route} navigation={navigation} isDarkTheme={isDarkTheme}
						setIsDarkTheme={setIsDarkTheme}
					/>
				}
				options={({ route, navigation }) => ({
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

			<Stack.Screen name={'ChecksPage'} component={ChecksPage} options={{
				...stackBaseStyles,
				title: 'Checks',
			}}/>
			<Stack.Screen name={'CheckPage'} component={CheckPage} options={({ navigation, route }) => ({
				title: route.params.check,
				...stackBaseStyles,
			})}/>
		</Stack.Navigator>
	)
}

// const AccountHeader = ({ navigation }) => {
// 	const theme = useTheme()
//
// 	const dispatch = useDispatch()
//
// 	const token = useSelector(state => state.auth.token)
//
// 	return (
// 		<Appbar.Header theme={theme}>
// 			<Appbar.Content title={'Account'}/>
// 			{
// 				token ?
// 					<Appbar.Action
// 						icon={'logout'}
// 						onPress={() => {
// 							dispatch(logout())
// 							navigation.navigate('HomeStackPage')
// 						}}
// 					/> :
// 					<Appbar.Action
// 						icon={'login'}
// 						onPress={() => navigation.navigate('Signin')}
// 					/>
// 			}
// 		</Appbar.Header>
// 	)
// }
