import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'

export const ErrorPage = ({ navigation, message, onGoHomePress }) => {
	const theme = useTheme()

	console.log('Error page', message)

	const s = StyleSheet.create({
		errorPage: {
			height: '100%',
			flex: 1,
		},
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		errorMessage: {
			color: theme.colors.error,
		},
		buttonGroup: {
			display: 'flex',
			justifyContent: 'space-evenly',
			flexDirection: 'row',
		}
	})

	function handleGoHomePress () {
		navigation.navigate('HomeStackPage')
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={s.errorPage}>
				<View style={s.container}>
					<Text
						style={s.errorMessage}
						variant={'titleMedium'}
					>
						{message || 'Something wrong!'}
					</Text>
					<Text
						style={s.errorMessage}
					>
						Please, go home or refresh this page.
					</Text>
					<View style={s.buttonGroup}>
						<Button
							icon={'home'}
							children={'Go home'}
							onPress={onGoHomePress ?? handleGoHomePress}
						/>
						{/*<Button */}
						{/*	icon={'update'} */}
						{/*	children={'Refresh'}*/}
						{/*	onPress={handleUpdate}*/}
						{/*/>*/}
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}
