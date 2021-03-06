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
const lineStrokeWidth = '2';

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
    const navigation = useNavigation();
    const [ActivePerks, SetActivePerks] = useState(0);
    const [RequiredLevel, SetRequiredLevel] = useState(0);
    const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);
    const [state, setState] = useSetState({
        noviceIllus: 0,
        illusionDual: 0,
        illusionDualLine: 'white',
        apprenticeIllus: 0,
        apprenticeIllusLine: 'white',
        adeptIllus: 0,
        adeptIllusLine: 'white',
        expertIllus: 0,
        expertIllusLine: 'white',
        masterIllus: 0,
        masterIllusLine: 'white',
        hypnoticGaze: 0,
        hypnoticGazeLine: 'white',
        aspectOfTerror: 0,
        aspectOfTerrorLine: 'white',
        rage: 0,
        rageLine: 'white',
        animage: 0,
        animageLine: 'white',
        kindredMage: 0,
        kindredMageLine: 'white',
        quietCasting: 0,
        quietCastingLine: 'white',
        masterOfMind: 0,
        masterOfMindLine: 'white',
        masterOfMindLine2: 'white',
    });

    let resetAllTrees;
    const resetIllusionPerks = () => {
        setState({ noviceIllus: 0 });
        setState({ illusionDual: 0 });
        setState({ illusionDualLine: 'white' });
        setState({ apprenticeIllus: 0 });
        setState({ apprenticeIllusLine: 'white' });
        setState({ adeptIllus: 0 });
        setState({ adeptIllusLine: 'white' });
        setState({ expertIllus: 0 });
        setState({ expertIllusLine: 'white' });
        setState({ masterIllus: 0 });
        setState({ masterIllusLine: 'white' });
        setState({ hypnoticGaze: 0 });
        setState({ hypnoticGazeLine: 'white' });
        setState({ aspectOfTerror: 0 });
        setState({ aspectOfTerrorLine: 'white' });
        setState({ rage: 0 });
        setState({ rageLine: 'white' });
        setState({ animage: 0 });
        setState({ animageLine: 'white' });
        setState({ kindredMage: 0 });
        setState({ kindredMageLine: 'white' });
        setState({ quietCasting: 0 });
        setState({ quietCastingLine: 'white' });
        setState({ masterOfMind: 0 });
        setState({ masterOfMindLine: 'white' });
        setState({ masterOfMindLine2: 'white' });
        SetRequiredLevel(0);
    }

    const resetActivePerks = () => {
        resetIllusionPerks();
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
            resetIllusionPerks();
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

    const CheckLevel = useCallback(() => {
        if (state.masterIllus == 1) {
            TrackLevel(100);
        } else if (state.masterOfMind == 1) {
            TrackLevel(90);
        } else if (state.expertIllus == 1) {
            TrackLevel(75);
        } else if (state.rage == 1) {
            TrackLevel(70);
        } else if (state.adeptIllus == 1 || state.quietCasting == 1 || state.aspectOfTerror == 1) {
            TrackLevel(50);
        } else if (state.kindredMage == 1) {
            TrackLevel(40);
        } else if (state.hypnoticGaze == 1) {
            TrackLevel(30);
        } else if (state.apprenticeIllus == 1) {
            TrackLevel(25);
        } else if (state.animage == 1 || state.illusionDual == 1) {
            TrackLevel(20);
        } else if (state.noviceIllus == 1) {
            TrackLevel(0);
        }
    }, [state]);

    useEffect(() => {
        CheckLevel();
    }, [CheckLevel]);

    const CheckIfNoviceIllusPressed = (button) => {
        if (
            state.illusionDual == 1 ||
            state.apprenticeIllus == 1 ||
            state.hypnoticGaze == 1 ||
            state.animage == 1
        ) {
            // Do nothing....must un-select nodes above it first
        }
        else {
            setState({ noviceIllus: button }); // Change button color back and forth
            state.noviceIllus == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfillusionDualPressed = (button, line) => {
        if (state.noviceIllus == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceIllus: button });
            setState({ illusionDual: button });
            setState({ illusionDualLine: line });
            IncrementCounter(2);
        } else {
            setState({ illusionDualLine: line });
            setState({ illusionDual: button }); // Change the pressed button color back and forth
            state.illusionDual == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfApprenticeIllusPressed = (buttonColor, lineColor) => {
        if (state.noviceIllus == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceIllus: buttonColor });
            setState({ apprenticeIllus: buttonColor });
            setState({ apprenticeIllusLine: lineColor });
            IncrementCounter(2);
        } else if (state.adeptIllus == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ apprenticeIllusLine: lineColor });
            setState({ apprenticeIllus: buttonColor }); // Change button color back and forth
            state.apprenticeIllus == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfAdeptIllusPressed = (buttonColor, lineColor) => {
        if (state.apprenticeIllus == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceIllus: buttonColor });
            setState({ apprenticeIllus: buttonColor });
            setState({ apprenticeIllusLine: lineColor });
            setState({ adeptIllus: buttonColor });
            setState({ adeptIllusLine: lineColor });

            if (state.noviceIllus == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.expertIllus == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ adeptIllusLine: lineColor });
            setState({ adeptIllus: buttonColor }); // Change the pressed button color back and forth
            state.adeptIllus == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfExpertIllusPressed = (buttonColor, lineColor) => {
        if (state.adeptIllus == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceIllus: buttonColor });
            setState({ apprenticeIllus: buttonColor });
            setState({ adeptIllus: buttonColor });
            setState({ expertIllus: buttonColor });
            setState({ apprenticeIllusLine: lineColor });
            setState({ adeptIllusLine: lineColor });
            setState({ expertIllusLine: lineColor });

            if (state.apprenticeIllus == 1) {
                IncrementCounter(2);
            } else if (state.noviceIllus == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        }
        else if (state.masterIllus == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ expertIllusLine: lineColor });
            setState({ expertIllus: buttonColor }); // Change the pressed button color back and forth
            state.expertIllus == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfMasterIllusPressed = (buttonColor, lineColor) => {
        if (state.expertIllus == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceIllus: buttonColor });
            setState({ apprenticeIllus: buttonColor });
            setState({ adeptIllus: buttonColor });
            setState({ expertIllus: buttonColor });
            setState({ masterIllus: buttonColor });
            setState({ apprenticeIllusLine: lineColor });
            setState({ adeptIllusLine: lineColor });
            setState({ expertIllusLine: lineColor });
            setState({ masterIllusLine: lineColor });
            if (state.adeptIllus == 1) {
                IncrementCounter(2);
            } else if (state.apprenticeIllus == 1) {
                IncrementCounter(3);
            } else if (state.noviceIllus == 1) {
                IncrementCounter(4);
            } else {
                IncrementCounter(5);
            }
        } else {
            setState({ masterIllusLine: lineColor });
            setState({ masterIllus: buttonColor }); // Change the pressed button color back and forth
            state.masterIllus == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfHypnoticGazePressed = (buttonColor, lineColor) => {
        if (state.noviceIllus == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceIllus: buttonColor });
            setState({ hypnoticGaze: buttonColor });
            setState({ hypnoticGazeLine: lineColor });
            IncrementCounter(2);

        } else if (state.aspectOfTerror == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ hypnoticGazeLine: lineColor });
            setState({ hypnoticGaze: buttonColor }); // Change the pressed button color back and forth
            state.hypnoticGaze == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfAspectOfTerrorPressed = (buttonColor, lineColor) => {
        if (state.hypnoticGaze == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceIllus: buttonColor });
            setState({ hypnoticGaze: buttonColor });
            setState({ aspectOfTerror: buttonColor });
            setState({ hypnoticGazeLine: lineColor });
            setState({ aspectOfTerrorLine: lineColor });
            if (state.noviceIllus == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.rage == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ aspectOfTerrorLine: lineColor });
            setState({ aspectOfTerror: buttonColor }); // Change the pressed button color back and forth
            state.aspectOfTerror == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfRagePressed = (buttonColor, lineColor) => {
        if (state.aspectOfTerror == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceIllus: buttonColor });
            setState({ hypnoticGaze: buttonColor });
            setState({ aspectOfTerror: buttonColor });
            setState({ rage: buttonColor });
            setState({ hypnoticGazeLine: lineColor });
            setState({ aspectOfTerrorLine: lineColor });
            setState({ rageLine: lineColor });
            if (state.hypnoticGaze == 1) {
                IncrementCounter(2);
            } else if (state.noviceIllus == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else if (state.masterOfMind == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ rageLine: lineColor });
            setState({ rage: buttonColor }); // Change the pressed button color back and forth
            state.rage == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfAnimagePressed = (buttonColor, lineColor) => {
        if (state.noviceIllus == 0) {
            setState({ noviceIllus: buttonColor });
            setState({ animage: buttonColor });
            setState({ animageLine: lineColor });
            IncrementCounter(2);

        } else if (state.kindredMage == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ animageLine: lineColor });
            setState({ animage: buttonColor });
            state.animage == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfKindredPressed = (buttonColor, lineColor) => {
        if (state.animage == 0) {
            setState({ noviceIllus: buttonColor });
            setState({ animage: buttonColor });
            setState({ kindredMage: buttonColor });
            setState({ animageLine: lineColor });
            setState({ kindredMageLine: lineColor });
            if (state.noviceIllus == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.quietCasting == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ kindredMageLine: lineColor });
            setState({ kindredMage: buttonColor });
            state.kindredMage == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfQuietCastingPressed = (buttonColor, lineColor) => {
        if (state.kindredMage == 0) {
            setState({ noviceIllus: buttonColor });
            setState({ animage: buttonColor });
            setState({ kindredMage: buttonColor });
            setState({ quietCasting: buttonColor });
            setState({ animageLine: lineColor });
            setState({ kindredMageLine: lineColor });
            setState({ quietCastingLine: lineColor });
            if (state.masterOfMind == 1) {
                setState({ masterOfMindLine2: lineColor });
            }
            if (state.animage == 1) {
                IncrementCounter(2);
            } else if (state.noviceIllus == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else {
            setState({ quietCastingLine: lineColor });
            setState({ quietCasting: buttonColor });
            state.quietCasting == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
            if (state.masterOfMind == 1) {
                setState({ masterOfMindLine2: lineColor });
            }
        }
    };

    const CheckIfMasterOfMindPressed = (buttonColor, lineColor) => {
        if (state.rage == 0) {
            setState({ noviceIllus: buttonColor });
            setState({ hypnoticGaze: buttonColor });
            setState({ aspectOfTerror: buttonColor });
            setState({ rage: buttonColor });
            setState({ masterOfMind: buttonColor });
            setState({ hypnoticGazeLine: lineColor });
            setState({ aspectOfTerrorLine: lineColor });
            setState({ rageLine: lineColor });
            setState({ masterOfMindLine: lineColor });
            if (state.quietCasting == 1) {
                setState({ masterOfMindLine2: lineColor });
            }
            if (state.aspectOfTerror == 1) {
                IncrementCounter(2);
            } else if (state.hypnoticGaze == 1) {
                IncrementCounter(3);
            } else if (state.noviceIllus == 1) {
                IncrementCounter(4);
            } else {
                IncrementCounter(5);
            }
        } else {
            setState({ masterOfMindLine: lineColor });
            setState({ masterOfMind: buttonColor });
            state.masterOfMind == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
            if (state.quietCasting == 1) {
                setState({ masterOfMindLine2: lineColor });
            }
        }
    };

    return (
        <View style={{ zIndex: 2 }}>
            <View
                style={styles.resetButtonContainer}>
                <TouchableOpacity style={styles.resetButton} onPress={() => resetActivePerks()}>
                    <Text style={{ color: "white", fontWeight: "bold", }}> Reset Illusion Perks</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.topText}>
                <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
                <Text style={styles.HomeScreenText}>Required Level: {RequiredLevel} </Text>
            </View>
            <View title='Novice Illusion Blue' style={{
                position: 'absolute',
                left: "40%",
                top: "80%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Novice Illusion Gold' style={{
                position: 'absolute',
                left: "40%",
                top: "80%",
                zIndex: 8,
                opacity: state.noviceIllus

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("NoviceIllusionModal")}
                    onPress={() => {
                        CheckIfNoviceIllusPressed(
                            state.noviceIllus == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.NoviceIllusionText}>
                <Text style={styles.PerkText}>Novice Illusion</Text>
            </View>
            <View title='Illusion Dual Casting Blue' style={{
                position: 'absolute',
                left: "-1%",
                top: "75%",
                zIndex: 8,

            }}>

                <StarIconBlue />
            </View>
            <View title='Illusion Dual Casting Gold' style={{
                position: 'absolute',
                left: "-1%",
                top: "75%",
                zIndex: 8,
                opacity: state.illusionDual

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("IllusionDualCastingModal")}
                    onPress={() => {
                        CheckIfillusionDualPressed(
                            state.illusionDual == 0 ? 1 : 0,
                            state.illusionDualLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.IllusionDualCastingText}>
                <Text style={styles.PerkText}>Illusion Dual Casting</Text>
            </View>
            <View title='Apprentice Illusion Blue' style={{
                position: 'absolute',
                left: "5%",
                top: "60%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Apprentice Illusion Gold' style={{
                position: 'absolute',
                left: "5%",
                top: "60%",
                zIndex: 8,
                opacity: state.apprenticeIllus

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ApprenticeIllusionModal")}
                    onPress={() => {
                        CheckIfApprenticeIllusPressed(
                            state.apprenticeIllus == 0 ? 1 : 0,
                            state.apprenticeIllusLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ApprenticeIllusionText}>
                <Text style={styles.PerkText}>Apprentice Illusion</Text>
            </View>
            <View title='Adept Illusion Blue' style={{
                position: 'absolute',
                left: "11%",
                top: "43%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Adept Illusion Gold' style={{
                position: 'absolute',
                left: "11%",
                top: "43%",
                zIndex: 8,
                opacity: state.adeptIllus

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("AdeptIllusionModal")}
                    onPress={() => {
                        CheckIfAdeptIllusPressed(
                            state.adeptIllus == 0 ? 1 : 0,
                            state.adeptIllusLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AdeptIllusionText}>
                <Text style={styles.PerkText}>Adept Illusion</Text>
            </View>
            <View title='expertIllus Blue' style={{
                position: 'absolute',
                left: "5%",
                top: "32%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Expert Illusion Gold' style={{
                position: 'absolute',
                left: "5%",
                top: "32%",
                zIndex: 8,
                opacity: state.expertIllus

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ExpertIllusionModal")}
                    onPress={() => {
                        CheckIfExpertIllusPressed(
                            state.expertIllus == 0 ? 1 : 0,
                            state.expertIllusLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ExpertIllusText}>
                <Text style={styles.PerkText}>Expert Illusion</Text>
            </View>

            <View title='Master Illusion Blue' style={{
                position: 'absolute',
                left: "20%",
                top: "20%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Master Illusion Gold' style={{
                position: 'absolute',
                left: "20%",
                top: "20%",
                zIndex: 8,
                opacity: state.masterIllus

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("MasterIllusionModal")}
                    onPress={() => {
                        CheckIfMasterIllusPressed(
                            state.masterIllus == 0 ? 1 : 0,
                            state.masterIllusLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.MasterIllusText}>
                <Text style={styles.PerkText}>Master Illusion</Text>
            </View>

            <View title='Hypnotic Gaze Blue' style={{
                position: 'absolute',
                left: "38%",
                top: "59%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Hypnotic Gaze Gold' style={{
                position: 'absolute',
                left: "38%",
                top: "59%",
                zIndex: 8,
                opacity: state.hypnoticGaze

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("HypnoticGazeModal")}
                    onPress={() => {
                        CheckIfHypnoticGazePressed(
                            state.hypnoticGaze == 0 ? 1 : 0,
                            state.hypnoticGazeLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.HypnoticGazeText}>
                <Text style={styles.PerkText}>Hypnotic Gaze</Text>
            </View>

            <View title='Aspect of Terror Blue' style={{
                position: 'absolute',
                left: "29%",
                top: "40%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Aspect of Terror Gold' style={{
                position: 'absolute',
                left: "29%",
                top: "40%",
                zIndex: 8,
                opacity: state.aspectOfTerror

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("AspectOfTerrorModal")}
                    onPress={() => {
                        CheckIfAspectOfTerrorPressed(
                            state.aspectOfTerror == 0 ? 1 : 0,
                            state.aspectOfTerrorLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AspectOfTerrorText}>
                <Text style={styles.PerkText}>Aspect of Terror</Text>
            </View>


            <View title='Rage Blue' style={{
                position: 'absolute',
                left: "44%",
                top: "34%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Rage Gold' style={{
                position: 'absolute',
                left: "44%",
                top: "34%",
                zIndex: 8,
                opacity: state.rage

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("RageModal")}
                    onPress={() => {
                        CheckIfRagePressed(
                            state.rage == 0 ? 1 : 0,
                            state.rageLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.RageText}>
                <Text style={styles.PerkText}>Rage</Text>
            </View>

            <View title='Master of Mind Blue' style={{
                position: 'absolute',
                left: "52%",
                top: "20%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Master of Mind Gold' style={{
                position: 'absolute',
                left: "52%",
                top: "20%",
                zIndex: 8,
                opacity: state.masterOfMind

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("MasterOfTheMindModal")}
                    onPress={() => {
                        CheckIfMasterOfMindPressed(
                            state.masterOfMind == 0 ? 1 : 0,
                            state.masterOfMindLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.MasterOfMindText}>
                <Text style={styles.PerkText}>Master of the Mind</Text>
            </View>

            <View title='Animage Blue' style={{
                position: 'absolute',
                left: "78%",
                top: "70%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Animage Gold' style={{
                position: 'absolute',
                left: "78%",
                top: "70%",
                zIndex: 8,
                opacity: state.animage

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("AnimageModal")}
                    onPress={() => {
                        CheckIfAnimagePressed(
                            state.animage == 0 ? 1 : 0,
                            state.animageLine == 'white' ? 'gold' : 'white',
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AnimageText}>
                <Text style={styles.PerkText}>Animage</Text>
            </View>


            <View title='Kindred Mage Blue' style={{
                position: 'absolute',
                left: "65%",
                top: "52%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Kindred Mage Gold' style={{
                position: 'absolute',
                left: "65%",
                top: "52%",
                zIndex: 8,
                opacity: state.kindredMage

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("KindredMageModal")}
                    onPress={() => {
                        CheckIfKindredPressed(
                            state.kindredMage == 0 ? 1 : 0,
                            state.kindredMageLine == 'white' ? 'gold' : 'white',
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.KindredMageText}>
                <Text style={styles.PerkText}>Kindred Mage</Text>
            </View>

            <View title='Quiet Casting Blue' style={{
                position: 'absolute',
                left: "60%",
                top: "34%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Quiet Casting Gold' style={{
                position: 'absolute',
                left: "60%",
                top: "34%",
                zIndex: 8,
                opacity: state.quietCasting

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("QuietCastingModal")}
                    onPress={() => {
                        CheckIfQuietCastingPressed(
                            state.quietCasting == 0 ? 1 : 0,
                            state.quietCastingLine == 'white' ? 'gold' : 'white',
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.QuietCastingText}>
                <Text style={styles.PerkText}>Quiet Casting</Text>
            </View>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} >

                <Line
                    x1="48%"
                    y1="85%"
                    x2="11%"
                    y2="80%"
                    stroke={state.illusionDualLine}
                    strokeWidth={lineStrokeWidth}
                />

                <Line
                    x1="50%"
                    y1="85%"
                    x2="17%"
                    y2="66%"
                    stroke={state.apprenticeIllusLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="17%"
                    y1="65%"
                    x2="22%"
                    y2="48%"
                    stroke={state.adeptIllusLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="22%"
                    y1="48%"
                    x2="16%"
                    y2="37%"
                    stroke={state.expertIllusLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="17%"
                    y1="37%"
                    x2="32%"
                    y2="25%"
                    stroke={state.masterIllusLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="51%"
                    y1="85%"
                    x2="49%"
                    y2="65%"
                    stroke={state.hypnoticGazeLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="50%"
                    y1="65%"
                    x2="40%"
                    y2="45%"
                    stroke={state.aspectOfTerrorLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="40%"
                    y1="45%"
                    x2="54%"
                    y2="39%"
                    stroke={state.rageLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="55%"
                    y1="38%"
                    x2="63%"
                    y2="25%"
                    stroke={state.masterOfMindLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="51%"
                    y1="85%"
                    x2="90%"
                    y2="75%"
                    stroke={state.animageLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="89%"
                    y1="75%"
                    x2="77%"
                    y2="58%"
                    stroke={state.kindredMageLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="76%"
                    y1="57%"
                    x2="71%"
                    y2="40%"
                    stroke={state.quietCastingLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="71%"
                    y1="39%"
                    x2="63%"
                    y2="25%"
                    stroke={state.masterOfMindLine2}
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
    NoviceIllusionText: {
        position: 'absolute',
        left: "56%",
        top: "85%",
        zIndex: 10,
    },
    IllusionDualCastingText: {
        position: 'absolute',
        left: "2%",
        top: "83%",
        zIndex: 10,
    },
    ApprenticeIllusionText: {
        position: 'absolute',
        left: "4%",
        top: "68%",
        zIndex: 10,
    },
    AdeptIllusionText: {
        position: 'absolute',
        left: "2%",
        top: "50%",
        zIndex: 10,
    },
    ExpertIllusText: {
        position: 'absolute',
        left: "2%",
        top: "40%",
        zIndex: 10,
    },
    MasterIllusText: {
        position: 'absolute',
        left: "7%",
        top: "25%",
        zIndex: 10,
    },
    HypnoticGazeText: {
        position: 'absolute',
        left: "53%",
        top: "64%",
        zIndex: 10,
    },
    AspectOfTerrorText: {
        position: 'absolute',
        left: "45%",
        top: "45%",
        zIndex: 10,
    },
    RageText: {
        position: 'absolute',
        left: "42%",
        top: "37%",
        zIndex: 10,
    },
    MasterOfMindText: {
        position: 'absolute',
        left: "64%",
        top: "21%",
        zIndex: 10,
    },

    AnimageText: {
        position: 'absolute',
        left: "71%",
        top: "73%",
        zIndex: 10,
    },
    KindredMageText: {
        position: 'absolute',
        left: "77%",
        top: "53%",
        zIndex: 10,
    },
    QuietCastingText: {
        position: 'absolute',
        left: "72%",
        top: "35%",
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

export default IllusionTree;