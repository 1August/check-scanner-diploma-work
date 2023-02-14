import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Button, Card, Searchbar, Text, useTheme } from 'react-native-paper'
import { useState } from 'react';

export const HomePage = ({ navigation, route }) => {
    const theme = useTheme()

    const [searchQuery, setSearchQuery] = useState('')

    const s = StyleSheet.create({
        homePage: {
            flex: 1,

            backgroundColor: theme.colors.background,

            paddingTop: StatusBar.currentHeight + 16,
            paddingBottom: 16,
        },
        container: {
            flex: 1,
            paddingHorizontal: 16,
        },
        header1: {
            fontSize: 16,
            color: theme.colors.primary,
        },
        header2: {
            fontSize: 14,
            color: theme.colors.primary,
        },
        header3: {
            fontSize: 12,
            color: theme.colors.primary,
        },
        text: {
            color: theme.colors.primary,
        },

        searchbar: {
            marginBottom: 16,
        },
        markets: {},
        market: {
            marginBottom: 8,
        },
        marketText: {},
        marketIcon: {},

        products: {
            marginTop: 16,

            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        product: {
            marginBottom: 12,
            width: '48%',

            // backgroundColor: '#fff',
            // borderRadius: theme.roundness,


            shadowColor: '#000',
            shadowOffset: {
                width: 2,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        },
        productImage: {
            borderRadius: 0,
        },
    })

    const markets = [
        {
            id: 1,
            name: 'Small',
            description: 'Lorem ipsum dolor sit amet.',
        },
        {
            id: 2,
            name: 'Galmart',
            description: 'Lorem ipsum dolor sit amet.',
        },
        {
            id: 3,
            name: 'Magnum',
            description: 'Lorem ipsum dolor sit amet.',
        },
    ]
    const products = [
        {
            id: 1,
            name: 'Product 1',
            description: 'lorem ipsum',
        },
        {
            id: 2,
            name: 'Product 2',
            description: 'lorem ipsum',
        },
        {
            id: 3,
            name: 'Product 3',
            description: 'lorem ipsum',
        },
        {
            id: 4,
            name: 'Product 4',
            description: 'lorem ipsum',
        },
        {
            id: 5,
            name: 'Product 5',
            description: 'lorem ipsum',
        },
        {
            id: 6,
            name: 'Product 6',
            description: 'lorem ipsum',
        },
        {
            id: 7,
            name: 'Product 7',
            description: 'lorem ipsum',
        },
        {
            id: 8,
            name: 'Product 7',
            description: 'lorem ipsum',
        },
        {
            id: 9,
            name: 'Product 7',
            description: 'lorem ipsum',
        },
        {
            id: 10,
            name: 'Product 7',
            description: 'lorem ipsum',
        },
        {
            id: 11,
            name: 'Product 7',
            description: 'lorem ipsum',
        },
    ]

    const handleMarketPress = (market) => {
        console.log(`Searching market ${market.id}. ${market.name}`)

        navigation.navigate('Supermarket', {
            name: market.name,
        })
    }

    const handleProductPress = (product) => {
        console.log(`Clicked product ${product.id}`)

        navigation.navigate('Product', { ...product })
    }

    return (
        <View style={s.homePage}>
            <ScrollView>
                <View style={s.container}>
                    <Searchbar value={searchQuery} onChangeText={setSearchQuery} placeholder={'Search here'}
                               style={s.searchbar} clearIcon={'close'} theme={theme}
                    />
                    <View style={s.markets}>
                        {
                            markets.map(market => (
                                <Card theme={theme} mode={'elevated'} onPress={() => handleMarketPress(market)}
                                      key={market.id} style={s.market}>
                                    <Card.Title theme={theme} title={market.name} subtitle={market.description}
                                                right={() => <Button icon={'chevron-right'}/>}
                                                subtitleNumberOfLines={1}
                                    />
                                </Card>
                            ))
                        }
                    </View>
                    <View style={s.products}>
                        {
                            products.map(product => (
                                <Card style={s.product} theme={theme} onPress={() => handleProductPress(product)}
                                      key={product.id}>
                                    <Card.Cover theme={{ roundness: 1 }}
                                                source={{ uri: 'https://picsum.photos/700' }}/>
                                    <Card.Title title={product.name} theme={theme}/>
                                    <Card.Content theme={theme}>
                                        <Text theme={theme} style={{ marginBottom: 8 }}>
                                            {product.description}
                                        </Text>
                                    </Card.Content>
                                </Card>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}