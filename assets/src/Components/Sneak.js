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
import StarIconBlue from './StarIconBlue';
import StarIconGold from './StarIconGold';
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

const SneakTree = () => {
    const navigation = useNavigation();
    const [state, setState] = useSetState({
        stealth: 0,
        muffledMovement: 0,
        muffledMovementLine: 'white',
        lightFoot: 0,
        lightFootLine: 'white',
        silentRoll: 0,
        silentRollLine: 'white',
        backstab: 0,
        backstabLine: 'white',
        deadlyAim: 0,
        deadlyAimLine: 'white',
        assassinsBlade: 0,
        assassinsBladeLine: 'white',
        silence: 0,
        silenceLine: 'white',
        shadowWarrior: 0,
        shadowWarriorLine: 'white',
        shadowWarriorLineLight: 'white',
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
        if (state.shadowWarrior == 1) {
            TrackLevel(100);
        } else if (state.silence == 1) {
            TrackLevel(90);
        } else if (state.assassinsBlade == 1) {
            TrackLevel(80);
        } else if (state.silentRoll == 1) {
            TrackLevel(70);
        } else if (state.arcaneSmithing == 1) {
            TrackLevel(60);
        } else if (state.lightFoot == 1) {
            TrackLevel(50);
        } else if (state.muffledMovement == 1) {
            TrackLevel(30);
        } else if (state.stealth == 1) {
            TrackLevel(0);
        }
    }, [TrackLevel, state]);

    useEffect(() => {
        CheckLevel();
    }, [CheckLevel]);

    const CheckIfStealthPressed = (button) => {
        if (
            state.muffledMovement == 1 ||
            state.arcaneSmithing == 1 ||
            state.backstab == 1
        ) {
            // Do nothing....must un-select nodes above it first
        }
        else {
            setState({ stealth: button }); // Change button color back and forth
            state.stealth == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfMuffledMovementPressed = (buttonColor, lineColor) => {
        if (state.stealth == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ stealth: buttonColor });
            setState({ stealthLine: lineColor });
            setState({ muffledMovement: buttonColor });
            setState({ muffledMovementLine: lineColor });

            IncrementCounter(2);
        } else if (state.lightFoot == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ muffledMovementLine: lineColor });
            setState({ muffledMovement: buttonColor }); // Change button color back and forth
            state.muffledMovement == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfLightFootPressed = (buttonColor, lineColor) => {
        if (state.muffledMovement == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ stealth: buttonColor });
            setState({ lightFoot: buttonColor });
            setState({ muffledMovement: buttonColor });
            setState({ lightFootLine: lineColor });
            setState({ muffledMovementLine: lineColor });
            if (state.stealth == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.silentRoll == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ lightFootLine: lineColor });
            setState({ lightFoot: buttonColor }); // Change the pressed button color back and forth
            state.lightFoot == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfSilentRollPressed = (buttonColor, lineColor) => {
        if (state.lightFoot == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ silentRoll: buttonColor });
            setState({ lightFoot: buttonColor });
            setState({ muffledMovement: buttonColor });
            setState({ stealth: buttonColor });
            setState({ silentRollLine: lineColor });
            setState({ lightFootLine: lineColor });
            setState({ muffledMovementLine: lineColor });
            if (state.shadowWarrior == 1) {
                setState({ shadowWarriorLineLight: lineColor });
            }
            if (state.muffledMovement == 1) {
                IncrementCounter(2);
            } else if (state.stealth == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else {
            setState({ silentRollLine: lineColor });
            setState({ silentRoll: buttonColor }); // Change the pressed button color back and forth
            state.silentRoll == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
            if (state.shadowWarrior == 1) {
                setState({ shadowWarriorLineLight: lineColor });
            }

        }
    };
    const CheckIfBackstabPressed = (buttonColor, lineColor) => {
        if (state.stealth == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ backstab: buttonColor });
            setState({ stealth: buttonColor });
            setState({ backstabLine: lineColor });
            IncrementCounter(2);
        } else if (state.deadlyAim == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ backstabLine: lineColor });
            setState({ backstab: buttonColor }); // Change the pressed button color back and forth
            state.backstab == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfDeadlyAimPressed = (buttonColor, lineColor) => {
        if (state.backstab == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ deadlyAim: buttonColor });
            setState({ backstab: buttonColor });
            setState({ stealth: buttonColor });
            setState({ deadlyAimLine: lineColor });
            setState({ backstabLine: lineColor });
            if (state.stealth == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.assassinsBlade == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ deadlyAimLine: lineColor });
            setState({ deadlyAim: buttonColor }); // Change the pressed button color back and forth
            state.deadlyAim == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfAssassinsBladePressed = (buttonColor, lineColor) => {
        if (state.deadlyAim == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ assassinsBlade: buttonColor });
            setState({ deadlyAim: buttonColor });
            setState({ backstab: buttonColor });
            setState({ stealth: buttonColor });
            setState({ assassinsBladeLine: lineColor });
            setState({ deadlyAimLine: lineColor });
            setState({ backstabLine: lineColor });
            if (state.backstab == 1) {
                IncrementCounter(2);
            } else if (state.stealth == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else if (state.silence == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ assassinsBladeLine: lineColor });
            setState({ assassinsBlade: buttonColor }); // Change the pressed button color back and forth
            state.assassinsBlade == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfSilencePressed = (buttonColor, lineColor) => {
        if (state.silentRoll == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ silence: buttonColor });
            setState({ muffledMovement: buttonColor });
            setState({ lightFoot: buttonColor });
            setState({ silentRoll: buttonColor });
            setState({ stealth: buttonColor });
            setState({ silenceLine: lineColor });
            setState({ muffledMovementLine: lineColor });
            setState({ lightFootLine: lineColor });
            setState({ silentRollLine: lineColor });
            if (state.silentRoll == 1) {
                IncrementCounter(2);
            } else if (state.lightFoot == 1) {
                IncrementCounter(3);
            } else if (state.muffledMovement == 1) {
                IncrementCounter(4);
            } else if (state.silentRoll == 1) {
                IncrementCounter(5);
            }
        } else if (state.shadowWarrior == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ silenceLine: lineColor });
            setState({ silence: buttonColor }); // Change the pressed button color back and forth
            state.silence == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfShadowWarriorPressed = (buttonColor, lineColor) => {
        if (state.silence == 0) {
            setState({ shadowWarrior: buttonColor });
            setState({ silence: buttonColor });
            setState({ silentRoll: buttonColor });
            setState({ lightFoot: buttonColor });
            setState({ muffledMovement: buttonColor });
            setState({ stealth: buttonColor });
            setState({ shadowWarriorLine: lineColor });
            setState({ silenceLine: lineColor });
            setState({ silentRollLine: lineColor });
            setState({ lightFootLine: lineColor });
            setState({ muffledMovementLine: lineColor });
            if (state.silentRoll == 1) {
                setState({ shadowWarriorLineLight: lineColor });
            }
            if (state.assassinsBlade == 1) {
                IncrementCounter(2);
            } else if (state.deadlyAim == 1) {
                IncrementCounter(3);
            } else if (state.backstab == 1) {
                IncrementCounter(4);
            } else if (state.stealth == 1) {
                IncrementCounter(5);
            } else {
                IncrementCounter(6);
            }
        } else {
            setState({ shadowWarriorLine: lineColor });
            setState({ shadowWarrior: buttonColor });
            state.shadowWarrior == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
            if (state.silentRoll == 1) {
                setState({ shadowWarriorLineLight: lineColor });
            }
        }
    };

    return (
        <View style={{ zIndex: 2 }}>
            <View style={styles.topText}>
                <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
                <Text style={styles.HomeScreenText}>Required Level: {RequiredLevel} </Text>
            </View>
            <View title='Stealth Blue' style={{
                position: 'absolute',
                left: "40%",
                top: "75%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Stealth Gold' style={{
                position: 'absolute',
                left: "40%",
                top: "75%",
                zIndex: 8,
                opacity: state.stealth

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("StealthModal")}
                    onPress={() => {
                        CheckIfStealthPressed(
                            state.stealth == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.StealthText}>
                <Text style={styles.PerkText}>Stealth</Text>
            </View>
            
            <View title='Muffled Movement Blue' style={{
                position: 'absolute',
                left: "10%",
                top: "60%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Muffled Movement Gold' style={{
                position: 'absolute',
                left: "10%",
                top: "60%",
                zIndex: 8,
                opacity: state.muffledMovement

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("MuffledMovementModal")}
                    onPress={() => {
                        CheckIfMuffledMovementPressed(
                            state.muffledMovement == 0 ? 1 : 0,
                            state.muffledMovementLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.MuffledText}>
                <Text style={styles.PerkText}>Muffled Movement</Text>
            </View>
            <View title='Light Foot Blue' style={{
                position: 'absolute',
                left: "20%",
                top: "46%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Light Foot Gold' style={{
                position: 'absolute',
                left: "20%",
                top: "46%",
                zIndex: 8,
                opacity: state.lightFoot

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("LightFootModal")}
                    onPress={() => {
                        CheckIfLightFootPressed(
                            state.lightFoot == 0 ? 1 : 0,
                            state.lightFootLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.LightFootText}>
                <Text style={styles.PerkText}>Light Foot</Text>
            </View>
            <View title='Silent Roll Blue' style={{
                position: 'absolute',
                left: "34%",
                top: "40%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Silent Roll Gold' style={{
                position: 'absolute',
                left: "34%",
                top: "40%",
                zIndex: 8,
                opacity: state.silentRoll

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("SilentRollModal")}
                    onPress={() => {
                        CheckIfSilentRollPressed(
                            state.silentRoll == 0 ? 1 : 0,
                            state.silentRollLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.SilentRollText}>
                <Text style={styles.PerkText}>Silent Roll</Text>
            </View>
            <View title='Shadow Warrior Blue' style={{
                position: 'absolute',
                left: "66%",
                top: "30%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Shadow Warrior Gold' style={{
                position: 'absolute',
                left: "66%",
                top: "30%",
                zIndex: 8,
                opacity: state.shadowWarrior

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ShadowWarriorModal")}
                    onPress={() => {
                        CheckIfShadowWarriorPressed(
                            state.shadowWarrior == 0 ? 1 : 0,
                            state.shadowWarriorLine == 'white' ? 'gold' : 'white',
                            state.shadowWarriorLineLight == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ShadowWarriorText}>
                <Text style={styles.PerkText}>Shadow Warrior</Text>
            </View>
            <View title='Silence Blue' style={{
                position: 'absolute',
                left: "44%",
                top: "34%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Silence Gold' style={{
                position: 'absolute',
                left: "44%",
                top: "34%",
                zIndex: 8,
                opacity: state.silence

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("SilenceModal")}
                    onPress={() => {
                        CheckIfSilencePressed(
                            state.silence == 0 ? 1 : 0,
                            state.silenceLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.SilenceText}>
                <Text style={styles.PerkText}>Silence</Text>
            </View>
            <View title='Assassins Blade Blue' style={{
                position: 'absolute',
                left: "56%",
                top: "42%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Assassins Blade Gold' style={{
                position: 'absolute',
                left: "56%",
                top: "42%",
                zIndex: 8,
                opacity: state.assassinsBlade

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("AssasinsBladeModal")}
                    onPress={() => {
                        CheckIfAssassinsBladePressed(
                            state.assassinsBlade == 0 ? 1 : 0,
                            state.assassinsBladeLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AssassinsBladeText}>
                <Text style={styles.PerkText}>Assassins Blade</Text>
            </View>
            <View title='Deadly Aim Blue' style={{
                position: 'absolute',
                left: "69%",
                top: "45%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Deadly Aim Gold' style={{
                position: 'absolute',
                left: "69%",
                top: "45%",
                zIndex: 8,
                opacity: state.deadlyAim

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("DeadlyAimModal")}
                    onPress={() => {
                        CheckIfDeadlyAimPressed(
                            state.deadlyAim == 0 ? 1 : 0,
                            state.deadlyAimLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.DeadlyAimText}>
                <Text style={styles.PerkText}>Deadly Aim</Text>
            </View>
            <View title='Backstab Blue' style={{
                position: 'absolute',
                left: "66%",
                top: "60%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Backstab Gold' style={{
                position: 'absolute',
                left: "66%",
                top: "60%",
                zIndex: 8,
                opacity: state.backstab

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("BackstabModal")}
                    onPress={() => {
                        CheckIfBackstabPressed(
                            state.backstab == 0 ? 1 : 0,
                            state.backstabLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.BackstabText}>
                <Text style={styles.PerkText}>Backstab</Text>
            </View>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} >

                <Line
                    x1="49.2%"
                    y1="79.3%"
                    x2="20%"
                    y2="65.7%"
                    stroke={state.muffledMovementLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="20%"
                    y1="65.4%"
                    x2="30.5%"
                    y2="50.6%"
                    stroke={state.lightFootLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="31%"
                    y1="50.5%"
                    x2="42.8%"
                    y2="45.5%"
                    stroke={state.silentRollLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="35.3%"
                    y1="39%"
                    x2="53%"
                    y2="39%"
                    stroke={state.shadowWarriorLineLight}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="76.5%"
                    y1="35.3%"
                    x2="55%"
                    y2="39%"
                    stroke={state.shadowWarriorLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="56%"
                    y1="38.7%"
                    x2="43%"
                    y2="46%"
                    stroke={state.silenceLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="66%"
                    y1="47%"
                    x2="80%"
                    y2="51%"
                    stroke={state.assassinsBladeLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="80%"
                    y1="49.5%"
                    x2="77%"
                    y2="65%"
                    stroke={state.deadlyAimLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="76.2%"
                    y1="65.4%"
                    x2="50.3%"
                    y2="79.9%"
                    stroke={state.backstabLine}
                    strokeWidth={lineStrokeWidth}
                />
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
    StealthText: {
        position: 'absolute',
        left: "46%",
        top: "83%",
        zIndex: 10,
    },
    MuffledText: {
        position: 'absolute',
        left: "8%",
        top: "68%",
        zIndex: 10,
    },
    LightFootText: {
        position: 'absolute',
        left: "20%",
        top: "46%",
        zIndex: 10,
    },
    SilentRollText: {
        position: 'absolute',
        left: "38%",
        top: "47%",
        zIndex: 10,
    },
    ShadowWarriorText: {
        position: 'absolute',
        left: "65%",
        top: "30%",
        zIndex: 10,
    },
    SilenceText: {
        position: 'absolute',
        left: "55%",
        top: "34%",
        zIndex: 10,
    },
    AssassinsBladeText: {
        position: 'absolute',
        left: "66%",
        top: "42%",
        zIndex: 10,
    },
    DeadlyAimText: {
        position: 'absolute',
        left: "72%",
        top: "52%",
        zIndex: 10,
    },
    BackstabText: {
        position: 'absolute',
        left: "66%",
        top: "60%",
        zIndex: 10,
    },

    PerkText: {
        color: 'white',
        fontSize: 12,
    }
});

export default SneakTree;