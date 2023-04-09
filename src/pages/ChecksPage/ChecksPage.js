import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Divider, IconButton, Text, useTheme } from 'react-native-paper'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../App'
import { useSelector } from 'react-redux'
import { Loading } from '../Loading/Loading'
// import { layers, sequential, tensor2d } from '@tensorflow/tfjs'
import { Tensor } from '@tensorflow/tfjs'
// import '@tensorflow/tfjs-core'
// import '@tensorflow/tfjs-react-native'

// async function makePredictions(checks) {
// 	// Convert the dates to Unix timestamps
// 	const timestamps = checks.map(check => new Date(check.date).getTime() / 1000)
//
// 	// Normalize the timestamps to values between 0 and 1
// 	const minTimestamp = Math.min(...timestamps)
// 	const maxTimestamp = Math.max(...timestamps)
// 	const normalizedTimestamps = timestamps.map(timestamp => (timestamp - minTimestamp) / (maxTimestamp - minTimestamp))
//
// 	// Create a sliding window of input and output data
// 	const windowSize = 10
// 	const inputSequences = []
// 	const outputSequences = []
// 	for (let i = 0; i < normalizedTimestamps.length - windowSize - 1; i++) {
// 		const inputSequence = normalizedTimestamps.slice(i, i + windowSize)
// 		const outputSequence = normalizedTimestamps[i + windowSize]
// 		inputSequences.push(inputSequence)
// 		outputSequences.push(outputSequence)
// 	}
//
// 	// Convert the input and output sequences to tensors
// 	const inputTensor = tensor(inputSequences)
// 	const outputTensor = tensor(outputSequences)
//
// 	console.log({ inputTensor, outputTensor })
//
// 	// const lstmModel = tf.sequential()
// 	// lstmModel.add(
// 	// 	tf.layers.lstm({
// 	// 		units: 32,
// 	// 		inputShape: [windowSize, 1,],
// 	// 	})
// 	// )
// 	// lstmModel.add(tf.layers.dense({ units: 1, }))
// 	//
// 	// // Compile the model
// 	// lstmModel.compile({ optimizer: 'adam', loss: 'meanSquaredError', })
// 	//
// 	// // Train the model
// 	// const history = await lstmModel.fit(inputTensor, outputTensor, {
// 	// 	epochs: 100,
// 	// 	validationSplit: 0.2,
// 	// })
// 	//
// 	// // Get the last window of input data
// 	// const lastInputSequence = normalizedTimestamps.slice(-windowSize)
// 	//
// 	// // Convert the input sequence to a tensor
// 	// const lastInputTensor = tf.tensor(lastInputSequence, [1, windowSize, 1,])
// 	//
// 	// // Make a prediction for the next timestamp
// 	// const nextNormalizedTimestamp = await lstmModel.predict(lastInputTensor).data()
// 	// const nextTimestamp = nextNormalizedTimestamp * (maxTimestamp - minTimestamp) + minTimestamp
// 	//
// 	// // Convert the next timestamp back to a Date object
// 	// const nextDate = new Date(nextTimestamp * 100)
// 	//
// 	// console.log({ nextDate, })
// 	//
// 	// return nextDate
// }

// function makePredictions() {
// 	// Define the training data
// 	const dates = [new Date('2021-01-01'), new Date('2021-02-01'), new Date('2021-03-01')]
// 	const x = Array.from(dates.map(date => date.getTime() / 1000)) // Convert dates to Unix timestamps
// 	const y = [1, 2, 3] // The target values to predict (in this case, the month number)
//
// 	console.log({ x, y })
//
// 	// Convert the training data to tensors
// 	const xs = tensor2d(x, [x.length, 1])
// 	const ys = tensor2d(y, [y.length, 1])
//
// 	console.log({ xs, ys })
//
// 	// Define the model
// 	const model = sequential()
// 	model.add(layers.dense({ units: 1, inputShape: [1] }))
//
// 	// Compile the model
// 	model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' })
//
// 	// Train the model
// 	model.fit(xs, ys, { epochs: 100 }).then(() => {
// 		// Use the model to predict the next date of buy
// 		const lastDate = new Date('2021-03-01')
// 		const nextDate = new Date(
// 			(
// 				lastDate.getTime() / 1000 + model
// 					.predict(tensor2d([[lastDate.getTime() / 1000]]))
// 					.dataSync()[0] * 30 * 24 * 60 * 60
// 			) * 1000)
// 		console.log(nextDate)
// 	})
// }

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

	function getPrediction() {
		const url = `${BASE_URL}/api/checks/predict`

		axios.post(url, {}, {
			headers: {
				Authorization: token,
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				Expires: '0',
			},
		})
			.then(res => {
				// makePredictions(res.data.data)
			})
			.catch(error => {
				console.log(error)
			})
	}

	useEffect(() => {
		if (!checks.length) {
			setLoading(true)

			const url = `${BASE_URL}/api/checks`
			axios.get(url, {
				headers: {
					Authorization: token,
					'Cache-Control': 'no-cache',
					Pragma: 'no-cache',
					Expires: '0',
				},
			})
				.then(res => {
					setChecks(res.data.data || [])
				})
				.catch(error => {
					alert(error.message)
				})
				.finally(() => {
					setLoading(false)
				})
		}
	}, [])

	if (loading) {
		return <Loading/>
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={s.homePage}>
				<ScrollView>
					<View style={s.container}>
						<Button onPress={getPrediction}>Make prediction</Button>
						{
							checks?.map(check => (
								<View key={check}>
									<TouchableOpacity
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}
										onPress={() => navigation.navigate('CheckPage', { check })}
									>
										<Text theme={theme} variant={'titleMedium'}>
											{check}
										</Text>
										<IconButton icon={'chevron-right'}/>
									</TouchableOpacity>
									<Divider/>
								</View>
							))
						}
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}
