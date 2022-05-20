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

const PickpocketTree = () => {
    const navigation = useNavigation();
    const [ActivePerks, SetActivePerks] = useState(0);
    const [RequiredLevel, SetRequiredLevel] = useState(0);
    const [LightFingersLevel, SetLightFingersLevel] = useState(0);
    const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);

    const [state, setState] = useSetState({
        LightFingers: 0,
        NightThief: 0,
        NightThiefLine: 'white',
        Cutpurse: 0,
        CutpurseLine: 'white',
        Misdirection: 0,
        MisdirectionLine: 'white',
        PerfectTouch: 0,
        PerfectTouchLine: 'white',
        Poisoned: 0,
        PoisonedLine: 'white',
        Keymaster: 0,
        KeymasterLine: 'white',
        ExtraPockets: 0,
        ExtraPocketsLine: 'white',
    });

    let resetAllTrees;
    const resetPickpocketPerks = () => {
        setState({ LightFingers: 0 });
        setState({ NightThief: 0 });
        setState({ NightThiefLine: 'white' });
        setState({ Poisoned: 0 });
        setState({ PoisonedLine: 'white' });
        setState({ Cutpurse: 0 });
        setState({ CutpurseLine: 'white' });
        setState({ Keymaster: 0 });
        setState({ KeymasterLine: 'white' });
        setState({ ExtraPockets: 0 });
        setState({ ExtraPocketsLine: 'white' });
        setState({ Misdirection: 0 });
        setState({ MisdirectionLine: 'white' });
        setState({ PerfectTouch: 0 });
        setState({ PerfectTouchLine: 'white' });
        SetRequiredLevel(0);
        SetLightFingersLevel(0);
    }

    const resetActivePerks = () => {
        resetPickpocketPerks();
        DecrementCounter(ActivePerks);
    };

    // Use this to control Re-renders for resetting AllActivePerks with useEffect();
    if (AllActivePerks == 0) {
        resetAllTrees = 1;
    } else {
        resetAllTrees = 0;
    }

    // Each time AllActiverPerks hits 0, re-render and reset all the nodes....AllActivePerks is set to 0 in DrawerNav.js via a button
    useEffect(() => {
        if (resetAllTrees == 1) {
            resetPickpocketPerks();
            SetActivePerks(0);
        }
    }, [resetAllTrees]);

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
        if (state.PerfectTouch == 1) {
            TrackLevel(100);
        } else if (state.LightFingers == 1 && LightFingersLevel == 5) {
            TrackLevel(80);
        } else if (state.Misdirection == 1) {
            TrackLevel(70);
        } else if (state.LightFingers == 1 && LightFingersLevel == 4 || state.Keymaster == 1) {
            TrackLevel(60);
        } else if (state.ExtraPockets == 1) {
            TrackLevel(50);
        } else if (state.LightFingers == 1 && LightFingersLevel == 3 || state.Cutpurse == 1 || state.Poisoned == 1) {
            TrackLevel(40);
        } else if (state.NightThief == 1) {
            TrackLevel(30);
        } else if (state.LightFingers == 1 && LightFingersLevel == 2) {
            TrackLevel(20);
        }
    }, [state]);

    const CheckIfLightFingersPressed = (button) => {
        if (
            state.NightThief == 1
        ) {
            // Do nothing....must un-select nodes above it first
            if (LightFingersLevel == 5) {
                DecrementCounter(4); // decrease active perks back down 4 because it is set back to 1
                SetLightFingersLevel(1);

            } else {
                IncrementCounter(1);
                IncLightFingersCounter(1) // increment by 1 after it perk is active
            }
        }
        else {
            IncLightFingersCountCall(button);
        }
    };

    const IncLightFingersCounter = (numActiveLightFingers) => {
        if (LightFingersLevel < 5) {
            SetLightFingersLevel(LightFingersLevel + numActiveLightFingers)
        }
        else {
            SetLightFingersLevel(0) // return to 0 after the perk is maxed out
        }
    }

    // function to control the LightFingers perk count (0/5)
    const IncLightFingersCountCall = (buttonColor) => {
        if (LightFingersLevel == 0) {
            setState({ LightFingers: buttonColor }); // Change the pressed button color back and forth
            IncrementCounter(1); // increment active perks by 1 on first click
            IncLightFingersCounter(1); // increment basic smith by 1 on first click
        } else if (LightFingersLevel == 5) {
            setState({ LightFingers: buttonColor }); // Change the pressed button color back and forth
            IncLightFingersCounter(1); // Increment by one so that it goes back to 0 
            DecrementCounter(5); // decrease active perks back down 3 because it is set back to 0

        } else {
            IncrementCounter(1);
            IncLightFingersCounter(1) // increment by 1 after it perk is active
        }

    }

    const CheckIfNightThiefPressed = (buttonColor, lineColor) => {
        if (state.LightFingers == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ LightFingers: buttonColor });
            setState({ LightFingersLine: lineColor });
            setState({ NightThief: buttonColor });
            setState({ NightThiefLine: lineColor });
            SetLightFingersLevel(1);
            IncrementCounter(2);
        } else if (state.Cutpurse == 1 || state.Poisoned == 1 || state.ExtraPockets == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ NightThiefLine: lineColor });
            setState({ NightThief: buttonColor }); // Change button color back and forth
            state.NightThief == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfCutpursePressed = (buttonColor, lineColor) => {
        if (state.NightThief == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ LightFingers: buttonColor });
            setState({ Cutpurse: buttonColor });
            setState({ NightThief: buttonColor });
            setState({ CutpurseLine: lineColor });
            setState({ NightThiefLine: lineColor });
            if (state.LightFingers == 0) {
                SetLightFingersLevel(1);
            }
            if (state.LightFingers == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.Misdirection == 1 || state.Keymaster == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ CutpurseLine: lineColor });
            setState({ Cutpurse: buttonColor }); // Change the pressed button color back and forth
            state.Cutpurse == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfMisdirectionPressed = (buttonColor, lineColor) => {
        if (state.Cutpurse == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ Misdirection: buttonColor });
            setState({ Cutpurse: buttonColor });
            setState({ NightThief: buttonColor });
            setState({ LightFingers: buttonColor });
            setState({ MisdirectionLine: lineColor });
            setState({ CutpurseLine: lineColor });
            setState({ NightThiefLine: lineColor });
            if (state.LightFingers == 0) {
                SetLightFingersLevel(1);
            }
            if (state.Cutpurse == 1) {
                IncrementCounter(2);
            } else if (state.LightFingers == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        }
        else if (state.PerfectTouch == 1) {
            // Do nothing....must un-select nodes above it first

        } else {
            setState({ MisdirectionLine: lineColor });
            setState({ Misdirection: buttonColor }); // Change the pressed button color back and forth
            state.Misdirection == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfPerfectTouchPressed = (button, line) => {
        if (state.Misdirection == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ PerfectTouch: button });
            setState({ Misdirection: button });
            setState({ Cutpurse: button });
            setState({ NightThief: button });
            setState({ LightFingers: button });
            setState({ PerfectTouchLine: line });
            setState({ MisdirectionLine: line });
            setState({ CutpurseLine: line });
            setState({ NightThiefLine: line });
            if (state.LightFingers == 0) {
                SetLightFingersLevel(1);
            }
            if (state.Cutpurse == 1) {
                IncrementCounter(2);
            } else if (state.NightThief == 1) {
                IncrementCounter(3);
            } else if (state.LightFingers == 1) {
                IncrementCounter(4);
            } else {
                IncrementCounter(5);
            }
        } else {
            setState({ PerfectTouchLine: line });
            setState({ PerfectTouch: button }); // Change the pressed button color back and forth
            state.PerfectTouch == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfPoisonedPressed = (button, line) => {
        if (state.NightThief == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ LightFingers: button });
            setState({ NightThief: button });
            setState({ Poisoned: button });
            setState({ NightThiefLine: line });
            setState({ PoisonedLine: line });
            if (state.LightFingers == 0) {
                SetLightFingersLevel(1);
            }
            if (state.LightFingers == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else {
            setState({ PoisonedLine: line });
            setState({ Poisoned: button }); // Change the pressed button color back and forth
            state.Poisoned == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfKeymasterPressed = (button, line) => {
        if (state.Cutpurse == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ LightFingers: button });
            setState({ LightFingersLine: line });
            setState({ NightThief: button });
            setState({ NightThiefLine: line });
            setState({ Cutpurse: button });
            setState({ CutpurseLine: line });
            setState({ Keymaster: button });
            setState({ KeymasterLine: line });
            if (state.LightFingers == 0) {
                SetLightFingersLevel(1);
            }
            if (state.NightThief == 1) {
                IncrementCounter(2);
            } else if (state.LightFingers == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else {
            setState({ KeymasterLine: line });
            setState({ Keymaster: button }); // Change the pressed button color back and forth
            state.Keymaster == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfExtraPocketsPressed = (button, line) => {
        if (state.NightThief == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ LightFingers: button });
            setState({ NightThief: button });
            setState({ ExtraPockets: button });
            setState({ LightFingersLine: line });
            setState({ NightThiefLine: line });
            setState({ ExtraPocketsLine: line });
            if (state.LightFingers == 0) {
                SetLightFingersLevel(1);
            }
            if (state.LightFingers == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else {
            setState({ ExtraPocketsLine: line });
            setState({ ExtraPockets: button }); // Change the pressed button color back and forth
            state.ExtraPockets == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    return (
        <View style={{ zIndex: 2 }}>
            <View style={styles.resetButtonContainer}>
                <TouchableOpacity style={styles.resetButton} onPress={() => resetActivePerks()}>
                    <Text style={{ color: "white", fontWeight: "bold", }}> Reset Pickpocket Perks</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.topText}>
                <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
                <Text style={styles.HomeScreenText}>Required Level: {RequiredLevel} </Text>
            </View>
            <View title='Light Fingers Blue' style={{
                position: 'absolute',
                left: "10%",
                top: "80%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Light Fingers Gold' style={{
                position: 'absolute',
                left: "10%",
                top: "80%",
                zIndex: 8,
                opacity: state.LightFingers

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("LightFingersModal")}
                    onPress={() => {
                        CheckIfLightFingersPressed(
                            state.LightFingers == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.LightFingersText}>
                <Text style={styles.PerkText}>Light Fingers({LightFingersLevel}/5)</Text>
            </View>
            <View title='Night Thief Blue' style={{
                position: 'absolute',
                left: "30%",
                top: "70%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Night Thief Gold' style={{
                position: 'absolute',
                left: "30%",
                top: "70%",
                zIndex: 8,
                opacity: state.NightThief

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("NightThiefModal")}
                    onPress={() => {
                        CheckIfNightThiefPressed(
                            state.NightThief == 0 ? 1 : 0,
                            state.NightThiefLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.NightThiefText}>
                <Text style={styles.PerkText}>Night Thief</Text>
            </View>
            <View title='Cutpurse Blue' style={{
                position: 'absolute',
                left: "45%",
                top: "45%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Cutpurse Gold' style={{
                position: 'absolute',
                left: "45%",
                top: "45%",
                zIndex: 8,
                opacity: state.Cutpurse

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("CutpurseModal")}
                    onPress={() => {
                        CheckIfCutpursePressed(
                            state.Cutpurse == 0 ? 1 : 0,
                            state.CutpurseLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.CutpurseText}>
                <Text style={styles.PerkText}>Cutpurse</Text>
            </View>
            <View title='Misdirection Blue' style={{
                position: 'absolute',
                left: "50%",
                top: "26%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Misdirection Gold' style={{
                position: 'absolute',
                left: "50%",
                top: "26%",
                zIndex: 8,
                opacity: state.Misdirection

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("MisdirectionModal")}
                    onPress={() => {
                        CheckIfMisdirectionPressed(
                            state.Misdirection == 0 ? 1 : 0,
                            state.MisdirectionLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.MisdirectionText}>
                <Text style={styles.PerkText}>Misdirection</Text>
            </View>
            <View title='Perfect Touch Blue' style={{
                position: 'absolute',
                left: "70%",
                top: "15%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Perfect Touch Gold' style={{
                position: 'absolute',
                left: "70%",
                top: "15%",
                zIndex: 8,
                opacity: state.PerfectTouch

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("PerfectTouchModal")}
                    onPress={() => {
                        CheckIfPerfectTouchPressed(
                            state.PerfectTouch == 0 ? 1 : 0,
                            state.PerfectTouchLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.PerfectTouchText}>
                <Text style={styles.PerkText}>Perfect Touch</Text>
            </View>

            <View title='Poisoned Blue' style={{
                position: 'absolute',
                left: "10%",
                top: "47%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Poisoned Gold' style={{
                position: 'absolute',
                left: "10%",
                top: "47%",
                zIndex: 8,
                opacity: state.Poisoned

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("PoisonedModal")}
                    onPress={() => {
                        CheckIfPoisonedPressed(
                            state.Poisoned == 0 ? 1 : 0,
                            state.PoisonedLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.PoisonedText}>
                <Text style={styles.PerkText}>Poisoned</Text>
            </View>
            <View title='Keymaster Blue' style={{
                position: 'absolute',
                left: "20%",
                top: "35%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Keymaster Gold' style={{
                position: 'absolute',
                left: "20%",
                top: "35%",
                zIndex: 8,
                opacity: state.Keymaster

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("KeymasterModal")}
                    onPress={() => {
                        CheckIfKeymasterPressed(
                            state.Keymaster == 0 ? 1 : 0,
                            state.KeymasterLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.KeymasterText}>
                <Text style={styles.PerkText}>Keymaster</Text>
            </View>
            <View title='Extra Pockets Blue' style={{
                position: 'absolute',
                left: "75%",
                top: "44%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Extra Pockets Gold' style={{
                position: 'absolute',
                left: "75%",
                top: "44%",
                zIndex: 8,
                opacity: state.ExtraPockets

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ExtraPocketsModal")}
                    onPress={() => {
                        CheckIfExtraPocketsPressed(
                            state.ExtraPockets == 0 ? 1 : 0,
                            state.ExtraPocketsLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ExtraPocketsText}>
                <Text style={styles.PerkText}>Extra Pockets</Text>
            </View>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} >


                <Line
                    x1="20%"
                    y1="85%"
                    x2="40%"
                    y2="75%"
                    stroke={state.NightThiefLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="40.5%"
                    y1="75%"
                    x2="55%"
                    y2="50%"
                    stroke={state.CutpurseLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="55%"
                    y1="51%"
                    x2="60%"
                    y2="31%"
                    stroke={state.MisdirectionLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="61%"
                    y1="31%"
                    x2="82%"
                    y2="19%"
                    stroke={state.PerfectTouchLine}
                    strokeWidth={lineStrokeWidth}

                />

                <Line
                    x1="40%"
                    y1="75%"
                    x2="20.5%"
                    y2="52%"
                    stroke={state.PoisonedLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="55%"
                    y1="50%"
                    x2="30%"
                    y2="39.5%"
                    stroke={state.KeymasterLine}
                    strokeWidth={lineStrokeWidth}

                />

                <Line
                    x1="40%"
                    y1="75%"
                    x2="86.8%"
                    y2="48%"
                    stroke={state.ExtraPocketsLine}
                    strokeWidth={lineStrokeWidth}

                />
            </Svg>

        </View>
    );
};

const styles = StyleSheet.create({
    HomeScreenText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
    },
    topText: {
        position: 'absolute',
        top: '8.5%',
        left: '32%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    Icon: {
        position: 'absolute',
    },
    LightFingersText: {
        position: 'absolute',
        left: "12%",
        top: "87%",
        zIndex: 10,
    },
    NightThiefText: {
        position: 'absolute',
        left: "33%",
        top: "77%",
        zIndex: 10,
    },
    CutpurseText: {
        position: 'absolute',
        left: "49%",
        top: "52%",
        zIndex: 10,
    },
    MisdirectionText: {
        position: 'absolute',
        left: "52%",
        top: "33%",
        zIndex: 10,
    },
    PerfectTouchText: {
        position: 'absolute',
        left: "72%",
        top: "22%",
        zIndex: 10,
    },

    PoisonedText: {
        position: 'absolute',
        left: "14%",
        top: "54%",
        zIndex: 10,
    },
    KeymasterText: {
        position: 'absolute',
        left: "23%",
        top: "42%",
        zIndex: 10,
    },

    ExtraPocketsText: {
        position: 'absolute',
        left: "77%",
        top: "51%",
        zIndex: 10,
    },
    PerkText: {
        color: 'white',
        fontSize: 12,
    },
    resetButtonContainer: {
        position: 'absolute',
        zIndex: 8,
        top: 0,
        left: 0,
        right: 0,
        bottom: '66.5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    resetButton: {
        backgroundColor: "#565656",
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 10
    }
});

export default PickpocketTree;