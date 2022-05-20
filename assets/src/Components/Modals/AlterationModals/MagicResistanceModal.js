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

                <Text style={styles.Text}>
                    1:  Blocks 10% of a casted spells effects {"\n"}
                    2:  Blocks 20% of a casted spells effects {"\n"}
                    3:  Blocks 30% of a casted spells effects {"\n"}
                </Text>

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