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
import { StackViewTransitionConfigs } from 'react-navigation-stack';
import { keyboardProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

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

const LockpickingTree = () => {
    const navigation = useNavigation();
    const [state, setState] = useSetState({
        noviceLocks: 0,
        apprenticeLocks: 0,
        apprenticeLocksLine: 'white',
        quickHands: 0,
        quickHandsLine: 'white',
        waxKey: 0,
        waxKeyLine: 'white',
        adeptLocks: 0,
        adeptLocksLine: 'white',
        expertLocks: 0,
        expertLocksLine: 'white',
        goldenTouch: 0,
        goldenTouchLine: 'white',
        treasureHunter: 0,
        treasureHunterLine: 'white',
        locksmith: 0,
        locksmithLine: 'white',
        unbreakable: 0,
        unbreakableLine: 'white',
        masterLocks: 0,
        masterLocksLine: 'white'
    });

    const [ActivePerks, SetActivePerks] = useState(0);
    const [RequiredLevel, SetRequiredLevel] = useState(0);
    const [LightFingersLevel, SetLightFingersLevel] = useState(0);
    const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);


    let resetAllTrees;
    const resetLockpickingPerks = () => {
        setState({ noviceLocks: 0 });
        setState({ apprenticeLocks: 0 });
        setState({ apprenticeLocksLine: 'white' });
        setState({ quickHands: 0 });
        setState({ quickHandsLine: 'white' });
        setState({ waxKey: 0 });
        setState({ waxKeyLine: 'white' });
        setState({ adeptLocks: 0 });
        setState({ adeptLocksLine: 'white' });
        setState({ expertLocks: 0 });
        setState({ expertLocksLine: 'white' });
        setState({ goldenTouch: 0 });
        setState({ goldenTouchLine: 'white' });
        setState({ treasureHunter: 0 });
        setState({ treasureHunterLine: 'white' });
        setState({ locksmith: 0 });
        setState({ locksmithLine: 'white' });
        setState({ unbreakable: 0 });
        setState({ unbreakableLine: 'white' });
        setState({ masterLocks: 0 });
        setState({ masterLocksLine: 'white' });
        SetRequiredLevel(0);
    }

    const resetActivePerks = () => {
        resetLockpickingPerks();
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
            resetLockpickingPerks();
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
        if (state.unbreakable == 1 || state.masterLocks) {
            TrackLevel(100);
        } else if (state.locksmith == 1) {
            TrackLevel(80);
        } else if (state.expertLocks == 1) {
            TrackLevel(75);
        } else if (state.treasureHunter == 1) {
            TrackLevel(70);
        } else if (state.goldenTouch == 1) {
            TrackLevel(60);
        } else if (state.waxKey == 1 || state.adeptLocks == 1) {
            TrackLevel(50);
        } else if (state.quickHands == 1) {
            TrackLevel(40);
        } else if (state.apprenticeLocks == 1) {
            TrackLevel(25);
        } else if (state.noviceLocks == 1) {
            TrackLevel(0);
        } else {
            TrackLevel(0)
        }
    }, [state]);

    useEffect(() => {
        CheckLevel();
    }, [CheckLevel]);

    const checkIfNoviceLocksPressed = (button) => {
        if (state.apprenticeLocks == 1) {
            // do nothing
        } else {
            setState({ noviceLocks: button })
            state.noviceLocks == 0 ? IncrementCounter(1) : DecrementCounter(1);
        }
    }
    const checkIfApprenticeLockpickingPressed = (buttonColor, lineColor) => {
        if (state.noviceLocks == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceLocks: buttonColor });
            setState({ apprenticeLocksLine: lineColor });
            setState({ apprenticeLocks: buttonColor });
            IncrementCounter(2);
        } else if (state.quickHands == 1 || state.adeptLocks == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ apprenticeLocksLine: lineColor });
            setState({ apprenticeLocks: buttonColor }); // Change button color back and forth
            state.apprenticeLocks == 0 ? IncrementCounter(1) : DecrementCounter(1);

        }
    };
    const checkIfQuickHandsPressed = (buttonColor, lineColor) => {
        if (state.apprenticeLocks == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceLocks: buttonColor });
            setState({ apprenticeLocks: buttonColor });
            setState({ quickHands: buttonColor });
            setState({ apprenticeLocksLine: lineColor });
            setState({ quickHandsLine: lineColor });
            if (state.noviceLocks == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.waxKey == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ quickHandsLine: lineColor });
            setState({ quickHands: buttonColor }); // Change the pressed button color back and forth
            state.quickHands == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfWaxKeyPressed = (buttonColor, lineColor) => {
        if (state.quickHands == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceLocks: buttonColor });
            setState({ apprenticeLocks: buttonColor });
            setState({ quickHands: buttonColor });
            setState({ waxKey: buttonColor });
            setState({ apprenticeLocksLine: lineColor });
            setState({ quickHandsLine: lineColor });
            setState({ waxKeyLine: lineColor });
            if (state.apprenticeLocks == 1) {
                IncrementCounter(2);
            } else if (state.noviceLocks == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else {
            setState({ waxKeyLine: lineColor });
            setState({ waxKey: buttonColor }); // Change the pressed button color back and forth
            state.waxKey == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const checkIfAdeptLocksPressed = (button, line) => {
        if (state.apprenticeLocks == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceLocks: button });
            setState({ apprenticeLocks: button });
            setState({ adeptLocks: button });
            setState({ apprenticeLocksLine: line });
            setState({ adeptLocksLine: line });
            if (state.noviceLocks == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.goldenTouch == 1 || state.expertLocks == 1) {
            // do nothing
        } else {
            setState({ adeptLocksLine: line });
            setState({ adeptLocks: button }); // Change the pressed button color back and forth
            state.adeptLocks == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfGoldenTouchPressed = (button, line) => {
        if (state.adeptLocks == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceLocks: button });
            setState({ apprenticeLocks: button });
            setState({ adeptLocks: button });
            setState({ goldenTouch: button });
            setState({ apprenticeLocksLine: line });
            setState({ adeptLocksLine: line });
            setState({ goldenTouchLine: line });
            if (state.noviceLocks == 1) {
                IncrementCounter(3);
            } else if (state.apprenticeLocks == 1) {
                IncrementCounter(2);
            } else if (state.noviceLocks == 0) {
                IncrementCounter(4);
            }
        } else if (state.treasureHunter == 1) {
            // nothing
        } else {
            setState({ goldenTouchLine: line });
            setState({ goldenTouch: button }); // Change the pressed button color back and forth
            state.goldenTouch == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };

    const CheckIfTreasureHunterPressed = (button, line) => {
        if (state.goldenTouch == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceLocks: button });
            setState({ apprenticeLocksLine: line });
            setState({ apprenticeLocks: button });
            setState({ adeptLocksLine: line });
            setState({ adeptLocks: button });
            setState({ goldenTouchLine: line });
            setState({ goldenTouch: button });
            setState({ treasureHunterLine: line });
            setState({ treasureHunter: button });

            if (state.adeptLocks == 1) {
                IncrementCounter(2)
            } else if (state.apprenticeLocks == 1) {
                IncrementCounter(3);
            } else if (state.noviceLocks == 1) {
                IncrementCounter(4);
            } else {
                IncrementCounter(5);
            }

        } else {
            setState({ treasureHunterLine: line });
            setState({ treasureHunter: button }); // Change the pressed button color back and forth
            state.treasureHunter == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfExpertLocksPressed = (button, line) => {
        if (state.adeptLocks == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceLocks: button });
            setState({ apprenticeLocks: button });
            setState({ adeptLocks: button });
            setState({ apprenticeLocksLine: line });
            setState({ adeptLocksLine: line });
            setState({ expertLocksLine: line });
            setState({ expertLocks: button })
            if (state.novice == 1) {
                IncrementCounter(3);
            } else if (state.apprenticeLocks == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(4);
            }
        } else if (state.locksmith == 1 || state.masterLocks == 1) {
            // nothing 
        } else {
            setState({ expertLocksLine: line });
            setState({ expertLocks: button }); // Change the pressed button color back and forth
            state.expertLocks == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfLocksmithPressed = (button, line) => {
        if (state.expertLocks == 0) {
            setState({ noviceLocks: button });
            setState({ apprenticeLocks: button });
            setState({ apprenticeLocksLine: line });
            setState({ adeptLocks: button });
            setState({ adeptLocksLine: line });
            setState({ expertLocks: button });
            setState({ expertLocksLine: line });
            setState({ locksmith: button });
            setState({ locksmithLine: line });

            if (state.adeptLocks == 1) {
                IncrementCounter(2);
            } else if (state.apprenticeLocks == 1) {
                IncrementCounter(3);
            } else if (state.noviceLocks == 1) {
                IncrementCounter(4);
            } else {
                IncrementCounter(5);
            }
        } else if (state.unbreakable == 1) {
            // do nothing
        } else {
            setState({ locksmith: button });
            setState({ locksmithLine: line });
            state.locksmith == 0 ? IncrementCounter(1) : DecrementCounter(1)
        }
    }
    const CheckIfUnbreakablePressed = (button, line) => {
        if (state.locksmith == 0) {
            setState({ noviceLocks: button });
            setState({ apprenticeLocks: button });
            setState({ apprenticeLocksLine: line });
            setState({ adeptLocks: button });
            setState({ adeptLocksLine: line });
            setState({ expertLocks: button });
            setState({ expertLocksLine: line });
            setState({ locksmith: button });
            setState({ locksmithLine: line });
            setState({ unbreakable: button });
            setState({ unbreakableLine: line });
            if (state.noviceLocks == 1) {
                IncrementCounter(5);
            } else if (state.apprenticeLocks == 1) {
                IncrementCounter(4);
            } else if (state.adeptLocks == 1) {
                IncrementCounter(3);
            } else if (state.expertLocks == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(6);
            }
        } else {
            setState({ unbreakable: button });
            setState({ unbreakableLine: line });
            state.unbreakable == 0 ? IncrementCounter(1) : DecrementCounter(1);
        }
    }
    const CheckIMasterLocksPressed = (button, line) => {
        if (state.expertLocks == 0) {
            setState({ noviceLocks: button });
            setState({ apprenticeLocks: button });
            setState({ apprenticeLocksLine: line });
            setState({ adeptLocks: button });
            setState({ adeptLocksLine: line });
            setState({ expertLocks: button });
            setState({ expertLocksLine: line });
            setState({ masterLocks: button });
            setState({ masterLocksLine: line });
            if (state.noviceLocks == 1) {
                IncrementCounter(4);
            } else if (state.apprenticeLocks == 1) {
                IncrementCounter(3);
            } else if (state.adeptLocks == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(5);
            }
        } else {
            setState({ masterLocks: button });
            setState({ masterLocksLine: line });
            state.masterLocks == 0 ? IncrementCounter(1) : DecrementCounter(1);
        }
    }

    return (
        <View style={{ zIndex: 2 }}>
            <View
                style={styles.resetButtonContainer}>
                <TouchableOpacity style={styles.resetButton} onPress={() => resetActivePerks()}>
                    <Text style={{ color: "white", fontWeight: "bold", }}>Reset Lockpicking Perks</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.topText}>
                <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
                <Text style={styles.HomeScreenText}>Required Level: {RequiredLevel}</Text>
            </View>
            <View title='Novice Locks Blue' style={{
                position: 'absolute',
                left: "41%",
                top: "74%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Novice Locks Gold' style={{
                position: 'absolute',
                left: "41%",
                top: "74%",
                zIndex: 8,
                opacity: state.noviceLocks

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("NoviceLocksModal")}
                    onPress={() => {
                        checkIfNoviceLocksPressed(
                            state.noviceLocks == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.NoviceLocksText}>
                <Text style={styles.PerkText}>Novice Locks</Text>
            </View>
            <View title='Apprentice Locks Blue' style={{
                position: 'absolute',
                left: "48.5%",
                top: "63%",
                zIndex: 8,

            }}>

                <StarIconBlue />
            </View>
            <View title='Apprentice Locks Gold' style={{
                position: 'absolute',
                left: "48.5%",
                top: "63%",
                zIndex: 8,
                opacity: state.apprenticeLocks

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ApprenticeLocksModal")}
                    onPress={() => {
                        checkIfApprenticeLockpickingPressed(
                            state.apprenticeLocks == 0 ? 1 : 0,
                            state.apprenticeLocksLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ApprenticeLocksText}>
                <Text style={styles.PerkText}>Apprentice Locks</Text>
            </View>
            <View title='Quick Hands Blue' style={{
                position: 'absolute',
                left: "25%",
                top: "58%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Quick Hands Gold' style={{
                position: 'absolute',
                left: "25%",
                top: "58%",
                zIndex: 8,
                opacity: state.quickHands

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("QuickHandsModal")}
                    onPress={() => {
                        checkIfQuickHandsPressed(
                            state.quickHands == 0 ? 1 : 0,
                            state.quickHandsLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.QuickHandsText}>
                <Text style={styles.PerkText}>Quick Hands</Text>
            </View>
            <View title='Wax Key Blue' style={{
                position: 'absolute',
                left: "7%",
                top: "54%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Wax Key Gold' style={{
                position: 'absolute',
                left: "7%",
                top: "54%",
                zIndex: 8,
                opacity: state.waxKey

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("WaxKeyModal")}
                    onPress={() => {
                        CheckIfWaxKeyPressed(
                            state.waxKey == 0 ? 1 : 0,
                            state.waxKeyLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.WaxKeyText}>
                <Text style={styles.PerkText}>Wax Key</Text>
            </View>
            <View title='Adept Locks Blue' style={{
                position: 'absolute',
                left: "58%",
                top: "51%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Adept Locks Gold' style={{
                position: 'absolute',
                left: "58%",
                top: "51%",
                zIndex: 8,
                opacity: state.adeptLocks

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("AdeptLocksModal")}
                    onPress={() => {
                        checkIfAdeptLocksPressed(
                            state.adeptLocks == 0 ? 1 : 0,
                            state.adeptLocksLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AdeptLocksText}>
                <Text style={styles.PerkText}>Adept Locks</Text>
            </View>
            <View title='Golden Touch Blue' style={{
                position: 'absolute',
                left: "33%",
                top: "49%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Golden Touch Gold' style={{
                position: 'absolute',
                left: "33%",
                top: "49%",
                zIndex: 8,
                opacity: state.goldenTouch

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("GoldenTouchModal")}
                    onPress={() => {
                        CheckIfGoldenTouchPressed(
                            state.goldenTouch == 0 ? 1 : 0,
                            state.goldenTouchLine == 'white' ? 'gold' : 'white',
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.GoldenTouchText}>
                <Text style={styles.PerkText}>Golden Touch</Text>
            </View>
            <View title='Treasure Hunter Blue' style={{
                position: 'absolute',
                left: "10%",
                top: "47.8%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Treasure Hunter Gold' style={{
                position: 'absolute',
                left: "10%",
                top: "47.8%",
                zIndex: 8,
                opacity: state.treasureHunter

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("TreasureHunterModal")}
                    onPress={() => {
                        CheckIfTreasureHunterPressed(
                            state.treasureHunter == 0 ? 1 : 0,
                            state.treasureHunterLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.TreasureHunterText}>
                <Text style={styles.PerkText}>Treasure Hunter</Text>
            </View>
            <View title='Expert Locks Blue' style={{
                position: 'absolute',
                left: "57%",
                top: "37%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Expert Locks Gold' style={{
                position: 'absolute',
                left: "57%",
                top: "37%",
                zIndex: 8,
                opacity: state.expertLocks

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ExpertLocksModal")}
                    onPress={() => {
                        CheckIfExpertLocksPressed(
                            state.expertLocks == 0 ? 1 : 0,
                            state.expertLocksLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ExpertLocksText}>
                <Text style={styles.PerkText}>Expert Locks</Text>
            </View>
            <View title='Locksmith Blue' style={{
                position: 'absolute',
                left: "31.5%",
                top: "37.5%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Locksmith Gold' style={{
                position: 'absolute',
                left: "31.5%",
                top: "37.5%",
                zIndex: 8,
                opacity: state.locksmith

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("LocksmithModal")}
                    onPress={() => {
                        CheckIfLocksmithPressed(
                            state.locksmith == 0 ? 1 : 0,
                            state.locksmithLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.LocksmithText}>
                <Text style={styles.PerkText}>Locksmith</Text>
            </View>
            <View title='Unbreakable Blue' style={{
                position: 'absolute',
                left: "11%",
                top: "37%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Unbreakable Gold' style={{
                position: 'absolute',
                left: "11%",
                top: "37%",
                zIndex: 8,
                opacity: state.unbreakable

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("UnbreakableModal")}
                    onPress={() => {
                        CheckIfUnbreakablePressed(
                            state.unbreakable == 0 ? 1 : 0,
                            state.unbreakableLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.UnbreakableText}>
                <Text style={styles.PerkText}>Unbreakable</Text>
            </View>
            <View title='Master Locks Blue' style={{
                position: 'absolute',
                left: "56.5%",
                top: "27.5%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Master Locks Gold' style={{
                position: 'absolute',
                left: "56.5%",
                top: "27.5%",
                zIndex: 8,
                opacity: state.masterLocks

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("MasterLocksModal")}
                    onPress={() => {
                        CheckIMasterLocksPressed(
                            state.masterLocks == 0 ? 1 : 0,
                            state.masterLocksLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.MasterLocksText}>
                <Text style={styles.PerkText}>Master Locks</Text>
            </View>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
                <Line // Novice Locks to Apprentice Locks
                    x1="61%"
                    y1="68%"
                    x2="52%"
                    y2="79%"
                    stroke={state.apprenticeLocksLine}
                    strokeWidth={lineStrokeWidth}
                />

                <Line // Apprentice Locks to Quick Hands
                    x1="38%"
                    y1="63.5%"
                    x2="60%"
                    y2="68.3%"
                    stroke={state.quickHandsLine}
                    strokeWidth={lineStrokeWidth}
                />

                <Line // Quick Hands to Wax Key
                    x1="19%"
                    y1="59.5%"
                    x2="36%"
                    y2="63%"
                    stroke={state.waxKeyLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line // Apprentice Locks to Adept Locks
                    x1="70.5%"
                    y1="56%"
                    x2="61%"
                    y2="68.5%"
                    stroke={state.adeptLocksLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line // Adept Locks to Golden Touch
                    x1="44%"
                    y1="54.2%"
                    x2="69%"
                    y2="56%"
                    stroke={state.goldenTouchLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line // Golden Touch to Treasure Hunter
                    x1="20%"
                    y1="53%"
                    x2="43%"
                    y2="54%"
                    stroke={state.treasureHunterLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line // Adept Locks to Expert Locks
                    x1="68%"
                    y1="41%"
                    x2="70%"
                    y2="56%"
                    stroke={state.expertLocksLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line // Expert Locks to Locksmith
                    x1="44%"
                    y1="42.7%"
                    x2="67%"
                    y2="42%"
                    stroke={state.locksmithLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line // Locksmith to Unbreakable
                    x1="23%"
                    y1="41.9%"
                    x2="42%"
                    y2="42.5%"
                    stroke={state.unbreakableLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line // Expert Locks to Master Locks
                    x1="68%"
                    y1="32%"
                    x2="68%"
                    y2="41%"
                    stroke={state.masterLocksLine}
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
        bottom: "77%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    Icon: {
        position: 'absolute',
    },
    NoviceLocksText: {
        position: 'absolute',
        left: "55%",
        top: "81%",
        zIndex: 10,
    },
    ApprenticeLocksText: {
        position: 'absolute',
        left: "59%",
        top: "72%",
        zIndex: 10,
    },
    QuickHandsText: {
        position: 'absolute',
        left: "31%",
        top: "68%",
        zIndex: 10,
    },
    WaxKeyText: {
        position: 'absolute',
        left: "10%",
        top: "65%",
        zIndex: 10,
    },
    AdeptLocksText: {
        position: 'absolute',
        left: "72%",
        top: "59%",
        zIndex: 10,
    },
    GoldenTouchText: {
        position: 'absolute',
        left: "37%",
        top: "50%",
        zIndex: 10,
    },
    TreasureHunterText: {
        position: 'absolute',
        left: "10%",
        top: "49%",
        zIndex: 10,
    },
    ExpertLocksText: {
        position: 'absolute',
        left: "77%",
        top: "43%",
        zIndex: 10,
    },
    LocksmithText: {
        position: 'absolute',
        left: "37%",
        top: "38%",
        zIndex: 10,
    },
    UnbreakableText: {
        position: 'absolute',
        left: "10%",
        top: "37%",
        zIndex: 10,
    },

    MasterLocksText: {
        position: 'absolute',
        left: "60%",
        top: "28%",
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

export default LockpickingTree;