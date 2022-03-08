import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const ShieldWallModal = ({ navigation }) => {

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
                <Text style={styles.Title}>Shield Wall{"\n"}</Text>

                <Text style={styles.Text}>1: Blocking is 10% more effective{"\n"}
                2: Blocking is 20% more effective{"\n"} 
                3: Blocking is 30% more effective{"\n"}
                4: Blocking is 40% more effective{"\n"}
                5: Blocking is 50% more effective{"\n"}
                 </Text>

            </View>

        </View>
    );
}
export default ShieldWallModal;

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