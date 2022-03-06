import * as React from 'react';
import { useState, useCallback, useEffect, useContext } from 'react';
import Svg, { Line } from 'react-native-svg';
import {
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    StyleSheet,
    Button,
    Alert
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



const SmithingTree = () => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [ActivePerks, SetActivePerks] = useState(0);
    const [RequiredLevel, SetRequiredLevel] = useState(0);
    const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);
    let resetAllTrees;
    const lineStrokeWidth = '2';
    const [state, setState] = useSetState({
        basicSmithing: 0,
        arcaneSmithing: 0,
        arcaneSmithingLine: 'white',
        elvinSmithing: 0,
        elvinSmithingLine: 'white',
        advancedSmithing: 0,
        advancedSmithingLine: 'white',
        glassSmithing: 0,
        glassSmithingLine: 'white',
        dwarvenSmithing: 0,
        dwarvenSmithingLine: 'white',
        orcishSmithing: 0,
        orcishSmithingLine: 'white',
        ebonySmithing: 0,
        ebonySmithingLine: 'white',
        daedricSmithing: 0,
        daedricSmithingLine: 'white',
        dragonSmithing: 0,
        dragonSmithingLine: 'white',
        dragonSmithingLine2: 'white',
    });

    const resetSmithingPerks = () => {
        setState({ basicSmithing: 0 });
        setState({ arcaneSmithing: 0 });
        setState({ arcaneSmithingLine: 'white' });
        setState({ elvinSmithing: 0 });
        setState({ elvinSmithingLine: 'white' });
        setState({ advancedSmithing: 0 });
        setState({ advancedSmithingLine: 'white' });
        setState({ glassSmithing: 0 });
        setState({ glassSmithingLine: 'white' });
        setState({ dwarvenSmithing: 0 });
        setState({ dwarvenSmithingLine: 'white' });
        setState({ orcishSmithing: 0 });
        setState({ orcishSmithingLine: 'white' });
        setState({ ebonySmithing: 0 });
        setState({ ebonySmithingLine: 'white' });
        setState({ daedricSmithing: 0 });
        setState({ daedricSmithingLine: 'white' });
        setState({ dragonSmithing: 0 });
        setState({ dragonSmithingLine: 'white' });
        setState({ dragonSmithingLine2: 'white' });
        SetRequiredLevel(0);
    }

    const resetActivePerks = () => {
        resetSmithingPerks();
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
            resetSmithingPerks();
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
        if (state.dragonSmithing == 1) {
            TrackLevel(100);
        } else if (state.daedricSmithing == 1) {
            TrackLevel(90);
        } else if (state.ebonySmithing == 1) {
            TrackLevel(80);
        } else if (state.glassSmithing == 1) {
            TrackLevel(70);
        } else if (state.arcaneSmithing == 1) {
            TrackLevel(60);
        } else if (state.advancedSmithing == 1) {
            TrackLevel(50);
        } else if (state.elvinSmithing == 1) {
            TrackLevel(30);
        } else if (state.basicSmithing == 1) {
            TrackLevel(0);
        }
    }, [state]);

    useEffect(() => {
        CheckLevel();
    }, [CheckLevel]);

    const CheckIfBasicSmithPressed = (button) => {
        if (
            state.elvinSmithing == 1 ||
            state.arcaneSmithing == 1 ||
            state.dwarvenSmithing == 1
        ) {
            // Do nothing....must un-select nodes above it first
        }
        else {
            setState({ basicSmithing: button }); // Change button color back and forth
            state.basicSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfArcaneSmithPressed = (button, line) => {
        if (state.basicSmithing == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ basicSmithing: button });
            setState({ basicSmithingLine: line });
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

    const CheckIfElvinSmithPressed = (buttonColor, lineColor) => {
        if (state.basicSmithing == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ basicSmithing: buttonColor });
            setState({ basicSmithingLine: lineColor });
            setState({ elvinSmithing: buttonColor });
            setState({ elvinSmithingLine: lineColor });

            IncrementCounter(2);
        } else if (state.advancedSmithing == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ elvinSmithingLine: lineColor });
            setState({ elvinSmithing: buttonColor }); // Change button color back and forth
            state.elvinSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfAdvanceSmithingPressed = (buttonColor, lineColor) => {
        if (state.elvinSmithing == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ basicSmithing: buttonColor });
            setState({ advancedSmithing: buttonColor });
            setState({ elvinSmithing: buttonColor });
            setState({ advancedSmithingLine: lineColor });
            setState({ elvinSmithingLine: lineColor });
            if (state.basicSmithing == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.glassSmithing == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ advancedSmithingLine: lineColor });
            setState({ advancedSmithing: buttonColor }); // Change the pressed button color back and forth
            state.advancedSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfGlassSmithingPressed = (buttonColor, lineColor, lineColor2) => {
        if (state.advancedSmithing == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ glassSmithing: buttonColor });
            setState({ advancedSmithing: buttonColor });
            setState({ elvinSmithing: buttonColor });
            setState({ basicSmithing: buttonColor });
            setState({ glassSmithingLine: lineColor });
            setState({ advancedSmithingLine: lineColor });
            setState({ elvinSmithingLine: lineColor });
            if (state.dragonSmithing == 1) {
                setState({ dragonSmithingLine2: lineColor2 });
            }
            if (state.elvinSmithing == 1) {
                IncrementCounter(2);
            } else if (state.basicSmithing == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else if (state.dragonSmithing == 1 && state.daedricSmithing == 0) {
            // Do nothing....must un-select nodes above it first
        } else if (state.dragonSmithing == 1 && state.daedricSmithing == 1) {
            setState({ dragonSmithingLine2: lineColor2 });
            setState({ glassSmithingLine: lineColor });
            setState({ glassSmithing: buttonColor }); // Change the pressed button color back and forth
            state.glassSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        } else {
            setState({ glassSmithingLine: lineColor });
            setState({ glassSmithing: buttonColor }); // Change the pressed button color back and forth
            state.glassSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfDwarvenSmithingPressed = (buttonColor, lineColor) => {
        if (state.basicSmithing == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ dwarvenSmithing: buttonColor });
            setState({ basicSmithing: buttonColor });
            setState({ dwarvenSmithingLine: lineColor });
            IncrementCounter(2);
        } else if (state.orcishSmithing == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ dwarvenSmithingLine: lineColor });
            setState({ dwarvenSmithing: buttonColor }); // Change the pressed button color back and forth
            state.dwarvenSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfOrcishSmithingPressed = (buttonColor, lineColor) => {
        if (state.dwarvenSmithing == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ orcishSmithing: buttonColor });
            setState({ dwarvenSmithing: buttonColor });
            setState({ basicSmithing: buttonColor });
            setState({ orcishSmithingLine: lineColor });
            setState({ dwarvenSmithingLine: lineColor });
            if (state.basicSmithing == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.ebonySmithing == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ orcishSmithingLine: lineColor });
            setState({ orcishSmithing: buttonColor }); // Change the pressed button color back and forth
            state.orcishSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfEbonySmithingPressed = (buttonColor, lineColor) => {
        if (state.orcishSmithing == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ ebonySmithing: buttonColor });
            setState({ orcishSmithing: buttonColor });
            setState({ dwarvenSmithing: buttonColor });
            setState({ basicSmithing: buttonColor });
            setState({ ebonySmithingLine: lineColor });
            setState({ orcishSmithingLine: lineColor });
            setState({ dwarvenSmithingLine: lineColor });
            if (state.dwarvenSmithing == 1) {
                IncrementCounter(2);
            } else if (state.basicSmithing == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else if (state.daedricSmithing == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ ebonySmithingLine: lineColor });
            setState({ ebonySmithing: buttonColor }); // Change the pressed button color back and forth
            state.ebonySmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfDaedricSmithingPressed = (buttonColor, lineColor) => {
        if (state.ebonySmithing == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ daedricSmithing: buttonColor });
            setState({ ebonySmithing: buttonColor });
            setState({ orcishSmithing: buttonColor });
            setState({ dwarvenSmithing: buttonColor });
            setState({ basicSmithing: buttonColor });
            setState({ daedricSmithingLine: lineColor });
            setState({ ebonySmithingLine: lineColor });
            setState({ orcishSmithingLine: lineColor });
            setState({ dwarvenSmithingLine: lineColor });
            if (state.dragonSmithing == 1) {
                setState({ dragonSmithingLine: lineColor });
            }

            if (state.orcishSmithing == 1) {
                IncrementCounter(2);
            } else if (state.dwarvenSmithing == 1) {
                IncrementCounter(3);
            } else if (state.basicSmithing == 1) {
                IncrementCounter(4);
            } else {
                IncrementCounter(5);
            }
        } else if (state.dragonSmithing == 1 && state.glassSmithing == 0) {
            // Do nothing....must un-select nodes above it first
        } else if (state.dragonSmithing == 1 && state.glassSmithing == 1) {
            setState({ dragonSmithingLine: lineColor });
            setState({ daedricSmithingLine: lineColor });
            setState({ daedricSmithing: buttonColor }); // Change the pressed button color back and forth
            state.daedricSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        } else {
            setState({ daedricSmithingLine: lineColor });
            setState({ daedricSmithing: buttonColor }); // Change the pressed button color back and forth
            state.daedricSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfDragonSmithingPressed = (button, line, line2) => {
        if (state.daedricSmithing == 1 && state.glassSmithing == 0) {
            setState({ dragonSmithing: button });
            setState({ dragonSmithingLine: line });
            state.dragonSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
        else if (state.daedricSmithing == 0 && state.glassSmithing == 1) {
            setState({ dragonSmithing: button });
            setState({ dragonSmithingLine2: line2 });
            state.dragonSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
        else if (state.daedricSmithing == 1 && state.glassSmithing == 1) {
            setState({ dragonSmithing: button });
            setState({ dragonSmithingLine: line });
            setState({ dragonSmithingLine2: line2 });
            state.dragonSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
        else if (state.basicSmithing == 0) {
            setState({ dragonSmithing: button });
            setState({ dragonSmithingLine: line });
            setState({ daedricSmithing: button });
            setState({ daedricSmithingLine: line });
            setState({ ebonySmithing: button });
            setState({ ebonySmithingLine: line });
            setState({ orcishSmithing: button });
            setState({ orcishSmithingLine: line });
            setState({ dwarvenSmithing: button });
            setState({ dwarvenSmithingLine: line });
            setState({ basicSmithing: button });
            IncrementCounter(6);

        }
        else if (state.elvinSmithing == 1 && state.ebonySmithing == 0) {
            setState({ dragonSmithing: button });
            setState({ dragonSmithingLine2: line });
            setState({ glassSmithing: button });
            setState({ glassSmithingLine: line });
            setState({ advancedSmithing: button });
            setState({ advancedSmithingLine: line });
            setState({ elvinSmithing: button });
            setState({ elvinSmithingLine: line });
            setState({ basicSmithing: button });
            if (state.advancedSmithing == 1) {
                IncrementCounter(2);
            }
            else {
                IncrementCounter(3);
            }
        }
        else {
            setState({ dragonSmithing: button });
            setState({ dragonSmithingLine: line });
            setState({ daedricSmithing: button });
            setState({ daedricSmithingLine: line });
            setState({ ebonySmithing: button });
            setState({ ebonySmithingLine: line });
            setState({ orcishSmithing: button });
            setState({ orcishSmithingLine: line });
            setState({ dwarvenSmithing: button });
            setState({ dwarvenSmithingLine: line });
            setState({ basicSmithing: button });
            if (state.ebonySmithing == 1) {
                IncrementCounter(2);
            } else if (state.orcishSmithing == 1) {
                IncrementCounter(3);
            }
            else {
                IncrementCounter(4);
            }
        }
    };

    return (
        <View style={{ zIndex: 2 }}>
            <View
                style={styles.resetButtonContainer}>
                <TouchableOpacity style={styles.resetButton} onPress={() => resetActivePerks()}>
                    <Text style={{ color: "white", fontWeight: "bold", }}> Reset Smithing Perks</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.topText}>
                <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
                <Text style={styles.HomeScreenText}>Required Level: {RequiredLevel} </Text>
            </View>
            <View title='Basic Smithing Blue' style={{
                position: 'absolute',
                left: "25%",
                top: "75%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Basic Smithing Gold' style={{
                position: 'absolute',
                left: "25%",
                top: "75%",
                zIndex: 8,
                opacity: state.basicSmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("BasicSmithingModal")}
                    onPress={() => {
                        CheckIfBasicSmithPressed(
                            state.basicSmithing == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.BasicSmithText}>
                <Text style={styles.PerkText}>Basic Smithing</Text>
            </View>
            <View title='Arcane Smithing Blue' style={{
                position: 'absolute',
                left: "29%",
                top: "55%",
                zIndex: 8,

            }}>

                <StarIconBlue />
            </View>
            <View title='Arcane Smithing Gold' style={{
                position: 'absolute',
                left: "29%",
                top: "55%",
                zIndex: 8,
                opacity: state.arcaneSmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ArcaneSmithingModal")}
                    onPress={() => {
                        CheckIfArcaneSmithPressed(
                            state.arcaneSmithing == 0 ? 1 : 0,
                            state.arcaneSmithingLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ArcaneSmithText}>
                <Text style={styles.PerkText}>Arcane whitesmith</Text>
            </View>
            <View title='Elvin Smithing Blue' style={{
                position: 'absolute',
                left: "-3%",
                top: "50%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Elvin Smithing Gold' style={{
                position: 'absolute',
                left: "-3%",
                top: "50%",
                zIndex: 8,
                opacity: state.elvinSmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ElvenSmithingModal")}
                    onPress={() => {
                        CheckIfElvinSmithPressed(
                            state.elvinSmithing == 0 ? 1 : 0,
                            state.elvinSmithingLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ElvenSmithText}>
                <Text style={styles.PerkText}>Elvin Smithing</Text>
            </View>
            <View title='Advanced Smithing Blue' style={{
                position: 'absolute',
                left: "3%",
                top: "43%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Advanced Smithing Gold' style={{
                position: 'absolute',
                left: "3%",
                top: "43%",
                zIndex: 8,
                opacity: state.advancedSmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("AdvancedArmorsSmithingModal")}
                    onPress={() => {
                        CheckIfAdvanceSmithingPressed(
                            state.advancedSmithing == 0 ? 1 : 0,
                            state.advancedSmithingLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AdvancedArmorsText}>
                <Text style={styles.PerkText}>Advanced Armors</Text>
            </View>
            <View title='Glass Smithing Blue' style={{
                position: 'absolute',
                left: "23%",
                top: "34.2%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Glass Smithing Gold' style={{
                position: 'absolute',
                left: "23%",
                top: "34.2%",
                zIndex: 8,
                opacity: state.glassSmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("GlassSmithingModal")}
                    onPress={() => {
                        CheckIfGlassSmithingPressed(
                            state.glassSmithing == 0 ? 1 : 0,
                            state.glassSmithingLine == 'white' ? 'gold' : 'white',
                            state.dragonSmithingLine2 == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.GlassSmithText}>
                <Text style={styles.PerkText}>Glass Smithing</Text>
            </View>
            <View title='Dragon Smithing Blue' style={{
                position: 'absolute',
                left: "44%",
                top: "34.2%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Dragon Smithing Gold' style={{
                position: 'absolute',
                left: "44%",
                top: "34.2%",
                zIndex: 8,
                opacity: state.dragonSmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("DragonArmorSmithingModal")}
                    onPress={() => {
                        CheckIfDragonSmithingPressed(
                            state.dragonSmithing == 0 ? 1 : 0,
                            state.dragonSmithingLine == 'white' ? 'gold' : 'white',
                            state.dragonSmithingLine2 == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.DragonArmorText}>
                <Text style={styles.PerkText}>Dragon Armor</Text>
            </View>
            <View title='Daedric Smithing Blue' style={{
                position: 'absolute',
                left: "64%",
                top: "40%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Daedric Smithing Gold' style={{
                position: 'absolute',
                left: "64%",
                top: "40%",
                zIndex: 8,
                opacity: state.daedricSmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("DaedricSmithingModal")}
                    onPress={() => {
                        CheckIfDaedricSmithingPressed(
                            state.daedricSmithing == 0 ? 1 : 0,
                            state.daedricSmithingLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.DaedricSmithText}>
                <Text style={styles.PerkText}>Daedric Smithing</Text>
            </View>
            <View title='Ebony Smithing Blue' style={{
                position: 'absolute',
                left: "82%",
                top: "50%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Ebony Smithing Gold' style={{
                position: 'absolute',
                left: "82%",
                top: "50%",
                zIndex: 8,
                opacity: state.ebonySmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("EbonySmithingModal")}
                    onPress={() => {
                        CheckIfEbonySmithingPressed(
                            state.ebonySmithing == 0 ? 1 : 0,
                            state.ebonySmithingLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.EbonySmithText}>
                <Text style={styles.PerkText}>   Ebony {'\n'} Smithing</Text>
            </View>
            <View title='Orcish Smithing Blue' style={{
                position: 'absolute',
                left: "65%",
                top: "50.5%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Orcish Smithing Gold' style={{
                position: 'absolute',
                left: "65%",
                top: "50.5%",
                zIndex: 8,
                opacity: state.orcishSmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("OrcishSmithingModal")}
                    onPress={() => {
                        CheckIfOrcishSmithingPressed(
                            state.orcishSmithing == 0 ? 1 : 0,
                            state.orcishSmithingLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.OrcishSmithText}>
                <Text style={styles.PerkText}>Orcish Smithing</Text>
            </View>
            <View title='Dwarven Smithing Blue' style={{
                position: 'absolute',
                left: "49%",
                top: "60%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Dwarven Smithing Gold' style={{
                position: 'absolute',
                left: "49%",
                top: "60%",
                zIndex: 8,
                opacity: state.dwarvenSmithing

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("DwarvenSmithingModal")}
                    onPress={() => {
                        CheckIfDwarvenSmithingPressed(
                            state.dwarvenSmithing == 0 ? 1 : 0,
                            state.dwarvenSmithingLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.DwarvenSmithText}>
                <Text style={styles.PerkText}>Dwarven Smithing</Text>
            </View>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} >

                <Line
                    x1="35.3%"
                    y1="79.2%"
                    x2="40%"
                    y2="60%"
                    stroke={state.arcaneSmithingLine}
                    strokeWidth={lineStrokeWidth}
                />

                <Line
                    x1="34.2%"
                    y1="79.3%"
                    x2="8.5%"
                    y2="55.7%"
                    stroke={state.elvinSmithingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="8.3%"
                    y1="54.4%"
                    x2="13.5%"
                    y2="48.6%"
                    stroke={state.advancedSmithingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="15%"
                    y1="47.5%"
                    x2="32.8%"
                    y2="39.5%"
                    stroke={state.glassSmithingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="35.3%"
                    y1="39%"
                    x2="53%"
                    y2="39%"
                    stroke={state.dragonSmithingLine2}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="55.5%"
                    y1="39.3%"
                    x2="74%"
                    y2="45%"
                    stroke={state.dragonSmithingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="75%"
                    y1="45.5%"
                    x2="92%"
                    y2="55%"
                    stroke={state.daedricSmithingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="91%"
                    y1="55%"
                    x2="78%"
                    y2="55.5%"
                    stroke={state.ebonySmithingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="76%"
                    y1="56%"
                    x2="60%"
                    y2="65%"
                    stroke={state.orcishSmithingLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="59.2%"
                    y1="65.4%"
                    x2="36.3%"
                    y2="79.9%"
                    stroke={state.dwarvenSmithingLine}
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
    BasicSmithText: {
        position: 'absolute',
        left: "25%",
        top: "83%",
        zIndex: 10,
    },
    ArcaneSmithText: {
        position: 'absolute',
        left: "25%",
        top: "62%",
        zIndex: 10,
    },
    ElvenSmithText: {
        position: 'absolute',
        left: "13%",
        top: "53%",
        zIndex: 10,
    },
    AdvancedArmorsText: {
        position: 'absolute',
        left: "20%",
        top: "46%",
        zIndex: 10,
    },
    GlassSmithText: {
        position: 'absolute',
        left: "10%",
        top: "37%",
        zIndex: 10,
    },
    DragonArmorText: {
        position: 'absolute',
        left: "45%",
        top: "34%",
        zIndex: 10,
    },
    DaedricSmithText: {
        position: 'absolute',
        left: "67%",
        top: "40%",
        zIndex: 10,
    },
    EbonySmithText: {
        position: 'absolute',
        left: "85%",
        top: "49%",
        zIndex: 10,
    },
    OrcishSmithText: {
        position: 'absolute',
        left: "50%",
        top: "54%",
        zIndex: 10,
    },
    DwarvenSmithText: {
        position: 'absolute',
        left: "65%",
        top: "65%",
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

export default SmithingTree;