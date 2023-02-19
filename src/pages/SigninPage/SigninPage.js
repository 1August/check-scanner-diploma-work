import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput, useTheme } from 'react-native-paper'
import { useState } from 'react'

export const SigninPage = ({ navigation, route }) => {
	const theme = useTheme()

	const [userData, setUserData] = useState({ email: '', password: '' })

	const s = StyleSheet.create({
		signinPage: {
			flex: 1,

			backgroundColor: theme.colors.background,
			// paddingVertical: 16,
		},
		container: {
			flex: 1,
			paddingHorizontal: 16,
			// paddingTop: 16,
			justifyContent: 'center',
		},

		inputs: {
			marginBottom: 32,
		},
		input: {
			marginBottom: 16,
		},

		loginBtns: {
			marginBottom: 32,
		},

		loginOwnOrService: {
			flexDirection: 'row',
			justifyContent: 'space-evenly',
			alignItems: 'center',

			marginVertical: 4,
		},
		line: {
			width: 80,
			height: 1,

			backgroundColor: '#fff',
		},


		loginServices: {
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		loginServiceBtn: {
			width: '48%',
		},
	})

	const handleChangeData = (input) => {
		setUserData(prev => ({ ...prev, [input.name]: input.value }))
	}

	const handleLoginPress = () => {
		console.log('Login press')

		const url = 'http://localhost:5000/api/auth/signin'

		fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...userData })
		})
			.then(res => res.json())
			.then(data => {
				console.log(data)
			})
			.catch(err => {
				console.log(err)
			})


		// axios.post(url, { ...userData })
		// 	.then(res => {
		// 		console.log('RES:', res.data)
		//
		// 		// const token = res.data.token
		// 	})
		// 	.catch(err => {
		// 		console.log(err)
		// 	})
	}

	const handleForgotPasswordPress = () => {
		console.log('Forgot password press')
	}

	const handleGoRegisterPress = () => {
		navigation.navigate('Signup')
	}

	return (
		<View style={s.signinPage}>
			<ScrollView contentContainerStyle={{ flex: 1 }}>
				<View style={s.container}>
					<View style={s.inputs}>
						<TextInput value={userData.email}
								   onChangeText={email => handleChangeData({ name: 'email', value: email })}
								   style={s.input} theme={theme}
								   label={'Email'} placeholder={'Enter your email'}
								   left={<TextInput.Icon icon='email-outline'/>}
								   mode={'outlined'}
						/>
						<TextInput value={userData.password}
								   onChangeText={password => handleChangeData({ name: 'password', value: password })}
								   style={s.input} theme={theme}
								   label={'Password'}
								   placeholder={'Secret password'} secureTextEntry
								   left={<TextInput.Icon icon='lock'/>} right={<TextInput.Icon icon='eye'/>}
								   mode={'outlined'}
						/>
						<Button theme={theme} style={{ alignSelf: 'flex-end' }} onPress={handleForgotPasswordPress}>
							Forgot password?
						</Button>
					</View>
					<View style={s.loginBtns}>
						<View>
							<Button
								theme={theme} mode={'contained'}
								onPress={handleLoginPress}
							>
								Log in
							</Button>
						</View>
						<View style={s.loginOwnOrService}>
							<View style={s.line}></View>
							<Text theme={theme}>Or</Text>
							<View style={s.line}></View>
						</View>
						<View style={s.loginServices}>
							<Button disabled={true} style={s.loginServiceBtn} theme={theme} mode={'outlined'}>
								Google
							</Button>
							<Button disabled={true} style={s.loginServiceBtn} theme={theme} mode={'outlined'}>
								Gitlab
							</Button>
						</View>
					</View>
					<View>
						<Text theme={theme} style={{ textAlign: 'center', marginBottom: 8 }}>Have no account yet?</Text>
						<Button onPress={handleGoRegisterPress} theme={theme} mode={'outlined'}>
							Registration
						</Button>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}