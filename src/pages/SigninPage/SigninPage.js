import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput, useTheme } from 'react-native-paper'
import { useState } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../../redux/slices/authSlice'
import { BASE_URL } from '../../../App'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const SigninPage = ({ navigation, route }) => {
	const theme = useTheme()

	const dispatch = useDispatch()
	const token = useSelector(state => state.auth.token)

	const [userData, setUserData] = useState({ email: '', password: '' })
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const [secureTextEntry, setSecureTextEntry] = useState(true)

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
		setError('')
		setUserData(prev => ({ ...prev, [input.name]: input.value }))
	}

	const handleLoginPress = () => {
		setLoading(true)
		setError('')

		const url = `${BASE_URL}/api/auth/signin`

		axios.post(url, { ...userData })
			.then(async res => {
				try {
					const decoded = jwt_decode(res.data.data)
					const auth = { id: decoded.userId, email: decoded.email, token: res.data.data }
					await AsyncStorage.setItem('auth', JSON.stringify(auth))
					dispatch(loginSuccess(auth))
				} catch (error) {
					console.log(error.message)
					alert(error.message)
				}
			})
			.catch(error => {
				setError(error.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const handleSecureTextEntryPress = () => {
		setSecureTextEntry(isSecure => !isSecure)
	}

	const handleForgotPasswordPress = () => {
		console.log('Forgot password press')
	}

	const handleGoRegisterPress = () => {
		navigation.navigate('Signup')
	}

	if (token) return navigation.popToTop()
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={s.signinPage}>
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
							<Button theme={theme} style={{ alignSelf: 'flex-end' }} onPress={handleForgotPasswordPress}>
								Forgot password?
							</Button>
						</View>
						<View style={s.loginBtns}>
							<View>
								<Button
									theme={theme} mode={'contained'}
									onPress={handleLoginPress}
									disabled={loading}
								>
									{loading ? 'Loading' : 'Log in'}
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
							<Text theme={theme} style={{ textAlign: 'center', marginBottom: 8 }}>Have no account
								yet?</Text>
							<Button onPress={handleGoRegisterPress} theme={theme} mode={'outlined'}>
								Create new account
							</Button>
						</View>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}
