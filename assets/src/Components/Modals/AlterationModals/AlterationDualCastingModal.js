import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const AlterationDualCastingModal = ({ navigation }) => {

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
                <Text style={styles.Title}>Alteration Dual Casting{"\n"}</Text>

                <Text style={styles.Text}>Dual casting an alteration spell makes the effect more powerful</Text>

            </View>

        </View>
    );
}
export default AlterationDualCastingModal;

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