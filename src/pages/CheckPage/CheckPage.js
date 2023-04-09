import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native'
import { DataTable, useTheme, Text } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { Loading } from '../Loading/Loading'
import { BASE_URL } from '../../../App'
import { useSelector } from 'react-redux'
import axios from 'axios'

export const CheckPage = ({ navigation, route }) => {
	const theme = useTheme()

	const token = useSelector(state => state.auth.token)

	const [check, setCheck] = useState(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (check == null) {
			setLoading(true)

			const url = `${BASE_URL}/api/checks/${route.params.check}`
			axios.get(url, {
				headers: {
					Authorization: token,
					'Cache-Control': 'no-cache',
					Pragma: 'no-cache',
					Expires: '0',
				},
			})
				.then(res => {
					console.log('Check data:', res.data)
					setCheck(res.data.data)
				})
				.catch(error => {
					alert(error.message)
				})
				.finally(() => {
					setLoading(false)
				})
		}
	}, [route.params.check])

	if (loading) {
		return <Loading/>
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={s.homePage}>
				<ScrollView>
					<View style={s.container}>
						<View>
							<Text theme={theme} variant={'titleMedium'}>
								{new Date(check?.date).toDateString()}
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
								check?.checkRows.map(row => (
									<DataTable.Row>
										<DataTable.Cell style={{ flex: 4 }}>{row.name}</DataTable.Cell>
										<DataTable.Cell numeric style={{ flex: 1 }}>{row.cost}</DataTable.Cell>
										<DataTable.Cell numeric style={{ flex: 1 }}>{row.count}</DataTable.Cell>
										<DataTable.Cell numeric style={{ flex: 1 }}>{row.overall}</DataTable.Cell>
									</DataTable.Row>
								))
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

const s = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 8
	}
})
