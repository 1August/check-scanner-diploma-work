import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomePage } from '../HomePage/HomePage';
import { SignupPage } from '../SignupPage/SignupPage';
import { SupermarketPage } from '../SupermarketPage/SupermarketPage';
import { useState } from 'react';
import { ProductPage } from '../ProductPage/ProductPage';

export const HomeStackPage = () => {
    /*
            <Appbar.Header statusBarHeight={0}>
                <Appbar.BackAction onPress={() => {}}/>
                <Appbar.Content title="Title" />
            </Appbar.Header>
     */

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name={'Home'} component={HomePage} options={{ headerShown: false }}/>
            <Stack.Screen name={'Supermarket'} component={SupermarketPage}/>
            <Stack.Screen name={'Product'} component={ProductPage}/>
        </Stack.Navigator>
    )


    // const Tab = createMaterialBottomTabNavigator()
    // return (
    //     <View style={s.homePage}>
    //         <ScrollView>
    //             <View style={s.container}>
    //                 <Searchbar value={searchQuery} onChangeText={setSearchQuery} placeholder={'Search here'}
    //                            style={s.searchbar} clearIcon={'close'} theme={theme}
    //                 />
    //                 <View style={s.markets}>
    //                     {
    //                         markets.map(market => (
    //                             <Card theme={theme} mode={'elevated'} onPress={() => handleMarketPress(market)}
    //                                   key={market.id} style={s.market}>
    //                                 <Card.Title theme={theme} title={market.name} subtitle={market.description}
    //                                             right={() => <Button icon={'chevron-right'}/>}
    //                                             subtitleNumberOfLines={1}
    //                                 />
    //                             </Card>
    //                         ))
    //                     }
    //                 </View>
    //                 <View style={s.products}>
    //                     {
    //                         products.map(product => (
    //                             <Card style={s.product} theme={theme} onPress={() => handleProductPress(product)}
    //                                   key={product.id}>
    //                                 <Card.Cover theme={{ roundness: 1 }}
    //                                             source={{ uri: 'https://picsum.photos/700' }}/>
    //                                 <Card.Title title={product.name} theme={theme}/>
    //                                 <Card.Content theme={theme}>
    //                                     <Text theme={theme} style={{ marginBottom: 8 }}>
    //                                         {product.description}
    //                                     </Text>
    //                                 </Card.Content>
    //                             </Card>
    //                         ))
    //                     }
    //                 </View>
    //             </View>
    //         </ScrollView>
    //
    //         {/*<Tab.Navigator>*/}
    //         {/*    <Tab.Screen name={'Supermarket'} component={SupermarketPage} options={{*/}
    //         {/*        tabBarBadge: false*/}
    //         {/*    }}/>*/}
    //         {/*</Tab.Navigator>*/}
    //     </View>
    // )
}


{/*<FlatList*/
}
{/*    data={products}*/
}
{/*    style={s.products}*/
}
{/*    columnWrapperStyle={{ justifyContent: 'space-between', flexWrap: 'wrap' }}*/
}
{/*    numColumns={2}*/
}
{/*    keyExtractor={(item) => item.id}*/
}
{/*    initialNumToRender={100}*/
}
{/*    renderItem={({ item: product }) => (*/
}
{/*        <Card style={s.product}>*/
}
{/*            <TouchableOpacity key={product.id}>*/
}
{/*                <Card.Cover theme={{ roundness: 0 }}*/
}
{/*                            source={{ uri: 'https://picsum.photos/700' }}/>*/
}
{/*                <Card.Title title={product.name}/>*/
}
{/*                <Card.Content>*/
}
{/*                    <Text style={{*/
}
{/*                        color: theme.colors.secondary,*/
}
{/*                        marginBottom: 8,*/
}
{/*                    }}>{product.description}</Text>*/
}
{/*                </Card.Content>*/
}
{/*            </TouchableOpacity>*/
}
{/*        </Card>*/
}
{/*    )}>*/
}
{/*</FlatList>*/
}