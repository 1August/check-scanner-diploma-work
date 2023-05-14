import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Divider, IconButton, Text, useTheme } from 'react-native-paper'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../App'
import { useSelector } from 'react-redux'
import { Loading } from '../Loading/Loading'

export const ChecksPage = ({ navigation, route }) => {
	const theme = useTheme()

	const token = useSelector(state => state.auth.token)

	const [checks, setChecks] = useState([])
	const [loading, setLoading] = useState(false)

	const s = StyleSheet.create({
		container: {
			flex: 1,
			paddingHorizontal: 16,
		},
	})


	useEffect(() => {
		if (!checks.length) {
			setLoading(true)
			// setError('')

			const url = `${BASE_URL}/api/user/checks`
			axios.get(url, { headers: { Authorization: token }, })
				.then(res => {
					if (res.status === 304) return
					if (!res.data.data) return
					setChecks(res.data.data)
				})
				.catch(error => {
					alert(error.message)
				})
				.finally(() => {
					setLoading(false)
				})
		}
	}, [])

	function handleCheckPress (check) {
		console.log({ check })
		// navigation.navigate('CheckPage', { check })
	}

	if (loading) {
		return <Loading/>
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={s.homePage}>
				<ScrollView>
					<View style={s.container}>
						<View style={s.checks}>
							{
								checks.length === 0 ?
									<View>
										<Text>There is no scanned checks</Text>
									</View> :
									checks.map(check => (
										<View key={check?._id}>
											<TouchableOpacity
												style={{
													flexDirection: 'row',
													justifyContent: 'space-between',
													alignItems: 'center',
												}}
												onPress={() => handleCheckPress(check)}
											>
												<Text theme={theme} variant={'titleMedium'}>
													{check.checkId}
												</Text>
												<IconButton icon={'chevron-right'}/>
											</TouchableOpacity>
											<Divider/>
										</View>
									))
							}
						</View>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}
