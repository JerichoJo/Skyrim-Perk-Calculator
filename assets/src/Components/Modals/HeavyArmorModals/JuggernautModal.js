import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const JuggernautModal = ({ navigation }) => {

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
                <Text style={styles.Title}>Juggernaut{"\n"}</Text>

                <Text style={styles.Text}>1: Increases heavy armor rating by 20%{"\n"}
                        2: increases heavy armor rating by 40%{"\n"}
                        3: Increases heavy armor rating by 60%{"\n"}
                        4: Increases heavy armor rating by 80%{"\n"}
                        5: Increases heavy armor rating by 100%{"\n"}
</Text>

            </View>

        </View>
    );
}
export default JuggernautModal;

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