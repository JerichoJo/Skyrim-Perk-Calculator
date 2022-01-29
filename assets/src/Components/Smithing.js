import * as React from 'react';
import { useState } from 'react';
import Svg, { Circle, Line } from 'react-native-svg';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SmithingTree = () => {
    const [hold, sethold] = useState('blue');
    const [basicSmithing, setBasicSmithing] = useState('blue');
    const [arcaneSmith, setArcaneSmith] = useState('blue');
    const [elvinSmithing, setElvinSmithing] = useState('blue');

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isMenuVisible, setIsMenuVisible] = React.useState(false);

    const [count, setCount] = useState(0);

    const circleRadius = '12';
    const circleStrokeWidth = '10';
    const lineStrokeWidth = '8';

    const checkIfBasicSmithPressed = (buttonColorProp) => {
        setBasicSmithing(buttonColorProp);
    };
    const checkIfPressed1 = (button1ColorProp) => {
        if ((arcaneSmith || elvinSmithing) == 'red') {
            //Leave color of lines the same because the ones above it are chosen
        } else {
            setBasicSmithing(button1ColorProp); // Change button color back and forth
        }
    };

    const checkIfArcaneSmithPressed = (button2ColorProp) => {
        if (basicSmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setBasicSmithing(button2ColorProp);
            setArcaneSmith(button2ColorProp);
        } else if (elvinSmithing == 'red') {
            //Leave color of lines the same because the ones above it are chosen
        } else {
            setArcaneSmith(button2ColorProp); // Change button color back and forth
        }
    };

    const checkIfPressed3 = (button3ColorProp) => {
        if ((basicSmithing && arcaneSmith) == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setBasicSmithing(button3ColorProp);
            setArcaneSmith(button3ColorProp);
            setElvinSmithing(button3ColorProp);
        } else {
            setElvinSmithing(button3ColorProp); // Change button color back and forth
        }
    };

    return (
        <View>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
                <Circle
                    cx="35%"
                    cy="80%"
                    r={circleRadius}
                    stroke={basicSmithing}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        checkIfBasicSmithPressed(basicSmithing == 'blue' ? 'red' : 'blue');
                    }}
                />

                {/* MODAL POPUP */}
                <Modal
                    animationType="slide"
                    transparent
                    backdropColor="black"
                    onBackdropPress={() => {
                        setIsModalVisible(false);
                    }}
                    visible={isModalVisible}>
                    <View
                        style={{
                            backgroundColor: 'firebrick',
                            margin: 5,
                            alignSelf: 'auto',

                            justifyContent: 'center',
                            padding: 30,
                            borderRadius: 8,
                            borderWidth: 2,
                        }}>
                        <Text>Skill: blah blah</Text>
                        <Text>Skill: more skill blah</Text>
                        {/* +/- BUTTONS*/}
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <TouchableOpacity
                                    style={{
                                        alignSelf: 'flex-end',
                                        padding: 10,
                                    }}
                                    onPress={() => {
                                        setCount(count + 1);
                                    }}>
                                    <AntDesign name="plus" size={24} color="black" />
                                </TouchableOpacity>
                            </View>

                            <Text style={{ padding: 10 }}>{count}</Text>
                            <View>
                                <TouchableOpacity
                                    style={{
                                        alignSelf: 'flex-start',
                                        padding: 10,
                                    }}
                                    onPress={() => {
                                        setCount(count - 1);
                                    }}>
                                    <AntDesign name="minus" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Line
                    x1="35.3%"
                    y1="79.2%"
                    x2="40%"
                    y2="60%"
                    stroke={arcaneSmith}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfArcaneSmithPressed(basicSmithing == 'blue' ? 'red' : 'blue');
                    }}
                />

                <Circle
                    cx="40%"
                    cy="60%"
                    r={circleRadius}
                    stroke={arcaneSmith}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onPress={() => {
                        checkIfArcaneSmithPressed(basicSmithing == 'blue' ? 'red' : 'blue');
                    }}
                />
                <Circle
                    cx="8%"
                    cy="55%"
                    r={circleRadius}
                    stroke={hold}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                />
                <Line
                    x1="34.2%"
                    y1="79.3%"
                    x2="8.5%"
                    y2="55.7%"
                    stroke={hold}
                    strokeWidth={lineStrokeWidth}
                />
                <Circle
                    cx="14%"
                    cy="48%"
                    r={circleRadius}
                    stroke={hold}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                />
                <Line
                    x1="8.3%"
                    y1="54.4%"
                    x2="13.5%"
                    y2="48.6%"
                    stroke={elvinSmithing}
                    strokeWidth={lineStrokeWidth}
                />
                <Circle
                    cx="34%"
                    cy="39%"
                    r={circleRadius}
                    stroke={hold}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                />
                <Line
                    x1="15%"
                    y1="47.5%"
                    x2="32.8%"
                    y2="39.5%"
                    stroke={hold}
                    strokeWidth={lineStrokeWidth}
                />
                <Circle
                    cx="54%"
                    cy="39%"
                    r={circleRadius}
                    stroke={hold}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                />
                <Line
                    x1="35.3%"
                    y1="39%"
                    x2="53%"
                    y2="39%"
                    stroke={hold}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="55.5%"
                    y1="39.3%"
                    x2="74%"
                    y2="45%"
                    stroke={hold}
                    strokeWidth={lineStrokeWidth}
                />
                <Circle
                    cx="74%"
                    cy="45%"
                    r={circleRadius}
                    stroke={hold}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                />
                <Line
                    x1="75%"
                    y1="45.5%"
                    x2="92%"
                    y2="55%"
                    stroke={hold}
                    strokeWidth={lineStrokeWidth}
                />
                <Circle
                    cx="92%"
                    cy="55%"
                    r={circleRadius}
                    stroke={hold}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                />
                <Line
                    x1="91%"
                    y1="55%"
                    x2="80%"
                    y2="55%"
                    stroke={hold}
                    strokeWidth={lineStrokeWidth}
                />
                <Circle
                    cx="80%"
                    cy="55%"
                    r={circleRadius}
                    stroke={hold}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                />
                <Line
                    x1="79%"
                    y1="55.5%"
                    x2="60%"
                    y2="65%"
                    stroke={hold}
                    strokeWidth={lineStrokeWidth}
                />
                <Circle
                    cx="60%"
                    cy="65%"
                    r={circleRadius}
                    stroke={hold}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                />
                <Line
                    x1="59.2%"
                    y1="65.4%"
                    x2="36.3%"
                    y2="79.9%"
                    stroke={hold}
                    strokeWidth={lineStrokeWidth}
                />
            </Svg>
        </View>
    );
};

export default SmithingTree;
