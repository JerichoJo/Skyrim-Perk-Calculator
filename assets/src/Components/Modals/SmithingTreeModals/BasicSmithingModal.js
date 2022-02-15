import React from 'react';
import { View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';

const BasicSmithingModal = ({ navigation }) => {

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
                <Text style={styles.Title}>Basic Smithing{"\n"}</Text>

                <Text style={styles.Text}>Can create steal armor/weapons at forges and improve them 2x</Text>

            </View>


        </View>
    );
}
export default BasicSmithingModal;

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
    PlusAndMinus: {
        padding: 10,
    },
    Number: {
        padding: 10,
        color: 'white'
    }
});