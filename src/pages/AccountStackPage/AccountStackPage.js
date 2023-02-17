import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AccountPage } from './AccountPage/AccountPage'
import { SigninPage } from '../SigninPage/SigninPage'
import { SignupPage } from '../SignupPage/SignupPage'

export const AccountStackPage = () => {
	const Stack = createNativeStackNavigator()

	return(
		<Stack.Navigator>
			<Stack.Screen name={'Account'} component={AccountPage} options={{
				// headerRight
			}}/>
			<Stack.Screen name={'Signin'} component={SigninPage} options={{
				title: 'Sign in',
				headerShown: false
			}}/>
			<Stack.Screen name={'Signup'} component={SignupPage} options={{
				title: 'Sign up',
				headerShown: false
			}}/>
		</Stack.Navigator>
	)
}