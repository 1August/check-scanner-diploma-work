import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { IconButton, Text, useTheme } from 'react-native-paper'
import { useId } from 'react'
import { useSelector } from 'react-redux'

export const HomePageServices = ({ navigation, route }) => {
	const strings = useSelector(state => state.localization.strings)

	const services = [
		{
			id: useId(),
			icon: 'qrcode-scan',
			children: strings.qrScan,
			size: 40,
			onPress: () => {
				navigation.navigate('QRScannerStackPage', {
					screen: 'QRScannerPage',
				})
			},
		},
		{
			id: useId(),
			icon: 'chart-line',
			children: strings.chart,
			size: 40,
			onPress: () => {
				navigation.navigate('HomeStackPage', {
					screen: 'ChartPage',
				})
			},
		},
		{
			id: useId(),
			icon: 'google-maps',
			children: strings.map,
			size: 40,
			onPress: () => {
				navigation.navigate('HomeStackPage', {
					screen: 'MapPage',
				})
			},
		},
		{
			id: useId(),
			icon: 'beaker-check',
			children: strings.cheques,
			size: 40,
			onPress: () => {
				navigation.navigate('AccountStackPage', {
					screen: 'ChequesPage',
				})
			},
		},
	]

	const s = StyleSheet.create({
		servicesWrapper: {
			borderWidth: 0,
		},
		services: {
			width: '100%',

			flexWrap: 'wrap',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		service: {
			// width: '25%',

			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',

			paddingTop: 8,
			paddingBottom: 16,
		},
		serviceCellText: {
			textAlign: 'center',
		},
	})

	return (
		<View style={s.servicesWrapper}>
			<View style={s.services}>
				{
					services.map(service => (
						<TouchableOpacity
							key={service.id}
							style={s.service}
							onPress={service.onPress}
						>
							<View style={s.tableCellView}>
								<IconButton
									icon={service.icon}
									children={service.children}
									size={service.size}
								/>
								<Text style={s.serviceCellText}>{service.children}</Text>
							</View>
						</TouchableOpacity>
					))
				}
			</View>
		</View>
	)
}
