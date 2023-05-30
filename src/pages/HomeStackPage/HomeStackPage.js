import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomePage } from '../HomePage/HomePage'
import { ProductPage } from '../ProductPage/ProductPage'
import { SearchPage } from '../SearchPage/SearchPage'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { MagnumDiscountsPage } from '../MagnumDiscountsPage/MagnumDiscountsPage'
import { MagnumPromotionsPage } from '../MagnumPromotionsPage/MagnumPromotionsPage'
import { checkAuth } from '../../services/auth.service'
import { checkFavouritesStorage } from '../../services/favourites.service'
import { TopProductsPage } from '../TopProductsPage/TopProductsPage'
import { GalmartDiscountsPage } from '../GalmartDiscountsPage/GalmartDiscountsPage'
import { SmallDiscountsPage } from '../SmallDiscountsPage/SmallDiscountsPage'
import { ChartPage } from '../ChartPage/ChartPage'
import { useStackHeaderStyles } from '../../hooks/useStackHeaderStyles'
import { checkLocalizationLanguage } from '../../services/localization.service'
import { MapPage } from '../MapPage/MapPage'

export const HomeStackPage = () => {
	const strings = useSelector(state => state.localization.strings)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(checkAuth())
		dispatch(checkFavouritesStorage())
		dispatch(checkLocalizationLanguage())
	}, [])

	const Stack = createNativeStackNavigator()
	const headerStyles = useStackHeaderStyles()

	const homePageStackScreens = [
		{
			name: 'HomePage',
			children: (props) => <HomePage {...props}/>,
			options: {
				headerShown: false,
			},
		},
		{
			name: 'ProductPage',
			children: (props) => <ProductPage {...props}/>,
			options: ({ route }) => ({
				title: route.params.product?.name,
				...headerStyles,
			}),
		},
		{
			name: 'SearchPage',
			children: (props) => <SearchPage {...props}/>,
			options: ({ route }) => ({
				title: route.params?.searchQuery || strings.search,
				...headerStyles,
			}),
		},
		{
			name: 'ChartPage',
			children: (props) => <ChartPage {...props}/>,
			options: {
				title: strings.chart,
				...headerStyles,
			},
		},
		{
			name: 'MagnumDiscountsPage',
			children: (props) => <MagnumDiscountsPage {...props}/>,
			options: {
				title: strings.magnumDiscounts,
				...headerStyles,
			},
		},
		{
			name: 'MagnumPromotionsPage',
			children: (props) => <MagnumPromotionsPage {...props}/>,
			options: {
				title: strings.magnumPromotions,
				...headerStyles,
			},
		},
		{
			name: 'GalmartDiscountsPage',
			children: (props) => <GalmartDiscountsPage {...props}/>,
			options: {
				title: strings.galmartDiscounts,
				...headerStyles,
			},
		},
		{
			name: 'SmallDiscountsPage',
			children: (props) => <SmallDiscountsPage {...props}/>,
			options: {
				title: strings.smallDiscounts,
				...headerStyles,
			},
		},
		{
			name: 'TopProductsPage',
			children: (props) => <TopProductsPage {...props}/>,
			options: {
				title: strings.topProducts,
				...headerStyles,
			},
		},
		{
			name: 'MapPage',
			children: (props) => <MapPage {...props}/>,
			options: {
				title: strings.map,
				...headerStyles,
			},
		},
	]

	return (
		<Stack.Navigator initialRouteName={'HomePage'}>
			{
				homePageStackScreens.map(screen => (
					<Stack.Screen
						key={screen.name}
						name={screen.name}
						children={screen.children}
						options={screen.options}
					/>
				))
			}
		</Stack.Navigator>
	)
}
