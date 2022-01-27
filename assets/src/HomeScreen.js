import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import SmithingTree from './Components/Smithing';

var screen = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {

    const width = Dimensions.get('window').width * .8;
    const height = Dimensions.get('window').height * 0.7;

    const [ActivePerks, setActivePerks] = useState(0);
    const [RequiredSkill, setRequiredSkill] = useState(0);
    const [AllActivePerks, setAllActivePerks] = useState(0);
    const [RequiredLevel, setRequiredLevel] = useState(0);


    const [Perks, setPerks] = useState([
        { name: "Alchemy", key: '1', image: '../images/HealthBG.jpg', tree: <SmithingTree /> },
        { name: "Illusion", key: '2', image: '../images/HealthBG.jpg', tree: <SmithingTree /> },
        { name: "Conjuration", key: '3', image: '../images/HealthBG.jpg' },
        { name: "Destruction", key: '4', image: '../images/HealthBG.jpg' },
        { name: "Restoration", key: '5', image: '../images/HealthBG.jpg' },
        { name: "Alteration", key: '6', image: '../images/HealthBG.jpg' },
        { name: "Enchanting", key: '7', image: '../images/HealthBG.jpg' },
        { name: "Smithing", key: '8', image: '../images/HealthBG.jpg', tree: <SmithingTree /> },
        { name: "Heavy Armor", key: '9', image: '../images/HealthBG.jpg' },
        { name: "Block", key: '10', image: '../images/HealthBG.jpg' },
        { name: "Two-Handed", key: '11', image: '../images/HealthBG.jpg' },
        { name: "One-Handed", key: '12', image: '../images/HealthBG.jpg' },
        { name: "Archery", key: '13', image: '../images/HealthBG.jpg' },
        { name: "Light Armor", key: '14', image: '../images/HealthBG.jpg' },
        { name: "Sneak", key: '15', image: '../images/HealthBG.jpg' },
        { name: "Lockpicking", key: '16', image: '../images/HealthBG.jpg' },
        { name: "Pickpocket", key: '17', image: '../images/HealthBG.jpg' },
        { name: "Speech", key: '18', image: '../images/HealthBG.jpg' },
    ])


    return (

        <>

            <ImageBackground

                style={styles.Container}
                source={require('../images/background.jpg')}
            >
                <FlatList
                    contentContainerStyle={{ justifyContent: 'center', }}
                    horizontal
                    numColumns={1}
                    decelerationRate={0}
                    snapToInterval={screen}
                    snapToAlignment='start'
                    data={Perks}
                    renderItem={({ item }) => (
                        <>

                            <Text style={styles.item}> {item.name}</Text>

                            <View style={{
                                flex: 1,
                                position: 'absolute',
                                justifyContent: 'center',
                                alignItems: 'center',
                                bottom: 0,
                                left: 0,
                                top: 0,
                                right: 0,

                            }}>
                                {item.tree}

                            </View>

                        </>
                    )
                    }

                />
                <View
                    style={styles.bottomText}

                >
                    <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks}/21</Text>
                    <Text style={styles.HomeScreenText}>Required Skill: {RequiredSkill} </Text>
                    <Text style={styles.HomeScreenText}>All Active Perks: {AllActivePerks}</Text>
                    <Text style={styles.HomeScreenText}>Required level: {RequiredLevel} </Text>

                </View>

            </ImageBackground>


        </>
    );

};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        backgroundColor: '#000000',
        flexDirection: 'column',
        alignItems: 'flex-start',

    },
    HomeScreenText: {
        color: 'white',

    },

    bottomText: {
        position: 'absolute',
        top: 500,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',

    },
    item: {

        color: 'white',
        fontSize: 28,
        paddingTop: 200,
        paddingLeft: 0,
        width: screen,
        bottom: 150,
        marginTop: 22,
        textAlign: 'center',

    },

});

export default withNavigation(HomeScreen);