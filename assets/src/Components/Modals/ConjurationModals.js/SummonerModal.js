import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const SummonerModal = ({ navigation }) => {

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
                <Text style={styles.Title}>Summoner{"\n"}</Text>

                <Text style={styles.Text}>
                    
                1: Summon atronachs of raise undead 2x far away{"\n"}
                2: Summon atronachs or raise undead 3x as far away{"\n"}
                    Requires Novice Conjuration{"\n"}{"\n"}

                </Text>

            </View>

        </View>
    );
}
export default SummonerModal;

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