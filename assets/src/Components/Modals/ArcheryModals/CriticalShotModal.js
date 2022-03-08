import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const CriticalShotModal = ({ navigation }) => {

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
                <Text style={styles.Title}>CriticalShot{"\n"}</Text>

                <Text style={styles.Text}>   1: 10% Chance of a critical hit{"\n"}   2: 15% Chance of a critical hit{"\n"}   does 25% more damage{"\n"}3: 20% chance of critical hit{"\n"}    does 50% more damage
</Text>

            </View>

        </View>
    );
}
export default CriticalShotModal;

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