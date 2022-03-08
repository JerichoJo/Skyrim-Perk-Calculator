import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const OverdrawModal = ({ navigation }) => {

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
                <Text style={styles.Title}>Overdraw{"\n"}</Text>

                <Text style={styles.Text}>1: Bows do 20%  more damage{"\n"}2: Bows do 40%  more damage{"\n"}3: Bows do 60%  more damage{"\n"}4: Bows do 80%  more damage{"\n"}5: Bows do 100% more damage
                </Text>

            </View>

        </View>
    );
}
export default OverdrawModal;

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