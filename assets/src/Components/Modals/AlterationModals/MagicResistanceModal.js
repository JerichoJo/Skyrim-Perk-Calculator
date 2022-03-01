import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const MagicResistanceModal = ({ navigation }) => {

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
                <Text style={styles.Title}>Magic Resistance{"\n"}</Text>

                <Text style={styles.Text}>Blocks 10%, 20%, or 30% of a casted spells effects</Text>

            </View>

        </View>
    );
}
export default MagicResistanceModal;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%'
    },
    TextBox: {
        backgroundColor: 'lightsteelblue',
        padding: '7%',
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 2
    },
    Title: {
        fontSize: 22,
        color: 'black',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    Text: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
    },
});