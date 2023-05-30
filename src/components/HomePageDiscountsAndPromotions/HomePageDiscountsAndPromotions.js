import { FlatList, StyleSheet, View } from 'react-native'
import { Card, IconButton, Text, useTheme } from 'react-native-paper'
import magnumLogo from '../../assets/magnumLogo.png'
import galmartLogo from '../../assets/galmartLogo.png'
import smallLogo from '../../assets/smallLogo.jpg'
import { useSelector } from 'react-redux'

export const HomePageDiscountsAndPromotions = ({ navigation }) => {
	const theme = useTheme()
	const strings = useSelector(state => state.localization.strings)

	const supermarkets = [
		{
			title: strings.galmartDiscounts,
			img: galmartLogo,
			onPress: () => navigation.navigate('HomeStackPage', {
				screen: 'GalmartDiscountsPage',
			}),
		},
		{
			title: strings.smallDiscounts,
			img: smallLogo,
			onPress: () => navigation.navigate('HomeStackPage', {
				screen: 'SmallDiscountsPage',
			}),
		},
		{
			title: strings.magnumDiscounts,
			img: magnumLogo,
			onPress: () => navigation.navigate('HomeStackPage', {
				screen: 'MagnumDiscountsPage',
			}),
		},
		{
			title: strings.magnumPromotions,
			img: magnumLogo,
			onPress: () => navigation.navigate('HomeStackPage', {
				screen: 'MagnumPromotionsPage',
			}),
		},
	]

	const s = StyleSheet.create({
		discountsAndPromotions: {
			paddingVertical: 8,
		},
		discountsAndPromotionsTitleWrapper: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center',

			marginBottom: 16,
			paddingHorizontal: 8,
		},
		discountsAndPromotionsTitle: {},
		supermarketsRowFlatlistWrapper: {},
		supermarketsRowFlatlist: {
			paddingHorizontal: 16,
		},
		supermarketsRowCard: {
			marginRight: 24,
		},
		supermarketsRowCardCover: {
			height: 96,
			backgroundColor: theme.colors.background,
		},
	})

	return (
		<View
			style={s.discountsAndPromotions}
		>
			<View style={s.discountsAndPromotionsTitleWrapper}>
				<IconButton icon={'sale'}/>
				<Text
					variant={'headlineMedium'}
					style={s.discountsAndPromotionsTitle}
				>
					{strings.discountsAndPromotions}
				</Text>
			</View>
			<View style={s.supermarketsRowFlatlistWrapper}>
				<FlatList
					horizontal={true}
					data={supermarkets}
					style={s.supermarketsRowFlatlist}
					renderItem={({ item }) => (
						<Card
							style={s.supermarketsRowCard}
							onPress={item.onPress}
							mode={'elevated'}
							elevation={0}
						>
							<Card.Cover
								style={s.supermarketsRowCardCover}
								source={item.img}
								resizeMode={'contain'}
							/>
							<Card.Title title={item.title}/>
						</Card>
					)}
				/>
			</View>
		</View>
	)
}
