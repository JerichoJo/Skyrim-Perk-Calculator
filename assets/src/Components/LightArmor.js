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

const LightArmorTree = () => {
    const navigation = useNavigation();
    const [ActivePerks, SetActivePerks] = useState(0);
    const [RequiredLevel, SetRequiredLevel] = useState(0);
    const [AgileDefenderLevel, SetAgileDefenderLevel] = useState(0);
    const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);
    const [state, setState] = useSetState({
        agileDefender: 0,
        customeFit: 0,
        customeFitLine: 'white',
        unhindered: 0,
        unhinderedLine: 'white',
        windWalker: 0,
        windWalkerLine: 'white',
        matchingSet: 0,
        matchingSetLine: 'white',
        deftMovement: 0,
        deftMovementLine: 'white',
        deftMovementLine2: 'white'

    });

    let resetAllTrees;
    const resetLightArmorPerks = () => {
        setState({ agileDefender: 0 });
        setState({ customeFit: 0 });
        setState({ customeFitLine: 'white' });
        setState({ unhindered: 0 });
        setState({ unhinderedLine: 'white' });
        setState({ windWalker: 0 });
        setState({ windWalkerLine: 'white' });
        setState({ matchingSet: 0 });
        setState({ matchingSetLine: 'white' });
        setState({ deftMovement: 0 });
        setState({ deftMovementLine: 'white' });
        setState({ deftMovementLine2: 'white' });
        SetRequiredLevel(0);
        SetAgileDefenderLevel(0);
    }

    const resetActivePerks = () => {
        resetLightArmorPerks();
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
            resetLightArmorPerks();
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

    const IncAgileDefenderCounter = (numActiveAgileDefender) => {
        if (AgileDefenderLevel < 5) {
            SetAgileDefenderLevel(AgileDefenderLevel + numActiveAgileDefender)
        }
        else {
            SetAgileDefenderLevel(0) // return to 0 after the perk is maxed out
        }
    }

    // function to control the AgileDefender perk count (0/5)
    const IncAgileDefenderCall = (buttonColor) => {
        if (AgileDefenderLevel == 0) {
            setState({ agileDefender: buttonColor }); // Change the pressed button color back and forth
            IncrementCounter(1); // increment active perks by 1 on first click
            IncAgileDefenderCounter(1); // increment AgileDefender by 1 on first click
        } else if (AgileDefenderLevel == 5) {
            setState({ agileDefender: buttonColor }); // Change the pressed button color back and forth
            IncAgileDefenderCounter(1); // Increment by one so that it goes back to 0 
            DecrementCounter(5); // decrease active perks back down 3 because it is set back to 0
        } else {
            IncrementCounter(1);
            IncAgileDefenderCounter(1) // increment by 1 after it perk is active
        }

    }

    const TrackLevel = useCallback((level) => {
        SetRequiredLevel(level);
    }, []);

    const lineStrokeWidth = '2';

    const CheckLevel = useCallback(() => {
        if (state.deftMovement == 1) {
            TrackLevel(100);
        } else if (AgileDefenderLevel == 5) {
            TrackLevel(80);
        } else if (state.matchingSet == 1) {
            TrackLevel(70);
        } else if (state.windWalker == 1 || AgileDefenderLevel == 4) {
            TrackLevel(60);
        } else if (state.unhindered == 1) {
            TrackLevel(50);
        } else if (AgileDefenderLevel == 3) {
            TrackLevel(40);
        } else if (state.customeFit == 1) {
            TrackLevel(30);
        } else if (AgileDefenderLevel == 2) {
            TrackLevel(20);
        } else if (AgileDefenderLevel == 1) {
            TrackLevel(0);
        }
    }, [state, AgileDefenderLevel]);

    useEffect(() => {
        CheckLevel();
    }, [CheckLevel]);

    const CheckIfAgileDefenderPressed = (buttonColor) => {
        if (
            state.customeFit == 1
        ) {
            // Do nothing....must un-select nodes above it first
            if (AgileDefenderLevel == 5) {
                DecrementCounter(4); // decrease active perks back down 4 because it is set back to 1
                SetAgileDefenderLevel(1);

            } else {
                IncrementCounter(1);
                IncAgileDefenderCounter(1) // increment by 1 after it perk is active
            }
        }
        else {
            IncAgileDefenderCall(buttonColor);
        }
    };

    const CheckIfCustomeFitPressed = (buttonColor, lineColor) => {
        if (state.agileDefender == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ agileDefender: buttonColor });
            setState({ customeFit: buttonColor });
            setState({ customeFitLine: lineColor });
            if (state.agileDefender == 0) {
                SetAgileDefenderLevel(1);
            }
            IncrementCounter(2);
        } else if (state.unhindered == 1 || state.matchingSet == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ customeFitLine: lineColor });
            setState({ customeFit: buttonColor }); // Change the pressed button color back and forth
            state.customeFit == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfUnhinderedPressed = (buttonColor, lineColor) => {
        if (state.customeFit == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ agileDefender: buttonColor });
            setState({ customeFit: buttonColor });
            setState({ unhindered: buttonColor });
            setState({ customeFitLine: lineColor });
            setState({ unhinderedLine: lineColor });

            if (state.agileDefender == 0) {
                SetAgileDefenderLevel(1);
            }
            if (state.agileDefender == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.windWalker == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ unhinderedLine: lineColor });
            setState({ unhindered: buttonColor }); // Change button color back and forth
            state.unhindered == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfWindWalkerPressed = (buttonColor, lineColor) => {
        if (state.unhindered == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ agileDefender: buttonColor });
            setState({ customeFit: buttonColor });
            setState({ unhindered: buttonColor });
            setState({ windWalker: buttonColor });
            setState({ customeFitLine: lineColor });
            setState({ unhinderedLine: lineColor });
            setState({ windWalkerLine: lineColor });

            if (state.agileDefender == 0) {
                SetAgileDefenderLevel(1);
            }
            if (state.deftMovement == 1) {
                setState({ deftMovementLine: lineColor })
            }
            if (state.customeFit == 1) {
                IncrementCounter(2);
            } else if (state.agileDefender == 1) {
                IncrementCounter(3)
            } else {
                IncrementCounter(4);
            }
        } else if (state.deftMovement == 1 && state.matchingSet == 0) {
            // Do nothing....must un-select nodes above it first
        } else if (state.deftMovement == 1 && state.matchingSet == 1) {
            setState({ windWalkerLine: lineColor });
            setState({ windWalker: buttonColor }); // Change the pressed button color back and forth
            setState({ deftMovementLine: lineColor }); // Change the pressed button color back and forth
            state.windWalker == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        } else {
            setState({ windWalkerLine: lineColor });
            setState({ windWalker: buttonColor }); // Change the pressed button color back and forth
            state.windWalker == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfDeftMovementPressed = (buttonColor, lineColor, lineColor2) => {
        if (state.windWalker == 0 && state.matchingSet == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ agileDefender: buttonColor });
            setState({ customeFit: buttonColor });
            setState({ unhindered: buttonColor });
            setState({ windWalker: buttonColor });
            setState({ deftMovement: buttonColor });
            setState({ customeFitLine: lineColor });
            setState({ unhinderedLine: lineColor });
            setState({ windWalkerLine: lineColor });
            setState({ deftMovementLine: lineColor });

            if (state.agileDefender == 0) {
                SetAgileDefenderLevel(1);
            }
            if (state.unhindered == 1) {
                IncrementCounter(2);
            } else if (state.customeFit == 1) {
                IncrementCounter(3);
            } else if (state.agileDefender == 1) {
                IncrementCounter(4)
            } else {
                IncrementCounter(5);
            }
        } else if (state.windWalker == 1 && state.matchingSet == 0) {
            setState({ deftMovement: buttonColor });
            setState({ deftMovementLine: lineColor });
            state.deftMovement == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        } else if (state.windWalker == 0 && state.matchingSet == 1) {
            setState({ deftMovement: buttonColor });
            setState({ deftMovementLine2: lineColor2 });
            state.deftMovement == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        } else if (state.windWalker == 1 && state.matchingSet == 1) {
            setState({ deftMovement: buttonColor });
            setState({ deftMovementLine: lineColor });
            setState({ deftMovementLine2: lineColor2 });
            state.deftMovement == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfMatchingSetPressed = (buttonColor, lineColor, lineColor2) => {
        if (state.customeFit == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ agileDefender: buttonColor });
            setState({ customeFit: buttonColor });
            setState({ matchingSet: buttonColor });
            setState({ customeFitLine: lineColor });
            setState({ matchingSetLine: lineColor });

            if (state.agileDefender == 0) {
                SetAgileDefenderLevel(1);
            }
            if (state.agileDefender == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.deftMovement == 1 && state.windWalker == 0) {
            // Do nothing....must un-select nodes above it first
        } else if (state.deftMovement == 1 && state.windWalker == 1) {
            setState({ matchingSetLine: lineColor });
            setState({ matchingSet: buttonColor }); // Change the pressed button color back and forth
            setState({ deftMovementLine2: lineColor2 });
            state.matchingSet == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        } else {
            setState({ matchingSetLine: lineColor });
            setState({ matchingSet: buttonColor }); // Change the pressed button color back and forth
            state.matchingSet == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    return (
        <View style={{ zIndex: 2 }}>
            <View
                style={styles.resetButtonContainer}>
                <TouchableOpacity style={styles.resetButton} onPress={() => resetActivePerks()}>
                    <Text style={{ color: "white", fontWeight: "bold", }}> Reset Light Armor Perks</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.topText}>
                <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
                <Text style={styles.HomeScreenText}>Required Level: {RequiredLevel} </Text>
            </View>
            <View title='Agile Defender Blue' style={{
                position: 'absolute',
                left: "52%",
                top: "80%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Agile Defender Gold' style={{
                position: 'absolute',
                left: "52%",
                top: "80%",
                zIndex: 8,
                opacity: state.agileDefender

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("AgileDefenderModal")}
                    onPress={() => {
                        CheckIfAgileDefenderPressed(
                            state.agileDefender == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AgileDefenderText}>
                <Text style={styles.PerkText}>Agile Defender ({AgileDefenderLevel}/5)</Text>
            </View>
            <View title='Custom Fit Blue' style={{
                position: 'absolute',
                left: "40%",
                top: "60%",
                zIndex: 8,

            }}>

                <StarIconBlue />
            </View>
            <View title='Custom Fit Gold' style={{
                position: 'absolute',
                left: "40%",
                top: "60%",
                zIndex: 8,
                opacity: state.customeFit

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("CustomFitModal")}
                    onPress={() => {
                        CheckIfCustomeFitPressed(
                            state.customeFit == 0 ? 1 : 0,
                            state.customeFitLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.CustomFitText}>
                <Text style={styles.PerkText}>Custom Fit</Text>
            </View>
            <View title='Unhindered Blue' style={{
                position: 'absolute',
                left: "12%",
                top: "45%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Unhindered Gold' style={{
                position: 'absolute',
                left: "12%",
                top: "45%",
                zIndex: 8,
                opacity: state.unhindered

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("UnhinderedModal")}
                    onPress={() => {
                        CheckIfUnhinderedPressed(
                            state.unhindered == 0 ? 1 : 0,
                            state.unhinderedLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.UnhinderedText}>
                <Text style={styles.PerkText}>Unhindered</Text>
            </View>
            <View title='Wind Walker Blue' style={{
                position: 'absolute',
                left: "18%",
                top: "32%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Wind Walker Gold' style={{
                position: 'absolute',
                left: "18%",
                top: "32%",
                zIndex: 8,
                opacity: state.windWalker

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("WindWalkerModal")}
                    onPress={() => {
                        CheckIfWindWalkerPressed(
                            state.windWalker == 0 ? 1 : 0,
                            state.windWalkerLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.WindWalkerText}>
                <Text style={styles.PerkText}>Wind Walker</Text>
            </View>
            <View title='Matching Set Blue' style={{
                position: 'absolute',
                left: "58%",
                top: "29%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Matching Set Gold' style={{
                position: 'absolute',
                left: "58%",
                top: "29%",
                zIndex: 8,
                opacity: state.matchingSet

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("MatchingSetModal")}
                    onPress={() => {
                        CheckIfMatchingSetPressed(
                            state.matchingSet == 0 ? 1 : 0,
                            state.matchingSetLine == 'white' ? 'gold' : 'white',
                            state.deftMovementLine2 == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.MatchingSetText}>
                <Text style={styles.PerkText}>Matching Set</Text>
            </View>

            <View title='Deft Movement Blue' style={{
                position: 'absolute',
                left: "36%",
                top: "20%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Deft Movement Gold' style={{
                position: 'absolute',
                left: "36%",
                top: "20%",
                zIndex: 8,
                opacity: state.deftMovement

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("DeftMovementModal")}
                    onPress={() => {
                        CheckIfDeftMovementPressed(
                            state.deftMovement == 0 ? 1 : 0,
                            state.deftMovementLine == 'white' ? 'gold' : 'white',
                            state.deftMovementLine2 == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.DeftMovementText}>
                <Text style={styles.PerkText}>Deft Movement</Text>
            </View>

            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} >
                <Line
                    x1="63%"
                    y1="85%"
                    x2="51%"
                    y2="65%"
                    stroke={state.customeFitLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="51%"
                    y1="65%"
                    x2="23%"
                    y2="50%"
                    stroke={state.unhinderedLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="23%"
                    y1="50%"
                    x2="29%"
                    y2="38%"
                    stroke={state.windWalkerLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="28%"
                    y1="38%"
                    x2="47%"
                    y2="25%"
                    stroke={state.deftMovementLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="51%"
                    y1="65%"
                    x2="69%"
                    y2="34%"
                    stroke={state.matchingSetLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="69%"
                    y1="34%"
                    x2="47%"
                    y2="25%"
                    stroke={state.deftMovementLine2}
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
    AgileDefenderText: {
        position: 'absolute',
        left: "30%",
        top: "83%",
        zIndex: 10,
    },
    CustomFitText: {
        position: 'absolute',
        left: "31%",
        top: "65%",
        zIndex: 10,
    },
    UnhinderedText: {
        position: 'absolute',
        left: "2%",
        top: "50%",
        zIndex: 10,
    },
    WindWalkerText: {
        position: 'absolute',
        left: "8%",
        top: "37%",
        zIndex: 10,
    },
    MatchingSetText: {
        position: 'absolute',
        left: "74%",
        top: "34%",
        zIndex: 10,
    },
    DeftMovementText: {
        position: 'absolute',
        left: "51%",
        top: "23%",
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

export default LightArmorTree;