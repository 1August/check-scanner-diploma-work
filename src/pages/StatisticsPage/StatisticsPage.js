import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../../../App'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Loading } from '../Loading/Loading'

export const StatisticsPage = () => {
	const theme = useTheme()

	const [nextPurchaseDate, setNextPurchaseDate] = useState(new Date())
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const token = useSelector(state => state.auth.token)

	useEffect(() => {
		getPrediction()
	}, [])

	function getPrediction() {
		setLoading(true)
		setError('')

		const url = `${BASE_URL}/api/user/predict`

		axios.get(url, {
			headers: {
				Authorization: token,
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				Expires: '0',
			},
		})
			.then(res => {
				const predictedDate = new Date(res.data.data)
				setNextPurchaseDate(predictedDate)
			})
			.catch(error => {
				setError(error.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const s = StyleSheet.create({
		statisticsPage: {
			paddingTop: 16
		},
		container: {
			flex: 1,
			paddingHorizontal: 16,
		},
		predictionDate: {
			marginBottom: 16
		}
	})

	if (loading) return <Loading/>
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={s.statisticsPage}>
				<ScrollView>
					<View style={s.container}>
						{
							nextPurchaseDate &&
							<Text theme={theme} variant={'titleLarge'} style={s.predictionDate}>
								Next purchase date:
								{`${nextPurchaseDate.getDate()}-${nextPurchaseDate.getMonth() + 1}-${nextPurchaseDate.getFullYear()}`}
							</Text>
						}
						<Button onPress={getPrediction} mode={'outlined'}>Make prediction</Button>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}
