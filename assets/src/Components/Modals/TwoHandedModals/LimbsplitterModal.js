import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const LimbsplitterModal = ({ navigation }) => {

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
                <Text style={styles.Title}>Limbsplitter{"\n"}</Text>

                <Text style={styles.Text}>  1: Attacks with battle axes cause{"\n"}extra bleeding damage{"\n"}2: Attacks with battle axes cause{"\n"} more extra bleeding damage{"\n"}3: Attacks with battle axes cause{"\n"} even more bleeding damage{"\n"}
</Text>

            </View>

        </View>
    );
}
export default LimbsplitterModal;

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