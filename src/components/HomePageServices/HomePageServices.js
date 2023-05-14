import { StyleSheet, View } from 'react-native'
import { DataTable, IconButton, Text, useTheme } from 'react-native-paper'
import { useId } from 'react'

export const HomePageServices = ({ navigation, route }) => {
	const theme = useTheme()
	const services = [
		[
			{
				id: useId(),
				icon: 'sale',
				children: 'Sales',
				size: 40,
				onPress: () => {
					navigation.navigate('SalesPage')
				},
			},
			{
				id: useId(),
				icon: 'progress-question',
				children: 'Feature',
				size: 40,
				onPress: () => {
					console.log('Navigate to new feature')
				},
			},
			{
				id: useId(),
				icon: 'progress-question',
				children: 'Feature',
				size: 40,
				onPress: () => {
					console.log('Navigate to new feature')
				},
			},
		],
		[
			{
				id: useId(),
				icon: 'progress-question',
				children: 'Feature',
				size: 40,
				onPress: () => {
					console.log('Navigate to new feature')
				},
			},
			{
				id: useId(),
				icon: 'progress-question',
				children: 'Feature',
				size: 40,
				onPress: () => {
					console.log('Navigate to new feature')
				},
			},
			{
				id: useId(),
				icon: 'progress-question',
				children: 'Feature',
				size: 40,
				onPress: () => {
					console.log('Navigate to new feature')
				},
			},
		],
	]

	const s = StyleSheet.create({
		borderRight: {
			borderRightWidth: 1,
		},
		dataTable: {
			marginBottom: 16,
		},
		serviceCell: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			paddingBottom: 8,
		},
		serviceCellText: {
			textAlign: 'center',
		},
	})

	return (
		<View>
			<DataTable style={s.dataTable}>
				{
					services.map(row => (
						<DataTable.Row
							borderless={true}
							theme={theme}
						>
							{
								row.map(cell => (
									<DataTable.Cell
										key={cell.id}
										style={s.serviceCell}
										onPress={cell.onPress}
									>
										<View>
											<IconButton
												icon={cell.icon}
												children={cell.children}
												size={cell.size}
											/>
											<Text style={s.serviceCellText}>{cell.children}</Text>
										</View>
									</DataTable.Cell>
								))
							}
						</DataTable.Row>
					))
				}
			</DataTable>
		</View>
	)
}
