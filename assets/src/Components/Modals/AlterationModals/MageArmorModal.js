import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const MageArmorModal = ({ navigation }) => {

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
                <Text style={styles.Title}>Mage Armor{"\n"}</Text>

                <Text style={styles.Text}>
                    1:  Stonefish protection spells are 2x as strong when not wearing armor {"\n"}
                    2:  Stonefish protection spells are 2.5x as strong when not wearing armor {"\n"}
                    3:  Stonefish protection spells are 3x as strong when not wearing armor {"\n"}
                </Text>

            </View>

        </View>
    );
}
export default MageArmorModal;

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