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

const HeavyArmor = () => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [ActivePerks, SetActivePerks] = useState(0);
    const [RequiredLevel, SetRequiredLevel] = useState(0);
    const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);
    const [JuggernautLevel, SetJuggernautLevel] = useState(0);


    const [state, setState] = useSetState({
        juggernaut: 0,
        fistsOfSteel: 0,
        fistsOfSteelLine: 'white',
        cushioned: 0,
        cushionedLine: 'white',
        conditioning: 0,
        conditioningLine: 'white',
        wellFitted: 0,
        wellFittedLine: 'white',
        towerOfStrength: 0,
        towerOfStrengthLine: 'white',
        matchingSet: 0,
        matchingSetLine: 'white',
        reflectBlows: 0,
        reflectBlowsLine: 'white',

    });

    let resetAllTrees;
    const resetHeavyArmorPerks = () => {
        setState({ juggernaut: 0 });
        setState({ fistsOfSteel: 0 });
        setState({ fistsOfSteelLine: 'white' });
        setState({ cushioned: 0 });
        setState({ cushionedLine: 'white' });
        setState({ conditioning: 0 });
        setState({ conditioningLine: 'white' });
        setState({ wellFitted: 0 });
        setState({ wellFittedLine: 'white' });
        setState({ towerOfStrength: 0 });
        setState({ towerOfStrengthLine: 'white' });
        setState({ matchingSet: 0 });
        setState({ matchingSetLine: 'white' });
        setState({ reflectBlows: 0 });
        setState({ reflectBlowsLine: 'white' });
        SetRequiredLevel(0);
    }

    const resetActivePerks = () => {
        resetHeavyArmorPerks();
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
            resetHeavyArmorPerks();
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
    const IncJuggernautCounter = (numActiveJuggernaut) => {
        if (JuggernautLevel < 5) {
            SetJuggernautLevel(JuggernautLevel + numActiveJuggernaut)
        }
        else {
            SetJuggernautLevel(0) // return to 0 after the perk is maxed out
        }
    }

    const IncJuggernautCountCall = (buttonColor) => {
        if (JuggernautLevel == 0) {
            setState({ juggernaut: buttonColor }); // Change the pressed button color back and forth
            IncrementCounter(1); // increment active perks by 1 on first click
            IncJuggernautCounter(1); // increment basic smith by 1 on first click
        } else if (JuggernautLevel == 5) {
            setState({ juggernaut: buttonColor }); // Change the pressed button color back and forth
            IncJuggernautCounter(1); // Increment by one so that it goes back to 0 
            DecrementCounter(5); // decrease active perks back down 3 because it is set back to 0

        } else {
            IncrementCounter(1);
            IncJuggernautCounter(1) // increment by 1 after it perk is active
        }

    }

    const TrackLevel = useCallback((level) => {
        SetRequiredLevel(level);
    }, []);

    const lineStrokeWidth = '2';

    const CheckLevel = useCallback(() => {
        if (state.dragonSmithing == 1) {
            TrackLevel(100);
        } else if (state.reflectBlows == 1) {
            TrackLevel(90);
        } else if (state.matchingSet == 1) {
            TrackLevel(80);
        } else if (state.conditioning == 1) {
            TrackLevel(70);
        } else if (state.arcaneSmithing == 1) {
            TrackLevel(60);
        } else if (state.cushioned == 1) {
            TrackLevel(50);
        } else if (state.fistsOfSteel == 1) {
            TrackLevel(30);
        } else if (state.juggernaut == 1) {
            TrackLevel(0);
        }
    }, [TrackLevel, state]);

    useEffect(() => {
        CheckLevel();
    }, [CheckLevel]);

    const CheckIfJuggernautPressed = (button) => {
        if (
            state.fistsOfSteel == 1 ||
            state.arcaneSmithing == 1 ||
            state.wellFitted == 1
        ) {
            // Do nothing....must un-select nodes above it first
            if (JuggernautLevel == 5) {
                DecrementCounter(4);
                SetJuggernautLevel(1)
            } else {
                IncrementCounter(1);
                IncJuggernautCounter(1);
            }
        }
        else {
            IncJuggernautCountCall(button);
        }
    };

    const CheckIfArcaneSmithPressed = (button, line) => {
        if (state.juggernaut == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ juggernaut: button });
            setState({ juggernautLine: line });
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

    const CheckIfFistsPressed = (buttonColor, lineColor) => {
        if (state.juggernaut == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ juggernaut: buttonColor });
            setState({ juggernautLine: lineColor });
            setState({ fistsOfSteel: buttonColor });
            setState({ fistsOfSteelLine: lineColor });

            IncrementCounter(2);
        } else if (state.cushioned == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ fistsOfSteelLine: lineColor });
            setState({ fistsOfSteel: buttonColor }); // Change button color back and forth
            state.fistsOfSteel == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfCushionedPressed = (buttonColor, lineColor) => {
        if (state.fistsOfSteel == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ juggernaut: buttonColor });
            setState({ cushioned: buttonColor });
            setState({ fistsOfSteel: buttonColor });
            setState({ cushionedLine: lineColor });
            setState({ fistsOfSteelLine: lineColor });
            if (state.juggernaut == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.conditioning == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ cushionedLine: lineColor });
            setState({ cushioned: buttonColor }); // Change the pressed button color back and forth
            state.cushioned == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfConditioningPressed = (buttonColor, lineColor) => {
        if (state.cushioned == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ conditioning: buttonColor });
            setState({ cushioned: buttonColor });
            setState({ fistsOfSteel: buttonColor });
            setState({ juggernaut: buttonColor });
            setState({ conditioningLine: lineColor });
            setState({ cushionedLine: lineColor });
            setState({ fistsOfSteelLine: lineColor });
            if (state.dragonSmithing == 1) {
                setState({ dragonSmithingLineLight: lineColor });
            }
            if (state.fistsOfSteel == 1) {
                IncrementCounter(2);
            } else if (state.juggernaut == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else {
            setState({ conditioningLine: lineColor });
            setState({ conditioning: buttonColor }); // Change the pressed button color back and forth
            state.conditioning == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
            if (state.dragonSmithing == 1) {
                setState({ dragonSmithingLineLight: lineColor });
            }

        }
    };
    const CheckIfWellFittedPressed = (buttonColor, lineColor) => {
        if (state.juggernaut == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ wellFitted: buttonColor });
            setState({ juggernaut: buttonColor });
            setState({ wellFittedLine: lineColor });
            IncrementCounter(2);
        } else if (state.towerOfStrength == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ wellFittedLine: lineColor });
            setState({ wellFitted: buttonColor }); // Change the pressed button color back and forth
            state.wellFitted == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfTowerOfStrengthPressed = (buttonColor, lineColor) => {
        if (state.wellFitted == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ towerOfStrength: buttonColor });
            setState({ wellFitted: buttonColor });
            setState({ juggernaut: buttonColor });
            setState({ towerOfStrengthLine: lineColor });
            setState({ wellFittedLine: lineColor });
            if (state.juggernaut == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.matchingSet == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ towerOfStrengthLine: lineColor });
            setState({ towerOfStrength: buttonColor }); // Change the pressed button color back and forth
            state.towerOfStrength == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfMatchingSetPressed = (buttonColor, lineColor) => {
        if (state.towerOfStrength == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ matchingSet: buttonColor });
            setState({ towerOfStrength: buttonColor });
            setState({ wellFitted: buttonColor });
            setState({ juggernaut: buttonColor });
            setState({ matchingSetLine: lineColor });
            setState({ towerOfStrengthLine: lineColor });
            setState({ wellFittedLine: lineColor });
            if (state.wellFitted == 1) {
                IncrementCounter(2);
            } else if (state.juggernaut == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else if (state.reflectBlows == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ matchingSetLine: lineColor });
            setState({ matchingSet: buttonColor }); // Change the pressed button color back and forth
            state.matchingSet == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfReflectBlowsPressed = (buttonColor, lineColor) => {
        if (state.matchingSet == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ reflectBlows: buttonColor });
            setState({ matchingSet: buttonColor });
            setState({ towerOfStrength: buttonColor });
            setState({ wellFitted: buttonColor });
            setState({ juggernaut: buttonColor });
            setState({ reflectBlowsLine: lineColor });
            setState({ matchingSetLine: lineColor });
            setState({ towerOfStrengthLine: lineColor });
            setState({ wellFittedLine: lineColor });
            if (state.towerOfStrength == 1) {
                IncrementCounter(2);
            } else if (state.wellFitted == 1) {
                IncrementCounter(3);
            } else if (state.juggernaut == 1) {
                IncrementCounter(4);
            } else {
                IncrementCounter(5);
            }
        } else if (state.dragonSmithing == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ reflectBlowsLine: lineColor });
            setState({ reflectBlows: buttonColor }); // Change the pressed button color back and forth
            state.reflectBlows == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfDragonSmithingPressed = (buttonColor, lineColor) => {
        if (state.reflectBlows == 0) {
            setState({ dragonSmithing: buttonColor });
            setState({ reflectBlows: buttonColor });
            setState({ matchingSet: buttonColor });
            setState({ towerOfStrength: buttonColor });
            setState({ wellFitted: buttonColor });
            setState({ juggernaut: buttonColor });
            setState({ dragonSmithingLine: lineColor });
            setState({ reflectBlowsLine: lineColor });
            setState({ matchingSetLine: lineColor });
            setState({ towerOfStrengthLine: lineColor });
            setState({ wellFittedLine: lineColor });
            if (state.conditioning == 1) {
                setState({ dragonSmithingLineLight: lineColor });
            }
            if (state.matchingSet == 1) {
                IncrementCounter(2);
            } else if (state.towerOfStrength == 1) {
                IncrementCounter(3);
            } else if (state.wellFitted == 1) {
                IncrementCounter(4);
            } else if (state.juggernaut == 1) {
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
            if (state.conditioning == 1) {
                setState({ dragonSmithingLineLight: lineColor });
            }
        }
    };

    return (
        <View style={{ zIndex: 2 }}>
            <View
                style={styles.resetButtonContainer}>
                <TouchableOpacity style={styles.resetButton} onPress={() => resetActivePerks()}>
                    <Text style={{ color: "white", fontWeight: "bold", }}> Reset Heavy Armor Perks</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.topText}>
                <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
                <Text style={styles.HomeScreenText}>Required Level: {RequiredLevel} </Text>
            </View>
            <View title='Juggernaut Blue' style={{
                position: 'absolute',
                left: "40%",
                top: "75%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Juggernaut Gold' style={{
                position: 'absolute',
                left: "40%",
                top: "75%",
                zIndex: 8,
                opacity: state.juggernaut

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("JuggernautModal")}
                    onPress={() => {
                        CheckIfJuggernautPressed(
                            state.juggernaut == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.JuggernautText}>
                <Text style={styles.PerkText}>Juggernaut({JuggernautLevel}/5)</Text>
            </View>

            <View title='Fists Blue' style={{
                position: 'absolute',
                left: "18%",
                top: "65%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Fists Gold' style={{
                position: 'absolute',
                left: "18%",
                top: "65%",
                zIndex: 8,
                opacity: state.fistsOfSteel

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("FistsOfSteelModal")}
                    onPress={() => {
                        CheckIfFistsPressed(
                            state.fistsOfSteel == 0 ? 1 : 0,
                            state.fistsOfSteelLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.FistsText}>
                <Text style={styles.PerkText}>Fists of Steel</Text>
            </View>
            <View title='Cushioned Blue' style={{
                position: 'absolute',
                left: "4%",
                top: "53%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Cushioned Gold' style={{
                position: 'absolute',
                left: "4%",
                top: "53%",
                zIndex: 8,
                opacity: state.cushioned

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("CushionedModal")}
                    onPress={() => {
                        CheckIfCushionedPressed(
                            state.cushioned == 0 ? 1 : 0,
                            state.cushionedLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.CushionedText}>
                <Text style={styles.PerkText}>Cushioned</Text>
            </View>
            <View title='Conditioning Blue' style={{
                position: 'absolute',
                left: "6%",
                top: "38%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Conditioning Gold' style={{
                position: 'absolute',
                left: "6%",
                top: "38%",
                zIndex: 8,
                opacity: state.conditioning

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ConditioningModal")}
                    onPress={() => {
                        CheckIfConditioningPressed(
                            state.conditioning == 0 ? 1 : 0,
                            state.conditioningLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ConditioningText}>
                <Text style={styles.PerkText}>Conditioning</Text>
            </View>

            <View title='Reflect Blows Blue' style={{
                position: 'absolute',
                left: "68%",
                top: "30%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Reflect Blows Gold' style={{
                position: 'absolute',
                left: "68%",
                top: "30%",
                zIndex: 8,
                opacity: state.reflectBlows

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ReflectBlowsModal")}
                    onPress={() => {
                        CheckIfReflectBlowsPressed(
                            state.reflectBlows == 0 ? 1 : 0,
                            state.reflectBlowsLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ReflectBlowsText}>
                <Text style={styles.PerkText}>Reflect Blows</Text>
            </View>
            <View title='Matching Set Blue' style={{
                position: 'absolute',
                left: "78%",
                top: "45%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Matching Set Gold' style={{
                position: 'absolute',
                left: "78%",
                top: "45%",
                zIndex: 8,
                opacity: state.matchingSet

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("HeavyMatchingSetModal")}
                    onPress={() => {
                        CheckIfMatchingSetPressed(
                            state.matchingSet == 0 ? 1 : 0,
                            state.matchingSetLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.MatchingSetText}>
                <Text style={styles.PerkText}>Matching Set</Text>
            </View>
            <View title='Tower Of Strength Blue' style={{
                position: 'absolute',
                left: "70%",
                top: "52%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Tower Of Strength Gold' style={{
                position: 'absolute',
                left: "70%",
                top: "52%",
                zIndex: 8,
                opacity: state.towerOfStrength

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("TowerOfStrengthModal")}
                    onPress={() => {
                        CheckIfTowerOfStrengthPressed(
                            state.towerOfStrength == 0 ? 1 : 0,
                            state.towerOfStrengthLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.TowerOfStrengthText}>
                <Text style={styles.PerkText}>Tower Of Strength</Text>
            </View>
            <View title='Well Fitted Blue' style={{
                position: 'absolute',
                left: "65%",
                top: "65%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Well Fitted Gold' style={{
                position: 'absolute',
                left: "65%",
                top: "65%",
                zIndex: 8,
                opacity: state.wellFitted

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("WellFittedModal")}
                    onPress={() => {
                        CheckIfWellFittedPressed(
                            state.wellFitted == 0 ? 1 : 0,
                            state.wellFittedLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.WellFittedText}>
                <Text style={styles.PerkText}>Well Fitted</Text>
            </View>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} >


                <Line
                    x1="50.2%"
                    y1="80%"
                    x2="28%"
                    y2="70%"
                    stroke={state.fistsOfSteelLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="14%"
                    y1="58.4%"
                    x2="28.5%"
                    y2="70.6%"
                    stroke={state.cushionedLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="15%"
                    y1="57.5%"
                    x2="16.8%"
                    y2="44.5%"
                    stroke={state.conditioningLine}
                    strokeWidth={lineStrokeWidth}

                />

                <Line
                    x1="78%"
                    y1="35.5%"
                    x2="88%"
                    y2="50%"
                    stroke={state.reflectBlowsLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="89%"
                    y1="50%"
                    x2="80%"
                    y2="58%"
                    stroke={state.matchingSetLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="80%"
                    y1="58.5%"
                    x2="76%"
                    y2="70%"
                    stroke={state.towerOfStrengthLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="75.2%"
                    y1="70.4%"
                    x2="51.3%"
                    y2="79.9%"
                    stroke={state.wellFittedLine}
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
    JuggernautText: {
        position: 'absolute',
        left: "42%",
        top: "84%",
        zIndex: 10,
    },
    ArcaneSmithText: {
        position: 'absolute',
        left: "33%",
        top: "55%",
        zIndex: 10,
    },
    FistsText: {
        position: 'absolute',
        left: "18%",
        top: "73%",
        zIndex: 10,
    },
    CushionedText: {
        position: 'absolute',
        left: "8%",
        top: "62%",
        zIndex: 10,
    },
    ConditioningText: {
        position: 'absolute',
        left: "8%",
        top: "45%",
        zIndex: 10,
    },
    DragonArmorText: {
        position: 'absolute',
        left: "44%",
        top: "34%",
        zIndex: 10,
    },
    ReflectBlowsText: {
        position: 'absolute',
        left: "68%",
        top: "31%",
        zIndex: 10,
    },
    MatchingSetText: {
        position: 'absolute',
        left: "65%",
        top: "49%",
        zIndex: 10,
    },
    TowerOfStrengthText: {
        position: 'absolute',
        left: "70%",
        top: "60%",
        zIndex: 10,
    },
    WellFittedText: {
        position: 'absolute',
        left: "68.5%",
        top: "72.5%",
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

export default HeavyArmor;