import { FontAwesome } from '@expo/vector-icons';
import { CurrentRenderContext } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
const moveIT = (dest) => {
    const x = (dest - ref.current.state.index)
    ref.current.scrollBy(x)
};

const OtherStuff = () => {
    const navigation = useNavigation();

    return (
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
                bottom: 50,
                left: '2%',
                width: '50%',
                height: '80%'
            }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        moveIT(0);
                        navigation.navigate("Homescreen");
                    }}>
                    <Text style={styles.text}>Illusion</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        moveIT(1);
                        navigation.navigate("Homescreen");
                    }}>
                    <Text style={styles.text}>Conjuration</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        moveIT(2);
                        navigation.navigate("Homescreen");
                    }}>
                    <Text style={styles.text}>Destruction</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        moveIT(3);
                        navigation.navigate("Homescreen");
                    }}>
                    <Text style={styles.text}>Restoration</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        moveIT(4);
                        navigation.navigate("Homescreen");
                    }}>
                    <Text style={styles.text}>Alteration</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        moveIT(5);
                        navigation.navigate("Homescreen");
                    }}>
                    <Text style={styles.text}>Enchanting</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        moveIT(6);
                        navigation.navigate("Homescreen");
                    }}>
                    <Text style={styles.text}>Smithing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        moveIT(7);
                        navigation.navigate("Homescreen");
                    }}>
                    <Text style={styles.text}>Heavy Armor</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        moveIT(8);
                        navigation.navigate("Homescreen");
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
                        navigation.navigate("Homescreen");
                    }}>
                    <Text style={styles.text}>Two-Handed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        moveIT(10);
                        navigation.navigate("Homescreen");
                    }}>
                    <Text style={styles.text}>One-Handed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        moveIT(11);
                        navigation.navigate("Homescreen");
                    }}>
                    <Text style={styles.text}>Archery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        moveIT(12);
                        navigation.navigate("Homescreen");
                    }}>
                    <Text style={styles.text}>Light Armor</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        moveIT(13);
                        navigation.navigate("Homescreen");
                    }}>
                    <Text style={styles.text}>Sneak</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        moveIT(14);
                        navigation.navigate("Homescreen");
                    }}>
                    <Text style={styles.text}>Lockpicking</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        moveIT(15);
                        navigation.navigate("Homescreen");
                    }}>
                    <Text style={styles.text}>Pickpocket</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        moveIT(16);
                        navigation.navigate("Homescreen");
                    }}>
                    <Text style={styles.text}>Speech</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        moveIT(17);
                        navigation.navigate("Homescreen");
                    }}>
                    <Text style={styles.text}>Alchemy</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = {
    button: {
        width: width * 0.45,
        height: height * 0.085,
        marginTop: 5,
        marginLeft: 5,
        color: '#FFF',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
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

export default OtherStuff;
