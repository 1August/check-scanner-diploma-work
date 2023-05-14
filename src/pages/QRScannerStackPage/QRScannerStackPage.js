import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from 'react-native-paper'
import { QRScannerPage } from '../QRScannerPage/QRScannerPage'
import { QRScanEditPage } from '../QRScanEditPage/QRScanEditPage'
import { useSelector } from 'react-redux'

export const QRScannerStackPage = ({ navigation, route }) => {
	const theme = useTheme()
	const token = useSelector(state => state.auth.token)

	const Stack = createNativeStackNavigator()

	const stackBaseStyles = {
		headerTitleStyle: { color: theme.colors.primary },
		headerStyle: { backgroundColor: theme.colors.background },
		headerTintColor: theme.colors.primary,
	}

	if (!token) {
		alert('Please, authorize first.')
		navigation.navigate('Signin')
	}
	return (
		<Stack.Navigator initialRouteName={'QRScannerPage'}>
			<Stack.Screen
				name={'QRScannerPage'}
				component={({ navigation }) => <QRScannerPage navigation={navigation}/>}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen name={'QRScanEditPage'} component={QRScanEditPage} options={({ route, navigation }) => ({
				title: route.params?.url,
				...stackBaseStyles,
			})}/>
			{/*<Stack.Screen name={'Product'} component={ProductPage} options={({ route, navigation }) => ({*/}
			{/*	title: route.params.name,*/}
			{/*	...stackBaseStyles,*/}
			{/*	header: () => {*/}
			{/*		return(*/}
			{/*			<Appbar.Header theme={theme}>*/}
			{/*				<Appbar.BackAction onPress={() => navigation.goBack()}/>*/}
			{/*				<Appbar.Content title={route.params.name}/>*/}
			{/*			</Appbar.Header>*/}
			{/*		)*/}
			{/*	}*/}
			{/*})}/>*/}
			{/*<Stack.Screen*/}
			{/*	name={'SearchPage'} component={SearchPage} options={({navigation, route}) => ({*/}
			{/*	...stackBaseStyles*/}
			{/*})}*/}
			{/*/>*/}
		</Stack.Navigator>
	)
}
