import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const TowerOfStrengthModal = ({ navigation }) => {

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
                <Text style={styles.Title}>Tower of Strength{"\n"}</Text>

                <Text style={styles.Text}>
                    50% less stagger when wearing all heavy armor {"\n"}{"\n"}
                    Requires Well Fitted

                </Text>

            </View>

        </View>
    );
}
export default TowerOfStrengthModal;

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