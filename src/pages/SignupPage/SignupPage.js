import { ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput, useTheme } from 'react-native-paper'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../services/auth.service'
import { useFocusEffect } from '@react-navigation/native'
import { setError } from '../../redux/slices/authSlice'
import { useSafeAreaViewStyles } from '../../hooks/useSafeAreaViewStyles'

export const SignupPage = ({ navigation, route }) => {
	const token = useSelector(state => state.auth.token)
	const dispatch = useDispatch()
	const strings = useSelector(state => state.localization.strings)

	const safeAreaViewStyles = useSafeAreaViewStyles()

	const [signupPageVisible, setSignupPageVisible] = useState(false)
	const [userData, setUserData] = useState({ name: '', email: '', password: '' })


	const error = useSelector(state => state.auth.error)
	const loading = useSelector(state => state.auth.loading)
	const status = useSelector(state => state.auth.status)

	const [secureTextEntry, setSecureTextEntry] = useState(true)

	useFocusEffect(() => {
		setSignupPageVisible(true)
		return () => {
			setSignupPageVisible(false)
		}
	})

	const handleChangeData = (input) => {
		setUserData(prev => ({ ...prev, [input.name]: input.value.trimEnd() }))
	}

	const handleRegisterPress = () => {
		if (!userData.name || !userData.email || !userData.password) return dispatch(setError('Field is empty'))

		dispatch(register(userData))
	}

	const handleSecureTextEntryPress = () => {
		setSecureTextEntry(isSecure => !isSecure)
	}

	const handleGoLoginPress = () => {
		navigation.navigate('AccountStackPage', {
			screen: 'SigninPage',
		})
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

	if (token) return navigation.popToTop()
	return signupPageVisible ? (
		<View style={s.signupPage}>
			<ScrollView contentContainerStyle={{ flex: 1 }}>
				<View style={s.container}>
					<View style={s.inputs}>
						{error && <Text style={{ color: 'red' }}>{error}</Text>}
						<TextInput
							value={userData.name}
							onChangeText={name => handleChangeData({ name: 'name', value: name })}
							style={s.input} theme={theme}
							label={strings.name} placeholder={strings.yourName}
							left={<TextInput.Icon icon='account'/>}
							mode={'outlined'}
						/>
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
					</View>
					<View style={s.registerBtns}>
						<View>
							<Button
								theme={theme} mode={'contained'}
								onPress={handleRegisterPress}
								disabled={loading}
							>
								{loading ? strings.loading : strings.signUp}
							</Button>
						</View>
					</View>
					<View>
						<Button onPress={handleGoLoginPress} theme={theme} mode={'outlined'}>
							{strings.iHaveAnAccount}
						</Button>
					</View>
				</View>
			</ScrollView>
		</View>
	) : null
}
