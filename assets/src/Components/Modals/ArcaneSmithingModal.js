import React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, StyleSheet, Modal, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
//import { useNavigation } from '@react-navigation/native';

//import { useCardAnimation } from '@react-navigation/stack';

const ArcaneSmithingModal = ({ navigation }) => {


    //const navigation = useNavigation();
    //const { current } = useCardAnimation();
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);
    const [count, setCount] = useState(0);

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
                <Text style={styles.Title}>Basic Smithing{"\n"}</Text>

                <Text style={styles.Text}>Can improve magical weapons and armor</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <TouchableOpacity
                            style={styles.PlusAndMinus}
                            onPress={() => {
                                setCount(count - 1);
                            }}>
                            <AntDesign name="minus" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.Number}>{count}</Text>
                    <View>
                        <TouchableOpacity
                            style={styles.PlusAndMinus}
                            onPress={() => {
                                setCount(count + 1);
                            }}>
                            <AntDesign name="plus" size={24} color="white" />
                        </TouchableOpacity>
                    </View>



                </View>
            </View>


        </View>
    );
}
export default ArcaneSmithingModal;

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
    PlusAndMinus: {
        padding: 10,
    },
    Number: {
        padding: 10,
        color: 'white'
    }
});