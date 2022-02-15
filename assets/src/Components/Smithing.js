import * as React from 'react';
import { useState, useCallback, useEffect, useContext } from 'react';
import Svg, { Line } from 'react-native-svg';
import {
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import StarIconBlue from './StarIconBlue';
import StarIconGold from './StarIconGold';
//import { AllActivePerkss } from '../../../App';
import { AllActivePerkss } from '../../../StackNavigator';
import { useNavigation } from '@react-navigation/native';

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

const SmithingTree = () => {
    const navigation = useNavigation();
    const [state, setState] = useSetState({
        basicSmithing: 0,
        arcaneSmithing: 0,
        arcaneSmithingLine: 'black',
        elvinSmithing: 0,
        elvinSmithingLine: 'black',
        advancedSmithing: 0,
        advancedSmithingLine: 'black',
        glassSmithing: 0,
        glassSmithingLine: 'black',
        dwarvenSmithing: 0,
        dwarvenSmithingLine: 'black',
        orcishSmithing: 0,
        orcishSmithingLine: 'black',
        ebonySmithing: 0,
        ebonySmithingLine: 'black',
        daedricSmithing: 0,
        daedricSmithingLine: 'black',
        dragonSmithing: 0,
        dragonSmithingLine: 'black',
        dragonSmithingLineLight: 'black',
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [count, setCount] = useState(0);

    const [ActivePerks, SetActivePerks] = useState(0);
    const [RequiredLevel, SetRequiredLevel] = useState(0);
    const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);

    const IncrementCounter = (numActivePerks = 0) => {
        SetActivePerks(ActivePerks + numActivePerks);
        SetAllActivePerks(AllActivePerks + numActivePerks);
    };
    const DecrementCounter = (numActivePerks = 0) => {
        if (ActivePerks === 0) {
            return;
        }
        SetActivePerks(ActivePerks - numActivePerks);
        SetAllActivePerks(AllActivePerks - numActivePerks);
    };

    const TrackLevel = useCallback((level) => {
        SetRequiredLevel(level);
    }, []);

    const lineStrokeWidth = '2';

    const CheckLevel = useCallback(() => {
        if (state.dragonSmithing == 1) {
            TrackLevel(100);
        } else if (state.daedricSmithing == 1) {
            TrackLevel(90);
        } else if (state.ebonySmithing == 1) {
            TrackLevel(80);
        } else if (state.glassSmithing == 1) {
            TrackLevel(70);
        } else if (state.arcaneSmithing == 1) {
            TrackLevel(60);
        } else if (state.advancedSmithing == 1) {
            TrackLevel(50);
        } else if (state.elvinSmithing == 1) {
            TrackLevel(30);
        } else if (state.basicSmithing == 1) {
            TrackLevel(0);
        }
    }, [TrackLevel, state]);

    useEffect(() => {
        CheckLevel();
    }, [CheckLevel]);

    const CheckIfBasicSmithPressed = (button) => {
        if (
            state.elvinSmithing == 1 ||
            state.arcaneSmithing == 1 ||
            state.dwarvenSmithing == 1
        ) {
            // Do nothing....must un-select nodes above it first
        }
        else {
            setState({ basicSmithing: button }); // Change button color back and forth
            state.basicSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfArcaneSmithPressed = (button, line) => {
        if (state.basicSmithing == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ basicSmithing: button });
            setState({ basicSmithingLine: line });
            setState({ arcaneSmithing: button });
            setState({ arcaneSmithingLine: line });
            IncrementCounter(2);
        } else {
            setState({ arcaneSmithingLine: line });
            setState({ arcaneSmithing: button }); // Change the pressed button color back and forth
            state.arcaneSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfElvinSmithPressed = (buttonColor, lineColor) => {
        if (state.basicSmithing == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ basicSmithing: buttonColor });
            setState({ basicSmithingLine: lineColor });
            setState({ elvinSmithing: buttonColor });
            setState({ elvinSmithingLine: lineColor });

            IncrementCounter(2);
        } else if (state.advancedSmithing == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ elvinSmithingLine: lineColor });
            setState({ elvinSmithing: buttonColor }); // Change button color back and forth
            state.elvinSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfAdvanceSmithingPressed = (buttonColor, lineColor) => {
        if (state.elvinSmithing == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ basicSmithing: buttonColor });
            setState({ advancedSmithing: buttonColor });
            setState({ elvinSmithing: buttonColor });
            setState({ advancedSmithingLine: lineColor });
            setState({ elvinSmithingLine: lineColor });
            if (state.basicSmithing == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.glassSmithing == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ advancedSmithingLine: lineColor });
            setState({ advancedSmithing: buttonColor }); // Change the pressed button color back and forth
            state.advancedSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfGlassSmithingPressed = (buttonColor, lineColor) => {
        if (state.advancedSmithing == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ glassSmithing: buttonColor });
            setState({ advancedSmithing: buttonColor });
            setState({ elvinSmithing: buttonColor });
            setState({ basicSmithing: buttonColor });
            setState({ glassSmithingLine: lineColor });
            setState({ advancedSmithingLine: lineColor });
            setState({ elvinSmithingLine: lineColor });
            if (state.dragonSmithing == 1) {
                setState({ dragonSmithingLineLight: lineColor });
            }
            if (state.elvinSmithing == 1) {
                IncrementCounter(2);
            } else if (state.basicSmithing == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else {
            setState({ glassSmithingLine: lineColor });
            setState({ glassSmithing: buttonColor }); // Change the pressed button color back and forth
            state.glassSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
            if (state.dragonSmithing == 1) {
                setState({ dragonSmithingLineLight: lineColor });
            }

        }
    };
    const CheckIfDwarvenSmithingPressed = (buttonColor, lineColor) => {
        if (state.basicSmithing == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ dwarvenSmithing: buttonColor });
            setState({ basicSmithing: buttonColor });
            setState({ dwarvenSmithingLine: lineColor });
            IncrementCounter(2);
        } else if (state.orcishSmithing == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ dwarvenSmithingLine: lineColor });
            setState({ dwarvenSmithing: buttonColor }); // Change the pressed button color back and forth
            state.dwarvenSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfOrcishSmithingPressed = (buttonColor, lineColor) => {
        if (state.dwarvenSmithing == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ orcishSmithing: buttonColor });
            setState({ dwarvenSmithing: buttonColor });
            setState({ basicSmithing: buttonColor });
            setState({ orcishSmithingLine: lineColor });
            setState({ dwarvenSmithingLine: lineColor });
            if (state.basicSmithing == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.ebonySmithing == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ orcishSmithingLine: lineColor });
            setState({ orcishSmithing: buttonColor }); // Change the pressed button color back and forth
            state.orcishSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfEbonySmithingPressed = (buttonColor, lineColor) => {
        if (state.orcishSmithing == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ ebonySmithing: buttonColor });
            setState({ orcishSmithing: buttonColor });
            setState({ dwarvenSmithing: buttonColor });
            setState({ basicSmithing: buttonColor });
            setState({ ebonySmithingLine: lineColor });
            setState({ orcishSmithingLine: lineColor });
            setState({ dwarvenSmithingLine: lineColor });
            if (state.dwarvenSmithing == 1) {
                IncrementCounter(2);
            } else if (state.basicSmithing == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else if (state.daedricSmithing == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ ebonySmithingLine: lineColor });
            setState({ ebonySmithing: buttonColor }); // Change the pressed button color back and forth
            state.ebonySmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfDaedricSmithingPressed = (buttonColor, lineColor) => {
        if (state.ebonySmithing == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ daedricSmithing: buttonColor });
            setState({ ebonySmithing: buttonColor });
            setState({ orcishSmithing: buttonColor });
            setState({ dwarvenSmithing: buttonColor });
            setState({ basicSmithing: buttonColor });
            setState({ daedricSmithingLine: lineColor });
            setState({ ebonySmithingLine: lineColor });
            setState({ orcishSmithingLine: lineColor });
            setState({ dwarvenSmithingLine: lineColor });
            if (state.orcishSmithing == 1) {
                IncrementCounter(2);
            } else if (state.dwarvenSmithing == 1) {
                IncrementCounter(3);
            } else if (state.basicSmithing == 1) {
                IncrementCounter(4);
            } else {
                IncrementCounter(5);
            }
        } else if (state.dragonSmithing == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ daedricSmithingLine: lineColor });
            setState({ daedricSmithing: buttonColor }); // Change the pressed button color back and forth
            state.daedricSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfDragonSmithingPressed = (buttonColor, lineColor) => {
        if (state.daedricSmithing == 0) {
            setState({ dragonSmithing: buttonColor });
            setState({ daedricSmithing: buttonColor });
            setState({ ebonySmithing: buttonColor });
            setState({ orcishSmithing: buttonColor });
            setState({ dwarvenSmithing: buttonColor });
            setState({ basicSmithing: buttonColor });
            setState({ dragonSmithingLine: lineColor });
            setState({ daedricSmithingLine: lineColor });
            setState({ ebonySmithingLine: lineColor });
            setState({ orcishSmithingLine: lineColor });
            setState({ dwarvenSmithingLine: lineColor });
            if (state.glassSmithing == 1) {
                setState({ dragonSmithingLineLight: lineColor });
            }
            if (state.ebonySmithing == 1) {
                IncrementCounter(2);
            } else if (state.orcishSmithing == 1) {
                IncrementCounter(3);
            } else if (state.dwarvenSmithing == 1) {
                IncrementCounter(4);
            } else if (state.basicSmithing == 1) {
                IncrementCounter(5);
            } else {
                IncrementCounter(6);
            }
        } else {
            setState({ dragonSmithingLine: lineColor });
            setState({ dragonSmithing: buttonColor });
            state.dragonSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
            if (state.glassSmithing == 1) {
                setState({ dragonSmithingLineLight: lineColor });
            }
        }
    };

    return (
        <View style={{ zIndex: 2 }}>
            <View style={styles.topText}>
                <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
                <Text style={styles.HomeScreenText}>Required Level: {RequiredLevel} </Text>
            </View>
            <View title='Basic Smithing Blue' style={{
                position: 'absolute',
                left: "25%",
                top: "75%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Basic Smithing Gold' style={{
                position: 'absolute',
                left: "25%",
                top: "75%",
                zIndex: 8,
                opacity: state.basicSmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("BasicSmithingModal")}
                    onPress={() => {
                        CheckIfBasicSmithPressed(
                            state.basicSmithing == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.BasicSmithText}>
                <Text style={styles.PerkText}>Basic Smithing</Text>
            </View>
            <View title='Arcane Smithing Blue' style={{
                position: 'absolute',
                left: "30%",
                top: "55%",
                zIndex: 8,

            }}>

                <StarIconBlue />
            </View>
            <View title='Arcane Smithing Gold' style={{
                position: 'absolute',
                left: "30%",
                top: "55%",
                zIndex: 8,
                opacity: state.arcaneSmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ArcaneSmithingModal")}
                    onPress={() => {
                        CheckIfArcaneSmithPressed(
                            state.arcaneSmithing == 0 ? 1 : 0,
                            state.arcaneSmithingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ArcaneSmithText}>
                <Text style={styles.PerkText}>Arcane Blacksmith</Text>
            </View>
            <View title='Elvin Smithing Blue' style={{
                position: 'absolute',
                left: "-2%",
                top: "50%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Elvin Smithing Gold' style={{
                position: 'absolute',
                left: "-2%",
                top: "50%",
                zIndex: 8,
                opacity: state.elvinSmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfElvinSmithPressed(
                            state.elvinSmithing == 0 ? 1 : 0,
                            state.elvinSmithingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ElvenSmithText}>
                <Text style={styles.PerkText}>Elvin Smithing</Text>
            </View>
            <View title='Advanced Smithing Blue' style={{
                position: 'absolute',
                left: "4%",
                top: "43%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Advanced Smithing Gold' style={{
                position: 'absolute',
                left: "4%",
                top: "43%",
                zIndex: 8,
                opacity: state.advancedSmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfAdvanceSmithingPressed(
                            state.advancedSmithing == 0 ? 1 : 0,
                            state.advancedSmithingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AdvancedArmorsText}>
                <Text style={styles.PerkText}>Advanced Armors</Text>
            </View>
            <View title='Glass Smithing Blue' style={{
                position: 'absolute',
                left: "24%",
                top: "34%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Glass Smithing Gold' style={{
                position: 'absolute',
                left: "24%",
                top: "34%",
                zIndex: 8,
                opacity: state.glassSmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfGlassSmithingPressed(
                            state.glassSmithing == 0 ? 1 : 0,
                            state.glassSmithingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.GlassSmithText}>
                <Text style={styles.PerkText}>Glass Smithing</Text>
            </View>
            <View title='Dragon Smithing Blue' style={{
                position: 'absolute',
                left: "44%",
                top: "34%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Dragon Smithing Gold' style={{
                position: 'absolute',
                left: "44%",
                top: "34%",
                zIndex: 8,
                opacity: state.dragonSmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfDragonSmithingPressed(
                            state.dragonSmithing == 0 ? 1 : 0,
                            state.dragonSmithingLine == 'black' ? 'gold' : 'black',
                            state.dragonSmithingLineLight == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.DragonArmorText}>
                <Text style={styles.PerkText}>Dragon Armor</Text>
            </View>
            <View title='Daedric Smithing Blue' style={{
                position: 'absolute',
                left: "64%",
                top: "40%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Daedric Smithing Gold' style={{
                position: 'absolute',
                left: "64%",
                top: "40%",
                zIndex: 8,
                opacity: state.daedricSmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfDaedricSmithingPressed(
                            state.daedricSmithing == 0 ? 1 : 0,
                            state.daedricSmithingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.DaedricSmithText}>
                <Text style={styles.PerkText}>Daedric Smithing</Text>
            </View>
            <View title='Ebony Smithing Blue' style={{
                position: 'absolute',
                left: "82%",
                top: "50%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Ebony Smithing Gold' style={{
                position: 'absolute',
                left: "82%",
                top: "50%",
                zIndex: 8,
                opacity: state.ebonySmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfEbonySmithingPressed(
                            state.ebonySmithing == 0 ? 1 : 0,
                            state.ebonySmithingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.EbonySmithText}>
                <Text style={styles.PerkText}>Ebony Smithing</Text>
            </View>
            <View title='Orcish Smithing Blue' style={{
                position: 'absolute',
                left: "70%",
                top: "50%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Orcish Smithing Gold' style={{
                position: 'absolute',
                left: "70%",
                top: "50%",
                zIndex: 8,
                opacity: state.orcishSmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfOrcishSmithingPressed(
                            state.orcishSmithing == 0 ? 1 : 0,
                            state.orcishSmithingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.OrcishSmithText}>
                <Text style={styles.PerkText}>Orcish Smithing</Text>
            </View>
            <View title='Dwarven Smithing Blue' style={{
                position: 'absolute',
                left: "50%",
                top: "60%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Dwarven Smithing Gold' style={{
                position: 'absolute',
                left: "50%",
                top: "60%",
                zIndex: 8,
                opacity: state.dwarvenSmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfDwarvenSmithingPressed(
                            state.dwarvenSmithing == 0 ? 1 : 0,
                            state.dwarvenSmithingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.DwarvenSmithText}>
                <Text style={styles.PerkText}>Dwarven Smithing</Text>
            </View>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} >

                <Line
                    x1="35.3%"
                    y1="79.2%"
                    x2="40%"
                    y2="60%"
                    stroke={state.arcaneSmithingLine}
                    strokeWidth={lineStrokeWidth}
                />

                <Line
                    x1="34.2%"
                    y1="79.3%"
                    x2="8.5%"
                    y2="55.7%"
                    stroke={state.elvinSmithingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="8.3%"
                    y1="54.4%"
                    x2="13.5%"
                    y2="48.6%"
                    stroke={state.advancedSmithingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="15%"
                    y1="47.5%"
                    x2="32.8%"
                    y2="39.5%"
                    stroke={state.glassSmithingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="35.3%"
                    y1="39%"
                    x2="53%"
                    y2="39%"
                    stroke={state.dragonSmithingLineLight}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="55.5%"
                    y1="39.3%"
                    x2="74%"
                    y2="45%"
                    stroke={state.dragonSmithingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="75%"
                    y1="45.5%"
                    x2="92%"
                    y2="55%"
                    stroke={state.daedricSmithingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="91%"
                    y1="55%"
                    x2="80%"
                    y2="55%"
                    stroke={state.ebonySmithingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="79%"
                    y1="55.5%"
                    x2="60%"
                    y2="65%"
                    stroke={state.orcishSmithingLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="59.2%"
                    y1="65.4%"
                    x2="36.3%"
                    y2="79.9%"
                    stroke={state.dwarvenSmithingLine}
                    strokeWidth={lineStrokeWidth}
                />

                {/*
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
                        
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <TouchableOpacity
                                    style={{
                                        alignSelf: 'flex-end',
                                        padding: 10,
                                    }}
                                    onPress={() => {
                                        CheckIfElvinSmithPressed(
                                            state.elvinSmithing == 0 ? 1 : 1,
                                            state.elvinSmithingLine == 'black' ? 'gold' : 'gold'
                                        );
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
                                        CheckIfElvinSmithPressed(
                                            state.elvinSmithing == 1 ? 0 : 0,
                                            state.elvinSmithingLine == 'gold' ? 'black' : 'black'
                                        );
                                    }}>
                                    <AntDesign name="minus" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>*/}
            </Svg>

        </View>
    );
};

const styles = StyleSheet.create({
    HomeScreenText: {
        color: 'white',
    },
    topText: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: "70%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    Icon: {
        position: 'absolute',
    },
    BasicSmithText: {
        position: 'absolute',
        left: "25%",
        top: "83%",
    },
    ArcaneSmithText: {
        position: 'absolute',
        left: "33%",
        top: "55%",
    },
    ElvenSmithText: {
        position: 'absolute',
        left: "13%",
        top: "53%",
    },
    AdvancedArmorsText: {
        position: 'absolute',
        left: "20%",
        top: "46%",
    },
    GlassSmithText: {
        position: 'absolute',
        left: "24%",
        top: "34%",
    },
    DragonArmorText: {
        position: 'absolute',
        left: "44%",
        top: "34%",
    },
    DaedricSmithText: {
        position: 'absolute',
        left: "64%",
        top: "40%",
    },
    EbonySmithText: {
        position: 'absolute',
        left: "82%",
        top: "50%",
    },
    OrcishSmithText: {
        position: 'absolute',
        left: "70%",
        top: "50%",
    },
    DwarvenSmithText: {
        position: 'absolute',
        left: "50%",
        top: "60%",
    },

    PerkText: {
        color: 'white',
        fontSize: 12,
    }
});

export default SmithingTree;