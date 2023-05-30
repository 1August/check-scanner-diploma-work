import { Linking, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Divider, IconButton, Text, useTheme } from 'react-native-paper'
import { BoldDivider } from '../../components/BoldDivider/BoldDivider'

const map = [
	{
		name: 'Magnum',
		address: 'просп. Туран 55Д, Астана 010000',
		time: 'Круглосуточно',
		types: ['Еда в заведении', 'Еда навынос', 'Доставка'],
		phone: '8 (727) 339 7340',
		stars: 4.4,
		url: 'https://go.2gis.com/nlx3n',
	},
	{
		name: 'Magnum',
		address: 'просп. Тауелсиздик 34, Астана 010010',
		time: '08:00 – 23:00',
		types: ['Еда в заведении', 'Еда навынос'],
		phone: '8 (727) 339 7340',
		stars: 4.4,
		url: 'https://go.2gis.com/2ff35',
	},
	{
		name: 'Magnum Express',
		address: 'ул. Шамши Калдаякова 2, Астана 010000',
		time: '08:00 – 23:00',
		types: ['Посещение магазина', 'Самовывоз из магазина'],
		phone: '8 (727) 339 7340',
		stars: 4.5,
		url: 'https://go.2gis.com/ctttb',
	},
	{
		name: 'Magnum Express',
		address: 'ул. Жанайдара Жирентаева 6/1, Астана 010000',
		time: '08:00 – 23:00',
		types: ['Посещение магазина', 'Самовывоз из магазина'],
		phone: '8 (727) 339 7340',
		stars: 4.2,
		url: 'https://go.2gis.com/ui77s',
	},
	{
		name: 'Magnum Express',
		address: 'Тасболат, 38-я ул. 30, Астана 010000',
		time: '08:00 – 23:00',
		types: ['Посещение магазина', 'Самовывоз из магазина'],
		phone: '8 (727) 339 7340',
		stars: 4.1,
		url: 'https://go.2gis.com/2u9lna',
	},
	{
		name: 'Galmart',
		address: 'ул. Достык д. 9, Астана 010000',
		time: '09:00 – 23:45',
		types: ['Посещение магазина', 'Доставка'],
		phone: '8 (701) 444 7557',
		stars: 4.5,
		url: 'https://go.2gis.com/ruso1',
	},
	{
		name: 'Galmart',
		address: 'Абу-Даби Плаза',
		time: '09:00 – 23:45',
		types: ['Посещение магазина'],
		phone: '8 (7172) 79 55 45',
		stars: 4.4,
		url: 'https://go.2gis.com/ais8c',
	},
	{
		name: 'Galmart',
		address: 'ул. Шамши Калдаякова 6, Астана 010000',
		time: '10:00 – 21:00',
		types: ['Посещение магазина'],
		phone: '8 (701) 444 7557',
		stars: 4.4,
		url: 'https://go.2gis.com/dbttp',
	},
	{
		name: 'Galmart',
		address: 'просп. Кабанбай Батыра 62, Астана 020000',
		time: '09:00 – 00:00',
		types: ['Посещение магазина'],
		phone: '',
		stars: 4.2,
		url: 'https://go.2gis.com/xr9rh',
	},
	{
		name: 'Small',
		address: 'просп. Туран здание 65, Астана 020000',
		time: '09:00 – 00:00',
		types: ['Посещение магазина', 'Доставка'],
		phone: '+7 800 070-71-70',
		stars: 4.5,
		url: 'https://go.2gis.com/yksyb',
	},
	{
		name: 'Small',
		address: 'просп. Абылай хан 5, Астана 010008',
		time: '09:00 – 23:00',
		types: ['Посещение магазина', 'Доставка'],
		phone: '+7 800 070-71-70',
		stars: 4.2,
		url: 'https://go.2gis.com/hxgj0',
	},
	{
		name: 'Small',
		address: 'просп. Богенбай батыра 26, Астана 010000',
		time: '09:00 – 23:00',
		types: ['Посещение магазина', 'Доставка'],
		phone: '+7 800 070-71-70',
		stars: 4.4,
		url: 'https://go.2gis.com/eamkz',
	},
	{
		name: 'Small',
		address: 'ЖК Эмират, ул. Кенесары 4, Астана 020000',
		time: '09:00 – 00:00',
		types: ['Посещение магазина', 'Доставка'],
		phone: '8 (7172) 51 23 54',
		stars: 4.3,
		url: 'https://go.2gis.com/3bpze5',
	},
	{
		name: 'Small',
		address: 'Чингиз Айтматов ул. 44, Астана 010000',
		time: '09:00 – 00:00',
		types: ['Посещение магазина', 'Самовывоз из магазина', 'Доставка'],
		phone: '+7 800 070-71-70',
		stars: 4.5,
		url: 'https://go.2gis.com/5jvzpa',
	},
]

export const MapPage = ({ navigation, route }) => {
	const theme = useTheme()

	const s = StyleSheet.create({
		paddingVertical: {
			paddingVertical: 4,
		},
		paddingHorizontal: {
			paddingHorizontal: 16,
		},
		mapPage: {},
		container: {},
		supermarket: {
			paddingBottom: 16,
		},
		supermarketTitleWrapper: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		supermarketTitle: {
			paddingLeft: 16,
			color: theme.colors.primary,
		},
		supermarketTitleIcon: {
			paddingRight: 8,
		},
		supermarketStarsWrapper: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center',
		},
		supermarketType: {
			paddingVertical: 8,
		},
	})

	return (
		<ScrollView style={s.mapPage}>
			<View style={s.container}>
				<View style={s.supermarkets}>
					{
						map.map(supermarket => (
							<TouchableOpacity
								style={s.supermarketWrapper}
								onPress={() => Linking.openURL(supermarket.url)}
							>
								<View style={s.supermarket}>
									<View style={s.supermarketTitleWrapper}>
										<Text
											variant={'headlineMedium'}
											style={s.supermarketTitle}
										>
											{supermarket.name}
										</Text>
										<IconButton
											icon={'link'}
											style={s.supermarketTitleIcon}
										/>
									</View>
									<Text style={[s.paddingHorizontal, s.paddingVertical]}>{supermarket.address}</Text>
									<Text
										variant={'titleMedium'}
										style={[s.paddingHorizontal, s.paddingVertical]}
									>
										{supermarket.phone}
									</Text>
									<Text style={[s.paddingHorizontal, s.paddingVertical]}>{supermarket.time}</Text>
									<View style={[s.supermarketStarsWrapper, s.paddingHorizontal]}>
										<Text
											variant={'titleLarge'}
											style={[s.paddingVertical]}
										>
											{supermarket.stars}
										</Text>
										<IconButton
											icon={'star'}
										/>
									</View>
									<View
										style={[s.supermarketTypes, s.paddingVertical, s.paddingHorizontal]}
									>
										{
											supermarket.types.map(supermarketType => (
												<View style={s.supermarketTypeWrapper}>
													<View style={s.supermarketType}>
														<Text>{supermarketType}</Text>
													</View>
													<Divider/>
												</View>
											))
										}
									</View>
								</View>
								<BoldDivider/>
							</TouchableOpacity>
						))
					}
				</View>
			</View>
		</ScrollView>
	)
}
