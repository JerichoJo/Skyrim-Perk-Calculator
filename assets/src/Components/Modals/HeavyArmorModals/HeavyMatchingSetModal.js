import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const HeavyMatchingSetModal = ({ navigation }) => {

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
                <Text style={styles.Title}>Heavy Matching Set{"\n"}</Text>

                <Text style={styles.Text}>
                    Additional 25% armor if wearing matched set of heavy armor{"\n"}{"\n"}
                    Requires Tower of Strength


                </Text>

            </View>

        </View>
    );
}
export default HeavyMatchingSetModal;

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