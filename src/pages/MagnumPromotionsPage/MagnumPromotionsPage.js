import { StyleSheet, useWindowDimensions, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { EffectiveSales } from '../../components/EffectiveSales/EffectiveSales'
import { useState } from 'react'
import { SceneMap, TabView } from 'react-native-tab-view'

const AnonsSales = () => {
	return (
		<View>
			<Text>
				Anons sales
			</Text>
		</View>
	)
}

const OldSales = () => {
	return (
		<View>
			<Text>
				Old sales
			</Text>
		</View>
	)
}

export const MagnumPromotionsPage = ({ navigation, route }) => {
	const theme = useTheme()

	const s = StyleSheet.create({
		tab: {},
	})

	const renderScene = SceneMap({
		effectiveSales: () => <EffectiveSales navigation={navigation}/>,
		anonsSales: AnonsSales,
		oldSales: OldSales,
	})

	const layout = useWindowDimensions()

	const [index, setIndex] = useState(0)
	const [routes] = useState([
		{ key: 'effectiveSales', title: 'Effective' },
		{ key: 'anonsSales', title: 'Anons' },
		{ key: 'oldSales', title: 'Old' },
	])

	return (
		<TabView
			pagerStyle={s.tab}
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
		/>
	)
}
