import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput, useTheme } from 'react-native-paper'
import { useState } from 'react'
import { BASE_URL } from '../../../App'
import axios from 'axios'

export const SignupPage = ({ navigation, route }) => {
	const [userData, setUserData] = useState({ email: '', password: '' })
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const [secureTextEntry, setSecureTextEntry] = useState(true)

	const handleChangeData = (input) => {
		setError('')
		setUserData(prev => ({ ...prev, [input.name]: input.value }))
	}

	const handleRegisterPress = () => {
		setLoading(true)

		const url = `${BASE_URL}/api/auth/signup`

		axios.post(url, { ...userData })
			.then(res => {
				alert('User created!')
				navigation.navigate('Signin')
			}, err => {
				setError(err.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const handleSecureTextEntryPress = () => {
		setSecureTextEntry(isSecure => !isSecure)
	}

	const handleGoLoginPress = () => {
		navigation.navigate('Signin')
	}

	const theme = useTheme()

	const s = StyleSheet.create({
		signupPage: {
			flex: 1,

			marginTop: StatusBar.currentHeight,
		},
		container: {
			flex: 1,
			paddingHorizontal: 16,
			justifyContent: 'center',
		},
		inputs: {
			marginBottom: 32,
		},
		input: {
			marginBottom: 16,
		},
		registerBtns: {
			marginBottom: 32,
		},
	})

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={s.signupPage}>
				<ScrollView contentContainerStyle={{ flex: 1 }}>
					<View style={s.container}>
						<View style={s.inputs}>
							{error && <Text style={{ color: 'red' }}>{error}</Text>}
							<TextInput
								value={userData.email}
								onChangeText={email => handleChangeData({ name: 'email', value: email })}
								style={s.input} theme={theme}
								label={'Email'} placeholder={'Enter your email'}
								left={<TextInput.Icon icon='email-outline'/>}
								mode={'outlined'}
							/>
							<TextInput
								value={userData.password}
								onChangeText={password => handleChangeData({
									name: 'password',
									value: password,
								})}
								style={s.input} theme={theme}
								label={'Password'}
								placeholder={'Secret password'} secureTextEntry={secureTextEntry}
								left={<TextInput.Icon icon='lock'/>}
								right={<TextInput.Icon icon='eye' onPress={handleSecureTextEntryPress}/>}
								mode={'outlined'}
							/>
						</View>
						<View style={s.registerBtns}>
							<View>
								<Button
									theme={theme} mode={'contained'}
									onPress={handleRegisterPress}
									disabled={loading}
								>
									{loading ? 'Loading' : 'Sign up'}
								</Button>
							</View>
						</View>
						<View>
							<Text theme={theme} style={{ textAlign: 'center', marginBottom: 8 }}>
								Already have an account?
							</Text>
							<Button onPress={handleGoLoginPress} theme={theme} mode={'outlined'}>
								Log in
							</Button>
						</View>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}
