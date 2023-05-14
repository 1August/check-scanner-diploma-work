import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { DataTable, Text, useTheme } from 'react-native-paper'

export const CheckPage = ({ navigation, route }) => {
	const theme = useTheme()
	const check = route.params.check
	const checkDate = new Date(check?.date).toDateString()

	const s = StyleSheet.create({
		container: {
			flex: 1,
			paddingHorizontal: 16,
			paddingTop: 8
		}
	})

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={s.homePage}>
				<ScrollView>
					<View style={s.container}>
						<View>
							<Text
								theme={theme}
								variant={'titleMedium'}
							>
								{checkDate}
							</Text>
						</View>
						<DataTable theme={theme}>
							<DataTable.Header>
								<DataTable.Title style={{ flex: 4 }}>Product</DataTable.Title>
								<DataTable.Title numeric style={{ flex: 1 }}>Cost</DataTable.Title>
								<DataTable.Title numeric style={{ flex: 1 }}>Number</DataTable.Title>
								<DataTable.Title numeric style={{ flex: 1 }}>Overall</DataTable.Title>
							</DataTable.Header>
							{
								check?.checkRows.map(row => {
									console.log({ row })
									return (
										<DataTable.Row key={row._id}>
										<DataTable.Cell style={{ flex: 4 }}>{row.name}</DataTable.Cell>
										<DataTable.Cell numeric style={{ flex: 1 }}>{+row.cost}</DataTable.Cell>
										<DataTable.Cell numeric style={{ flex: 1 }}>{+row.count}</DataTable.Cell>
										<DataTable.Cell numeric style={{ flex: 1 }}>{+row.overall}</DataTable.Cell>
									</DataTable.Row>
									)
								})
							}
							<DataTable.Row>
								<DataTable.Cell numeric textStyle={{ fontSize: 20, fontWeight: 'bold' }}>
									{check?.total}
								</DataTable.Cell>
							</DataTable.Row>
						</DataTable>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}
