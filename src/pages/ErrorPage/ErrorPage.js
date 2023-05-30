import { StyleSheet, View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { useSafeAreaViewStyles } from '../../hooks/useSafeAreaViewStyles'

export const ErrorPage = ({ navigation, message, onGoHomePress, onRefresh }) => {
	const theme = useTheme()

	const safeAreaViewStyles = useSafeAreaViewStyles()

	console.log('Error page', message)

	const s = StyleSheet.create({
		errorPage: {
			height: '100%',
			flex: 1,
		},
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
		errorMessage: {
			color: theme.colors.error,
		},
		buttonGroup: {
			justifyContent: 'space-between',
			flexDirection: 'row',
		},
	})

	function handleGoHomePress() {
		navigation.navigate('HomeStackPage')
	}

	return (
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
					{
						onRefresh && <Button
							icon={'refresh'}
							theme={theme}
							onPress={onRefresh}
						>
							Refresh
						</Button>
					}
				</View>
			</View>
		</View>
	)
}
