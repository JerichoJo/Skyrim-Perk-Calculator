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
    const [state, setState] = useSetState({
        noviceIllus: 0,
        illusionDual: 0,
        illusionDualLine: 'black',
        apprenticeIllus: 0,
        apprenticeIllusLine: 'black',
        adeptIllus: 0,
        adeptIllusLine: 'black',
        expertIllus: 0,
        expertIllusLine: 'black',
        masterIllus: 0,
        masterIllusLine: 'black',

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
        if (state.animage == 1) {
            TrackLevel(100);
        } else if (state.rage == 1) {
            TrackLevel(90);
        } else if (state.aspectOfTerror == 1) {
            TrackLevel(80);
        } else if (state.expertIllus == 1) {
            TrackLevel(70);
        } else if (state.illusionDual == 1) {
            TrackLevel(60);
        } else if (state.adeptIllus == 1) {
            TrackLevel(50);
        } else if (state.animage == 1) {
            TrackLevel(20);
        } else if (state.noviceIllus == 1) {
            TrackLevel(0);
        }
    }, [TrackLevel, state]);

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

    return (
        <View style={{ zIndex: 2 }}>
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
                    onLongPress={() => navigation.navigate("BasicSmithingModal")}
                    onPress={() => {
                        CheckIfNoviceIllusPressed(
                            state.noviceIllus == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.NoviceIllusionText}>

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
                    onLongPress={() => navigation.navigate("ArcaneSmithingModal")}
                    onPress={() => {
                        CheckIfillusionDualPressed(
                            state.illusionDual == 0 ? 1 : 0,
                            state.illusionDualLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.DualCastingText}>

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
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfApprenticeIllusPressed(
                            state.apprenticeIllus == 0 ? 1 : 0,
                            state.apprenticeIllusLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ElvenSmithText}>

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
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfAdeptIllusPressed(
                            state.adeptIllus == 0 ? 1 : 0,
                            state.adeptIllusLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AdeptIllusionText}>

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
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfExpertIllusPressed(
                            state.expertIllus == 0 ? 1 : 0,
                            state.expertIllusLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ExpertIllusText}>

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
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfMasterIllusPressed(
                            state.masterIllus == 0 ? 1 : 0,
                            state.masterIllusLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.MasterIllusText}>

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
    NoviceIllusionText: {
        position: 'absolute',
        left: "25%",
        top: "83%",
        zIndex: 10,
    },
    DualCastingText: {
        position: 'absolute',
        left: "33%",
        top: "55%",
        zIndex: 10,
    },
    ElvenSmithText: {
        position: 'absolute',
        left: "13%",
        top: "53%",
        zIndex: 10,
    },
    AdeptIllusionText: {
        position: 'absolute',
        left: "20%",
        top: "46%",
        zIndex: 10,
    },
    ExpertIllusText: {
        position: 'absolute',
        left: "24%",
        top: "34%",
        zIndex: 10,
    },
    MasterIllusText: {
        position: 'absolute',
        left: "50%",
        top: "60%",
        zIndex: 10,
    },

    PerkText: {
        color: 'white',
        fontSize: 12,
    }
});

export default LightArmorTree;