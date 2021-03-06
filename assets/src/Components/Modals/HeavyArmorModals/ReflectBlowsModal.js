import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const ReflectBlowsModal = ({ navigation }) => {

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
                <Text style={styles.Title}>Reflect Blows{"\n"}</Text>

                <Text style={styles.Text}>
                    10% chance to deflect damage to enemy if wearing all heavy armor{"\n"}{"\n"}
                    Requires Matching Set

                </Text>

            </View>

        </View>
    );
}
export default ReflectBlowsModal;

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