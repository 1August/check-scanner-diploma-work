import { ScrollView, StyleSheet, View } from 'react-native'
import { HomePageServices } from '../../components/HomePageServices/HomePageServices'
import { BoldDivider } from '../../components/BoldDivider/BoldDivider'
import {
	HomePageDiscountsAndPromotions,
} from '../../components/HomePageDiscountsAndPromotions/HomePageDiscountsAndPromotions'
import {
	HomePagePersonalizedProducts,
} from '../../components/HomePagePersonalizedProducts/HomePagePersonalizedProducts'
import { HomePageTopProducts } from '../../components/HomePageTopProducts/HomePageTopProducts'
import { HomePageSearch } from '../../components/HomePageSearch/HomePageSearch'

export const HomePage = ({ navigation, route }) => {
	const s = StyleSheet.create({
		homePage: {},
		container: {},
	})

	return (
		<View style={s.homePage}>
			<ScrollView>
				<View style={s.container}>
					<HomePageSearch navigation={navigation} route={route}/>
					<BoldDivider/>
					<HomePageServices navigation={navigation} route={route}/>
					<BoldDivider/>
					<HomePageDiscountsAndPromotions navigation={navigation} route={route}/>
					<BoldDivider/>
					<HomePagePersonalizedProducts navigation={navigation} route={route}/>
					<BoldDivider/>
					<HomePageTopProducts navigation={navigation} route={route}/>
				</View>
			</ScrollView>
		</View>
	)
}
