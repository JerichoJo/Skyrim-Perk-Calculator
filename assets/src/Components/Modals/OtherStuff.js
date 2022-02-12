import { FontAwesome } from '@expo/vector-icons';
import { CurrentRenderContext } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
const moveIT = (dest) => {
            const x = (dest - ref.current.state.index)
            ref.current.scrollBy(x)
};
export default ({ navigation }) => (
    <View
        style={{
            flex: 1,
            backgroundColor: 'transparent',
            width,
            height,
        }}
    >
        <View style={{
            position: 'absolute',
            top: 60,
            bottom:50,
            left:'2%',
            width: '50%',
            height: '80%'
        }}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    moveIT(0);
                }}>
                <Text style={styles.text}>Illusion</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    moveIT(1);
                }}>
                <Text style={styles.text}>Conjuration</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    moveIT(2);
                }}>
                <Text style={styles.text}>Destruction</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    moveIT(3);
                }}>
                <Text style={styles.text}>Restoration</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    moveIT(4);
                }}>
                <Text style={styles.text}>Alteration</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    moveIT(5);
                }}>
                <Text style={styles.text}>Enchanting</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    moveIT(6);
                }}>
                <Text style={styles.text}>Smithing</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    moveIT(7);
                }}>
                <Text style={styles.text}>Heavy Armor</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    moveIT(8);
                }}>
                <Text style={styles.text}>Block</Text>
            </TouchableOpacity>
        </View>
        <View style={{
            position: 'absolute',
            left: '52%',
            top: 60,
            bottom: 50,
            width: '50%',
            height: '80%',
        }}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    moveIT(9);
                }}>
                <Text style={styles.text}>Two-Handed</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    moveIT(10);
                }}>
                <Text style={styles.text}>One-Handed</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    moveIT(11);
                }}>
                <Text style={styles.text}>Archery</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    moveIT(12);
                }}>
                <Text style={styles.text}>Light Armor</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    moveIT(13);
                }}>
                <Text style={styles.text}>Sneak</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    moveIT(14);
                }}>
                <Text style={styles.text}>Lockpicking</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    moveIT(15);
                }}>
                <Text style={styles.text}>Pickpocket</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    moveIT(16);
                }}>
                <Text style={styles.text}>Speech</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    moveIT(17);
                }}>
                <Text style={styles.text}>Alchemy</Text>
            </TouchableOpacity>
        </View>
    </View>
);
const styles = {
    button: {
        position:'fixed',
        width:width *0.45,
        height:height * 0.085,
        marginTop:5,
        marginLeft:5,
        color:'#FFF',
        borderRadius:50,
        alignSelf:'left',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 3,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
};
