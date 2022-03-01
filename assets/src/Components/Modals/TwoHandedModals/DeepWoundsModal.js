import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const DeepWoundsModal = ({ navigation }) => {

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
                <Text style={styles.Title}>DeepWounds{"\n"}</Text>

                <Text style={styles.Text}>1: Attacks with greatswords have a 10% chance of doing critical damage{"\n"}2: Attacks with greatswords have 15% chance of doing more critical damage{"\n"}3: Attacks with greatswords have a 20% chance of doing even more critical damage{"\n"}
</Text>

            </View>

        </View>
    );
}
export default DeepWoundsModal;

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