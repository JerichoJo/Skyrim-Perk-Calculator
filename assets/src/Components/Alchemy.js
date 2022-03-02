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

const AlchemyTree = () => {
    const navigation = useNavigation();
    const [ActivePerks, SetActivePerks] = useState(0);
    const [RequiredLevel, SetRequiredLevel] = useState(0);
    const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);
    const [AlchemyLevel, SetAlchemyLevel] = useState(0);
    const [state, setState] = useSetState({
        alchemist: 0,
        physician: 0,
        physicianLine: 'white',
        prisoner: 0,
        prisonerLine: 'white',
        concentratedPoison: 0,
        concentratedPoisonLine: 'white',
        benefactor: 0,
        benefactorLine: 'white',
        experimenter: 0,
        experimenterLine: 'white',
        snakeblood: 0,
        snakebloodLine: 'white',
        purity: 0,
        purityLine: 'white',
        greenThumb: 0,
        greenThumbLine: 'white',
        experimenterSnakeLine: 'white',
    });

    let resetAllTrees;
    const resetAlchemyPerks = () => {
        setState({ alchemist: 0 });
        setState({ physician: 0 });
        setState({ physicianLine: 'white' });
        setState({ prisoner: 0 });
        setState({ prisonerLine: 'white' });
        setState({ concentratedPoison: 0 });
        setState({ concentratedPoisonLine: 'white' });
        setState({ benefactor: 0 });
        setState({ benefactorLine: 'white' });
        setState({ experimenter: 0 });
        setState({ experimenterLine: 'white' });
        setState({ snakeblood: 0 });
        setState({ snakebloodLine: 'white' });
        setState({ purity: 0 });
        setState({ purityLine: 'white' });
        setState({ greenThumb: 0 });
        setState({ greenThumbLine: 'white' });
        setState({ experimenterSnakeLine: 'white' });
        SetRequiredLevel(0);
        SetAlchemyLevel(0);
    }

    const resetActivePerks = () => {
        resetAlchemyPerks();
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
            resetAlchemyPerks();
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

    const IncAlchemyCounter = (numActiveAlchemy, buttonColor) => {
        if (AlchemyLevel < 5) {
            SetAlchemyLevel(AlchemyLevel + numActiveAlchemy)
        }
        else {
            SetAlchemyLevel(0) // return to 0 after the perk is maxed out
        }
    }

    const IncAlchemyCountCall = (buttonColor) => {
        if (AlchemyLevel == 0) {
            setState({ alchemy: buttonColor }); // Change the pressed button color back and forth
            IncrementCounter(1); // increment active perks by 1 on first click
            IncAlchemyCounter(1); // increment basic smith by 1 on first click
        } else if (AlchemyLevel == 5) {
            setState({ alchemy: buttonColor }); // Change the pressed button color back and forth
            IncAlchemyCounter(1); // Increment by one so that it goes back to 0 
            DecrementCounter(5); // decrease active perks back down 3 because it is set back to 0

        } else {
            IncrementCounter(1);
            IncAlchemyCounter(1) // increment by 1 after it perk is active
        }

    }

    const TrackLevel = useCallback((level) => {
        SetRequiredLevel(level);
    }, []);

    const lineStrokeWidth = '2';

    const CheckLevel = useCallback(() => {
        if (state.greenThumb == 1) {
            TrackLevel(100);
        } else if (state.purity == 1) {
            TrackLevel(90);
        } else if (state.snakeblood == 1) {
            TrackLevel(80);
        } else if (state.concentratedPoison == 1) {
            TrackLevel(70);
        } else if (state.arcaneSmithing == 1) {
            TrackLevel(60);
        } else if (state.prisoner == 1) {
            TrackLevel(50);
        } else if (state.physician == 1) {
            TrackLevel(30);
        } else if (state.alchemist == 1) {
            TrackLevel(0);
        }
    }, [state]);

    useEffect(() => {
        CheckLevel();
    }, [CheckLevel]);

    const CheckIfAlchemistPressed = (button) => {
        if (
            state.physician == 1 ||
            state.arcaneSmithing == 1 ||
            state.benefactor == 1
        ) {
            if (AlchemyLevel == 5) {
                DecrementCounter(4);
                SetAlchemyLevel(1)
            } else {
                IncrementCounter(1);
                IncAlchemyCounter(1);
            }
        }
        else {
            IncAlchemyCountCall(button);
        }
    };

    const CheckIfPhysicianPressed = (buttonColor, lineColor) => {
        if (state.alchemist == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ alchemist: buttonColor });
            setState({ alchemistLine: lineColor });
            setState({ physician: buttonColor });
            setState({ physicianLine: lineColor });

            IncrementCounter(2);
            if (state.alchemist == 0) {
                SetAlchemyLevel(1);
            }
        } else if (state.prisoner == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ physicianLine: lineColor });
            setState({ physician: buttonColor }); // Change button color back and forth
            state.physician == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfPrisonerPressed = (buttonColor, lineColor) => {
        if (state.physician == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ alchemist: buttonColor });
            setState({ prisoner: buttonColor });
            setState({ physician: buttonColor });
            setState({ prisonerLine: lineColor });
            setState({ physicianLine: lineColor });
            if (state.alchemist == 0) {
                SetAlchemyLevel(1);
            }
            if (state.alchemist == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.concentratedPoison == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ prisonerLine: lineColor });
            setState({ prisoner: buttonColor }); // Change the pressed button color back and forth
            state.prisoner == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfConcentratedPoisonPressed = (buttonColor, lineColor) => {
        if (state.prisoner == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ concentratedPoison: buttonColor });
            setState({ prisoner: buttonColor });
            setState({ physician: buttonColor });
            setState({ alchemist: buttonColor });
            setState({ concentratedPoisonLine: lineColor });
            setState({ prisonerLine: lineColor });
            setState({ physicianLine: lineColor });
            if (state.alchemist == 0) {
                SetAlchemyLevel(1);
            }
            if (state.greenThumb == 1) {
                setState({ experimenterSnakeLine: lineColor });
            }
            if (state.physician == 1) {
                IncrementCounter(2);
            } else if (state.alchemist == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else {
            setState({ concentratedPoisonLine: lineColor });
            setState({ concentratedPoison: buttonColor }); // Change the pressed button color back and forth
            state.concentratedPoison == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
            if (state.greenThumb == 1) {
                setState({ experimenterSnakeLine: lineColor });
            }

        }
    };
    const CheckIfBenefactorPressed = (buttonColor, lineColor) => {
        if (state.alchemist == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ benefactor: buttonColor });
            setState({ alchemist: buttonColor });
            setState({ benefactorLine: lineColor });
            IncrementCounter(2);
            if (state.alchemist == 0) {
                SetAlchemyLevel(1);
            }
        } else if (state.experimenter == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ benefactorLine: lineColor });
            setState({ benefactor: buttonColor }); // Change the pressed button color back and forth
            state.benefactor == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfExperimenterPressed = (buttonColor, lineColor) => {
        if (state.benefactor == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ experimenter: buttonColor });
            setState({ benefactor: buttonColor });
            setState({ alchemist: buttonColor });
            setState({ experimenterLine: lineColor });
            setState({ benefactorLine: lineColor });
            if (state.alchemist == 0) {
                SetAlchemyLevel(1);
            }
            if (state.alchemist == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.snakeblood == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ experimenterLine: lineColor });
            setState({ experimenter: buttonColor }); // Change the pressed button color back and forth
            state.experimenter == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfSnakebloodPressed = (buttonColor, lineColor) => {
        if (state.experimenter == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ snakeblood: buttonColor });
            setState({ experimenter: buttonColor });
            setState({ benefactor: buttonColor });
            setState({ alchemist: buttonColor });
            setState({ experimenterSnakeLine: lineColor });
            setState({ experimenterLine: lineColor });
            setState({ benefactorLine: lineColor });
            if (state.alchemist == 0) {
                SetAlchemyLevel(1);
            }
            if (state.benefactor == 1) {
                IncrementCounter(2);
            } else if (state.alchemist == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else if (state.purity == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ snakebloodLine: lineColor });
            setState({ snakeblood: buttonColor }); // Change the pressed button color back and forth
            state.snakeblood == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfPurityPressed = (buttonColor, lineColor) => {
        if (state.snakeblood == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ purity: buttonColor });
            setState({ snakeblood: buttonColor });
            setState({ experimenter: buttonColor });
            setState({ benefactor: buttonColor });
            setState({ alchemist: buttonColor });
            setState({ purityLine: lineColor });
            setState({ snakebloodLine: lineColor });
            setState({ experimenterLine: lineColor });
            setState({ benefactorLine: lineColor });
            if (state.alchemist == 0) {
                SetAlchemyLevel(1);
            }
            if (state.experimenter == 1) {
                IncrementCounter(2);
            } else if (state.benefactor == 1) {
                IncrementCounter(3);
            } else if (state.alchemist == 1) {
                IncrementCounter(4);
            } else {
                IncrementCounter(5);
            }
        } else if (state.greenThumb == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ purityLine: lineColor });
            setState({ purity: buttonColor }); // Change the pressed button color back and forth
            state.purity == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfGreenThumbPressed = (buttonColor, lineColor) => {
        if (state.concentratedPoison == 0) {
            setState({ greenThumb: buttonColor });
            setState({ concentratedPoison: buttonColor });
            setState({ prisoner: buttonColor });
            setState({ physician: buttonColor });
            setState({ alchemist: buttonColor });
            setState({ greenThumbLine: lineColor });
            setState({ concentratedPoisonLine: lineColor });
            setState({ prisonerLine: lineColor });
            setState({ physicianLine: lineColor });
            if (state.alchemist == 0) {
                SetAlchemyLevel(1);
            }
            if (state.concentratedPoison == 1) {
                setState({ experimenterSnakeLine: lineColor });
            }
            if (state.concentratedPoison == 1) {
                IncrementCounter(2);
            } else if (state.prisoner == 1) {
                IncrementCounter(3);
            } else if (state.physician == 1) {
                IncrementCounter(4);
            } else if (state.alchemist == 1) {
                IncrementCounter(5);
            } else {
                IncrementCounter(6);
            }
        } else {
            setState({ greenThumbLine: lineColor });
            setState({ greenThumb: buttonColor });
            state.greenThumb == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
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
            <View title='Alchemist Blue' style={{
                position: 'absolute',
                left: "15%",
                top: "75%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Alchemist Gold' style={{
                position: 'absolute',
                left: "15%",
                top: "75%",
                zIndex: 8,
                opacity: state.alchemist

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("AlchemistModal")}
                    onPress={() => {
                        CheckIfAlchemistPressed(
                            state.alchemist == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AlchemistText}>
                <Text style={styles.PerkText}>Alchemist({AlchemyLevel}/5)</Text>
            </View>

            <View title='Physician Blue' style={{
                position: 'absolute',
                left: "60%",
                top: "71%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Physician Gold' style={{
                position: 'absolute',
                left: "60%",
                top: "71%",
                zIndex: 8,
                opacity: state.physician

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("PhysicianModal")}
                    onPress={() => {
                        CheckIfPhysicianPressed(
                            state.physician == 0 ? 1 : 0,
                            state.physicianLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.PhysicianText}>
                <Text style={styles.PerkText}>Physician</Text>
            </View>
            <View title='Prisoner Blue' style={{
                position: 'absolute',
                left: "25%",
                top: "60%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Prisoner Gold' style={{
                position: 'absolute',
                left: "25%",
                top: "60%",
                zIndex: 8,
                opacity: state.prisoner

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("PrisonerModal")}
                    onPress={() => {
                        CheckIfPrisonerPressed(
                            state.prisoner == 0 ? 1 : 0,
                            state.prisonerLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.PrisonerText}>
                <Text style={styles.PerkText}>Prisoner</Text>
            </View>
            <View title='Concentrated Poison Blue' style={{
                position: 'absolute',
                left: "28%",
                top: "49%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Concentrated Poison Gold' style={{
                position: 'absolute',
                left: "28%",
                top: "49%",
                zIndex: 8,
                opacity: state.concentratedPoison

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ConcentratedPoisonModal")}
                    onPress={() => {
                        CheckIfConcentratedPoisonPressed(
                            state.concentratedPoison == 0 ? 1 : 0,
                            state.concentratedPoisonLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ConcentratedPoisonText}>
                <Text style={styles.PerkText}>Concentrated Poison</Text>
            </View>
            <View title='Green Thumb Blue' style={{
                position: 'absolute',
                left: "25%",
                top: "40%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Green Thumb Gold' style={{
                position: 'absolute',
                left: "25%",
                top: "40%",
                zIndex: 8,
                opacity: state.greenThumb

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("GreenThumbModal")}
                    onPress={() => {
                        CheckIfGreenThumbPressed(
                            state.greenThumb == 0 ? 1 : 0,
                            state.greenThumbLine == 'white' ? 'gold' : 'white',
                            state.experimenterSnakeLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.GreenThumbText}>
                <Text style={styles.PerkText}>Green Thumb</Text>
            </View>
            <View title='Purity Blue' style={{
                position: 'absolute',
                left: "40%",
                top: "20%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Purity Gold' style={{
                position: 'absolute',
                left: "40%",
                top: "20%",
                zIndex: 8,
                opacity: state.purity

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("PurityModal")}
                    onPress={() => {
                        CheckIfPurityPressed(
                            state.purity == 0 ? 1 : 0,
                            state.purityLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.PurityText}>
                <Text style={styles.PerkText}>Purity</Text>
            </View>
            <View title='Snakeblood Blue' style={{
                position: 'absolute',
                left: "43%",
                top: "35%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Snakeblood Gold' style={{
                position: 'absolute',
                left: "43%",
                top: "35%",
                zIndex: 8,
                opacity: state.snakeblood

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("SnakebloodModal")}
                    onPress={() => {
                        CheckIfSnakebloodPressed(
                            state.snakeblood == 0 ? 1 : 0,
                            state.snakebloodLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.SnakebloodText}>
                <Text style={styles.PerkText}>Snakeblood</Text>
            </View>
            <View title='Experimenter Blue' style={{
                position: 'absolute',
                left: "45%",
                top: "50%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Experimenter Gold' style={{
                position: 'absolute',
                left: "45%",
                top: "50%",
                zIndex: 8,
                opacity: state.experimenter

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ExperimenterModal")}
                    onPress={() => {
                        CheckIfExperimenterPressed(
                            state.experimenter == 0 ? 1 : 0,
                            state.experimenterLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ExperimenterText}>
                <Text style={styles.PerkText}>Experimenter</Text>
            </View>
            <View title='Benefactor Blue' style={{
                position: 'absolute',
                left: "52%",
                top: "60%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Benefactor Gold' style={{
                position: 'absolute',
                left: "52%",
                top: "60%",
                zIndex: 8,
                opacity: state.benefactor

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("BenefactorModal")}
                    onPress={() => {
                        CheckIfBenefactorPressed(
                            state.benefactor == 0 ? 1 : 0,
                            state.benefactorLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.BenefactorText}>
                <Text style={styles.PerkText}>Benefactor</Text>
            </View>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} >



                <Line
                    x1="25.2%"
                    y1="80.3%"
                    x2="71%"
                    y2="76.7%"
                    stroke={state.physicianLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="70%"
                    y1="76.4%"
                    x2="35%"
                    y2="65.5%"
                    stroke={state.prisonerLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="38%"
                    y1="55.5%"
                    x2="35.8%"
                    y2="65.5%"
                    stroke={state.concentratedPoisonLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="53.3%"
                    y1="39%"
                    x2="55%"
                    y2="55%"
                    stroke={state.experimenterSnakeLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="35.5%"
                    y1="45.3%"
                    x2="38%"
                    y2="55%"
                    stroke={state.greenThumbLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="50%"
                    y1="25.5%"
                    x2="53%"
                    y2="40%"
                    stroke={state.purityLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="54%"
                    y1="40%"
                    x2="38%"
                    y2="55%"
                    stroke={state.snakebloodLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="56%"
                    y1="55.5%"
                    x2="62%"
                    y2="65%"
                    stroke={state.experimenterLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="62.2%"
                    y1="65.4%"
                    x2="70.3%"
                    y2="76.9%"
                    stroke={state.benefactorLine}
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
    AlchemistText: {
        position: 'absolute',
        left: "25%",
        top: "83%",
        zIndex: 10,
    },

    PhysicianText: {
        position: 'absolute',
        left: "63%",
        top: "79%",
        zIndex: 10,
    },
    PrisonerText: {
        position: 'absolute',
        left: "20%",
        top: "66%",
        zIndex: 10,
    },
    ConcentratedPoisonText: {
        position: 'absolute',
        left: "2%",
        top: "53%",
        zIndex: 10,
    },
    GreenThumbText: {
        position: 'absolute',
        left: "20%",
        top: "40%",
        zIndex: 10,
    },
    PurityText: {
        position: 'absolute',
        left: "46%",
        top: "27%",
        zIndex: 10,
    },
    SnakebloodText: {
        position: 'absolute',
        left: "45%",
        top: "43%",
        zIndex: 10,
    },
    ExperimenterText: {
        position: 'absolute',
        left: "47%",
        top: "57%",
        zIndex: 10,
    },
    BenefactorText: {
        position: 'absolute',
        left: "55%",
        top: "68%",
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

export default AlchemyTree;