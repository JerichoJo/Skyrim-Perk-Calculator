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

const TwoHandedTree = () => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ActivePerks, SetActivePerks] = useState(0);
    const [RequiredLevel, SetRequiredLevel] = useState(0);
    const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);
    const [state, setState] = useSetState({
        Barbarian: 0,
        Limbsplitter: 0,
        LimbsplitterLine: 'white',
        ChampionsStance: 0,
        ChampionsStanceLine: 'white',
        DevastatingBlow: 0,
        DevastatingBlowLine: 'white',
        CriticalCharge: 0,
        CriticalChargeLine: 'white',
        Sweep: 0,
        SweepLine: 'white',
        SweepDevLine: 'white',
        Warmaster: 0,
        WarmasterLine: 'white',
        DeepWounds: 0,
        DeepWoundsLine: 'white',
        Skullcrusher: 0,
        SkullcrusherLine: 'white',
    });

    let resetAllTrees;
    const resetTwoHandedPerks = () => {
        setState({ Barbarian: 0 });
        setState({ Limbsplitter: 0 });
        setState({ LimbsplitterLine: 'white' });
        setState({ ChampionsStance: 0 });
        setState({ ChampionsStanceLine: 'white' });
        setState({ DevastatingBlow: 0 });
        setState({ DevastatingBlowLine: 'white' });
        setState({ CriticalCharge: 0 });
        setState({ CriticalChargeLine: 'white' });
        setState({ Sweep: 0 });
        setState({ SweepLine: 'white' });
        setState({ SweepDevLine: 'white' });
        setState({ Warmaster: 0 });
        setState({ WarmasterLine: 'white' });
        setState({ DeepWounds: 0 });
        setState({ DeepWoundsLine: 'white' });
        setState({ Skullcrusher: 0 });
        setState({ SkullcrusherLine: 'white' });
        SetRequiredLevel(0);
    }

    const resetActivePerks = () => {
        resetTwoHandedPerks();
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
            resetTwoHandedPerks();
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
        if (state.Warmaster == 1) {
            TrackLevel(100);
        } else if (state.CriticalCharge == 1) {
            TrackLevel(90);
        } else if (state.Sweep == 1) {
            TrackLevel(75);
        } else if (state.DeepWounds == 1) {
            TrackLevel(60);
        } else if (state.DevastatingBlow == 1) {
            TrackLevel(50);
        } else if (state.Limbsplitter == 1) {
            TrackLevel(40);
        } else if (state.ChampionsStance == 1) {
            TrackLevel(25);
        } else if (state.Skullcrusher == 1) {
            TrackLevel(20);
        }
    }, [TrackLevel, state]);

    const CheckIfBarbarianPressed = (button) => {
        if (
            state.ChampionsStance == 1 ||
            state.Limbsplitter == 1 ||
            state.DeepWounds == 1 ||
            state.Skullcrusher == 1
        ) {
            // Do nothing....must un-select nodes above it first
        }
        else {
            setState({ Barbarian: button }); // Change button color back and forth
            state.Barbarian == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfLimbsplitterPressed = (button, line) => {
        if (state.Barbarian == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ Barbarian: button });
            setState({ BarbarianLine: line });
            setState({ Limbsplitter: button });
            setState({ LimbsplitterLine: line });
            IncrementCounter(2);
        } else {
            setState({ LimbsplitterLine: line });
            setState({ Limbsplitter: button }); // Change the pressed button color back and forth
            state.Limbsplitter == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfChampionsStancePressed = (button, line) => {
        if (state.Barbarian == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ Barbarian: button });
            setState({ BarbarianLine: line });
            setState({ ChampionsStance: button });
            setState({ ChampionsStanceLine: line });

            IncrementCounter(2);
        } else if (state.DevastatingBlow == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ ChampionsStanceLine: line });
            setState({ ChampionsStance: button }); // Change button color back and forth
            state.ChampionsStance == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfDevastatingBlowPressed = (button, line) => {
        if (state.ChampionsStance == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ Barbarian: button });
            setState({ DevastatingBlow: button });
            setState({ ChampionsStance: button });
            setState({ DevastatingBlowLine: line });
            setState({ ChampionsStanceLine: line });
            if (state.Barbarian == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.Sweep == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ DevastatingBlowLine: line });
            setState({ DevastatingBlow: button }); // Change the pressed button color back and forth
            state.DevastatingBlow == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfCriticalChargePressed = (button, line) => {
        if (state.ChampionsStance == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ Barbarian: button });
            setState({ CriticalCharge: button });
            setState({ ChampionsStance: button });
            setState({ CriticalChargeLine: line });
            setState({ ChampionsStanceLine: line });
            if (state.Barbarian == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.Sweep == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ CriticalChargeLine: line });
            setState({ CriticalCharge: button }); // Change the pressed button color back and forth
            state.CriticalCharge == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfSweepPressed = (button, line, line2) => {
        if (state.Warmaster == 1) {
            // Do nothing....must un-select nodes above it first
        }
        else if (state.DevastatingBlow == 0 && state.CriticalCharge == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ Sweep: button });
            setState({ DevastatingBlow: button });
            setState({ ChampionsStance: button });
            setState({ Barbarian: button });
            setState({ SweepDevLine: line });
            setState({ DevastatingBlowLine: line });
            setState({ ChampionsStanceLine: line });
            if (state.ChampionsStance == 1) {
                IncrementCounter(2);
            } else if (state.Barbarian == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        }
        else if (state.DevastatingBlow == 1 && state.CriticalCharge == 0) {
            setState({ Sweep: button });
            setState({ SweepDevLine: line2 });
            state.Sweep == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
        else if (state.DevastatingBlow == 0 && state.CriticalCharge == 1) {
            setState({ Sweep: button });
            setState({ SweepLine: line });
            state.Sweep == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
        else if (state.DevastatingBlow == 1 && state.CriticalCharge == 1) {
            setState({ Sweep: button });
            setState({ SweepLine: line });
            setState({ SweepDevLine: line2 });
            state.Sweep == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }

    };
    const CheckIfWarmasterPressed = (button, line) => {
        if (state.Sweep == 0 && state.CriticalCharge == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ Warmaster: button });
            setState({ Sweep: button });
            setState({ ChampionsStance: button });
            setState({ Barbarian: button });
            setState({ WarmasterLine: line });
            setState({ ChampionsStanceLine: line });
            setState({ DevastatingBlow: button });
            setState({ DevastatingBlowLine: line });
            setState({ SweepDevLine: line });
            if (state.DevastatingBlow == 1) {
                IncrementCounter(2);
            } else if (state.ChampionsStance == 1) {
                IncrementCounter(3);
            } else if (state.Barbarian == 1) {
                IncrementCounter(4);
            } else {
                IncrementCounter(5);
            }
        }
        else if (state.Sweep == 0 && state.CriticalCharge == 1) {
            setState({ Sweep: button });
            setState({ SweepLine: line });
            setState({ Warmaster: button });
            setState({ WarmasterLine: line });
            IncrementCounter(2);
        }
        else {
            setState({ WarmasterLine: line });
            setState({ Warmaster: button }); // Change the pressed button color back and forth
            state.Warmaster == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfDeepWoundsPressed = (button, line) => {
        if (state.Barbarian == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ Barbarian: button });
            setState({ BarbarianLine: line });
            setState({ DeepWounds: button });
            setState({ DeepWoundsLine: line });
            IncrementCounter(2);
        } else {
            setState({ DeepWoundsLine: line });
            setState({ DeepWounds: button }); // Change the pressed button color back and forth
            state.DeepWounds == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfSkullcrusherPressed = (button, line) => {
        if (state.Barbarian == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ Barbarian: button });
            setState({ BarbarianLine: line });
            setState({ Skullcrusher: button });
            setState({ SkullcrusherLine: line });
            IncrementCounter(2);
        } else {
            setState({ SkullcrusherLine: line });
            setState({ Skullcrusher: button }); // Change the pressed button color back and forth
            state.Skullcrusher == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    return (
        <View style={{ zIndex: 2 }}>
            <View
                style={styles.resetButtonContainer}>
                <TouchableOpacity style={styles.resetButton} onPress={() => resetActivePerks()}>
                    <Text style={{ color: "white", fontWeight: "bold", }}> Reset Two-Handed Perks</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.topText}>
                <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
                <Text style={styles.HomeScreenText}>Required Level: {RequiredLevel} </Text>
            </View>
            <View title='Barbarian Blue' style={{
                position: 'absolute',
                left: "38%",
                top: "80%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Barbarian Gold' style={{
                position: 'absolute',
                left: "38%",
                top: "80%",
                zIndex: 8,
                opacity: state.Barbarian

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("BasicSmithingModal")}
                    onPress={() => {
                        CheckIfBarbarianPressed(
                            state.Barbarian == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.BarbarianText}>
                <Text style={styles.PerkText}>Barbarian</Text>
            </View>
            <View title='Limbsplitter Blue' style={{
                position: 'absolute',
                left: "5%",
                top: "62%",
                zIndex: 8,

            }}>

                <StarIconBlue />
            </View>
            <View title='Limbsplitter Gold' style={{
                position: 'absolute',
                left: "5%",
                top: "62%",
                zIndex: 8,
                opacity: state.Limbsplitter

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ArcaneSmithingModal")}
                    onPress={() => {
                        CheckIfLimbsplitterPressed(
                            state.Limbsplitter == 0 ? 1 : 0,
                            state.LimbsplitterLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.LimbsplitterText}>
                <Text style={styles.PerkText}>Limbsplitter</Text>
            </View>
            <View title='Champions Stance Blue' style={{
                position: 'absolute',
                left: "38%",
                top: "68%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Champions Stance Gold' style={{
                position: 'absolute',
                left: "38%",
                top: "68%",
                zIndex: 8,
                opacity: state.ChampionsStance

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfChampionsStancePressed(
                            state.ChampionsStance == 0 ? 1 : 0,
                            state.ChampionsStanceLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ChampionsStanceText}>
                <Text style={styles.PerkText}>Champion's Stance</Text>
            </View>
            <View title='Devastating Blow Blue' style={{
                position: 'absolute',
                left: "56%",
                top: "45%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Devastating Blow Gold' style={{
                position: 'absolute',
                left: "56%",
                top: "45%",
                zIndex: 8,
                opacity: state.DevastatingBlow

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfDevastatingBlowPressed(
                            state.DevastatingBlow == 0 ? 1 : 0,
                            state.DevastatingBlowLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.DevastatingBlowText}>
                <Text style={styles.PerkText}>Devastating Blow</Text>
            </View>
            <View title='Sweep Blue' style={{
                position: 'absolute',
                left: "38%",
                top: "28%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Sweep Gold' style={{
                position: 'absolute',
                left: "38%",
                top: "28%",
                zIndex: 8,
                opacity: state.Sweep

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfSweepPressed(
                            state.Sweep == 0 ? 1 : 0,
                            state.SweepLine == 'white' ? 'gold' : 'white',
                            state.SweepDevLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.SweepText}>
                <Text style={styles.PerkText}>Sweep</Text>
            </View>
            <View title='Warmaster Blue' style={{
                position: 'absolute',
                left: "38%",
                top: "15%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Warmaster Gold' style={{
                position: 'absolute',
                left: "38%",
                top: "15%",
                zIndex: 8,
                opacity: state.Warmaster

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfWarmasterPressed(
                            state.Warmaster == 0 ? 1 : 0,
                            state.WarmasterLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.WarmasterText}>
                <Text style={styles.PerkText}>Warmaster</Text>
            </View>

            <View title='Deep Wounds Blue' style={{
                position: 'absolute',
                left: "58%",
                top: "60%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Deep Wounds Gold' style={{
                position: 'absolute',
                left: "58%",
                top: "60%",
                zIndex: 8,
                opacity: state.DeepWounds

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfDeepWoundsPressed(
                            state.DeepWounds == 0 ? 1 : 0,
                            state.DeepWoundsLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.DeepWoundsText}>
                <Text style={styles.PerkText}>Deep Wounds</Text>
            </View>
            <View title='Skullcrusher Blue' style={{
                position: 'absolute',
                left: "80%",
                top: "58%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Skullcrusher Gold' style={{
                position: 'absolute',
                left: "80%",
                top: "58%",
                zIndex: 8,
                opacity: state.Skullcrusher

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfSkullcrusherPressed(
                            state.Skullcrusher == 0 ? 1 : 0,
                            state.SkullcrusherLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.SkullcrusherText}>
                <Text style={styles.PerkText}>Skull Crusher</Text>
            </View>

            <View title='Critical Charge Blue' style={{
                position: 'absolute',
                left: "20%",
                top: "45%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Critical Charge Gold' style={{
                position: 'absolute',
                left: "20%",
                top: "45%",
                zIndex: 8,
                opacity: state.CriticalCharge

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfCriticalChargePressed(
                            state.CriticalCharge == 0 ? 1 : 0,
                            state.CriticalChargeLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.CriticalChargeText}>
                <Text style={styles.PerkText}>Critical Charge</Text>
            </View>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} >

                <Line
                    x1="48.2%"
                    y1="85%"
                    x2="15%"
                    y2="66.5%"
                    stroke={state.LimbsplitterLine}
                    strokeWidth={lineStrokeWidth}
                />

                <Line
                    x1="48.2%"
                    y1="72%"
                    x2="48.2%"
                    y2="85%"
                    stroke={state.ChampionsStanceLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="48.2%"
                    y1="72.8%"
                    x2="66%"
                    y2="50%"
                    stroke={state.DevastatingBlowLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="48.2%"
                    y1="72.8%"
                    x2="29.5%"
                    y2="49%"
                    stroke={state.CriticalChargeLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="30%"
                    y1="50%"
                    x2="48.2%"
                    y2="32%"
                    stroke={state.SweepLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="66%"
                    y1="49.5%"
                    x2="48.2%"
                    y2="32%"
                    stroke={state.SweepDevLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="48.2%"
                    y1="32%"
                    x2="48.2%"
                    y2="20%"
                    stroke={state.WarmasterLine}
                    strokeWidth={lineStrokeWidth}

                />


                <Line
                    x1="68%"
                    y1="65%"
                    x2="48.2%"
                    y2="85%"
                    stroke={state.DeepWoundsLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="90%"
                    y1="63%"
                    x2="48.2%"
                    y2="85%"
                    stroke={state.SkullcrusherLine}
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
        bottom: "78%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    Icon: {
        position: 'absolute',
    },
    BarbarianText: {
        position: 'absolute',
        left: "42%",
        top: "88%",
        zIndex: 10,
    },
    LimbsplitterText: {
        position: 'absolute',
        left: "7%",
        top: "70%",
        zIndex: 10,
    },
    ChampionsStanceText: {
        position: 'absolute',
        left: "35%",
        top: "76%",
        zIndex: 10,
    },
    CriticalChargeText: {
        position: 'absolute',
        left: "20%",
        top: "53%",
        zIndex: 10,
    },
    DevastatingBlowText: {
        position: 'absolute',
        left: "59%",
        top: "53%",
        zIndex: 10,
    },
    SweepText: {
        position: 'absolute',
        left: "44%",
        top: "36%",
        zIndex: 10,
    },
    WarmasterText: {
        position: 'absolute',
        left: "41%",
        top: "23%",
        zIndex: 10,
    },

    DeepWoundsText: {
        position: 'absolute',
        left: "59%",
        top: "68%",
        zIndex: 10,
    },
    SkullcrusherText: {
        position: 'absolute',
        left: "81%",
        top: "66%",
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
        bottom: '67%',
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

export default TwoHandedTree;