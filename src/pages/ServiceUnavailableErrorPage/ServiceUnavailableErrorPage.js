import { ErrorPage } from '../ErrorPage/ErrorPage'

export const ServiceUnavailableErrorPage = ({ navigation }) => {
	function handleGoHomePress() {
		// navigation.navigate('HomeStackPage', {
		// 	screen: 'HomePage',
		// })
		navigation.replace('HomePage')
	}

	return (
		<ErrorPage
			navigation={navigation}
			message={'Service unavailable. Please, try later.'}
			onGoHomePress={handleGoHomePress}
		/>
	)
}
