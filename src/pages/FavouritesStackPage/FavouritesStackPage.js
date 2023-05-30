import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FavouritesPage } from '../FavouritesPage/FavouritesPage'
import { useStackHeaderStyles } from '../../hooks/useStackHeaderStyles'

export const FavouritesStackPage = () => {
	const Stack = createNativeStackNavigator()
	const headerStyles = useStackHeaderStyles()

	const favouritesStackScreens = [
		{
			name: 'FavouritesPage',
			children: props => <FavouritesPage {...props}/>,
			options: {
				...headerStyles,
			}
		}
	]

	return (
		<Stack.Navigator initialRouteName={'FavouritesPage'}>
			{
				favouritesStackScreens.map(screen => (
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
