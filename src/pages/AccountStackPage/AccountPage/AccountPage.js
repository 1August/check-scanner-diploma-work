import { View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'

export const AccountPage = ({ navigation, route }) => {
	const theme = useTheme()

	return(
		<View>
			<Text>Account page</Text>
			<Button theme={theme} onPress={() => navigation.navigate('Signin')}>Login</Button>
			<Button theme={theme} onPress={() => navigation.navigate('Signup')}>Register</Button>
		</View>
	)
}