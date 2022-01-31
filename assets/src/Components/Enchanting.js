import * as React from 'react';
import { useState } from 'react';
import Svg, { Circle, Line } from 'react-native-svg';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const EnchantingTree = () => {
    const [hold, sethold] = useState('blue');
    const [basicEnchanter, setBasicEnchanter] = useState('blue');
    const [insightfulEnchanter, setInsightfulEnchanter] = useState('blue');
    const [corpusEnchanter, setCorpusEnchanter] = useState('blue');
    const [extraEffect, setExtraEffect] = useState('blue');
    const [fireEnchanter, setFireEnchanter] = useState('blue');
    const [dwarvenSmithing, setDwarvenSmithing] = useState('blue');
    const [soulSiphon, setSoulSiphon] = useState('blue');
    const [soulSqueezer, setSoulSqueezer] = useState('blue');
    const [stormEnchanter, setStormEnchanter] = useState('blue');
    const [frostEnchanter, setFrostEnchanter] = useState('blue');
    const [middleLine, setMiddleLine] = useState('blue');

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isMenuVisible, setIsMenuVisible] = React.useState(false);

    const [count, setCount] = useState(0);

    const circleRadius = '8';
    const circleStrokeWidth = '8';
    const lineStrokeWidth = '3';

    const checkIfBasicEnchanterPressed = (buttonColorProp) => {
        if (
            corpusEnchanter == 'red' ||
            insightfulEnchanter == 'red' ||
            dwarvenSmithing == 'red'
        ) {
            // Do nothing....must un-select nodes above it first
        } else {
            setBasicEnchanter(buttonColorProp); // Change button color back and forth
        }
    };
    const checkIfInsightfulEnchanterPressed = (button2ColorProp) => {
        if (basicEnchanter == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setBasicEnchanter(button2ColorProp);
            setInsightfulEnchanter(button2ColorProp);
        } else {
            setInsightfulEnchanter(button2ColorProp); // Change the pressed button color back and forth
        }
    };

    const checkIfCorpusEnchanterPressed = (button3ColorProp) => {
        if (basicEnchanter == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setBasicEnchanter(button3ColorProp);
            setCorpusEnchanter(button3ColorProp);
        } else if (extraEffect == 'red') {
            // Do nothing....must un-select nodes above it first
        } else {
            setCorpusEnchanter(button3ColorProp); // Change button color back and forth
        }
    };
    const checkIfExtraEffectPressed = (button4ColorProp) => {
        if (corpusEnchanter == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setExtraEffect(button4ColorProp);
            setCorpusEnchanter(button4ColorProp);
            setBasicEnchanter(button4ColorProp);
        } else if (fireEnchanter == 'red') {
            // Do nothing....must un-select nodes above it first
        } else {
            setExtraEffect(button4ColorProp); // Change the pressed button color back and forth
        }
    };
    const checkIfFireEnchanterPressed = (button5ColorProp) => {
        if (extraEffect == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setFireEnchanter(button5ColorProp);
            setExtraEffect(button5ColorProp);
            setCorpusEnchanter(button5ColorProp);
            setBasicEnchanter(button5ColorProp);
        } else {
            setFireEnchanter(button5ColorProp); // Change the pressed button color back and forth
        }
    };
    const checkIfBasicEnchanterPressed = (button6ColorProp) => {
        if (basicEnchanter == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setDwarvenSmithing(button6ColorProp);
            setBasicEnchanter(button6ColorProp);
        } else if (soulSiphon == 'red') {
            // Do nothing....must un-select nodes above it first
        } else {
            setDwarvenSmithing(button6ColorProp); // Change the pressed button color back and forth
        }
    };
    const checkIfSoulSiphonPressed = (button7ColorProp) => {
        if (dwarvenSmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setSoulSiphon(button7ColorProp);
            setDwarvenSmithing(button7ColorProp);
            setBasicEnchanter(button7ColorProp);
        } else if (soulSqueezer == 'red') {
            // Do nothing....must un-select nodes above it first
        } else {
            setSoulSiphon(button7ColorProp); // Change the pressed button color back and forth
        }
    };
    const checkIfSoulSqueezerPressed = (button8ColorProp) => {
        if (soulSiphon == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setSoulSqueezer(button8ColorProp);
            setSoulSiphon(button8ColorProp);
            setDwarvenSmithing(button8ColorProp);
            setBasicEnchanter(button8ColorProp);
        } else if (frostEnchanter == 'red') {
            // Do nothing....must un-select nodes above it first
        } else {
            setSoulSqueezer(button8ColorProp); // Change the pressed button color back and forth
        }
    };
    const checkIfStormEnchanterPressed = (button9ColorProp) => {
        if (soulSqueezer == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setStormEnchanter(button9ColorProp);
            setSoulSqueezer(button9ColorProp);
            setSoulSiphon(button9ColorProp);
            setDwarvenSmithing(button9ColorProp);
            setBasicEnchanter(button9ColorProp);
        } else if (frostEnchanter == 'red') {
            // Do nothing....must un-select nodes above it first
        } else {
            setStormEnchanter(button9ColorProp); // Change the pressed button color back and forth
        }
    };
    const checkIfFrostEnchanterPressed = (button10ColorProp) => {
        if (frostEnchanter == 'blue') {
            setFrostEnchanter(button10ColorProp);
            setStormEnchanter(button10ColorProp);
            setSoulSqueezer(button10ColorProp);
            setSoulSiphon(button10ColorProp);
            setDwarvenSmithing(button10ColorProp);
            setBasicEnchanter(button10ColorProp);
        } else {
            setFrostEnchanter(button10ColorProp);
        }

    };
    const checkFinalMiddleLine = (buttonColor11Prop) => {
        if (fireEnchanter == 'red' && frostEnchanter == 'red') {
            setMiddleLine(buttonColor11Prop);
        }
    };

    return (
        <View>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
                {/* Enchanter Circle*/}
                <Circle
                    cx="45%"
                    cy="80%"
                    r={circleRadius}
                    stroke={basicEnchanter}
                    strokeWidth={circleStrokeWidth}
                    fill="blue"
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        checkIfBasicEnchanterPressed(basicEnchanter == 'blue' ? 'red' : 'blue');
                    }}
                />
                {/* Insightful Enchanter Line*/}
                <Line
                    x1="45%"
                    y1="80%"
                    x2="50%"
                    y2="55%"
                    stroke={insightfulEnchanter}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfInsightfulEnchanterPressed(insightfulEnchanter == 'blue' ? 'red' : 'blue');
                    }}
                />
                {/* Insightful Enchanter Circle*/}
                <Circle
                    cx="50%"
                    cy="55%"
                    r={circleRadius}
                    stroke={insightfulEnchanter}
                    strokeWidth={circleStrokeWidth}
                    fill="blue"
                    onPress={() => {
                        checkIfInsightfulEnchanterPressed(insightfulEnchanter == 'blue' ? 'red' : 'blue');
                    }}
                />
                {/* Corpus Enchanter Circle */}
                <Circle
                    cx="65%"
                    cy="40%"
                    r={circleRadius}
                    stroke={corpusEnchanter}
                    strokeWidth={circleStrokeWidth}
                    fill="blue"
                    onPress={() => {
                        checkIfCorpusEnchanterPressed(corpusEnchanter == 'blue' ? 'red' : 'blue');
                    }}
                />
                {/* Corpus Enchanter Line */}
                <Line
                    x1="65%"
                    y1="40%"
                    x2="50%"
                    y2="55%"
                    stroke={corpusEnchanter}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfCorpusEnchanterPressed(corpusEnchanter == 'blue' ? 'red' : 'blue');
                    }}
                />
                {/* Extra Effect Circle */}
                <Circle
                    cx="50%"
                    cy="20%"
                    r={circleRadius}
                    stroke={extraEffect}
                    strokeWidth={circleStrokeWidth}
                    fill="blue"
                    onPress={() => {
                        checkIfExtraEffectPressed(
                            extraEffect == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Extra Effect Line */}
                <Line
                    x1="50%"
                    y1="20%"
                    x2="65%"
                    y2="40%"
                    stroke={extraEffect}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfExtraEffectPressed(
                            extraEffect == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Fire Enchanter Circle*/}
                <Circle
                    cx="15%"
                    cy="60%"
                    r={circleRadius}
                    stroke={fireEnchanter}
                    strokeWidth={circleStrokeWidth}
                    fill="blue"
                    onPress={() => {
                        checkIfFireEnchanterPressed(
                            fireEnchanter == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Fire Enchanter Line*/}
                <Line
                    x1="15%"
                    y1="60%"
                    x2="45%"
                    y2="80%"
                    stroke={fireEnchanter}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfFireEnchanterPressed(
                            fireEnchanter == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Frost Enchanter Circle*/}
                <Circle
                    cx="18%"
                    cy="43%"
                    r={circleRadius}
                    stroke={frostEnchanter}
                    strokeWidth={circleStrokeWidth}
                    fill="blue"
                    onPress={() => {
                        checkIfFrostEnchanterPressed(
                            frostEnchanter == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Frost Enchanter Line*/}
                <Line
                    x1="18%"
                    y1="43%"
                    x2="15%"
                    y2="60%"
                    stroke={frostEnchanter}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfFrostEnchanterPressed(
                            frostEnchanter == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Storm Enchanter Line*/}
                <Line
                    x1="30%"
                    y1="30%"
                    x2="18%"
                    y2="43%"
                    stroke={stormEnchanter}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfStormEnchanterPressed(
                            stormEnchanter == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Storm Enchanter Circle*/}
                <Circle
                    cx="30%"
                    cy="30%"
                    r={circleRadius}
                    stroke={stormEnchanter}
                    strokeWidth={circleStrokeWidth}
                    fill="blue"
                    onPress={() => {
                        checkIfStormEnchanterPressed(
                            stormEnchanter == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Extra Effect Left Line*/}
                <Line
                    x1="30%"
                    y1="30%"
                    x2="50%"
                    y2="20%"
                    stroke={extraEffect}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfStormEnchanterPressed(
                            extraEffect == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Soul Squeezer Circle*/}
                <Circle
                    cx="89%"
                    cy="55%"
                    r={circleRadius}
                    stroke={soulSqueezer}
                    strokeWidth={circleStrokeWidth}
                    fill="blue"
                    onPress={() => {
                        checkIfSoulSqueezerPressed(
                            soulSqueezer == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Soul Squeezer Line*/}
                <Line
                    x1="89%"
                    y1="55%"
                    x2="45%"
                    y2="80%"
                    stroke={soulSqueezer}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfSoulSqueezerPressed(
                            soulSqueezer == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Soul Siphon Circle */}
                <Circle
                    cx="75%"
                    cy="28%"
                    r={circleRadius}
                    stroke={soulSiphon}
                    strokeWidth={circleStrokeWidth}
                    fill="blue"
                    onPress={() => {
                        checkIfSoulSiphonPressed(
                            soulSiphon == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                {/* Soul Siphon Line */}
                <Line
                    x1="75%"
                    y1="28%"
                    x2="89%"
                    y2="55%"
                    stroke={soulSiphon}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfSoulSiphonPressed(
                            soulSiphon == 'blue' ? 'red' : 'blue'
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

export default EnchantingTree;


