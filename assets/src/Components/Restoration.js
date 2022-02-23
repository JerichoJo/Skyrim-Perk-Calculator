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

const RestorationTree = () => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ActivePerks, SetActivePerks] = useState(0);
    const [RequiredLevel, SetRequiredLevel] = useState(0);
    const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);
    const [state, setState] = useSetState({
        noviceRestoration: 0,
        Respite: 0,
        RespiteLine: 'black',
        ApprenticeRestoration: 0,
        ApprenticeRestorationLine: 'black',
        AdeptRestoration: 0,
        AdeptRestorationLine: 'black',
        ExpertRestoration: 0,
        ExpertRestorationLine: 'black',
        MasterRestoration: 0,
        MasterRestorationLine: 'black',
        Regeneration: 0,
        RegenerationLine: 'black',
        Necromage: 0,
        NecromageLine: 'black',
        WardAbsorb: 0,
        WardAbsorbLine: 'black',
        RestoDualCast: 0,
        RestoDualCastLine: 'black',
        Recovery: 0,
        RecoveryLine: 'black',
        AvoidDeath: 0,
        AvoidDeathLine: 'black',
    });

    let resetAllTrees;
    const resetRestorationPerks = () => {
        setState({ noviceRestoration: 0 });
        setState({ Respite: 0 });
        setState({ RespiteLine: 'black' });
        setState({ ApprenticeRestoration: 0 });
        setState({ ApprenticeRestorationLine: 'black' });
        setState({ AdeptRestoration: 0 });
        setState({ AdeptRestorationLine: 'black' });
        setState({ ExpertRestoration: 0 });
        setState({ ExpertRestorationLine: 'black' });
        setState({ MasterRestoration: 0 });
        setState({ MasterRestorationLine: 'black' });
        setState({ Regeneration: 0 });
        setState({ RegenerationLine: 'black' });
        setState({ Necromage: 0 });
        setState({ NecromageLine: 'black' });
        setState({ WardAbsorb: 0 });
        setState({ WardAbsorbLine: 'black' });
        setState({ RestoDualCast: 0 });
        setState({ RestoDualCastLine: 'black' });
        setState({ Recovery: 0 });
        setState({ RecoveryLine: 'black' });
        setState({ AvoidDeath: 0 });
        setState({ AvoidDeathLine: 'black' });
        SetRequiredLevel(0);
    }

    const resetActivePerks = () => {
        resetRestorationPerks();
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
            resetRestorationPerks();
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
        if (state.MasterRestoration == 1) {
            TrackLevel(100);
        } else if (state.AvoidDeath == 1) {
            TrackLevel(90);
        } else if (state.ExpertRestoration == 1) {
            TrackLevel(75);
        } else if (state.Necromage == 1) {
            TrackLevel(70);
        } else if (state.WardAbsorb == 1) {
            TrackLevel(60);
        } else if (state.AdeptRestoration == 1) {
            TrackLevel(50);
        } else if (state.Respite == 1) {
            TrackLevel(40);
        } else if (state.Recovery == 1) {
            TrackLevel(30);
        } else if (state.ApprenticeRestoration == 1) {
            TrackLevel(25);
        } else if (state.Regeneration == 1) {
            TrackLevel(20);
        } else if (state.RestoDualCast == 1) {
            TrackLevel(20);
        }
    }, [TrackLevel, state]);

    const CheckIfNoviceRestorationPressed = (button) => {
        if (
            state.ApprenticeRestoration == 1 ||
            state.Respite == 1
        ) {
            // Do nothing....must un-select nodes above it first
        }
        else {
            setState({ noviceRestoration: button }); // Change button color back and forth
            state.noviceRestoration == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfRespitePressed = (button, line) => {
        if (state.noviceRestoration == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceRestoration: button });
            setState({ noviceRestorationLine: line });
            setState({ Respite: button });
            setState({ RespiteLine: line });
            IncrementCounter(2);
        } else {
            setState({ RespiteLine: line });
            setState({ Respite: button }); // Change the pressed button color back and forth
            state.Respite == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfApprenticeRestorationPressed = (buttonColor, lineColor) => {
        if (state.noviceRestoration == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceRestoration: buttonColor });
            setState({ noviceRestorationLine: lineColor });
            setState({ ApprenticeRestoration: buttonColor });
            setState({ ApprenticeRestorationLine: lineColor });

            IncrementCounter(2);
        } else if (state.AdeptRestoration == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ ApprenticeRestorationLine: lineColor });
            setState({ ApprenticeRestoration: buttonColor }); // Change button color back and forth
            state.ApprenticeRestoration == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfAdeptRestorationPressed = (buttonColor, lineColor) => {
        if (state.ApprenticeRestoration == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceRestoration: buttonColor });
            setState({ AdeptRestoration: buttonColor });
            setState({ ApprenticeRestoration: buttonColor });
            setState({ AdeptRestorationLine: lineColor });
            setState({ ApprenticeRestorationLine: lineColor });
            if (state.noviceRestoration == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.ExpertRestoration == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ AdeptRestorationLine: lineColor });
            setState({ AdeptRestoration: buttonColor }); // Change the pressed button color back and forth
            state.AdeptRestoration == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfExpertRestorationPressed = (buttonColor, lineColor) => {
        if (state.AdeptRestoration == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ ExpertRestoration: buttonColor });
            setState({ AdeptRestoration: buttonColor });
            setState({ ApprenticeRestoration: buttonColor });
            setState({ noviceRestoration: buttonColor });
            setState({ ExpertRestorationLine: lineColor });
            setState({ AdeptRestorationLine: lineColor });
            setState({ ApprenticeRestorationLine: lineColor });
            if (state.ApprenticeRestoration == 1) {
                IncrementCounter(2);
            } else if (state.noviceRestoration == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else {
            setState({ ExpertRestorationLine: lineColor });
            setState({ ExpertRestoration: buttonColor }); // Change the pressed button color back and forth
            state.ExpertRestoration == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfMasterRestorationPressed = (button, line) => {
        if (state.ExpertRestoration == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ MasterRestoration: button });
            setState({ ExpertRestoration: button });
            setState({ AdeptRestoration: button });
            setState({ ApprenticeRestoration: button });
            setState({ noviceRestoration: button });
            setState({ MasterRestorationLine: line });
            setState({ ExpertRestorationLine: line });
            setState({ AdeptRestorationLine: line });
            setState({ ApprenticeRestorationLine: line });
            if (state.ExpertRestoration == 1) {
                IncrementCounter(2);
            } else if (state.AdeptRestoration == 1) {
                IncrementCounter(3);
            } else if (state.ApprenticeRestoration == 1) {
                IncrementCounter(4);
            } else {
                IncrementCounter(5);
            }
        } else {
            setState({ MasterRestorationLine: line });
            setState({ MasterRestoration: button }); // Change the pressed button color back and forth
            state.MasterRestoration == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfRegenerationPressed = (button, line) => {
        if (state.noviceRestoration == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceRestoration: button });
            setState({ noviceRestorationLine: line });
            setState({ Regeneration: button });
            setState({ Regeneration: line });
            IncrementCounter(2);
        } else {
            setState({ RegenerationLine: line });
            setState({ Regeneration: button }); // Change the pressed button color back and forth
            state.Regeneration == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfNecromagePressed = (button, line) => {
        if (state.Regeneration == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceRestoration: button });
            setState({ Regeneration: button });
            setState({ Necromage: button });
            setState({ noviceRestorationLine: line });
            setState({ RegenerationLine: line });
            setState({ NecromageLine: line });
            if (state.noviceRestoration == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else {
            setState({ NecromageLine: line });
            setState({ Necromage: button }); // Change the pressed button color back and forth
            state.Necromage == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfWardAbsorbPressed = (button, line) => {
        if (state.noviceRestoration == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceRestoration: button });
            setState({ noviceRestorationLine: line });
            setState({ WardAbsorb: button });
            setState({ WardAbsorbLine: line });
            IncrementCounter(2);
        } else {
            setState({ WardAbsorbLine: line });
            setState({ WardAbsorb: button }); // Change the pressed button color back and forth
            state.WardAbsorb == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfRestoDualCastPressed = (button, line) => {
        if (state.noviceRestoration == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceRestoration: button });
            setState({ noviceRestorationLine: line });
            setState({ RestoDualCast: button });
            setState({ RestoDualCastLine: line });
            IncrementCounter(2);
        } else {
            setState({ RestoDualCastLine: line });
            setState({ RestoDualCast: button }); // Change the pressed button color back and forth
            state.RestoDualCast == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfRecoveryPressed = (button, line) => {
        if (state.noviceRestoration == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceRestoration: button });
            setState({ noviceRestorationLine: line });
            setState({ Recovery: button });
            setState({ RecoveryLine: line });
            IncrementCounter(2);
        } else {
            setState({ RecoveryLine: line });
            setState({ Recovery: button }); // Change the pressed button color back and forth
            state.Recovery == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfAvoidDeathPressed = (button, line) => {
        if (state.Recovery == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceRestoration: button });
            setState({ Recovery: button });
            setState({ AvoidDeath: button });
            setState({ noviceRestorationLine: line });
            setState({ RecoveryLine: line });
            setState({ AvoidDeathLine: line });
            if (state.noviceRestoration == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else {
            setState({ AvoidDeathLine: line });
            setState({ AvoidDeath: button }); // Change the pressed button color back and forth
            state.AvoidDeath == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    return (
        <View style={{ zIndex: 2 }}>
            <View
                style={styles.resetButtonContainer}>
                <TouchableOpacity style={styles.resetButton} onPress={() => resetActivePerks()}>
                    <Text style={{ color: "black", fontWeight: "bold", }}> Reset Illusion Perks</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.topText}>
                <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
                <Text style={styles.HomeScreenText}>Required Level: {RequiredLevel} </Text>
            </View>
            <View title='Novice Restoration Blue' style={{
                position: 'absolute',
                left: "45%",
                top: "75%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Novice Restoration Gold' style={{
                position: 'absolute',
                left: "45%",
                top: "75%",
                zIndex: 8,
                opacity: state.noviceRestoration

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("BasicSmithingModal")}
                    onPress={() => {
                        CheckIfNoviceRestorationPressed(
                            state.noviceRestoration == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.NoviceRestorationText}>
                <Text style={styles.PerkText}>Novice Restoration</Text>
            </View>
            <View title='Respite Blue' style={{
                position: 'absolute',
                left: "0%",
                top: "70%",
                zIndex: 8,

            }}>

                <StarIconBlue />
            </View>
            <View title='Respite Gold' style={{
                position: 'absolute',
                left: "0%",
                top: "70%",
                zIndex: 8,
                opacity: state.Respite

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ArcaneSmithingModal")}
                    onPress={() => {
                        CheckIfRespitePressed(
                            state.Respite == 0 ? 1 : 0,
                            state.RespiteLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.RespiteText}>
                <Text style={styles.PerkText}>Respite</Text>
            </View>
            <View title='Apprentice Restoration Blue' style={{
                position: 'absolute',
                left: "52%",
                top: "55%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Apprentice Restoration Gold' style={{
                position: 'absolute',
                left: "52%",
                top: "55%",
                zIndex: 8,
                opacity: state.ApprenticeRestoration

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfApprenticeRestorationPressed(
                            state.ApprenticeRestoration == 0 ? 1 : 0,
                            state.ApprenticeRestorationLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ApprenticeRestorationText}>
                <Text style={styles.PerkText}>Apprentice Restoration</Text>
            </View>
            <View title='Adept Restoration Blue' style={{
                position: 'absolute',
                left: "42%",
                top: "38%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Adept Restoration Gold' style={{
                position: 'absolute',
                left: "42%",
                top: "38%",
                zIndex: 8,
                opacity: state.AdeptRestoration

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfAdeptRestorationPressed(
                            state.AdeptRestoration == 0 ? 1 : 0,
                            state.AdeptRestorationLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AdeptRestorationText}>
                <Text style={styles.PerkText}>Adept Restoration</Text>
            </View>
            <View title='Expert Restoration Blue' style={{
                position: 'absolute',
                left: "50%",
                top: "26%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Expert Restoration Gold' style={{
                position: 'absolute',
                left: "50%",
                top: "26%",
                zIndex: 8,
                opacity: state.ExpertRestoration

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfExpertRestorationPressed(
                            state.ExpertRestoration == 0 ? 1 : 0,
                            state.ExpertRestorationLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ExpertRestorationText}>
                <Text style={styles.PerkText}>Expert Restoration</Text>
            </View>
            <View title='Master Restoration Blue' style={{
                position: 'absolute',
                left: "35%",
                top: "15%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Master Restoration Gold' style={{
                position: 'absolute',
                left: "35%",
                top: "15%",
                zIndex: 8,
                opacity: state.MasterRestoration

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfMasterRestorationPressed(
                            state.MasterRestoration == 0 ? 1 : 0,
                            state.MasterRestorationLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.MasterRestorationText}>
                <Text style={styles.PerkText}>Master Restoration</Text>
            </View>
            <View title='Regeneration Blue' style={{
                position: 'absolute',
                left: "20%",
                top: "60%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Regeneration Gold' style={{
                position: 'absolute',
                left: "20%",
                top: "60%",
                zIndex: 8,
                opacity: state.Regeneration

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfRegenerationPressed(
                            state.Regeneration == 0 ? 1 : 0,
                            state.RegenerationLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.RegenerationText}>
                <Text style={styles.PerkText}>Regeneration</Text>
            </View>
            <View title='Necromage Blue' style={{
                position: 'absolute',
                left: "0%",
                top: "48%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Necromage Gold' style={{
                position: 'absolute',
                left: "0%",
                top: "48%",
                zIndex: 8,
                opacity: state.Necromage

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfNecromagePressed(
                            state.Necromage == 0 ? 1 : 0,
                            state.NecromageLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.NecromageText}>
                <Text style={styles.PerkText}>Necromage</Text>
            </View>
            <View title='Ward Absorb Blue' style={{
                position: 'absolute',
                left: "25%",
                top: "50%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Ward Absorb Gold' style={{
                position: 'absolute',
                left: "25%",
                top: "50%",
                zIndex: 8,
                opacity: state.WardAbsorb

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfWardAbsorbPressed(
                            state.WardAbsorb == 0 ? 1 : 0,
                            state.WardAbsorbLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.WardAbsorbText}>
                <Text style={styles.PerkText}>Ward Absorb</Text>
            </View>
            <View title='Restoration Dual Casting Blue' style={{
                position: 'absolute',
                left: "75%",
                top: "73%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Restoration Dual Casting Gold' style={{
                position: 'absolute',
                left: "75%",
                top: "73%",
                zIndex: 8,
                opacity: state.RestoDualCast

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfRestoDualCastPressed(
                            state.RestoDualCast == 0 ? 1 : 0,
                            state.RestoDualCastLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.RestoDualCastText}>
                <Text style={styles.PerkText}>Dual Casting</Text>
            </View>
            <View title='Recovery Blue' style={{
                position: 'absolute',
                left: "72%",
                top: "60%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Recovery Gold' style={{
                position: 'absolute',
                left: "72%",
                top: "60%",
                zIndex: 8,
                opacity: state.Recovery

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfRecoveryPressed(
                            state.Recovery == 0 ? 1 : 0,
                            state.RecoveryLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.RecoveryText}>
                <Text style={styles.PerkText}>Recovery</Text>
            </View>
            <View title='Avoid Death Blue' style={{
                position: 'absolute',
                left: "78%",
                top: "40%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Avoid Death Gold' style={{
                position: 'absolute',
                left: "78%",
                top: "40%",
                zIndex: 8,
                opacity: state.AvoidDeath

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfAvoidDeathPressed(
                            state.AvoidDeath == 0 ? 1 : 0,
                            state.AvoidDeathLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AvoidDeathText}>
                <Text style={styles.PerkText}>Avoid Death</Text>
            </View>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} >

                <Line
                    x1="55%"
                    y1="79.6%"
                    x2="10%"
                    y2="74.7%"
                    stroke={state.RespiteLine}
                    strokeWidth={lineStrokeWidth}
                />

                <Line
                    x1="55.5%"
                    y1="80%"
                    x2="62.5%"
                    y2="60%"
                    stroke={state.ApprenticeRestorationLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="62.5%"
                    y1="60%"
                    x2="52.5%"
                    y2="43%"
                    stroke={state.AdeptRestorationLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="52.4%"
                    y1="43%"
                    x2="60%"
                    y2="31%"
                    stroke={state.ExpertRestorationLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="61%"
                    y1="31%"
                    x2="45%"
                    y2="19%"
                    stroke={state.MasterRestorationLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="55%"
                    y1="79.6%"
                    x2="30%"
                    y2="64.5%"
                    stroke={state.RegenerationLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="30%"
                    y1="64.5%"
                    x2="9%"
                    y2="52%"
                    stroke={state.NecromageLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="55%"
                    y1="79.6%"
                    x2="35.5%"
                    y2="55%"
                    stroke={state.WardAbsorbLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="55%"
                    y1="79.6%"
                    x2="85%"
                    y2="77.6%"
                    stroke={state.RestoDualCastLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="55%"
                    y1="79.6%"
                    x2="82%"
                    y2="65%"
                    stroke={state.RecoveryLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="82.3%"
                    y1="65.5%"
                    x2="88.5%"
                    y2="45%"
                    stroke={state.AvoidDeathLine}
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
    NoviceRestorationText: {
        position: 'absolute',
        left: "43%",
        top: "82%",
        zIndex: 10,
    },
    RespiteText: {
        position: 'absolute',
        left: "6%",
        top: "84%",
        zIndex: 10,
    },
    ApprenticeRestorationText: {
        position: 'absolute',
        left: "48%",
        top: "62%",
        zIndex: 10,
    },
    AdeptRestorationText: {
        position: 'absolute',
        left: "41%",
        top: "45%",
        zIndex: 10,
    },
    ExpertRestorationText: {
        position: 'absolute',
        left: "48%",
        top: "33%",
        zIndex: 10,
    },
    MasterRestorationText: {
        position: 'absolute',
        left: "33%",
        top: "22%",
        zIndex: 10,
    },
    RegenerationText: {
        position: 'absolute',
        left: "22%",
        top: "67%",
        zIndex: 10,
    },
    NecromageText: {
        position: 'absolute',
        left: "3%",
        top: "55%",
        zIndex: 10,
    },
    WardAbsorbText: {
        position: 'absolute',
        left: "27%",
        top: "57%",
        zIndex: 10,
    },
    RestoDualCastText: {
        position: 'absolute',
        left: "77%",
        top: "80%",
        zIndex: 10,
    },
    RecoveryText: {
        position: 'absolute',
        left: "76%",
        top: "67%",
        zIndex: 10,
    },
    AvoidDeathText: {
        position: 'absolute',
        left: "80%",
        top: "47%",
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

export default RestorationTree;