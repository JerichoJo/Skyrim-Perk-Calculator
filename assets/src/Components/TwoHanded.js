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
    const [BarbarianLevel, SetBarbarianLevel] = useState(0);
    const [LimbsplitterLevel, SetLimbsplitterLevel] = useState(0);
    const [DeepWoundsLevel, SetDeepWoundsLevel] = useState(0);
    const [SkullCrusherLevel, SetSkullCrusherLevel] = useState(0);
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
        SkullCrusher: 0,
        SkullCrusherLine: 'white',
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
        setState({ SkullCrusher: 0 });
        setState({ SkullCrusherLine: 'white' });
        SetRequiredLevel(0);
        SetBarbarianLevel(0);
        SetLimbsplitterLevel(0);
        SetDeepWoundsLevel(0);
        SetSkullCrusherLevel(0);
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
        } else if (state.SkullCrusher == 1 && SkullCrusherLevel == 3 || state.Limbsplitter == 1 && LimbsplitterLevel == 3 || state.DeepWounds == 1 && DeepWoundsLevel == 3) {
            TrackLevel(90);
        } else if (state.Barbarian == 1 && BarbarianLevel == 5) {
            TrackLevel(80);
        } else if (state.Sweep == 1) {
            TrackLevel(70);
        } else if (state.SkullCrusher == 1 && SkullCrusherLevel == 2 || state.Limbsplitter == 1 && LimbsplitterLevel == 2 || state.DeepWounds == 1 && DeepWoundsLevel == 2 || state.Barbarian == 1 && BarbarianLevel == 4) {
            TrackLevel(60);
        } else if (state.DevastatingBlow == 1 || state.CriticalCharge == 1) {
            TrackLevel(50);
        } else if (state.Barbarian == 1 && BarbarianLevel == 3) {
            TrackLevel(40);
        } else if (state.SkullCrusher == 1 || state.Limbsplitter == 1 || state.DeepWounds == 1) {
            TrackLevel(30);
        } else if (state.Barbarian == 1 || state.ChampionsStance == 1) {
            TrackLevel(20);
        }
    }, [TrackLevel, state]);
    const IncBarbarianCounter = (numActiveBarbarian) => {
        if (BarbarianLevel < 5) {
            SetBarbarianLevel(BarbarianLevel + numActiveBarbarian)
        }
        else {
            SetBarbarianLevel(0) // return to 0 after the perk is maxed out
        }
    }

    // function to control the Barbarian perk count (0/5)
    const IncBarbarianCountCall = (buttonColor) => {
        if (BarbarianLevel == 0) {
            setState({ Barbarian: buttonColor }); // Change the pressed button color back and forth
            IncrementCounter(1); // increment active perks by 1 on first click
            IncBarbarianCounter(1); // increment basic smith by 1 on first click
        } else if (BarbarianLevel == 5) {
            setState({ Barbarian: buttonColor }); // Change the pressed button color back and forth
            IncBarbarianCounter(1); // Increment by one so that it goes back to 0 
            DecrementCounter(5); // decrease active perks back down 3 because it is set back to 0

        } else {
            IncrementCounter(1);
            IncBarbarianCounter(1) // increment by 1 after it perk is active
        }

    }
    const CheckIfBarbarianPressed = (button) => {
        if (
            state.ChampionsStance == 1 ||
            state.Limbsplitter == 1 ||
            state.DeepWounds == 1 ||
            state.SkullCrusher == 1
        ) {
            // Do nothing....must un-select nodes above it first
            if (BarbarianLevel == 5) {
                DecrementCounter(4); // decrease active perks back down 4 because it is set back to 1
                SetBarbarianLevel(1);

            } else {
                IncrementCounter(1);
                IncBarbarianCounter(1) // increment by 1 after it perk is active
            }
        }
        else {
            IncBarbarianCountCall(button);
        }
    };

    const IncLimbsplitterCounter = (numActiveLimbsplitter) => {
        if (LimbsplitterLevel < 3) {
            SetLimbsplitterLevel(LimbsplitterLevel + numActiveLimbsplitter)
        }
        else {
            SetLimbsplitterLevel(0) // return to 0 after the perk is maxed out
        }
    }

    // function to control the Limbsplitter perk count (0/5)
    const IncLimbsplitterCountCall = (buttonColor, line) => {
        if (LimbsplitterLevel == 0) {
            setState({ Limbsplitter: buttonColor }); // Change the pressed button color back and forth
            setState({ LimbsplitterLine: line }); // Change the pressed button color back and forth
            IncrementCounter(1); // increment active perks by 1 on first click
            IncLimbsplitterCounter(1); // increment basic smith by 1 on first click
        } else if (LimbsplitterLevel == 3) {
            setState({ Limbsplitter: buttonColor }); // Change the line color back and forth
            setState({ LimbsplitterLine: line }); // Change the line color back and forth
            IncLimbsplitterCounter(1); // Increment by one so that it goes back to 0 
            DecrementCounter(3); // decrease active perks back down 3 because it is set back to 0

        } else {
            IncrementCounter(1);
            IncLimbsplitterCounter(1) // increment by 1 after it perk is active
        }

    }

    const IncDeepWoundsCounter = (numActiveDeepWounds) => {
        if (DeepWoundsLevel < 3) {
            SetDeepWoundsLevel(DeepWoundsLevel + numActiveDeepWounds)
        }
        else {
            SetDeepWoundsLevel(0) // return to 0 after the perk is maxed out
        }
    }

    // function to control the DeepWounds perk count (0/5)
    const IncDeepWoundsCountCall = (buttonColor, line) => {
        if (DeepWoundsLevel == 0) {
            setState({ DeepWounds: buttonColor }); // Change the pressed button color back and forth
            setState({ DeepWoundsLine: line }); // Change the line color back and forth
            IncrementCounter(1); // increment active perks by 1 on first click
            IncDeepWoundsCounter(1); // increment basic smith by 1 on first click
        } else if (DeepWoundsLevel == 3) {
            setState({ DeepWounds: buttonColor }); // Change the pressed button color back and forth
            setState({ DeepWoundsLine: line }); // Change the line color back and forth
            IncDeepWoundsCounter(1); // Increment by one so that it goes back to 0 
            DecrementCounter(3); // decrease active perks back down 3 because it is set back to 0

        } else {
            IncrementCounter(1);
            IncDeepWoundsCounter(1) // increment by 1 after it perk is active
        }

    }
    const IncSkullCrusherCounter = (numActiveSkullCrusher) => {
        if (SkullCrusherLevel < 3) {
            SetSkullCrusherLevel(SkullCrusherLevel + numActiveSkullCrusher)
        }
        else {
            SetSkullCrusherLevel(0) // return to 0 after the perk is maxed out
        }
    }

    // function to control the SkullCrusher perk count (0/5)
    const IncSkullCrusherCountCall = (buttonColor, line) => {
        if (SkullCrusherLevel == 0) {
            setState({ SkullCrusher: buttonColor }); // Change the pressed button color back and forth
            setState({ SkullCrusherLine: line }); // Change the pressed button color back and forth
            IncrementCounter(1); // increment active perks by 1 on first click
            IncSkullCrusherCounter(1); // increment basic smith by 1 on first click
        } else if (SkullCrusherLevel == 3) {
            setState({ SkullCrusher: buttonColor }); // Change the pressed button color back and forth
            setState({ SkullCrusherLine: line }); // Change the pressed button color back and forth
            IncSkullCrusherCounter(1); // Increment by one so that it goes back to 0 
            DecrementCounter(3); // decrease active perks back down 3 because it is set back to 0

        } else {
            IncrementCounter(1);
            IncSkullCrusherCounter(1) // increment by 1 after it perk is active
        }

    }
    const CheckIfChampionsStancePressed = (button, line) => {
        if (state.Barbarian == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ Barbarian: button });
            setState({ BarbarianLine: line });
            setState({ ChampionsStance: button });
            setState({ ChampionsStanceLine: line });
            IncrementCounter(2);
            if (state.Barbarian == 0) {
                SetBarbarianLevel(1);
            }
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
    const CheckIfDevastatingBlowPressed = (button, line, line2) => {
        if (state.ChampionsStance == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ Barbarian: button });
            setState({ DevastatingBlow: button });
            setState({ ChampionsStance: button });
            setState({ DevastatingBlowLine: line });
            setState({ ChampionsStanceLine: line });
            if (state.Barbarian == 0) {
                SetBarbarianLevel(1);
            }
            if (state.Barbarian == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.Sweep == 1 && state.CriticalCharge == 0) {
            // Do nothing....must un-select nodes above it first
        } else if (state.Sweep == 1 && state.CriticalCharge == 1) {
            setState({ DevastatingBlowLine: line });
            setState({ DevastatingBlow: button }); // Change the pressed button color back and forth
            setState({ SweepDevLine: line2 });
            state.DevastatingBlow == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
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
            if (state.Barbarian == 0) {
                SetBarbarianLevel(1);
            }
            if (state.Barbarian == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.Sweep == 1 && state.DevastatingBlow == 0) {
            // Do nothing....must un-select nodes above it first
        } else if (state.Sweep == 1 && state.DevastatingBlow == 1) {
            setState({ CriticalChargeLine: line });
            setState({ CriticalCharge: button }); // Change the pressed button color back and forth
            setState({ SweepLine: line }); // Change the pressed button color back and forth
            state.CriticalCharge == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
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
            if (state.Barbarian == 0) {
                SetBarbarianLevel(1);
            }
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
    const CheckIfWarmasterPressed = (button, line, line2) => {
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
            if (state.Barbarian == 0) {
                SetBarbarianLevel(1);
            }
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
        else if (state.Sweep == 0 && state.CriticalCharge == 1 && state.DevastatingBlow == 1) {
            setState({ Sweep: button });
            setState({ SweepLine: line });
            setState({ SweepDevLine: line });
            setState({ Warmaster: button });
            setState({ WarmasterLine: line });
            IncrementCounter(2);
            if (state.Barbarian == 0) {
                SetBarbarianLevel(1);
            }
        }
        else if (state.Sweep == 0 && state.CriticalCharge == 1) {
            setState({ Sweep: button });
            setState({ SweepLine: line });
            setState({ Warmaster: button });
            setState({ WarmasterLine: line });
            IncrementCounter(2);
            if (state.Barbarian == 0) {
                SetBarbarianLevel(1);
            }
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
            setState({ Barbarian: button });
            setState({ DeepWounds: button });
            setState({ DeepWoundsLine: line });
            IncrementCounter(2);
            SetDeepWoundsLevel(1);
            SetBarbarianLevel(1);
        }
        else {
            IncDeepWoundsCountCall(button, line);
        }
    };
    const CheckIfSkullCrusherPressed = (button, line) => {
        if (state.Barbarian == 0) {
            setState({ Barbarian: button });
            setState({ SkullCrusher: button });
            setState({ SkullCrusherLine: line });
            IncrementCounter(2);
            SetSkullCrusherLevel(1);
            SetBarbarianLevel(1);
        }
        else {
            IncSkullCrusherCountCall(button, line);
        }
    };
    const CheckIfLimbsplitterPressed = (button, line) => {
        if (state.Barbarian == 0) {
            setState({ Barbarian: button });
            setState({ Limbsplitter: button });
            setState({ LimbsplitterLine: line });
            IncrementCounter(2);
            SetLimbsplitterLevel(1);
            SetBarbarianLevel(1);
        }
        else {
            IncLimbsplitterCountCall(button, line);
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
                    onLongPress={() => navigation.navigate("BarbarianModal")}
                    onPress={() => {
                        CheckIfBarbarianPressed(
                            state.Barbarian == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.BarbarianText}>
                <Text style={styles.PerkText}>Barbarian({BarbarianLevel}/5)</Text>
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
                    onLongPress={() => navigation.navigate("LimbsplitterModal")}
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
                <Text style={styles.PerkText}>Limbsplitter({LimbsplitterLevel}/3)</Text>
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
                    onLongPress={() => navigation.navigate("ChampionsStanceModal")}
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
                    onLongPress={() => navigation.navigate("DevastatingBlowModal")}
                    onPress={() => {
                        CheckIfDevastatingBlowPressed(
                            state.DevastatingBlow == 0 ? 1 : 0,
                            state.DevastatingBlowLine == 'white' ? 'gold' : 'white',
                            state.SweepDevLine == 'white' ? 'gold' : 'white'
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
                    onLongPress={() => navigation.navigate("SweepModal")}
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
                    onLongPress={() => navigation.navigate("WarmasterModal")}
                    onPress={() => {
                        CheckIfWarmasterPressed(
                            state.Warmaster == 0 ? 1 : 0,
                            state.WarmasterLine == 'white' ? 'gold' : 'white',
                            state.SweepDevLine == 'white' ? 'gold' : 'white'
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
                    onLongPress={() => navigation.navigate("DeepWoundsModal")}
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
                <Text style={styles.PerkText}>Deep Wounds({DeepWoundsLevel}/3)</Text>
            </View>
            <View title='SkullCrusher Blue' style={{
                position: 'absolute',
                left: "80%",
                top: "58%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='SkullCrusher Gold' style={{
                position: 'absolute',
                left: "80%",
                top: "58%",
                zIndex: 8,
                opacity: state.SkullCrusher

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("SkullCrusherModal")}
                    onPress={() => {
                        CheckIfSkullCrusherPressed(
                            state.SkullCrusher == 0 ? 1 : 0,
                            state.SkullCrusherLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.SkullCrusherText}>
                <Text style={styles.PerkText}>Skull Crusher({SkullCrusherLevel}/3)</Text>
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
                    onLongPress={() => navigation.navigate("CriticalChargeModal")}
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
                    stroke={state.SkullCrusherLine}
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
    SkullCrusherText: {
        position: 'absolute',
        left: "75%",
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