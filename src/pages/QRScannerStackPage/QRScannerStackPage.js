import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Appbar, Button, useTheme } from 'react-native-paper'
import { QRScannerPage } from '../QRScannerPage/QRScannerPage'
import { QRScanEditPage } from '../QRScanEditPage/QRScanEditPage'

export const QRScannerStackPage = () => {
	const theme = useTheme()

	const Stack = createNativeStackNavigator()

	const stackBaseStyles = {
		headerTitleStyle: { color: theme.colors.primary },
		headerStyle: { backgroundColor: theme.colors.background },
		headerTintColor: theme.colors.primary
	}

	return (
		<Stack.Navigator>
			<Stack.Screen name={'QRScannerPage'} component={QRScannerPage} options={{
				headerShown: false,
			}}/>
			<Stack.Screen name={'QRScanEditPage'} component={QRScanEditPage} options={({ route, navigation }) => ({
				title: route.params.url,
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
