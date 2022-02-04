import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import Svg, { Circle, Line } from 'react-native-svg';
import {
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    Button,
    StyleSheet,
} from 'react-native';
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

const SmithingTree = ({
    IncrementAll,
    DecrementAll,
    UpdateCurrentLevel,
}) => {
    const [state, setState] = useSetState({
        basicSmithing: 'blue',
        arcaneSmithing: 'blue',
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

    const [ActivePerks, SetActivePerks] = useState(0);
    const [RequiredLevel, SetRequiredLevel] = useState(0);

    const IncrementCounter = (numActivePerks = 0) => {
        SetActivePerks(ActivePerks + numActivePerks);
    };
    const DecrementCounter = (numActivePerks = 0) => {
        if (ActivePerks === 0) {
            return;
        }
        SetActivePerks(ActivePerks - numActivePerks);
    };

    const TrackLevel = useCallback((level) => {
        SetRequiredLevel(level);
    }, []);

    const circleRadius = '12';
    const circleStrokeWidth = '10';
    const lineStrokeWidth = '6';

    const CheckLevel = useCallback(() => {
        if (state.dragonSmithing == 'red') {
            TrackLevel(100);
        } else if (state.daedricSmithing == 'red') {
            TrackLevel(90);
        } else if (state.ebonySmithing == 'red') {
            TrackLevel(80);
        } else if (state.glassSmithing == 'red') {
            TrackLevel(70);
        } else if (state.arcaneSmithing == 'red') {
            TrackLevel(60);
        } else if (state.advancedSmithing == 'red') {
            TrackLevel(50);
        } else if (state.elvinSmithing == 'red') {
            TrackLevel(30);
        } else if (state.basicSmithing == 'red') {
            TrackLevel(0);
        }
    }, [TrackLevel, state]);

    useEffect(() => {
        CheckLevel();
    }, [CheckLevel]);

    const CheckIfBasicSmithPressed = (buttonColorProp) => {
        if (
            state.elvinSmithing == 'red' ||
            state.arcaneSmithing == 'red' ||
            state.dwarvenSmithing == 'red'
        ) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ basicSmithing: buttonColorProp }); // Change button color back and forth

            state.basicSmithing == 'blue'
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfArcaneSmithPressed = (button2ColorProp) => {
        if (state.basicSmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ basicSmithing: button2ColorProp });
            setState({ arcaneSmithing: button2ColorProp });
            IncrementCounter(2);
        } else {
            setState({ arcaneSmithing: button2ColorProp }); // Change the pressed button color back and forth
            state.arcaneSmithing == 'blue'
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfElvinSmithPressed = (button3ColorProp) => {
        if (state.basicSmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ basicSmithing: button3ColorProp });
            setState({ elvinSmithing: button3ColorProp });

            IncrementCounter(2);
        } else if (state.advancedSmithing == 'red') {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ elvinSmithing: button3ColorProp }); // Change button color back and forth
            state.elvinSmithing == 'blue'
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfAdvanceSmithingPressed = (button4ColorProp) => {
        if (state.elvinSmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ basicSmithing: button4ColorProp });
            setState({ advancedSmithing: button4ColorProp });
            setState({ elvinSmithing: button4ColorProp });
            if (state.basicSmithing == 'red') {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.glassSmithing == 'red') {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ advancedSmithing: button4ColorProp }); // Change the pressed button color back and forth
            state.advancedSmithing == 'blue'
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfGlassSmithingPressed = (button5ColorProp) => {
        if (state.advancedSmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ glassSmithing: button5ColorProp });
            setState({ advancedSmithing: button5ColorProp });
            setState({ elvinSmithing: button5ColorProp });
            setState({ glassSmithing: button5ColorProp });
            setState({ basicSmithing: button5ColorProp });
        } else {
            setState({ glassSmithing: button5ColorProp }); // Change the pressed button color back and forth
        }
    };
    const CheckIfDwarvenSmithingPressed = (button6ColorProp) => {
        if (state.basicSmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ dwarvenSmithing: button6ColorProp });
            setState({ basicSmithing: button6ColorProp });
            IncrementCounter(2);
        } else if (state.orcishSmithing == 'red') {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ dwarvenSmithing: button6ColorProp }); // Change the pressed button color back and forth
        }
    };
    const CheckIfOrcishSmithingPressed = (button7ColorProp) => {
        if (state.dwarvenSmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ orcishSmithing: button7ColorProp });
            setState({ dwarvenSmithing: button7ColorProp });
            setState({ basicSmithing: button7ColorProp });
        } else if (state.ebonySmithing == 'red') {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ orcishSmithing: button7ColorProp }); // Change the pressed button color back and forth
        }
    };
    const CheckIfEbonySmithingPressed = (button8ColorProp) => {
        if (state.orcishSmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ ebonySmithing: button8ColorProp });
            setState({ orcishSmithing: button8ColorProp });
            setState({ dwarvenSmithing: button8ColorProp });
            setState({ basicSmithing: button8ColorProp });
        } else if (state.daedricSmithing == 'red') {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ ebonySmithing: button8ColorProp }); // Change the pressed button color back and forth
        }
    };
    const CheckIfDaedricSmithingPressed = (button9ColorProp) => {
        if (state.ebonySmithing == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ daedricSmithing: button9ColorProp });
            setState({ ebonySmithing: button9ColorProp });
            setState({ orcishSmithing: button9ColorProp });
            setState({ dwarvenSmithing: button9ColorProp });
            setState({ basicSmithing: button9ColorProp });
        } else if (state.dragonSmithing == 'red') {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ daedricSmithing: button9ColorProp }); // Change the pressed button color back and forth
        }
    };
    const CheckIfDragonSmithingPressed = (button10ColorProp) => {
        if (state.daedricSmithing == 'blue') {
            setState({ dragonSmithing: button10ColorProp });
            setState({ daedricSmithing: button10ColorProp });
            setState({ ebonySmithing: button10ColorProp });
            setState({ orcishSmithing: button10ColorProp });
            setState({ dwarvenSmithing: button10ColorProp });
            setState({ basicSmithing: button10ColorProp });
        } else {
            setState({ dragonSmithing: button10ColorProp });
        }
    };
    const CheckFinalMiddleLine = (button11ColorProp) => {
        if (state.glassSmithing == 'red' && state.dragonSmithing == 'red') {
            setState({ middleLine: button11ColorProp });
        }
    };

    return (
        <View style={{ zIndex: 2 }}>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
                <Circle
                    cx="35%"
                    cy="80%"
                    r={circleRadius}
                    stroke={state.basicSmithing}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfBasicSmithPressed(
                            state.basicSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />

                <Line
                    x1="35.3%"
                    y1="79.2%"
                    x2="40%"
                    y2="60%"
                    stroke={state.arcaneSmithing}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        CheckIfArcaneSmithPressed(
                            state.arcaneSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="40%"
                    cy="60%"
                    r={circleRadius}
                    stroke={state.arcaneSmithing}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onPress={() => {
                        CheckIfArcaneSmithPressed(
                            state.arcaneSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="8%"
                    cy="55%"
                    r={circleRadius}
                    stroke={state.elvinSmithing}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onPress={() => {
                        CheckIfElvinSmithPressed(
                            state.elvinSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="34.2%"
                    y1="79.3%"
                    x2="8.5%"
                    y2="55.7%"
                    stroke={state.elvinSmithing}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        CheckIfElvinSmithPressed(
                            state.elvinSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="14%"
                    cy="48%"
                    r={circleRadius}
                    stroke={state.advancedSmithing}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onPress={() => {
                        CheckIfAdvanceSmithingPressed(
                            state.advancedSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="8.3%"
                    y1="54.4%"
                    x2="13.5%"
                    y2="48.6%"
                    stroke={state.advancedSmithing}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        CheckIfAdvanceSmithingPressed(
                            state.advancedSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="34%"
                    cy="39%"
                    r={circleRadius}
                    stroke={state.glassSmithing}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onPress={() => {
                        CheckIfGlassSmithingPressed(
                            state.glassSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="15%"
                    y1="47.5%"
                    x2="32.8%"
                    y2="39.5%"
                    stroke={state.glassSmithing}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        CheckIfGlassSmithingPressed(
                            state.glassSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="54%"
                    cy="39%"
                    r={circleRadius}
                    stroke={state.dragonSmithing}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onPress={() => {
                        CheckIfDragonSmithingPressed(
                            state.dragonSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="35.3%"
                    y1="39%"
                    x2="53%"
                    y2="39%"
                    stroke={state.glassSmithing}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        CheckIfGlassSmithingPressed(
                            state.glassSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="55.5%"
                    y1="39.3%"
                    x2="74%"
                    y2="45%"
                    stroke={state.dragonSmithing}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        CheckIfDragonSmithingPressed(
                            state.dragonSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="74%"
                    cy="45%"
                    r={circleRadius}
                    stroke={state.daedricSmithing}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onPress={() => {
                        CheckIfDaedricSmithingPressed(
                            state.daedricSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="75%"
                    y1="45.5%"
                    x2="92%"
                    y2="55%"
                    stroke={state.daedricSmithing}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        CheckIfDaedricSmithingPressed(
                            state.daedricSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="92%"
                    cy="55%"
                    r={circleRadius}
                    stroke={state.ebonySmithing}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onPress={() => {
                        CheckIfEbonySmithingPressed(
                            state.ebonySmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="91%"
                    y1="55%"
                    x2="80%"
                    y2="55%"
                    stroke={state.ebonySmithing}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        CheckIfEbonySmithingPressed(
                            state.ebonySmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="80%"
                    cy="55%"
                    r={circleRadius}
                    stroke={state.orcishSmithing}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onPress={() => {
                        CheckIfOrcishSmithingPressed(
                            state.orcishSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="79%"
                    y1="55.5%"
                    x2="60%"
                    y2="65%"
                    stroke={state.orcishSmithing}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        CheckIfOrcishSmithingPressed(
                            state.orcishSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Circle
                    cx="60%"
                    cy="65%"
                    r={circleRadius}
                    stroke={state.dwarvenSmithing}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onPress={() => {
                        CheckIfDwarvenSmithingPressed(
                            state.dwarvenSmithing == 'blue' ? 'red' : 'blue'
                        );
                    }}
                />
                <Line
                    x1="59.2%"
                    y1="65.4%"
                    x2="36.3%"
                    y2="79.9%"
                    stroke={state.dwarvenSmithing}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        CheckIfDwarvenSmithingPressed(
                            state.dwarvenSmithing == 'blue' ? 'red' : 'blue'
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
            <View style={styles.bottomText}>
                <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
                <Text style={styles.HomeScreenText}>Required Skill: { } </Text>
                <Text style={styles.HomeScreenText}>All Active Perks: { }</Text>
                <Text style={styles.HomeScreenText}>
                    Required level: {RequiredLevel}{' '}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    HomeScreenText: {
        color: 'white',
    },
    bottomText: {
        position: 'absolute',

        left: 0,
        right: 0,
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SmithingTree;
