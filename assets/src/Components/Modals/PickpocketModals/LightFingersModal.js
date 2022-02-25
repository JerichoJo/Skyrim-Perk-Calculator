import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const LightFingersModal = ({ navigation }) => {

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
                <Text style={styles.Title}>LightFingers{"\n"}</Text>

                <Text style={styles.Text}>  1: Pickpocketing bonus of 20%{"\n"}  2: Pickpocketing bonus of 40%{"\n"}  3: Pickpocketing bonus of 60%{"\n"}  4: Pickpocketing bonus of 80%{"\n"}   5: Pickpocketing bonus of 100%{"\n"}
                </Text>

            </View>

        </View>
    );
}
export default LightFingersModal;

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