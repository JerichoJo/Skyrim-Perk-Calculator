import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const EnchanterModal = ({ navigation }) => {

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
                <Text style={styles.Title}>Enchanter{"\n"}</Text>

                <Text style={styles.Text}>
                1: New enchantments are 20% stronger{"\n"}
                2: New enchantments are 40% stronger{"\n"}
                3: New enchantments are 60% stronger{"\n"}
                4: New enchantments are 80% stronger{"\n"}
                5: New enchantments are 100% stronger{"\n"}
                </Text>

            </View>

        </View>
    );
}
export default EnchanterModal;

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