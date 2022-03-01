import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const AlchemistModal = ({ navigation }) => {

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
                <Text style={styles.Title}>Alchemist{"\n"}</Text>

                <Text style={styles.Text}>
                    
                    1: Potions and poisons made are 20% stronger {"\n"}
                    2:  Potions and poisons made are 40% stronger{"\n"}
                    3:  Potions and poisons made are 60% stronger{"\n"}
                    4:  Potions and poisons made are 80% stronger{"\n"}
                    5:  Potions and poisons made are 2x as strong{"\n"}

                </Text>

            </View>

        </View>
    );
}
export default AlchemistModal;

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