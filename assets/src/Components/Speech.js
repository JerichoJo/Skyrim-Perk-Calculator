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
    const [state, setState] = useSetState({
        haggling: 0,
        allure: 0,
        allureLine: 'black',
        merchant: 0,
        merchantLine: 'black',
        investor: 0,
        investorLine: 'black',
        fence: 0,
        fenceLine: 'black',
        masterTrader: 0,
        masterTraderLine: 'black',
        bribery: 0,
        briberyLine: 'black',
        persuasion: 0,
        persuasionLine: 'black',
        intimidation: 0,
        intimidationLine: 'black',
    });

    const [isModalVisible, setIsModalVisible] = useState(false);

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
        if (state.bribery == 1) {
            TrackLevel(100);
        } else if (state.rage == 1) {
            TrackLevel(90);
        } else if (state.aspectOfTerror == 1) {
            TrackLevel(80);
        } else if (state.fence == 1) {
            TrackLevel(70);
        } else if (state.allure == 1) {
            TrackLevel(60);
        } else if (state.investor == 1) {
            TrackLevel(50);
        } else if (state.bribery == 1) {
            TrackLevel(20);
        } else if (state.haggling == 1) {
            TrackLevel(0);
        }
    }, [TrackLevel, state]);

    useEffect(() => {
        CheckLevel();
    }, [CheckLevel]);

    const CheckIfHagglingPressed = (button) => {
        if (
            state.allure == 1 ||
            state.merchant == 1 ||
            state.hypnoticGaze == 1 ||
            state.bribery == 1
        ) {
            // Do nothing....must un-select nodes above it first
        }
        else {
            setState({ haggling: button }); // Change button color back and forth
            state.haggling == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfAllurePressed = (button, line) => {
        if (state.haggling == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ haggling: button });
            setState({ allure: button });
            setState({ allureLine: line });
            IncrementCounter(2);
        } else {
            setState({ allureLine: line });
            setState({ allure: button }); // Change the pressed button color back and forth
            state.allure == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfMerchantPressed = (buttonColor, lineColor) => {
        if (state.haggling == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ haggling: buttonColor });
            setState({ merchant: buttonColor });
            setState({ merchantLine: lineColor });
            IncrementCounter(2);
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
            setState({ merchant: buttonColor });
            setState({ merchantLine: lineColor });
            setState({ investor: buttonColor });
            setState({ investorLine: lineColor });

            if (state.haggling == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
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
            setState({ merchant: buttonColor });
            setState({ investor: buttonColor });
            setState({ fence: buttonColor });
            setState({ merchantLine: lineColor });
            setState({ investorLine: lineColor });
            setState({ fenceLine: lineColor });

            if (state.merchant == 1) {
                IncrementCounter(2);
            } else if (state.haggling == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
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
            setState({ merchant: buttonColor });
            setState({ investor: buttonColor });
            setState({ fence: buttonColor });
            setState({ masterTrader: buttonColor });
            setState({ merchantLine: lineColor });
            setState({ investorLine: lineColor });
            setState({ fenceLine: lineColor });
            setState({ masterTraderLine: lineColor });
            if (state.investor == 1) {
                IncrementCounter(2);
            } else if (state.merchant == 1) {
                IncrementCounter(3);
            } else if (state.haggling == 1) {
                IncrementCounter(4);
            } else {
                IncrementCounter(5);
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
            if (state.masterOfMind == 1) {
                setState({ masterOfMindLine2: lineColor });
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
            if (state.masterOfMind == 1) {
                setState({ masterOfMindLine2: lineColor });
            }
        }
    };

    return (
        <View style={{ zIndex: 2 }}>
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
                    onLongPress={() => navigation.navigate("BasicSmithingModal")}
                    onPress={() => {
                        CheckIfHagglingPressed(
                            state.haggling == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.hagglingionText}>

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
                    onLongPress={() => navigation.navigate("ArcaneSmithingModal")}
                    onPress={() => {
                        CheckIfAllurePressed(
                            state.allure == 0 ? 1 : 0,
                            state.allureLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AllureText}>

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
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfMerchantPressed(
                            state.merchant == 0 ? 1 : 0,
                            state.merchantLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.MerchantText}>

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
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfInvestorPressed(
                            state.investor == 0 ? 1 : 0,
                            state.investorLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.InvestorText}>

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
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfFencePressed(
                            state.fence == 0 ? 1 : 0,
                            state.fenceLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.FenceText}>

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
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfMasterTraderPressed(
                            state.masterTrader == 0 ? 1 : 0,
                            state.masterTraderLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.MasterTraderText}>

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
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfBriberyPressed(
                            state.bribery == 0 ? 1 : 0,
                            state.briberyLine == 'black' ? 'gold' : 'black',
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.briberyText}>

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
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfPersuasionPressed(
                            state.persuasion == 0 ? 1 : 0,
                            state.persuasionLine == 'black' ? 'gold' : 'black',
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.PersuasionText}>

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
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfIntimidationPressed(
                            state.intimidation == 0 ? 1 : 0,
                            state.intimidationLine == 'black' ? 'gold' : 'black',
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.IntimidationText}>

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
    HagglingText: {
        position: 'absolute',
        left: "25%",
        top: "83%",
        zIndex: 10,
    },
    AllureText: {
        position: 'absolute',
        left: "33%",
        top: "55%",
        zIndex: 10,
    },
    MerchantText: {
        position: 'absolute',
        left: "13%",
        top: "53%",
        zIndex: 10,
    },
    InvestorText: {
        position: 'absolute',
        left: "20%",
        top: "46%",
        zIndex: 10,
    },
    FenceText: {
        position: 'absolute',
        left: "24%",
        top: "34%",
        zIndex: 10,
    },
    MasterTraderText: {
        position: 'absolute',
        left: "50%",
        top: "60%",
        zIndex: 10,
    },
    BriberyText: {
        position: 'absolute',
        left: "44%",
        top: "34%",
        zIndex: 10,
    },
    PersuasionText: {
        position: 'absolute',
        left: "55%",
        top: "65%",
        zIndex: 10,
    },
    IntimidationText: {
        position: 'absolute',
        left: "60%",
        top: "70%",
        zIndex: 10,
    },

    PerkText: {
        color: 'white',
        fontSize: 12,
    }
});

export default SpeechTree;