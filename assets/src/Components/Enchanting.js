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
        soulSiphonLine: 'white'
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [count, setCount] = useState(0);

    const [ActivePerks, SetActivePerks] = useState(0);
    const [RequiredLevel, SetRequiredLevel] = useState(0);
    const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);

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
        }
        else {
            setState({ enchanter: button }); // Change button color back and forth
            state.enchanter == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
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
        } else {
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
            setState({ frostEnchanter: buttonColor });
            setState({ frostEnchanterLine: lineColor });

            IncrementCounter(2);
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
            setState({ stormEnchantingLine: lineColor });
            setState({ frostEnchanterLine: lineColor });
            if (state.enchanter == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
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
        if (state.stormEnchanting == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ extraEffect: buttonColor });
            setState({ stormEnchanting: buttonColor });
            setState({ frostEnchanter: buttonColor });
            setState({ enchanter: buttonColor });
            setState({ extraEffectLine: lineColor });
            setState({ stormEnchantingLine: lineColor });
            setState({ frostEnchanterLine: lineColor });
            
            if (state.frostEnchanter == 1) {
                IncrementCounter(2);
            } else if (state.enchanter == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else {
            setState({ extraEffectLine: lineColor });
            setState({ extraEffect: buttonColor }); // Change the pressed button color back and forth
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
        if (state.insightfulEnchanter == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ corpusEnchanter: buttonColor });
            setState({ insightfulEnchanter: buttonColor });
            setState({ enchanter: buttonColor });
            setState({ corpusEnchanterLine: lineColor });
            setState({ insightfulEnchanterLine: lineColor });
            if (state.enchanter == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.soulSqueezer == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
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
            setState({ corpusEnchanter: buttonColor });
            setState({ insightfulEnchanter: buttonColor });
            setState({ enchanter: buttonColor });
            setState({ soulSqueezerLine: lineColor });
            setState({ corpusEnchanterLine: lineColor });
            setState({ insightfulEnchanterLine: lineColor });
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
            setState({ corpusEnchanter: buttonColor });
            setState({ insightfulEnchanter: buttonColor });
            setState({ enchanter: buttonColor });
            setState({ soulSiphonLine: lineColor });
            setState({ soulSqueezerLine: lineColor });
            setState({ corpusEnchanterLine: lineColor });
            setState({ insightfulEnchanterLine: lineColor });
            if (state.corpusEnchanter == 1) {
                IncrementCounter(2);
            } else if (state.insightfulEnchanter == 1) {
                IncrementCounter(3);
            } else if (state.enchanter == 1) {
                IncrementCounter(4);
            } else {
                IncrementCounter(5);
            }
        } else if (state.dragonSmithing == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ soulSiphonLine: lineColor });
            setState({ soulSiphon: buttonColor }); // Change the pressed button color back and forth
            state.soulSiphon == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfDragonSmithingPressed = (buttonColor, lineColor) => {
        if (state.soulSiphon == 0) {
            setState({ dragonSmithing: buttonColor });
            setState({ soulSiphon: buttonColor });
            setState({ soulSqueezer: buttonColor });
            setState({ corpusEnchanter: buttonColor });
            setState({ insightfulEnchanter: buttonColor });
            setState({ enchanter: buttonColor });
            setState({ dragonSmithingLine: lineColor });
            setState({ soulSiphonLine: lineColor });
            setState({ soulSqueezerLine: lineColor });
            setState({ corpusEnchanterLine: lineColor });
            setState({ insightfulEnchanterLine: lineColor });
            if (state.extraEffect == 1) {
                setState({ dragonSmithingLineLight: lineColor });
            }
            if (state.soulSqueezer == 1) {
                IncrementCounter(2);
            } else if (state.corpusEnchanter == 1) {
                IncrementCounter(3);
            } else if (state.insightfulEnchanter == 1) {
                IncrementCounter(4);
            } else if (state.enchanter == 1) {
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
            if (state.extraEffect == 1) {
                setState({ dragonSmithingLineLight: lineColor });
            }
        }
    };

    return (
        <View style={{ zIndex: 2 }}>
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
                <Text style={styles.PerkText}>Enchanter</Text>
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
                opacity: state.fireEnchanter

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("InsightfulEnchanterModal")}
                    onPress={() => {
                        CheckIfFireEnchanterPressed(
                            state.fireEnchanter == 0 ? 1 : 0,
                            state.fireEnchanterLine == 'white' ? 'gold' : 'white'
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
                opacity: state.frostEnchanter

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("FireEnchanterModal")}
                    onPress={() => {
                        CheckIfFrostEnchanterPressed(
                            state.frostEnchanter == 0 ? 1 : 0,
                            state.frostEnchanterLine == 'white' ? 'gold' : 'white'
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
                opacity: state.stormEnchanting

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("FrostEnchanterModal")}
                    onPress={() => {
                        CheckIfStormEnchantingPressed(
                            state.stormEnchanting == 0 ? 1 : 0,
                            state.stormEnchantingLine == 'white' ? 'gold' : 'white'
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
                opacity: state.extraEffect

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("StormEnchanterModal")}
                    onPress={() => {
                        CheckIfExtraEffectPressed(
                            state.extraEffect == 0 ? 1 : 0,
                            state.extraEffectLine == 'white' ? 'gold' : 'white'
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
                        CheckIfSoulSqueezerPressed(
                            state.soulSqueezer == 0 ? 1 : 0,
                            state.soulSqueezerLine == 'white' ? 'gold' : 'white'
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
                opacity: state.insightfulEnchanter

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("SoulSqueezerModal")}
                    onPress={() => {
                        CheckIfInsightfulEnchanterPressed(
                            state.insightfulEnchanter == 0 ? 1 : 0,
                            state.insightfulEnchanterLine == 'white' ? 'gold' : 'white'
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
                    stroke={state.fireEnchanterLine}
                    strokeWidth={lineStrokeWidth}
                />

                <Line
                    x1="45%"
                    y1="79.3%"
                    x2="24%"
                    y2="65.7%"
                    stroke={state.frostEnchanterLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="23%"
                    y1="65.4%"
                    x2="25.5%"
                    y2="55.6%"
                    stroke={state.stormEnchantingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="35%"
                    y1="44.5%"
                    x2="24.8%"
                    y2="55.5%"
                    stroke={state.extraEffectLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="35.3%"
                    y1="39%"
                    x2="53%"
                    y2="39%"
                    stroke={state.dragonSmithingLineLight}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="50.5%"
                    y1="39.3%"
                    x2="74%"
                    y2="45%"
                    stroke={state.dragonSmithingLine}
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
                    stroke={state.soulSqueezerLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="62%"
                    y1="50%"
                    x2="50%"
                    y2="60%"
                    stroke={state.soulSqueezerLine}
                    strokeWidth={lineStrokeWidth}

                />
                {/* Soul Squeezer Line */}
                <Line
                    x1="79%"
                    y1="66.5%"
                    x2="45%"
                    y2="80%"
                    stroke={state.corpusEnchanterLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="35.2%"
                    y1="45.4%"
                    x2="52.3%"
                    y2="37.8%"
                    stroke={state.insightfulEnchanterLine}
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
        bottom: "70%",
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
        left: "33%",
        top: "55%",
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
    DragonArmorText: {
        position: 'absolute',
        left: "44%",
        top: "34%",
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
        left: "50%",
        top: "50%",
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
    }
});

export default Enchanting;