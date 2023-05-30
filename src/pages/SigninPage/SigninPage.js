import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput, useTheme } from 'react-native-paper'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../services/auth.service'
import { setError } from '../../redux/slices/authSlice'
import { useSafeAreaViewStyles } from '../../hooks/useSafeAreaViewStyles'

export const SigninPage = ({ navigation, route }) => {
	const theme = useTheme()
	const safeAreaViewStyles = useSafeAreaViewStyles()
	const strings = useSelector(state => state.localization.strings)

	const token = useSelector(state => state.auth.token)
	const error = useSelector(state => state.auth.error)
	const loading = useSelector(state => state.auth.loading)
	const status = useSelector(state => state.auth.status)

	const dispatch = useDispatch()

	const [userData, setUserData] = useState({ email: '', password: '' })
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
		setUserData(prev => ({ ...prev, [input.name]: input.value.trimEnd() }))
	}

	const handleLoginPress = () => {
		if (!userData.email || !userData.password) return dispatch(setError('Field is empty'))

		dispatch(login(userData))
	}

	const handleSecureTextEntryPress = () => {
		setSecureTextEntry(!secureTextEntry)
	}

	const handleForgotPasswordPress = () => {
		console.log('Forgot password press')
	}

	const handleGoRegisterPress = () => {
		navigation.navigate('SignupPage')
	}

	if (token) return navigation.popToTop()
	return (
		<View style={s.signinPage}>
			<ScrollView contentContainerStyle={{ flex: 1 }}>
				<View style={s.container}>
					<View style={s.inputs}>
						{error && <Text style={{ color: 'red' }}>{error}</Text>}
						<TextInput
							autoCapitalize={'none'}
							value={userData.email}
							onChangeText={email => handleChangeData({ name: 'email', value: email })}
							style={s.input} theme={theme}
							label={strings.email} placeholder={strings.enterYourEmail}
							left={<TextInput.Icon icon='email'/>}
							mode={'outlined'}
						/>
						<TextInput
							autoCapitalize={'none'}
							value={userData.password}
							onChangeText={password => handleChangeData({
								name: 'password',
								value: password,
							})}
							style={s.input} theme={theme}
							label={strings.password}
							placeholder={strings.secretPassword} secureTextEntry={secureTextEntry}
							left={<TextInput.Icon icon='lock'/>}
							right={<TextInput.Icon icon='eye' onPress={handleSecureTextEntryPress}/>}
							mode={'outlined'}
						/>
						<Button
							theme={theme}
							style={{ alignSelf: 'flex-end' }}
							onPress={handleForgotPasswordPress}
							disabled={true}
						>
							{strings.forgotPassword}?
						</Button>
					</View>
					<View style={s.loginBtns}>
						<View>
							<Button
								theme={theme} mode={'contained'}
								onPress={handleLoginPress}
								disabled={loading}
							>
								{loading ? strings.loading : strings.logIn}
							</Button>
						</View>
						<View style={s.loginOwnOrService}>
							{/*<View style={s.line}></View>*/}
							<Text theme={theme}>{strings.or}</Text>
							{/*<View style={s.line}></View>*/}
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
						<Text
							theme={theme}
							style={{ textAlign: 'center', marginBottom: 8 }}
						>
							{strings.haveNotAccountYet}?
						</Text>
						<Button onPress={handleGoRegisterPress} theme={theme} mode={'outlined'}>
							{strings.createNewAccount}
						</Button>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}
