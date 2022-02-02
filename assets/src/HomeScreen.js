import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import tree from './Components/index';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
    const [ActivePerks, SetActivePerks] = useState(0);
    const [RequiredSkill, SetRequiredSkill] = useState(0);
    const [AllActivePerks, SetAllActivePerks] = useState(0);
    const [RequiredLevel, SetRequiredLevel] = useState(0);

    const IncrementCounter = (numActivePerks = 0) => {
        SetActivePerks(ActivePerks + numActivePerks);
    };
    const DecrementCounter = (numActivePerks = 0) => {
        if (ActivePerks === 0) {
            return;
        }
        SetActivePerks(ActivePerks - numActivePerks);
    };
    const TrackLevel = (level) => {
        SetRequiredLevel(level);
    };

    const [Perks, setPerks] = useState([
        {
            name: 'Alchemy',
            key: '1',
            image: './images/HealthBG.jpg',
        },
        {
            name: 'Illusion',
            key: '2',
            image: './images/HealthBG.jpg',
            tree: <tree.IllusionTree />,
        },
        { name: 'Conjuration', key: '3', image: './images/HealthBG.jpg' },
        { name: 'Destruction', key: '4', image: './images/HealthBG.jpg' },
        { name: 'Restoration', key: '5', image: './images/HealthBG.jpg' },
        { name: 'Alteration', key: '6', image: './images/HealthBG.jpg' },
        { name: 'Enchanting', key: '7', image: './images/HealthBG.jpg' },
        {
            name: 'Smithing',
            key: '8',
            image: './images/HealthBG.jpg',
            tree: <tree.SmithingTree />,
        },
        { name: 'Heavy Armor', key: '9', image: './images/HealthBG.jpg' },
        { name: 'Block', key: '10', image: './images/HealthBG.jpg' },
        { name: 'Two-Handed', key: '11', image: './images/HealthBG.jpg' },
        { name: 'One-Handed', key: '12', image: './images/HealthBG.jpg' },
        { name: 'Archery', key: '13', image: './images/HealthBG.jpg' },
        { name: 'Light Armor', key: '14', image: './images/HealthBG.jpg' },
        { name: 'Sneak', key: '15', image: './images/HealthBG.jpg' },
        { name: 'Lockpicking', key: '16', image: './images/HealthBG.jpg' },
        { name: 'Pickpocket', key: '17', image: './images/HealthBG.jpg' },
        { name: 'Speech', key: '18', image: './images/HealthBG.jpg' },
    ]);

    return (
        <>
            <ImageBackground
                style={styles.Container}
                source={require('../images/background.jpg')}>
                <FlatList
                    contentContainerStyle={{ justifyContent: 'center' }}
                    horizontal
                    numColumns={1}
                    decelerationRate={0}
                    snapToInterval={width}
                    snapToAlignment="start"
                    data={Perks}
                    renderItem={({ item }) => (
                        <>
                            <Text style={styles.item}> {item.name}</Text>

                            <View
                                style={{
                                    position: 'absolute',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: width,
                                    height: height,
                                }}>
                                <tree.SmithingTree
                                    IncrementCurrentTree={IncrementCounter}
                                    DecrementCurrentTree={DecrementCounter}
                                    UpdateCurrentLevel={TrackLevel}
                                />
                            </View>
                        </>
                    )}
                />
                <View style={styles.bottomText}>
                    <Text style={styles.HomeScreenText}>
                        Active Perks: {ActivePerks}{' '}
                    </Text>
                    <Text style={styles.HomeScreenText}>
                        Required Skill: {RequiredSkill}{' '}
                    </Text>
                    <Text style={styles.HomeScreenText}>
                        All Active Perks: {AllActivePerks}
                    </Text>
                    <Text style={styles.HomeScreenText}>
                        Required level: {RequiredLevel}{' '}
                    </Text>
                </View>
            </ImageBackground>
        </>
    );
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: '#000000',
    },
    HomeScreenText: {
        color: 'white',
    },

    bottomText: {
        position: 'absolute',

        left: 0,
        right: 0,
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        color: 'white',
        fontSize: 28,
        paddingTop: 150,
        paddingLeft: 0,
        width: width,
        bottom: 150,
        marginTop: 22,
        textAlign: 'center',
    },
    tree: {},
});

export default withNavigation(HomeScreen);