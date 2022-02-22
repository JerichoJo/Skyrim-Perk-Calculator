import React, { Component, useRef, useState } from 'react';
import { Text, View, Image, Dimensions, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import tree from './Components/index';
import { useNavigation } from '@react-navigation/native';

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
        bottom: '4%',
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
    Icon: {
        position: "absolute",
        zIndex: 5
    },

    image: {
        width,
        height: '100%',
        flex: 1,
        position: 'absolute',
        zIndex: 1,
    },
    button: {
        width: 80,
        position: 'absolute',
        bottom: '5%',
        left: '10%',
        zIndex: 8,
    },
    Nav: {
        width: 80,
        position: 'absolute',
        bottom: '5%',
        left: '10%',
        zIndex: 8,
        backgroundColor: 'red',
    },
    menuButton: {
        backgroundColor: 'transparent',
        position: 'absolute',
        marginTop: '25%',
        alignSelf: 'flex-end',
        zIndex: 8
    }
}
ref = React.createRef();

export default class extends Component {

    render() {
        return (
            <View style={styles.container}>

                <Swiper
                    removeClippedSubviews={false}
                    ref={ref}
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

                        <tree.IllusionTree style={styles.tree} />

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
                        <tree.ConjurationTree style={styles.tree} />
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
                        <tree.DestructionTree style={styles.tree} />
                        
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
                        <tree.RestorationTree style={styles.tree} />
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
                        <tree.AlterationTree style={styles.tree} />
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
                        <tree.EnchantingTree style={styles.tree} />
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

                        <tree.SmithingTree style={styles.tree} />
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
                        <tree.HeavyArmor style={styles.tree} />
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
                        <tree.BlockTree style={styles.tree} />
                        
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
                        <tree.TwoHandedTree style={styles.tree} />
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
                        <tree.OneHandedTree style={styles.tree} />
                        
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
                        <tree.ArcheryTree style={styles.tree} />
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
                        <tree.LightArmorTree style={styles.tree} />
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
                        <tree.SneakTree style={styles.tree} />
                        
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
                        <tree.LockpickingTree style={styles.tree} />

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
                        <tree.PickpocketTree style={styles.tree} />
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
                        <tree.SpeechTree style={styles.tree} />
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
                        <tree.AlchemyTree style={styles.tree} />
                    </View>
                </Swiper>
            </View>
        )
    }
}