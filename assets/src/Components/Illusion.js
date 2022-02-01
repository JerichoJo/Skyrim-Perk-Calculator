import * as React from 'react';
import { useState } from 'react';
import Svg, { Circle, Line } from 'react-native-svg';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const useSetState = (initialState = {}) => {
    const [state, regularSetState] = useState(initialState);

    const setState = (newState) => {
        regularSetState((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };

    return [state, setState];
};

const IllusionTree = () => {
    const [state, setState] = useSetState({
        basicSmithing: 'blue',
        arcaneSmith: 'blue',
        elvinSmithing: 'blue',
        advancedSmithing: 'blue',
        glassSmithing: 'blue',
        dwarvenSmithing: 'blue',
        orcishSmithing: 'blue',
        ebonySmithing: 'blue',
        daedricSmithing: 'blue',
        dragonSmithing: 'blue',
        middleLine: 'blue',
    });

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isMenuVisible, setIsMenuVisible] = React.useState(false);

    const [count, setCount] = useState(0);

    const circleRadius = '12';
    const circleStrokeWidth = '12';
    const lineStrokeWidth = '8';

    const checkIfBasicSmithPressed = (buttonColorProp) => {
        if (
            state.elvinSmithing == 'red' ||
            state.arcaneSmith == 'red' ||
            state.dwarvenSmithing == 'red'
        ) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ basicSmithing: buttonColorProp }); // Change button color back and forth
            //setBasicSmithing(buttonColorProp);
        }
    };
    const checkIfArcaneSmithPressed = (button2ColorProp) => {
        if (state.basicSmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ basicSmithing: button2ColorProp });
            setState({ arcaneSmith: button2ColorProp });
        } else {
            setState({ arcaneSmith: button2ColorProp }); // Change the pressed button color back and forth
        }
    };

    const checkIfElvinSmithPressed = (button3ColorProp) => {
        if (state.basicSmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ basicSmithing: button3ColorProp });
            setState({ elvinSmithing: button3ColorProp });
        } else if (state.advancedSmithing == 'red') {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ elvinSmithing: button3ColorProp }); // Change button color back and forth
        }
    };

    return (
        <View>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
                <Circle
                    cx="50%"
                    cy="80%"
                    r={circleRadius}
                    fill={state.basicSmithing}
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        checkIfBasicSmithPressed(
                            state.basicSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="48%"
                    y1="80%"
                    x2="11%"
                    y2="76%"
                    stroke={state.arcaneSmith}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfArcaneSmithPressed(
                            state.arcaneSmith == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="10%"
                    cy="76%"
                    r={circleRadius}
                    fill={state.basicSmithing}
                    onPress={() => {
                        checkIfBasicSmithPressed(
                            state.basicSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="10%"
                    y1="76%"
                    x2="24%"
                    y2="61%"
                    stroke={state.arcaneSmith}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfArcaneSmithPressed(
                            state.arcaneSmith == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="24%"
                    cy="61%"
                    r={circleRadius}
                    fill={state.basicSmithing}
                    onPress={() => {
                        checkIfBasicSmithPressed(
                            state.basicSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="24%"
                    y1="61%"
                    x2="29%"
                    y2="47%"
                    stroke={state.arcaneSmith}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfArcaneSmithPressed(
                            state.arcaneSmith == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />

                <Circle
                    cx="29%"
                    cy="47%"
                    r={circleRadius}
                    fill={state.basicSmithing}
                    onPress={() => {
                        checkIfBasicSmithPressed(
                            state.basicSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="29%"
                    y1="47%"
                    x2="25%"
                    y2="37%"
                    stroke={state.arcaneSmith}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfArcaneSmithPressed(
                            state.arcaneSmith == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="25%"
                    cy="37%"
                    r={circleRadius}
                    fill={state.basicSmithing}
                    onPress={() => {
                        checkIfBasicSmithPressed(
                            state.basicSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="25%"
                    y1="37%"
                    x2="37%"
                    y2="25%"
                    stroke={state.arcaneSmith}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfArcaneSmithPressed(
                            state.arcaneSmith == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="37%"
                    cy="25%"
                    r={circleRadius}
                    fill={state.basicSmithing}
                    onPress={() => {
                        checkIfBasicSmithPressed(
                            state.basicSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="50%"
                    y1="80%"
                    x2="50%"
                    y2="55%"
                    stroke={state.arcaneSmith}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfArcaneSmithPressed(
                            state.arcaneSmith == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="50%"
                    cy="55%"
                    r={circleRadius}
                    fill={state.basicSmithing}
                    onPress={() => {
                        checkIfBasicSmithPressed(
                            state.basicSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="50%"
                    y1="55%"
                    x2="40%"
                    y2="42%"
                    stroke={state.arcaneSmith}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfArcaneSmithPressed(
                            state.arcaneSmith == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="40%"
                    cy="42%"
                    r={circleRadius}
                    fill={state.basicSmithing}
                    onPress={() => {
                        checkIfBasicSmithPressed(
                            state.basicSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="40%"
                    y1="42%"
                    x2="50%"
                    y2="38%"
                    stroke={state.arcaneSmith}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfArcaneSmithPressed(
                            state.arcaneSmith == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="50%"
                    cy="38%"
                    r={circleRadius}
                    fill={state.basicSmithing}
                    onPress={() => {
                        checkIfBasicSmithPressed(
                            state.basicSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="50%"
                    y1="38%"
                    x2="62%"
                    y2="25%"
                    stroke={state.arcaneSmith}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfArcaneSmithPressed(
                            state.arcaneSmith == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="62%"
                    cy="25%"
                    r={circleRadius}
                    fill={state.basicSmithing}
                    onPress={() => {
                        checkIfBasicSmithPressed(
                            state.basicSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="50%"
                    y1="80%"
                    x2="90%"
                    y2="67%"
                    stroke={state.arcaneSmith}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfArcaneSmithPressed(
                            state.arcaneSmith == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="90%"
                    cy="67%"
                    r={circleRadius}
                    fill={state.basicSmithing}
                    onPress={() => {
                        checkIfBasicSmithPressed(
                            state.basicSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="90%"
                    y1="67%"
                    x2="75%"
                    y2="50%"
                    stroke={state.arcaneSmith}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfArcaneSmithPressed(
                            state.arcaneSmith == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="75%"
                    cy="50%"
                    r={circleRadius}
                    fill={state.basicSmithing}
                    onPress={() => {
                        checkIfBasicSmithPressed(
                            state.basicSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="75%"
                    y1="50%"
                    x2="73%"
                    y2="38%"
                    stroke={state.arcaneSmith}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfArcaneSmithPressed(
                            state.arcaneSmith == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="73%"
                    cy="38%"
                    r={circleRadius}
                    fill={state.basicSmithing}
                    onPress={() => {
                        checkIfBasicSmithPressed(
                            state.basicSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="73%"
                    y1="38%"
                    x2="63%"
                    y2="25%"
                    stroke={state.arcaneSmith}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfArcaneSmithPressed(
                            state.arcaneSmith == 'blue' ? 'red' : 'blue'
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

export default IllusionTree;