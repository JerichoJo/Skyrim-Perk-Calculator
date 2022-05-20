import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const HagglingModal = ({ navigation }) => {

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
                <Text style={styles.Title}>Haggling{"\n"}</Text>

                <Text style={styles.Text}>
                    1:  Buying and selling prices are 10% Better. {"\n"}
                    2:  Buying and selling prices are 15% Better. {"\n"}
                    3:  Buying and selling prices are 20% Better. {"\n"}
                    4:  Buying and selling prices are 25% Better. {"\n"}
                    5:  Buying and selling prices are 30% Better. {"\n"}
                </Text>

            </View>

        </View>
    );
}
export default HagglingModal;

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