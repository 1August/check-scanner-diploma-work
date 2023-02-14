import { View } from 'react-native';
import { useEffect } from 'react';
import { Button, Text, useTheme } from 'react-native-paper'

export const SupermarketPage = ({ navigation, route }) => {
    const theme = useTheme()

    // useEffect(() => {
    //     console.log('Search supermarket with name:', params.name)
    // }, [params.name])

    return(
        <View>
            <Text theme={theme}>{route.params.name} Page</Text>
        </View>
    )
}