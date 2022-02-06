import * as React from 'react';
import { useState } from 'react';
import Svg, { Circle, Line } from 'react-native-svg';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SneakTree = () => {
    const [hold, sethold] = useState('blue');
    const [basicSmithing, setBasicSmithing] = useState('blue');
    const [arcaneSmith, setArcaneSmith] = useState('blue');
    const [elvinSmithing, setElvinSmithing] = useState('blue');
    const [advancedSmithing, setAdvancedSmithing] = useState('blue');
    const [glassSmithing, setGlassSmithing] = useState('blue');
    const [dwarvenSmithing, setDwarvenSmithing] = useState('blue');
    const [orcishSmithing, setOrcishSmithing] = useState('blue');
    const [ebonySmithing, setEbonySmithing] = useState('blue');
    const [daedricSmithing, setDaedricSmithing] = useState('blue');
    const [dragonSmithing, setDragonSmithing] = useState('blue');
    const [middleLine, setMiddleLine] = useState('blue');

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isMenuVisible, setIsMenuVisible] = React.useState(false);

    const [count, setCount] = useState(0);

    const circleRadius = '8';
    const circleStrokeWidth = '8';
    const lineStrokeWidth = '3';

    const checkIfBasicSmithPressed = (buttonColorProp) => {
        if (
            elvinSmithing == 'red' ||
            arcaneSmith == 'red' ||
            dwarvenSmithing == 'red'
        ) {
            // Do nothing....must un-select nodes above it first
        } else {
            setBasicSmithing(buttonColorProp); // Change button color back and forth
        }
    };
    const checkIfArcaneSmithPressed = (button2ColorProp) => {
        if (basicSmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setBasicSmithing(button2ColorProp);
            setArcaneSmith(button2ColorProp);
        } else {
            setArcaneSmith(button2ColorProp); // Change the pressed button color back and forth
        }
    };

    const checkIfElvinSmithPressed = (button3ColorProp) => {
        if (basicSmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setBasicSmithing(button3ColorProp);
            setElvinSmithing(button3ColorProp);
        } else if (advancedSmithing == 'red') {
            // Do nothing....must un-select nodes above it first
        } else {
            setElvinSmithing(button3ColorProp); // Change button color back and forth
        }
    };
    const checkIfAdvanceSmithingPressed = (button4ColorProp) => {
        if (elvinSmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setAdvancedSmithing(button4ColorProp);
            setElvinSmithing(button4ColorProp);
            setBasicSmithing(button4ColorProp);
        } else if (glassSmithing == 'red') {
            // Do nothing....must un-select nodes above it first
        } else {
            setAdvancedSmithing(button4ColorProp); // Change the pressed button color back and forth
        }
    };
    const checkIfGlassSmithingPressed = (button5ColorProp) => {
        if (advancedSmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setGlassSmithing(button5ColorProp);
            setAdvancedSmithing(button5ColorProp);
            setElvinSmithing(button5ColorProp);
            setBasicSmithing(button5ColorProp);
        } else {
            setGlassSmithing(button5ColorProp); // Change the pressed button color back and forth
        }
    };
    const checkIfDwarvenSmithingPressed = (button6ColorProp) => {
        if (basicSmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setDwarvenSmithing(button6ColorProp);
            setBasicSmithing(button6ColorProp);
        } else if (orcishSmithing == 'red') {
            // Do nothing....must un-select nodes above it first
        } else {
            setDwarvenSmithing(button6ColorProp); // Change the pressed button color back and forth
        }
    };
    const checkIfOrcishSmithingPressed = (button7ColorProp) => {
        if (dwarvenSmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setOrcishSmithing(button7ColorProp);
            setDwarvenSmithing(button7ColorProp);
            setBasicSmithing(button7ColorProp);
        } else if (ebonySmithing == 'red') {
            // Do nothing....must un-select nodes above it first
        } else {
            setOrcishSmithing(button7ColorProp); // Change the pressed button color back and forth
        }
    };
    const checkIfEbonySmithingPressed = (button8ColorProp) => {
        if (orcishSmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setEbonySmithing(button8ColorProp);
            setOrcishSmithing(button8ColorProp);
            setDwarvenSmithing(button8ColorProp);
            setBasicSmithing(button8ColorProp);
        } else if (daedricSmithing == 'red') {
            // Do nothing....must un-select nodes above it first
        } else {
            setEbonySmithing(button8ColorProp); // Change the pressed button color back and forth
        }
    };
    const checkIfDaedricSmithingPressed = (button9ColorProp) => {
        if (ebonySmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setDaedricSmithing(button9ColorProp);
            setEbonySmithing(button9ColorProp);
            setOrcishSmithing(button9ColorProp);
            setDwarvenSmithing(button9ColorProp);
            setBasicSmithing(button9ColorProp);
        } else if (dragonSmithing == 'red') {
            // Do nothing....must un-select nodes above it first
        } else {
            setDaedricSmithing(button9ColorProp); // Change the pressed button color back and forth
        }
    };
    const checkIfDragonSmithingPressed = (button10ColorProp) => {
        if (daedricSmithing == 'blue') {
            setDragonSmithing(button10ColorProp);
            setDaedricSmithing(button10ColorProp);
            setEbonySmithing(button10ColorProp);
            setOrcishSmithing(button10ColorProp);
            setDwarvenSmithing(button10ColorProp);
            setBasicSmithing(button10ColorProp);
        } else {
            setDragonSmithing(button10ColorProp);
        }

    };
    const checkFinalMiddleLine = (buttonColor11Prop) => {
        if (glassSmithing == 'red' && dragonSmithing == 'red') {
            setMiddleLine(buttonColor11Prop);
        }
    };

    return (
        <View>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
                {/* Stealth Circle*/}
                <Circle
                    cx="50%"
                    cy="80%"
                    r={circleRadius}
                    stroke={basicSmithing}
                    strokeWidth={circleStrokeWidth}
                    fill="blue"
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        checkIfBasicSmithPressed(basicSmithing == 'blue' ? 'red' : 'blue');
                    }}
                />
                {/* Muffled Movement Line*/}
                <Line
                    x1="15%"
                    y1="60%"
                    x2="50%"
                    y2="80%"
                    stroke={arcaneSmith}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfArcaneSmithPressed(arcaneSmith == 'blue' ? 'red' : 'blue');
                    }}
                />
                {/* Muffled Movement Circle*/}
                <Circle
                    cx="15%"
                    cy="60%"
                    r={circleRadius}
                    stroke={arcaneSmith}
                    strokeWidth={circleStrokeWidth}
                    fill="blue"
                    onPress={() => {
                        checkIfArcaneSmithPressed(arcaneSmith == 'blue' ? 'red' : 'blue');
                    }}
                />
                {/* Light Foot Circle */}
                <Circle
                    cx="25%"
                    cy="40%"
                    r={circleRadius}
                    stroke={elvinSmithing}
                    strokeWidth={circleStrokeWidth}
                    fill="blue"
                    onPress={() => {
                        checkIfElvinSmithPressed(elvinSmithing == 'blue' ? 'red' : 'blue');
                    }}
                />
                {/* Light Foot Line */}
                <Line
                    x1="25%"
                    y1="40%"
                    x2="15%"
                    y2="60%"
                    stroke={elvinSmithing}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfElvinSmithPressed(elvinSmithing == 'blue' ? 'red' : 'blue');
                    }}
                />
                {/* Silent Roll Circle */}
                <Circle
                    cx="40%"
                    cy="35%"
                    r={circleRadius}
                    stroke={advancedSmithing}
                    strokeWidth={circleStrokeWidth}
                    fill="blue"
                    onPress={() => {
                        checkIfAdvanceSmithingPressed(
                            advancedSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Silent Roll Line */}
                <Line
                    x1="40%"
                    y1="35%"
                    x2="25%"
                    y2="40%"
                    stroke={advancedSmithing}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfAdvanceSmithingPressed(
                            advancedSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Silence Circle*/}
                <Circle
                    cx="55%"
                    cy="28%"
                    r={circleRadius}
                    stroke={glassSmithing}
                    strokeWidth={circleStrokeWidth}
                    fill="blue"
                    onPress={() => {
                        checkIfGlassSmithingPressed(
                            glassSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Silence Line*/}
                <Line
                    x1="55%"
                    y1="28%"
                    x2="40%"
                    y2="35%"
                    stroke={glassSmithing}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfGlassSmithingPressed(
                            glassSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Shadow Warrior Circle*/}
                <Circle
                    cx="80%"
                    cy="23%"
                    r={circleRadius}
                    stroke={dragonSmithing}
                    strokeWidth={circleStrokeWidth}
                    fill="blue"
                    onPress={() => {
                        checkIfDragonSmithingPressed(
                            dragonSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Shadow Warrior Line*/}
                <Line
                    x1="80%"
                    y1="23%"
                    x2="55%"
                    y2="28%"
                    stroke={glassSmithing}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfGlassSmithingPressed(
                            glassSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Backstab Line*/}
                <Line
                    x1="75%"
                    y1="61%"
                    x2="50%"
                    y2="80%"
                    stroke={dragonSmithing}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfDragonSmithingPressed(
                            dragonSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Backstab Circle*/}
                <Circle
                    cx="75%"
                    cy="61%"
                    r={circleRadius}
                    stroke={daedricSmithing}
                    strokeWidth={circleStrokeWidth}
                    fill="blue"
                    onPress={() => {
                        checkIfDaedricSmithingPressed(
                            daedricSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Deadly Aim Line*/}
                <Line
                    x1="76%"
                    y1="45%"
                    x2="75%"
                    y2="61%"
                    stroke={daedricSmithing}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfDaedricSmithingPressed(
                            daedricSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Deadly Aim Circle*/}
                <Circle
                    cx="76%"
                    cy="45%"
                    r={circleRadius}
                    stroke={ebonySmithing}
                    strokeWidth={circleStrokeWidth}
                    fill="blue"
                    onPress={() => {
                        checkIfEbonySmithingPressed(
                            ebonySmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Soul Squeezer Line*/}
                <Line
                    x1="60%"
                    y1="40%"
                    x2="76%"
                    y2="45%"
                    stroke={ebonySmithing}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfEbonySmithingPressed(
                            ebonySmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Assassins Circle */}
                <Circle
                    cx="60%"
                    cy="40%"
                    r={circleRadius}
                    stroke={orcishSmithing}
                    strokeWidth={circleStrokeWidth}
                    fill="blue"
                    onPress={() => {
                        checkIfOrcishSmithingPressed(
                            orcishSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Soul Siphon Line */}
                <Line
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="0%"
                    stroke={orcishSmithing}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfOrcishSmithingPressed(
                            orcishSmithing == 'blue' ? 'red' : 'blue'
                        );
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
            </Svg>
        </View>
    );
};

export default SneakTree;


