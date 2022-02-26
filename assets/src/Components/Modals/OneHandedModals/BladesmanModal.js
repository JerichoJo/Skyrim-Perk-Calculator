import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const BladesmanModal = ({ navigation }) => {

    return (
        <View
            style={styles.Container}
        >
            <Pressable
                style={[
                    StyleSheet.absoluteFill,
                ]}
                onPress={navigation.goBack}
            />

            <View
                style={styles.TextBox}
                onPress={navigation.goBack}>
                <Text style={styles.Title}>Bladesman{"\n"}</Text>

                <Text style={styles.Text}>1: Sword attacks have 10% chance of critical damage{"\n"}
                2: Sword attacks have 25% chance of critical damage{"\n"}
                3: Sword attacks have 50% chance of critical damage</Text>

            </View>

        </View>
    );
}
export default BladesmanModal;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%'
    },
    TextBox: {
        backgroundColor: 'black',
        padding: '7%',
        borderRadius: 25
    },
    Title: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    Text: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
});