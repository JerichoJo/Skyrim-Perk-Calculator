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
    const [state, setState] = useSetState({
        LightFingers: 0,
        NightThief: 0,
        NightThiefLine: 'black',
        Cutpurse: 0,
        CutpurseLine: 'black',
        Misdirection: 0,
        MisdirectionLine: 'black',
        PerfectTouch: 0,
        PerfectTouchLine: 'black',
        Poisoned: 0,
        PoisonedLine: 'black',
        Keymaster: 0,
        KeymasterLine: 'black',
        ExtraPockets: 0,
        ExtraPocketsLine: 'black',
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
        if (state.PerfectTouch == 1) {
            TrackLevel(100);
        } else if (state.Misdirection == 1) {
            TrackLevel(90);
        } else if (state.Cutpurse == 1) {
            TrackLevel(80);
        } else if (state.NightThief == 1) {
            TrackLevel(70);
        } else if (state.Keymaster == 1) {
            TrackLevel(60);
        } else if (state.Poisoned == 1) {
            TrackLevel(30);
        } else if (state.ExtraPockets == 1) {
            TrackLevel(0);
        }
    }, [TrackLevel, state]);

    const CheckIfLightFingersPressed = (button) => {
        if (
            state.NightThief == 1 
        ) {
            // Do nothing....must un-select nodes above it first
        }
        else {
            setState({ LightFingers: button }); // Change button color back and forth
            state.LightFingers == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };



    const CheckIfNightThiefPressed = (buttonColor, lineColor) => {
        if (state.LightFingers == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ LightFingers: buttonColor });
            setState({ LightFingersLine: lineColor });
            setState({ NightThief: buttonColor });
            setState({ NightThiefLine: lineColor });

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
            if (state.Misdirection == 1) {
                IncrementCounter(2);
            } else if (state.Cutpurse == 1) {
                IncrementCounter(3);
            } else if (state.NightThief == 1) {
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
                    onLongPress={() => navigation.navigate("BasicSmithingModal")}
                    onPress={() => {
                        CheckIfLightFingersPressed(
                            state.LightFingers == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.LightFingersText}>
                <Text style={styles.PerkText}>Light Fingers</Text>
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
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfNightThiefPressed(
                            state.NightThief == 0 ? 1 : 0,
                            state.NightThiefLine == 'black' ? 'gold' : 'black'
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
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfCutpursePressed(
                            state.Cutpurse == 0 ? 1 : 0,
                            state.CutpurseLine == 'black' ? 'gold' : 'black'
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
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfMisdirectionPressed(
                            state.Misdirection == 0 ? 1 : 0,
                            state.MisdirectionLine == 'black' ? 'gold' : 'black'
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
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfPerfectTouchPressed(
                            state.PerfectTouch == 0 ? 1 : 0,
                            state.PerfectTouchLine == 'black' ? 'gold' : 'black'
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
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfPoisonedPressed(
                            state.Poisoned == 0 ? 1 : 0,
                            state.PoisonedLine == 'black' ? 'gold' : 'black'
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
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfKeymasterPressed(
                            state.Keymaster == 0 ? 1 : 0,
                            state.KeymasterLine == 'black' ? 'gold' : 'black'
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
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfExtraPocketsPressed(
                            state.ExtraPockets == 0 ? 1 : 0,
                            state.ExtraPocketsLine == 'black' ? 'gold' : 'black'
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
    }
});

export default PickpocketTree;