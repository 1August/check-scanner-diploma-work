import { View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { useEffect } from 'react'

export const AccountPage = ({ navigation, route, setIsDarkTheme }) => {
	const theme = useTheme()

	useEffect(() => {
		console.log(navigation)
	}, [navigation])

	return(
		<View>
			<Text>Account page</Text>
			<Button theme={theme} onPress={() => setIsDarkTheme(prev => !prev)}>Change theme</Button>
			<Button theme={theme} onPress={() => navigation.navigate('Signin')}>Login</Button>
			<Button theme={theme} onPress={() => navigation.navigate('Signup')}>Register</Button>
		</View>
	)
}