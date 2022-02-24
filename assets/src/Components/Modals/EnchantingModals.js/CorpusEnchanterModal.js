import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const CorpusEnchanterModal = ({ navigation }) => {

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
                <Text style={styles.Title}>Corpus Enchanter{"\n"}</Text>

                <Text style={styles.Text}>
                    Health, magicka, and stamina enchantments on weapons/armor are 25% stronger{"\n"}{"\n"}
                    Requires Insightful Enchanter

                </Text>

            </View>

        </View>
    );
}
export default CorpusEnchanterModal;

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