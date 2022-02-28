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

const Enchanting = () => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ActivePerks, SetActivePerks] = useState(0);
    const [RequiredLevel, SetRequiredLevel] = useState(0);
    const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);
    const [EnchanterLevel, SetEnchanterLevel] = useState(0);


    const [state, setState] = useSetState({
        enchanter: 0,
        fireEnchanter: 0,
        fireEnchanterLine: 'white',
        frostEnchanter: 0,
        frostEnchanterLine: 'white',
        stormEnchanting: 0,
        stormEnchantingLine: 'white',
        extraEffect: 0,
        extraEffectLine: 'white',
        insightfulEnchanter: 0,
        insightfulEnchanterLine: 'white',
        corpusEnchanter: 0,
        corpusEnchanterLine: 'white',
        soulSqueezer: 0,
        soulSqueezerLine: 'white',
        soulSiphon: 0,
        soulSiphonLine: 'white',
        stormExtraLine: 'white'
    });

    let resetAllTrees;
    const resetEnchantingPerks = () => {

        setState({ enchanter: 0 });
        setState({ fireEnchanter: 0 });
        setState({ fireEnchanterLine: 'white' });
        setState({ frostEnchanter: 0 });
        setState({ frostEnchanterLine: 'white' });
        setState({ stormEnchanting: 0 });
        setState({ stormEnchantingLine: 'white' });
        setState({ extraEffect: 0 });
        setState({ extraEffectLine: 'white' });
        setState({ insightfulEnchanter: 0 });
        setState({ insightfulEnchanterLine: 'white' });
        setState({ corpusEnchanter: 0 });
        setState({ corpusEnchanterLine: 'white' });
        setState({ soulSqueezer: 0 });
        setState({ soulSqueezerLine: 'white' });
        setState({ soulSiphon: 0 });
        setState({ soulSiphonLine: 'white' });
        setState({ stormExtraLine: 'white' });
        SetRequiredLevel(0);
    }

    const resetActivePerks = () => {
        resetEnchantingPerks();
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
            resetEnchantingPerks();
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

    const IncEnchanterCounter = (numActiveEnchanter) => {
        if (EnchanterLevel < 5) {
            SetEnchanterLevel(EnchanterLevel + numActiveEnchanter)
        }
        else {
            SetEnchanterLevel(0) // return to 0 after the perk is maxed out
        }
    }

    const IncEnchanterCountCall = (buttonColor) => {
        if (EnchanterLevel == 0) {
            setState({ enchanter: buttonColor }); // Change the pressed button color back and forth
            IncrementCounter(1); // increment active perks by 1 on first click
            IncEnchanterCounter(1); // increment basic smith by 1 on first click
        } else if (EnchanterLevel == 5) {
            setState({ enchanter: buttonColor }); // Change the pressed button color back and forth
            IncEnchanterCounter(1); // Increment by one so that it goes back to 0 
            DecrementCounter(5); // decrease active perks back down 3 because it is set back to 0

        } else {
            IncrementCounter(1);
            IncEnchanterCounter(1) // increment by 1 after it perk is active
        }

    }


    const TrackLevel = useCallback((level) => {
        SetRequiredLevel(level);
    }, []);

    const lineStrokeWidth = '2';

    const CheckLevel = useCallback(() => {
        if (state.dragonSmithing == 1) {
            TrackLevel(100);
        } else if (state.soulSiphon == 1) {
            TrackLevel(90);
        } else if (state.soulSqueezer == 1) {
            TrackLevel(80);
        } else if (state.extraEffect == 1) {
            TrackLevel(70);
        } else if (state.fireEnchanter == 1) {
            TrackLevel(60);
        } else if (state.stormEnchanting == 1) {
            TrackLevel(50);
        } else if (state.frostEnchanter == 1) {
            TrackLevel(30);
        } else if (state.enchanter == 1) {
            TrackLevel(0);
        }
    }, [TrackLevel, state]);

    useEffect(() => {
        CheckLevel();
    }, [CheckLevel]);

    const CheckIfEnchanterPressed = (button) => {
        if (
            state.frostEnchanter == 1 ||
            state.fireEnchanter == 1 ||
            state.insightfulEnchanter == 1
        ) {
            // Do nothing....must un-select nodes above it first
            if (EnchanterLevel == 5) {
                DecrementCounter(4); // decrease active perks back down 4 because it is set back to 1
                SetEnchanterLevel(1);

            } else {
                IncrementCounter(1);
                IncEnchanterCounter(1) // increment by 1 after it perk is active
            }
        }   
        else {
            IncEnchanterCountCall(button)
        }
    };

    const CheckIfFireEnchanterPressed = (button, line) => {
        
        if (state.enchanter == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ enchanter: button });
            setState({ enchanterLine: line });
            setState({ fireEnchanter: button });
            setState({ fireEnchanterLine: line });
            IncrementCounter(2);
            if (state.enchanter == 0) {
                SetEnchanterLevel(1);
            }
            
        } else if (state.frostEnchanter == 1){

        }
        
        else {
            setState({ fireEnchanterLine: line });
            setState({ fireEnchanter: button }); // Change the pressed button color back and forth
            state.fireEnchanter == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfFrostEnchanterPressed = (buttonColor, lineColor) => {
        if (state.enchanter == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ enchanter: buttonColor });
            setState({ enchanterLine: lineColor });
            setState({ fireEnchanterLine: lineColor });
            setState({ fireEnchanter: buttonColor})
            setState({ frostEnchanter: buttonColor });
            setState({ frostEnchanterLine: lineColor });
            IncrementCounter(2);
            if (state.enchanter == 0) {
                SetEnchanterLevel(1);
            }

        } else if (state.stormEnchanting == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ frostEnchanterLine: lineColor });
            setState({ frostEnchanter: buttonColor }); // Change button color back and forth
            state.frostEnchanter == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfStormEnchantingPressed = (buttonColor, lineColor) => {
        if (state.frostEnchanter == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ enchanter: buttonColor });
            setState({ stormEnchanting: buttonColor });
            setState({ frostEnchanter: buttonColor });
            setState({ fireEnchanter: buttonColor });
            setState({ stormEnchantingLine: lineColor });
            setState({ frostEnchanterLine: lineColor });
            setState({ fireEnchanterLine: lineColor });
            if (state.enchanter == 0) {
                SetEnchanterLevel(1);
            }
            if (state.enchanter == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
            if (state.extraEffect == 1){
                setState({stormExtraLine: lineColor})
            }
        } else if (state.extraEffect == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ stormEnchantingLine: lineColor });
            setState({ stormEnchanting: buttonColor }); // Change the pressed button color back and forth
            state.stormEnchanting == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfExtraEffectPressed = (buttonColor, lineColor) => {

        if (state.corpusEnchanter == 0 && state.stormEnchanting == 0 && state.insightfulEnchanter == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ extraEffect: buttonColor });
            setState({ stormEnchanting: buttonColor });
            setState({ frostEnchanter: buttonColor });
            setState({ fireEnchanter: buttonColor });
            setState({ enchanter: buttonColor });
            setState({ stormExtraLine: lineColor });
            setState({ stormEnchantingLine: lineColor });
            setState({ frostEnchanterLine: lineColor });
            setState({ fireEnchanterLine: lineColor });
            
            if (state.enchanter == 0) {
                SetEnchanterLevel(1);
            }
            if (state.frostEnchanter == 1) {
                IncrementCounter(2);
            } else if (state.enchanter == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }

        } else if (state.corpusEnchanter == 1 && state.stormEnchanting == 1){
            setState({ extraEffect : buttonColor });
            setState({ extraEffectLine : lineColor });
            setState({ stormExtraLine : lineColor });

        } else if (state.corpusEnchanter == 1){
            setState({ extraEffect: buttonColor });
            setState({ extraEffectLine: lineColor });

        } else if(state.stormEnchanting == 1){
            setState({ extraEffect : buttonColor });
            setState({ stormExtraLine : lineColor });
        }        
        else {          
            setState({ extraEffect: buttonColor})
            setState({ stormExtraLine: lineColor})
            state.extraEffect == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }

        
};
    const CheckIfInsightfulEnchanterPressed = (buttonColor, lineColor) => {
        if (state.enchanter == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ insightfulEnchanter: buttonColor });
            setState({ enchanter: buttonColor });
            setState({ insightfulEnchanterLine: lineColor });
            IncrementCounter(2);
            if (state.enchanter == 0) {
                SetEnchanterLevel(1);
            }
        } else if (state.corpusEnchanter == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ insightfulEnchanterLine: lineColor });
            setState({ insightfulEnchanter: buttonColor }); // Change the pressed button color back and forth
            state.insightfulEnchanter == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfCorpusEnchanterPressed = (buttonColor, lineColor) => {
        if (state.extraEffect == 1){
            setState({ extraEffectLine: lineColor});
        } 
        if (state.insightfulEnchanter == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ corpusEnchanter: buttonColor });
            setState({ insightfulEnchanter: buttonColor });
            setState({ enchanter: buttonColor });
            setState({ corpusEnchanterLine: lineColor });
            setState({ insightfulEnchanterLine: lineColor });
            if (state.enchanter == 0) {
                SetEnchanterLevel(1);
            }
            if (state.enchanter == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
            
        } 
        
        else {
            setState({ corpusEnchanterLine: lineColor });
            setState({ corpusEnchanter: buttonColor }); // Change the pressed button color back and forth
            state.corpusEnchanter == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfSoulSqueezerPressed = (buttonColor, lineColor) => {
        if (state.corpusEnchanter == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ soulSqueezer: buttonColor });
            setState({ enchanter: buttonColor });
            setState({ soulSqueezerLine: lineColor });
            
            if (state.enchanter == 0) {
                SetEnchanterLevel(1);
            }
            if (state.insightfulEnchanter == 1) {
                IncrementCounter(2);
            } else if (state.enchanter == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else if (state.soulSiphon == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ soulSqueezerLine: lineColor });
            setState({ soulSqueezer: buttonColor }); // Change the pressed button color back and forth
            state.soulSqueezer == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfSoulSiphonPressed = (buttonColor, lineColor) => {
        if (state.soulSqueezer == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ soulSiphon: buttonColor });
            setState({ soulSqueezer: buttonColor });
            setState({ enchanter: buttonColor });
            setState({ soulSiphonLine: lineColor });
            setState({ soulSqueezerLine: lineColor });
            
            if (state.enchanter == 0) {
                SetEnchanterLevel(1);
            }
            if (state.soulSqueezer == 1) {
                IncrementCounter(2);
            } else if (state.enchanter == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(5);
            }
        } else {
            setState({ soulSiphonLine: lineColor });
            setState({ soulSiphon: buttonColor }); // Change the pressed button color back and forth
            state.soulSiphon == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };


    return (
        <View style={{ zIndex: 2 }}>
            <View
                style={styles.resetButtonContainer}>
                <TouchableOpacity style={styles.resetButton} onPress={() => resetActivePerks()}>
                    <Text style={{ color: "white", fontWeight: "bold", }}> Reset Enchanting Perks</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.topText}>
                <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
                <Text style={styles.HomeScreenText}>Required Level: {RequiredLevel} </Text>
            </View>
            <View title='Enchanter Blue' style={{
                position: 'absolute',
                left: "35%",
                top: "75%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Enchanter Gold' style={{
                position: 'absolute',
                left: "35%",
                top: "75%",
                zIndex: 8,
                opacity: state.enchanter

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("EnchanterModal")}
                    onPress={() => {
                        CheckIfEnchanterPressed(
                            state.enchanter == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.EnchanterText}>
                <Text style={styles.PerkText}>Enchanter ({EnchanterLevel}/5)</Text>
            </View>
            <View title='Insightful Enchanter Blue' style={{
                position: 'absolute',
                left: "40%",
                top: "55%",
                zIndex: 8,

            }}>

                <StarIconBlue />
            </View>
            <View title='Insightful Enchanter Gold' style={{
                position: 'absolute',
                left: "40%",
                top: "55%",
                zIndex: 8,
                opacity: state.insightfulEnchanter

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("InsightfulEnchanterModal")}
                    onPress={() => {
                        CheckIfInsightfulEnchanterPressed(
                            state.insightfulEnchanter == 0 ? 1 : 0,
                            state.insightfulEnchanterLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.FireEnchanterText}>
                <Text style={styles.PerkText}>Insightful Enchanter</Text>
            </View>
            <View title='Fire Enchanter Blue' style={{
                position: 'absolute',
                left: "13%",
                top: "60%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Fire Enchanter Gold' style={{
                position: 'absolute',
                left: "13%",
                top: "60%",
                zIndex: 8,
                opacity: state.fireEnchanter

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("FireEnchanterModal")}
                    onPress={() => {
                        CheckIfFireEnchanterPressed(
                            state.fireEnchanter == 0 ? 1 : 0,
                            state.fireEnchanterLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ElvenSmithText}>
                <Text style={styles.PerkText}>Fire Enchanter</Text>
            </View>
            <View title='Frost Enchanter Blue' style={{
                position: 'absolute',
                left: "15%",
                top: "50%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Frost Enchanter Gold' style={{
                position: 'absolute',
                left: "15%",
                top: "50%",
                zIndex: 8,
                opacity: state.frostEnchanter

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("FrostEnchanterModal")}
                    onPress={() => {
                        CheckIfFrostEnchanterPressed(
                            state.frostEnchanter == 0 ? 1 : 0,
                            state.frostEnchanterLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.StormEnchantingText}>
                <Text style={styles.PerkText}>Frost Enchanter</Text>
            </View>
            <View title='Storm Enchanter Blue' style={{
                position: 'absolute',
                left: "24%",
                top: "40%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Storm Enchanter Gold' style={{
                position: 'absolute',
                left: "24%",
                top: "40%",
                zIndex: 8,
                opacity: state.stormEnchanting

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("StormEnchanterModal")}
                    onPress={() => {
                        CheckIfStormEnchantingPressed(
                            state.stormEnchanting == 0 ? 1 : 0,
                            state.stormEnchantingLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ExtraEffectText}>
                <Text style={styles.PerkText}>Storm Enchanter</Text>
            </View>
            <View title='Soul Siphon Blue' style={{
                position: 'absolute',
                left: "64%",
                top: "40%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Soul Siphon Gold' style={{
                position: 'absolute',
                left: "64%",
                top: "40%",
                zIndex: 8,
                opacity: state.soulSiphon

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("SoulSiphonModal")}
                    onPress={() => {
                        CheckIfSoulSiphonPressed(
                            state.soulSiphon == 0 ? 1 : 0,
                            state.soulSiphonLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.SoulSiphonText}>
                <Text style={styles.PerkText}>Soul Siphon</Text>
            </View>
            <View title='Extra Effect Blue' style={{
                position: 'absolute',
                left: "42%",
                top: "32%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Extra Effect Gold' style={{
                position: 'absolute',
                left: "42%",
                top: "32%",
                zIndex: 8,
                opacity: state.extraEffect

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ExtraEffectModal")}
                    onPress={() => {
                        CheckIfExtraEffectPressed(
                            state.extraEffect == 0 ? 1 : 0,
                            state.extraEffectLine == 'white' ? 'gold' : 'white',
                            
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.SoulSqueezerText}>
                <Text style={styles.PerkText}>Extra Effect</Text>
            </View>
            <View title='Corpus Enchanter Blue' style={{
                position: 'absolute',
                left: "50%",
                top: "45%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Corpus Enchanter Gold' style={{
                position: 'absolute',
                left: "50%",
                top: "45%",
                zIndex: 8,
                opacity: state.corpusEnchanter

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("CorpusEnchanterModal")}
                    onPress={() => {
                        CheckIfCorpusEnchanterPressed(
                            state.corpusEnchanter == 0 ? 1 : 0,
                            state.corpusEnchanterLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.CorpusEnchanterText}>
                <Text style={styles.PerkText}>Corpus Enchanter</Text>
            </View>
            <View title='Soul Squeezer Blue' style={{
                position: 'absolute',
                left: "70%",
                top: "60%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Soul Squeezer Gold' style={{
                position: 'absolute',
                left: "70%",
                top: "60%",
                zIndex: 8,
                opacity: state.soulSqueezer

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("SoulSqueezerModal")}
                    onPress={() => {
                        CheckIfSoulSqueezerPressed(
                            state.soulSqueezer == 0 ? 1 : 0,
                            state.soulSqueezerLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.InsightfulEnchanterText}>
                <Text style={styles.PerkText}>Soul Squeezer</Text>
            </View>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} >
                {/*Fire Enchanter */}
                <Line
                    x1="45%"
                    y1="79.2%"
                    x2="50%"
                    y2="60%"
                    stroke={state.insightfulEnchanterLine}
                    strokeWidth={lineStrokeWidth}
                />

                <Line
                    x1="45%"
                    y1="79.3%"
                    x2="24%"
                    y2="65.7%"
                    stroke={state.fireEnchanterLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="23%"
                    y1="65.4%"
                    x2="25.5%"
                    y2="55.6%"
                    stroke={state.frostEnchanterLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="35%"
                    y1="44.5%"
                    x2="24.8%"
                    y2="55.5%"
                    stroke={state.stormEnchantingLine}
                    strokeWidth={lineStrokeWidth}

                />
                
                <Line
                    x1="74%"
                    y1="45.5%"
                    x2="80%"
                    y2="65%"
                    stroke={state.soulSiphonLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="52.8%"
                    y1="38%"
                    x2="60%"
                    y2="50%"
                    stroke={state.extraEffectLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="62%"
                    y1="50%"
                    x2="50%"
                    y2="60%"
                    stroke={state.corpusEnchanterLine}
                    strokeWidth={lineStrokeWidth}

                />
                {/* Soul Squeezer Line */}
                <Line
                    x1="79%"
                    y1="66.5%"
                    x2="45%"
                    y2="80%"
                    stroke={state.soulSqueezerLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="35.2%"
                    y1="45.4%"
                    x2="52.3%"
                    y2="37.8%"
                    stroke={state.stormExtraLine}
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
    EnchanterText: {
        position: 'absolute',
        left: "35%",
        top: "83%",
        zIndex: 10,
    },
    FireEnchanterText: {
        position: 'absolute',
        left: "35%",
        top: "63%",
        zIndex: 10,
    },
    ElvenSmithText: {
        position: 'absolute',
        left: "13.4%",
        top: "68%",
        zIndex: 10,
    },
    StormEnchantingText: {
        position: 'absolute',
        left: "15%",
        top: "50%",
        zIndex: 10,
    },
    ExtraEffectText: {
        position: 'absolute',
        left: "20%",
        top: "40%",
        zIndex: 10,
    },
    SoulSiphonText: {
        position: 'absolute',
        left: "64%",
        top: "40%",
        zIndex: 10,
    },
    SoulSqueezerText: {
        position: 'absolute',
        left: "44%",
        top: "32%",
        zIndex: 10,
    },
    CorpusEnchanterText: {
        position: 'absolute',
        left: "49%",
        top: "53%",
        zIndex: 10,
    },
    InsightfulEnchanterText: {
        position: 'absolute',
        left: "70%",
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

export default Enchanting;