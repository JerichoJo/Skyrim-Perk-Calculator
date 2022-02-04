import React, { Component } from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper';
import tree from './Components/index';
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

const styles = {
    container: {
        flex: 1
    },

    wrapper: {
        backgroundColor: 'transparent'
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },

    title: {
        width,
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: '10%',
        textAlign: 'center',
        zIndex: 3,
    },

    tree: {
        backgroundColor: '#000000',
        position: 'absolute',
        zIndex: 4
    },

    Container: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: '#000000',
    },
    image: {
        width,
        height: '100%',
        flex: 1,
        position: 'absolute',
        zIndex: 1,
    }
}

export default class extends Component {
    render() {
        return (
            <View style={styles.container}>

                <Swiper
                    style={styles.wrapper}
                    height={240}
                    dot={
                        <View
                            style={{
                                backgroundColor: 'rgba(0,0,0,.2)',
                                width: 5,
                                height: 5,
                                borderRadius: 4,
                                marginLeft: 3,
                                marginRight: 3,
                                marginTop: 3,
                                marginBottom: 3
                            }}
                        />
                    }
                    activeDot={
                        <View
                            style={{
                                backgroundColor: '#000',
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                marginLeft: 3,
                                marginRight: 3,
                                marginTop: 3,
                                marginBottom: 3
                            }}
                        />
                    }
                    paginationStyle={{
                        bottom: -23,
                        left: null,
                        right: 10
                    }}
                    loop
                >
                    <View
                        style={styles.slide}
                    >

                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../images/background/BG_Illusion.png')}
                        />
                        <Text style={styles.title}>Illusion</Text>
                        <tree.SmithingTree style={styles.tree} />

                    </View>
                    <View
                        style={styles.slide}
                    >
                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../images/background/BG_Conjuration.png')}
                        />
                        <Text style={styles.title}>Conjuration</Text>
                    </View>
                    <View
                        style={styles.slide}
                    >

                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../images/background/BG_Destruction.png')}
                        />
                        <Text style={styles.title}>Destruction</Text>
                    </View>
                    <View
                        style={styles.slide}
                    >
                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../images/background/BG_Restoration.png')}
                        />
                        <Text style={styles.title}>Restoration</Text>
                    </View>
                    <View
                        style={styles.slide}
                    >

                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../images/background/BG_Alteration.png')}
                        />
                        <Text style={styles.title}>Alteration</Text>
                    </View>
                    <View
                        style={styles.slide}
                    >

                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../images/background/BG_Enchanting.png')}
                        />
                        <Text style={styles.title}>Enchanting</Text>
                    </View>
                    <View
                        style={styles.slide}
                    >

                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../images/background/BG_Smithing.png')}
                        />
                        <Text style={styles.title}>Smithing</Text>
                    </View>
                    <View
                        style={styles.slide}
                    >

                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../images/background/BG_Heavy_Armor.png')}
                        />
                        <Text style={styles.title}>Heavy Armor</Text>
                    </View>
                    <View
                        style={styles.slide}
                    >

                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../images/background/BG_Block.png')}
                        />
                        <Text style={styles.title}>Block</Text>
                    </View>
                    <View
                        style={styles.slide}
                    >

                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../images/background/BG_Two_Handed.png')}
                        />
                        <Text style={styles.title}>Two-Handed</Text>
                    </View>
                    <View
                        style={styles.slide}
                    >

                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../images/background/BG_One_Handed.png')}
                        />
                        <Text style={styles.title}>One-Handed</Text>
                    </View>
                    <View
                        style={styles.slide}
                    >

                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../images/background/BG_Archery.png')}
                        />
                        <Text style={styles.title}>Archery</Text>
                    </View>
                    <View
                        style={styles.slide}
                    >

                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../images/background/BG_Light_Armor.png')}
                        />
                        <Text style={styles.title}>Light Armor</Text>
                    </View>
                    <View
                        style={styles.slide}
                    >

                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../images/background/BG_Sneak.png')}
                        />
                        <Text style={styles.title}>Sneak</Text>
                    </View>
                    <View
                        style={styles.slide}
                    >

                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../images/background/BG_Lockpicking.png')}
                        />
                        <Text style={styles.title}>Lockpicking</Text>
                    </View>
                    <View
                        style={styles.slide}
                    >

                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../images/background/BG_Pickpocket.png')}
                        />
                        <Text style={styles.title}>Pickpocket</Text>
                    </View>
                    <View
                        style={styles.slide}
                    >

                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../images/background/BG_Speech.png')}
                        />
                        <Text style={styles.title}>Speech</Text>
                    </View>
                    <View
                        style={styles.slide}
                    >

                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../images/background/BG_Alchemy.png')}
                        />
                        <Text style={styles.title}>Alchemy</Text>
                    </View>
                </Swiper>
            </View>
        )
    }
}