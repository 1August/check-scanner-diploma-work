import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AccountPage } from './AccountPage/AccountPage'
import { SigninPage } from '../SigninPage/SigninPage'
import { SignupPage } from '../SignupPage/SignupPage'
import { Appbar, Button, useTheme } from 'react-native-paper'

export const AccountStackPage = ({setIsDarkTheme}) => {
	const theme = useTheme()
	const Stack = createNativeStackNavigator()

	const stackBaseStyles = {
		headerTitleStyle: { color: theme.colors.primary },
		headerStyle: { backgroundColor: theme.colors.background },
		headerTintColor: theme.colors.primary
	}

	return(
		<Stack.Navigator>
			<Stack.Screen name={'Account'} children={({ route, navigation }) => <AccountPage route={route} navigation={navigation} setIsDarkTheme={setIsDarkTheme}/>} options={({ route, navigation }) => ({
				// headerRight: LogoutButton,
				...stackBaseStyles,
				header: () => {
					return(
						<Appbar.Header theme={theme}>
							<Appbar.Content title={'Account'}/>
							<Appbar.Action icon={'logout'}/>
						</Appbar.Header>
					)
				}
			})}/>
			<Stack.Screen name={'Signin'} component={SigninPage} options={{
				headerShown: false,
				...stackBaseStyles
			}}/>
			<Stack.Screen name={'Signup'} component={SignupPage} options={{
				headerShown: false,
				...stackBaseStyles
			}}/>
		</Stack.Navigator>
	)
}

const LogoutButton = () => {
	const theme = useTheme()

	return(
		<Button style={{ alignItems: 'flex-end' }} theme={theme} icon={'logout'}/>
	)
}