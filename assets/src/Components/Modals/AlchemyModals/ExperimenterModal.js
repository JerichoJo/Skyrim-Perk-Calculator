import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const ExperimenterModal = ({ navigation }) => {

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
                <Text style={styles.Title}>Experimenter{"\n"}</Text>

                <Text style={styles.Text}>
                    1: Eating an ingredient reveals its first two effects{"\n"}
                    2: Eating an ingredient reveals its first three effects{"\n"}
                    3: Eating an ingredient reveals all its effects{"\n"}{"\n"}
                    Requires Benefactor
</Text>

            </View>

        </View>
    );
}
export default ExperimenterModal;

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