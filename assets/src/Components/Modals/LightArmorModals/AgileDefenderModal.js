import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const AgileDefenderModal = ({ navigation }) => {

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
                <Text style={styles.Title}>Agile Defender{"\n"}</Text>

                <Text style={styles.Text}>
                    1:   Increase armor rating for light armor by 20% {"\n"}
                    2:   Increase armor rating for light armor by 40% {"\n"}
                    3:   Increase armor rating for light armor by 60% {"\n"}
                    4:   Increase armor rating for light armor by 80% {"\n"}
                    5:   Increase armor rating for light armor by 100% {"\n"}
                </Text>

            </View>

        </View>
    );
}
export default AgileDefenderModal;

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