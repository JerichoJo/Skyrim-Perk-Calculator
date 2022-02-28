import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const StealthModal = ({ navigation }) => {

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
                <Text style={styles.Title}>Stealth{"\n"}</Text>

                <Text style={styles.Text}>
1: You are 20% harder to detect while sneaking {"\n"}
2: You are 25% harder to detect while sneaking {"\n"}
3: You are 30% harder to detect while sneaking {"\n"}
4: You are 35% harder to detect while sneaking{"\n"}
5: You are 40% harder to detect while sneaking{"\n"}
</Text>

            </View>

        </View>
    );
}
export default StealthModal;

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