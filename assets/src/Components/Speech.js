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

const SpeechTree = () => {
    const navigation = useNavigation();
    const [ActivePerks, SetActivePerks] = useState(0);
    const [RequiredLevel, SetRequiredLevel] = useState(0);
    const [HagglingLevel, SetHagglingLevel] = useState(0);
    const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);
    const [state, setState] = useSetState({
        haggling: 0,
        allure: 0,
        allureLine: 'white',
        merchant: 0,
        merchantLine: 'white',
        investor: 0,
        investorLine: 'white',
        fence: 0,
        fenceLine: 'white',
        masterTrader: 0,
        masterTraderLine: 'white',
        bribery: 0,
        briberyLine: 'white',
        persuasion: 0,
        persuasionLine: 'white',
        intimidation: 0,
        intimidationLine: 'white',
    });

    let resetAllTrees;
    const resetSpeechPerks = () => {
        setState({ haggling: 0 });
        setState({ allure: 0 });
        setState({ allureLine: 'white' });
        setState({ merchant: 0 });
        setState({ merchantLine: 'white' });
        setState({ investor: 0 });
        setState({ investorLine: 'white' });
        setState({ fence: 0 });
        setState({ fenceLine: 'white' });
        setState({ masterTrader: 0 });
        setState({ masterTraderLine: 'white' });
        setState({ bribery: 0 });
        setState({ briberyLine: 'white' });
        setState({ persuasion: 0 });
        setState({ persuasionLine: 'white' });
        setState({ intimidation: 0 });
        setState({ intimidationLine: 'white' });
        SetRequiredLevel(0);
        SetHagglingLevel(0);
    }

    const resetActivePerks = () => {
        resetSpeechPerks();
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
            resetSpeechPerks();
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

    const IncHagglingCounter = (numActiveHaggling) => {
        if (HagglingLevel < 5) {
            SetHagglingLevel(HagglingLevel + numActiveHaggling)
        }
        else {
            SetHagglingLevel(0) // return to 0 after the perk is maxed out
        }
    }

    // function to control the Haggling perk count (0/5)
    const IncHagglingCountCall = (buttonColor) => {
        if (HagglingLevel == 0) {
            setState({ haggling: buttonColor }); // Change the pressed button color back and forth
            IncrementCounter(1); // increment active perks by 1 on first click
            IncHagglingCounter(1); // increment haggling by 1 on first click
        } else if (HagglingLevel == 5) {
            setState({ haggling: buttonColor }); // Change the pressed button color back and forth
            IncHagglingCounter(1); // Increment by one so that it goes back to 0 
            DecrementCounter(5); // decrease active perks back down 3 because it is set back to 0

        } else {
            IncrementCounter(1);
            IncHagglingCounter(1) // increment by 1 after it perk is active
        }

    }

    const TrackLevel = useCallback((level) => {
        SetRequiredLevel(level);
    }, []);

    const lineStrokeWidth = '2';

    const CheckLevel = useCallback(() => {
        if (state.masterTrader == 1) {
            TrackLevel(100);
        } else if (state.fence == 1) {
            TrackLevel(90);
        } else if (HagglingLevel == 5) {
            TrackLevel(80);
        } else if (state.intimidation == 1 || state.investor == 1) {
            TrackLevel(70);
        } else if (HagglingLevel == 4) {
            TrackLevel(60);
        } else if (state.merchant == 1 || state.persuasion == 1) {
            TrackLevel(50);
        } else if (HagglingLevel == 3) {
            TrackLevel(40);
        } else if (state.bribery == 1 || state.allure == 1) {
            TrackLevel(30);
        } else if (HagglingLevel == 2) {
            TrackLevel(20);
        } else if (HagglingLevel == 1) {
            TrackLevel(0);
        }
    }, [state, HagglingLevel]);

    useEffect(() => {
        CheckLevel();
    }, [CheckLevel]);

    const CheckIfHagglingPressed = (button) => {
        if (
            state.allure == 1 ||
            state.bribery == 1
        ) {
            // Do nothing....must un-select nodes above it first
            if (HagglingLevel == 5) {
                DecrementCounter(4); // decrease active perks back down 4 because it is set back to 1
                SetHagglingLevel(1);

            } else {
                IncrementCounter(1);
                IncHagglingCounter(1) // increment by 1 after it perk is active
            }
        }
        else {
            IncHagglingCountCall(button);
        }
    };

    const CheckIfAllurePressed = (button, line) => {
        if (state.haggling == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ haggling: button });
            setState({ allure: button });
            setState({ allureLine: line });
            IncrementCounter(2);
            if (state.haggling == 0) {
                SetHagglingLevel(1);
            }
        } else if (state.merchant == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ allureLine: line });
            setState({ allure: button }); // Change the pressed button color back and forth
            state.allure == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfMerchantPressed = (buttonColor, lineColor) => {
        if (state.allure == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ haggling: buttonColor });
            setState({ allure: buttonColor });
            setState({ merchant: buttonColor });
            setState({ allureLine: lineColor });
            setState({ merchantLine: lineColor });
            if (state.haggling == 0) {
                SetHagglingLevel(1);
            }
            if (state.haggling == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.investor == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ merchantLine: lineColor });
            setState({ merchant: buttonColor }); // Change button color back and forth
            state.merchant == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfInvestorPressed = (buttonColor, lineColor) => {
        if (state.merchant == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ haggling: buttonColor });
            setState({ allure: buttonColor });
            setState({ merchant: buttonColor });
            setState({ merchantLine: lineColor });
            setState({ investor: buttonColor });
            setState({ allureLine: lineColor });
            setState({ merchantLine: lineColor });
            setState({ investorLine: lineColor });
            if (state.haggling == 0) {
                SetHagglingLevel(1);
            }
            if (state.allure == 1) {
                IncrementCounter(2);
            } else if (state.haggling == 1) {
                IncrementCounter(3)
            } else {
                IncrementCounter(4);
            }
        } else if (state.fence == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ investorLine: lineColor });
            setState({ investor: buttonColor }); // Change the pressed button color back and forth
            state.investor == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfFencePressed = (buttonColor, lineColor) => {
        if (state.investor == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ haggling: buttonColor });
            setState({ allure: buttonColor });
            setState({ merchant: buttonColor });
            setState({ investor: buttonColor });
            setState({ fence: buttonColor });
            setState({ allureLine: lineColor });
            setState({ merchantLine: lineColor });
            setState({ investorLine: lineColor });
            setState({ fenceLine: lineColor });
            if (state.haggling == 0) {
                SetHagglingLevel(1);
            }
            if (state.merchant == 1) {
                IncrementCounter(2);
            } else if (state.allure == 1) {
                IncrementCounter(3);
            } else if (state.haggling == 1) {
                IncrementCounter(4);
            } else {
                IncrementCounter(5);
            }
        }
        else if (state.masterTrader == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ fenceLine: lineColor });
            setState({ fence: buttonColor }); // Change the pressed button color back and forth
            state.fence == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfMasterTraderPressed = (buttonColor, lineColor) => {
        if (state.fence == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ haggling: buttonColor });
            setState({ allure: buttonColor });
            setState({ merchant: buttonColor });
            setState({ investor: buttonColor });
            setState({ fence: buttonColor });
            setState({ masterTrader: buttonColor });
            setState({ allureLine: lineColor });
            setState({ merchantLine: lineColor });
            setState({ investorLine: lineColor });
            setState({ fenceLine: lineColor });
            setState({ masterTraderLine: lineColor });
            if (state.haggling == 0) {
                SetHagglingLevel(1);
            }
            if (state.investor == 1) {
                IncrementCounter(2);
            } else if (state.merchant == 1) {
                IncrementCounter(3);
            } else if (state.allure == 1) {
                IncrementCounter(4);
            } else if (state.haggling == 1) {
                IncrementCounter(5)
            } else {
                IncrementCounter(6);
            }
        } else {
            setState({ masterTraderLine: lineColor });
            setState({ masterTrader: buttonColor }); // Change the pressed button color back and forth
            state.masterTrader == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfBriberyPressed = (buttonColor, lineColor) => {
        if (state.haggling == 0) {
            setState({ haggling: buttonColor });
            setState({ bribery: buttonColor });
            setState({ briberyLine: lineColor });
            IncrementCounter(2);
            if (state.haggling == 0) {
                SetHagglingLevel(1);
            }

        } else if (state.persuasion == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ briberyLine: lineColor });
            setState({ bribery: buttonColor });
            state.bribery == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfPersuasionPressed = (buttonColor, lineColor) => {
        if (state.bribery == 0) {
            setState({ haggling: buttonColor });
            setState({ bribery: buttonColor });
            setState({ persuasion: buttonColor });
            setState({ briberyLine: lineColor });
            setState({ persuasionLine: lineColor });
            if (state.haggling == 0) {
                SetHagglingLevel(1);
            }
            if (state.haggling == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.intimidation == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ persuasionLine: lineColor });
            setState({ persuasion: buttonColor });
            state.persuasion == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfIntimidationPressed = (buttonColor, lineColor) => {
        if (state.persuasion == 0) {
            setState({ haggling: buttonColor });
            setState({ bribery: buttonColor });
            setState({ persuasion: buttonColor });
            setState({ intimidation: buttonColor });
            setState({ briberyLine: lineColor });
            setState({ persuasionLine: lineColor });
            setState({ intimidationLine: lineColor });
            if (state.haggling == 0) {
                SetHagglingLevel(1);
            }
            if (state.bribery == 1) {
                IncrementCounter(2);
            } else if (state.haggling == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else {
            setState({ intimidationLine: lineColor });
            setState({ intimidation: buttonColor });
            state.intimidation == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    return (
        <View style={{ zIndex: 2 }}>
            <View
                style={styles.resetButtonContainer}>
                <TouchableOpacity style={styles.resetButton} onPress={() => resetActivePerks()}>
                    <Text style={{ color: "white", fontWeight: "bold", }}> Reset Speech Perks</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.topText}>
                <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
                <Text style={styles.HomeScreenText}>Required Level: {RequiredLevel} </Text>
            </View>
            <View title='Haggling Blue' style={{
                position: 'absolute',
                left: "30%",
                top: "80%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Haggling Gold' style={{
                position: 'absolute',
                left: "30%",
                top: "80%",
                zIndex: 8,
                opacity: state.haggling

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("HagglingModal")}
                    onPress={() => {
                        CheckIfHagglingPressed(
                            state.haggling == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.HagglingText}>
                <Text style={styles.PerkText}>Haggling ({HagglingLevel}/5)</Text>

            </View>
            <View title='Allure Blue' style={{
                position: 'absolute',
                left: "35%",
                top: "65%",
                zIndex: 8,

            }}>

                <StarIconBlue />
            </View>
            <View title='Allure Gold' style={{
                position: 'absolute',
                left: "35%",
                top: "65%",
                zIndex: 8,
                opacity: state.allure

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("AllureModal")}
                    onPress={() => {
                        CheckIfAllurePressed(
                            state.allure == 0 ? 1 : 0,
                            state.allureLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AllureText}>
                <Text style={styles.PerkText}>Allure</Text>
            </View>
            <View title='Merchant Blue' style={{
                position: 'absolute',
                left: "25%",
                top: "50%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Merchant Gold' style={{
                position: 'absolute',
                left: "25%",
                top: "50%",
                zIndex: 8,
                opacity: state.merchant

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("MerchantModal")}
                    onPress={() => {
                        CheckIfMerchantPressed(
                            state.merchant == 0 ? 1 : 0,
                            state.merchantLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.MerchantText}>
                <Text style={styles.PerkText}>Merchant</Text>
            </View>
            <View title='Investor Blue' style={{
                position: 'absolute',
                left: "15%",
                top: "38%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Investor Gold' style={{
                position: 'absolute',
                left: "15%",
                top: "38%",
                zIndex: 8,
                opacity: state.investor

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("InvestorModal")}
                    onPress={() => {
                        CheckIfInvestorPressed(
                            state.investor == 0 ? 1 : 0,
                            state.investorLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.InvestorText}>
                <Text style={styles.PerkText}>Investor</Text>
            </View>
            <View title='Fence Blue' style={{
                position: 'absolute',
                left: "6%",
                top: "28%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Fence Gold' style={{
                position: 'absolute',
                left: "6%",
                top: "28%",
                zIndex: 8,
                opacity: state.fence

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("FenceModal")}
                    onPress={() => {
                        CheckIfFencePressed(
                            state.fence == 0 ? 1 : 0,
                            state.fenceLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.FenceText}>
                <Text style={styles.PerkText}>Fence</Text>
            </View>

            <View title='Master Trader Blue' style={{
                position: 'absolute',
                left: "50%",
                top: "20%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Master Trader Gold' style={{
                position: 'absolute',
                left: "50%",
                top: "20%",
                zIndex: 8,
                opacity: state.masterTrader

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("MasterTraderModal")}
                    onPress={() => {
                        CheckIfMasterTraderPressed(
                            state.masterTrader == 0 ? 1 : 0,
                            state.masterTraderLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.MasterTraderText}>
                <Text style={styles.PerkText}>Master Trader</Text>
            </View>

            <View title='Bribery Blue' style={{
                position: 'absolute',
                left: "60%",
                top: "63%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Bribery Gold' style={{
                position: 'absolute',
                left: "60%",
                top: "63%",
                zIndex: 8,
                opacity: state.bribery

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("BriberyModal")}
                    onPress={() => {
                        CheckIfBriberyPressed(
                            state.bribery == 0 ? 1 : 0,
                            state.briberyLine == 'white' ? 'gold' : 'white',
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.BriberyText}>
                <Text style={styles.PerkText}>Bribery</Text>
            </View>

            <View title='Persuasion Blue' style={{
                position: 'absolute',
                left: "67%",
                top: "48%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Persuasion Gold' style={{
                position: 'absolute',
                left: "67%",
                top: "48%",
                zIndex: 8,
                opacity: state.persuasion

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("PersuasionModal")}
                    onPress={() => {
                        CheckIfPersuasionPressed(
                            state.persuasion == 0 ? 1 : 0,
                            state.persuasionLine == 'white' ? 'gold' : 'white',
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.PersuasionText}>
                <Text style={styles.PerkText}>Persuasion</Text>
            </View>

            <View title='Intimidation Blue' style={{
                position: 'absolute',
                left: "74%",
                top: "34%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Intimidation Gold' style={{
                position: 'absolute',
                left: "74%",
                top: "34%",
                zIndex: 8,
                opacity: state.intimidation

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("IntimidationModal")}
                    onPress={() => {
                        CheckIfIntimidationPressed(
                            state.intimidation == 0 ? 1 : 0,
                            state.intimidationLine == 'white' ? 'gold' : 'white',
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.IntimidationText}>
                <Text style={styles.PerkText}>Intimidation</Text>
            </View>

            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} >

                <Line
                    x1="42%"
                    y1="85%"
                    x2="46%"
                    y2="70%"
                    stroke={state.allureLine}
                    strokeWidth={lineStrokeWidth}
                />

                <Line
                    x1="46%"
                    y1="70%"
                    x2="36%"
                    y2="55%"
                    stroke={state.merchantLine}
                    strokeWidth={lineStrokeWidth}
                />

                <Line
                    x1="36%"
                    y1="55%"
                    x2="27%"
                    y2="44%"
                    stroke={state.investorLine}
                    strokeWidth={lineStrokeWidth}

                />

                <Line
                    x1="27%"
                    y1="44%"
                    x2="18%"
                    y2="34%"
                    stroke={state.fenceLine}
                    strokeWidth={lineStrokeWidth}

                />

                <Line
                    x1="18%"
                    y1="33%"
                    x2="60%"
                    y2="25%"
                    stroke={state.masterTraderLine}
                    strokeWidth={lineStrokeWidth}

                />

                <Line
                    x1="42%"
                    y1="85%"
                    x2="71%"
                    y2="68%"
                    stroke={state.briberyLine}
                    strokeWidth={lineStrokeWidth}

                />

                <Line
                    x1="71%"
                    y1="68%"
                    x2="78%"
                    y2="54%"
                    stroke={state.persuasionLine}
                    strokeWidth={lineStrokeWidth}

                />

                <Line
                    x1="78%"
                    y1="54%"
                    x2="85%"
                    y2="39%"
                    stroke={state.intimidationLine}
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
    HagglingText: {
        position: 'absolute',
        left: "47%",
        top: "83%",
        zIndex: 10,
    },
    AllureText: {
        position: 'absolute',
        left: "32%",
        top: "70%",
        zIndex: 10,
    },
    MerchantText: {
        position: 'absolute',
        left: "17%",
        top: "55%",
        zIndex: 10,
    },
    InvestorText: {
        position: 'absolute',
        left: "9%",
        top: "43%",
        zIndex: 10,
    },
    FenceText: {
        position: 'absolute',
        left: "3%",
        top: "33%",
        zIndex: 10,
    },
    MasterTraderText: {
        position: 'absolute',
        left: "67%",
        top: "25%",
        zIndex: 10,
    },
    BriberyText: {
        position: 'absolute',
        left: "56%",
        top: "66%",
        zIndex: 10,
    },
    PersuasionText: {
        position: 'absolute',
        left: "57%",
        top: "51%",
        zIndex: 10,
    },
    IntimidationText: {
        position: 'absolute',
        left: "62%",
        top: "37%",
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

export default SpeechTree;