import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const SkullCrusherModal = ({ navigation }) => {

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
                <Text style={styles.Title}>SkullCrusher{"\n"}</Text>

                <Text style={styles.Text}> 1: Attacks with warhammers{"\n"} ignore 25% of armor{"\n"}2: Attacks with warhammers{"\n"} ignore 50% of armor{"\n"}3: Attacks with warhammers{"\n"} ignore 75% of armor{"\n"}
                </Text>

            </View>

        </View>
    );
}
export default SkullCrusherModal;

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