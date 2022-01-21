import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated, Dimensions } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {

const width = Dimensions.get('window').width * .8;
const height = Dimensions.get('window').height * 0.7;

const [ActivePerks, setActivePerks] = useState(0);
const [RequiredSkill, setRequiredSkill] = useState(0);
const [AllActivePerks, setAllActivePerks] = useState(0);
const [RequiredLevel, setRequiredLevel] = useState(0);

const [Perks, setPerks] = useState([
    { name: "Smithing", key: '1', image: '../images/HealthBG.jpg'},
    { name: "Heavy Armor", key: '2', image: '../images/HealthBG.jpg'},
    { name: "Block", key: '3', image: '../images/HealthBG.jpg'},
    { name: "Two-Handed", key: '4', image: '../images/HealthBG.jpg'},
    { name: "One-Handed", key: '5', image: '../images/HealthBG.jpg'},
    { name: "Archery", key: '6', image: '../images/HealthBG.jpg'}
])

return (
        <>
            <ImageBackground 
            
            style={styles.Container} 
            source={require('../images/background.jpg')} 
            >
                <FlatList
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                    horizontal
                    numColumns={1}
                    decelerationRate={6}
                    snapToInterval={width + 118}
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
                            right: 0
                        }}>
                            <TouchableOpacity>
                                <FontAwesome name="circle-thin" size={14} color="white" />
                            </TouchableOpacity>
                        </View></>
                        
                    )
                }
                
                />
            <View
                style={{
                    position: 'absolute', 
                    top: 500, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    justifyContent: 'center', 
                    alignItems: 'center'}}
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
        width: null,
        height: null,
        justifyContent: 'center',
        backgroundColor: '#000000',
        flexDirection: 'column',
        alignItems: 'flex-start'

    },
    HomeScreenText: {
        color: 'white',

    },
    item: {
        color: 'white',
        fontSize: 28,
        padding: 150,
        bottom: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 22
    }

});

export default withNavigation(HomeScreen);