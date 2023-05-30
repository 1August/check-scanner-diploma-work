import { StyleSheet, View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export const HomePageSearch = ({ navigation, route }) => {
	const strings = useSelector(state => state.localization.strings)

	const [searchQuery, setSearchQuery] = useState('')

	const handleSearch = () => {
		navigation.navigate('SearchPage', { searchQuery })
	}

	const s = StyleSheet.create({
		searchbarWrapper: {
			paddingTop: 16,
		},
		searchbar: {
			marginHorizontal: 16,
			marginBottom: 16,
		},
	})

	return (
		<View style={s.searchbarWrapper}>
			<Searchbar
				value={searchQuery}
				onChangeText={setSearchQuery}
				placeholder={strings.searchHere}
				onSubmitEditing={handleSearch}
				style={s.searchbar}
			/>
		</View>
	)
}

