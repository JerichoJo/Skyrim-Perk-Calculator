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

const ArcheryTree = () => {
    const navigation = useNavigation();
    const [state, setState] = useSetState({
        Overdraw: 0,
        SteadyHand: 0,
        SteadyHandLine: 'black',
        HuntersDiscipline: 0,
        HuntersDisciplineLine: 'black',
        Ranger: 0,
        RangerLine: 'black',
        QuickShot: 0,
        QuickShotLine: 'black',        
        Bullseye: 0,
        BullseyeLine: 'black',
        BullseyeDevLine: 'black',
        PowerShot: 0,
        PowerShotLine: 'black',
        EagleEye: 0,
        EagleEyeLine: 'black',
        CriticalShot: 0,
        CriticalShotLine: 'black',
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
        if (state.PowerShot == 1) {
            TrackLevel(100);
        } else if (state.QuickShot == 1) {
            TrackLevel(90);
        } else if (state.Bullseye == 1) {
            TrackLevel(75);
        }  else if (state.EagleEye == 1) {
            TrackLevel(60);
        } else if (state.Ranger == 1) {
            TrackLevel(50);
        } else if (state.SteadyHand == 1) {
            TrackLevel(40);
        } else if (state.HuntersDiscipline == 1) {
            TrackLevel(25);
        } else if (state.CriticalShot == 1) {
            TrackLevel(20);
        }
    }, [TrackLevel, state]);

    const CheckIfOverdrawPressed = (button) => {
        if (
            state.HuntersDiscipline == 1 ||
            state.SteadyHand == 1 ||
            state.EagleEye == 1 ||
            state.CriticalShot == 1
        ) {
            // Do nothing....must un-select nodes above it first
        }
        else {
            setState({ Overdraw: button }); // Change button color back and forth
            state.Overdraw == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfSteadyHandPressed = (button, line) => {
        if (state.Overdraw == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ Overdraw: button });
            setState({ OverdrawLine: line });
            setState({ SteadyHand: button });
            setState({ SteadyHandLine: line });
            IncrementCounter(2);
        } else {
            setState({ SteadyHandLine: line });
            setState({ SteadyHand: button }); // Change the pressed button color back and forth
            state.SteadyHand == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfHuntersDisciplinePressed = (button, line) => {
        if (state.Overdraw == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ Overdraw: button });
            setState({ OverdrawLine: line });
            setState({ HuntersDiscipline: button });
            setState({ HuntersDisciplineLine: line });

            IncrementCounter(2);
        } else if (state.Ranger == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ HuntersDisciplineLine: line });
            setState({ HuntersDiscipline: button }); // Change button color back and forth
            state.HuntersDiscipline == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfRangerPressed = (button, line) => {
        if (state.HuntersDiscipline == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ Overdraw: button });
            setState({ Ranger: button });
            setState({ HuntersDiscipline: button });
            setState({ RangerLine: line });
            setState({ HuntersDisciplineLine: line });
            if (state.Overdraw == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.Bullseye == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ RangerLine: line });
            setState({ Ranger: button }); // Change the pressed button color back and forth
            state.Ranger == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfQuickShotPressed = (button, line) => {
        if (state.HuntersDiscipline == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ Overdraw: button });
            setState({ QuickShot: button });
            setState({ HuntersDiscipline: button });
            setState({ QuickShotLine: line });
            setState({ HuntersDisciplineLine: line });
            if (state.Overdraw == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.Bullseye == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ QuickShotLine: line });
            setState({ QuickShot: button }); // Change the pressed button color back and forth
            state.QuickShot == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };    
    const CheckIfBullseyePressed = (button, line, line2) => {
        if (state.PowerShot == 1 ) {
            // Do nothing....must un-select nodes above it first
        }        
        else if (state.Ranger == 0 && state.QuickShot == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ Bullseye: button });
            setState({ Ranger: button });
            setState({ HuntersDiscipline: button });
            setState({ Overdraw: button });
            setState({ BullseyeDevLine: line });
            setState({ RangerLine: line });
            setState({ HuntersDisciplineLine: line });
            if (state.HuntersDiscipline == 1) {
                IncrementCounter(2);
            } else if (state.Overdraw == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        }
        else if (state.Ranger == 1 && state.QuickShot == 0) {
            setState({ Bullseye: button });
            setState({ BullseyeDevLine: line2 });
            state.Bullseye == 0
            ? IncrementCounter(1)
            : DecrementCounter(1);
        }
        else if (state.Ranger == 0 && state.QuickShot == 1) {
            setState({ Bullseye: button });
            setState({ BullseyeLine: line });
            state.Bullseye == 0
            ? IncrementCounter(1)
            : DecrementCounter(1);
        }      
        else if (state.Ranger == 1 && state.QuickShot == 1){
            setState({ Bullseye: button });
            setState({ BullseyeLine: line });
            setState({ BullseyeDevLine: line2 });
            state.Bullseye == 0
            ? IncrementCounter(1)
            : DecrementCounter(1);
        }    

    };
    const CheckIfPowerShotPressed = (button, line) => {
        if (state.Bullseye == 0 && state.QuickShot == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ PowerShot: button });
            setState({ Bullseye: button });
            setState({ HuntersDiscipline: button });
            setState({ Overdraw: button });  
            setState({ PowerShotLine: line }); 
            setState({ HuntersDisciplineLine: line });
            setState({ Ranger: button });
            setState({ RangerLine: line });
            setState({ BullseyeDevLine: line});
            if (state.Ranger == 1) {
                IncrementCounter(2);
            } else if (state.HuntersDiscipline == 1) {
                IncrementCounter(3);
            } else if (state.Overdraw == 1) {
                IncrementCounter(4);
            } else {
                IncrementCounter(5);
            }
        }                                 
        else if (state.Bullseye == 0 && state.QuickShot == 1){
            setState({ Bullseye: button });    
            setState({ BullseyeLine: line });
            setState({ PowerShot: button });
            setState({ PowerShotLine: line });
            IncrementCounter(2);         
        } 
        else {
            setState({ PowerShotLine: line });
            setState({ PowerShot: button }); // Change the pressed button color back and forth
            state.PowerShot == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfEagleEyePressed = (button, line) => {
        if (state.Overdraw == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ Overdraw: button });
            setState({ OverdrawLine: line });
            setState({ EagleEye: button });
            setState({ EagleEyeLine: line });
            IncrementCounter(2);
        } else {
            setState({ EagleEyeLine: line });
            setState({ EagleEye: button }); // Change the pressed button color back and forth
            state.EagleEye == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfCriticalShotPressed = (button, line) => {
        if (state.Overdraw == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ Overdraw: button });
            setState({ OverdrawLine: line });
            setState({ CriticalShot: button });
            setState({ CriticalShotLine: line });
            IncrementCounter(2);
        } else {
            setState({ CriticalShotLine: line });
            setState({ CriticalShot: button }); // Change the pressed button color back and forth
            state.CriticalShot == 0
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
            <View title='Overdraw Blue' style={{
                position: 'absolute',
                left: "65%",
                top: "80%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Overdraw Gold' style={{
                position: 'absolute',
                left: "65%",
                top: "80%",
                zIndex: 8,
                opacity: state.Overdraw

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("BasicSmithingModal")}
                    onPress={() => {
                        CheckIfOverdrawPressed(
                            state.Overdraw == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.OverdrawText}>
                <Text style={styles.PerkText}>Overdraw</Text>
            </View>
            <View title='SteadyHand Blue' style={{
                position: 'absolute',
                left: "38%",
                top: "65%",
                zIndex: 8,

            }}>

                <StarIconBlue />
            </View>
            <View title='SteadyHand Gold' style={{
                position: 'absolute',
                left: "38%",
                top: "65%",
                zIndex: 8,
                opacity: state.SteadyHand

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ArcaneSmithingModal")}
                    onPress={() => {
                        CheckIfSteadyHandPressed(
                            state.SteadyHand == 0 ? 1 : 0,
                            state.SteadyHandLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.SteadyHandText}>
                <Text style={styles.PerkText}>Steady Hand</Text>
            </View>
            <View title='Hunters Discipline Blue' style={{
                position: 'absolute',
                left: "60%",
                top: "40%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Hunters Discipline Gold' style={{
                position: 'absolute',
                left: "60%",
                top: "40%",
                zIndex: 8,
                opacity: state.HuntersDiscipline

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfHuntersDisciplinePressed(
                            state.HuntersDiscipline == 0 ? 1 : 0,
                            state.HuntersDisciplineLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.HuntersDisciplineText}>
                <Text style={styles.PerkText}>Hunter's Discipline</Text>
            </View>
            <View title='Ranger Blue' style={{
                position: 'absolute',
                left: "55%",
                top: "28%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Ranger Gold' style={{
                position: 'absolute',
                left: "55%",
                top: "28%",
                zIndex: 8,
                opacity: state.Ranger

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfRangerPressed(
                            state.Ranger == 0 ? 1 : 0,
                            state.RangerLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.RangerText}>
                <Text style={styles.PerkText}>Ranger</Text>
            </View>
            <View title='Bullseye Blue' style={{
                position: 'absolute',
                left: "38%",
                top: "20%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Bullseye Gold' style={{
                position: 'absolute',
                left: "38%",
                top: "20%",
                zIndex: 8,
                opacity: state.Bullseye

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfBullseyePressed(
                            state.Bullseye == 0 ? 1 : 0,
                            state.BullseyeLine == 'black' ? 'gold' : 'black',
                            state.BullseyeDevLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.BullseyeText}>
                <Text style={styles.PerkText}>Bullseye</Text>
            </View>
            <View title='PowerShot Blue' style={{
                position: 'absolute',
                left: "5%",
                top: "50%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='PowerShot Gold' style={{
                position: 'absolute',
                left: "5%",
                top: "50%",
                zIndex: 8,
                opacity: state.PowerShot

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfPowerShotPressed(
                            state.PowerShot == 0 ? 1 : 0,
                            state.PowerShotLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.PowerShotText}>
                <Text style={styles.PerkText}>Power Shot</Text>
            </View>

            <View title='Eagle Eye Blue' style={{
                position: 'absolute',
                left: "20%",
                top: "70%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Eagle Eye Gold' style={{
                position: 'absolute',
                left: "20%",
                top: "70%",
                zIndex: 8,
                opacity: state.EagleEye

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfEagleEyePressed(
                            state.EagleEye == 0 ? 1 : 0,
                            state.EagleEyeLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.EagleEyeText}>
                <Text style={styles.PerkText}>Eagle Eye</Text>
            </View>
            <View title='CriticalShot Blue' style={{
                position: 'absolute',
                left: "72%",
                top: "65%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='CriticalShot Gold' style={{
                position: 'absolute',
                left: "72%",
                top: "65%",
                zIndex: 8,
                opacity: state.CriticalShot

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfCriticalShotPressed(
                            state.CriticalShot == 0 ? 1 : 0,
                            state.CriticalShotLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.CriticalShotText}>
                <Text style={styles.PerkText}>Critical Shot</Text>
            </View>

            <View title='Quick Shot Blue' style={{
                position: 'absolute',
                left: "15%",
                top: "25%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Quick Shot Gold' style={{
                position: 'absolute',
                left: "15%",
                top: "25%",
                zIndex: 8,
                opacity: state.QuickShot

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfQuickShotPressed(
                            state.QuickShot == 0 ? 1 : 0,
                            state.QuickShotLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.QuickShotText}>
                <Text style={styles.PerkText}>Quick Shot</Text>
            </View>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} >

                <Line
                    x1="48.2%"
                    y1="85%"
                    x2="15%"
                    y2="66.5%"
                    stroke={state.SteadyHandLine}
                    strokeWidth={lineStrokeWidth}
                />

                <Line
                    x1="48.2%"
                    y1="72%"
                    x2="48.2%"
                    y2="85%"
                    stroke={state.HuntersDisciplineLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="48.2%"
                    y1="72.8%"
                    x2="66%"
                    y2="50%"
                    stroke={state.RangerLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="48.2%"
                    y1="72.8%"
                    x2="29.5%"
                    y2="49%"
                    stroke={state.QuickShotLine}
                    strokeWidth={lineStrokeWidth}

                />                
                <Line
                    x1="30%"
                    y1="50%"
                    x2="48.2%"
                    y2="32%"
                    stroke={state.BullseyeLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="66%"
                    y1="49.5%"
                    x2="48.2%"
                    y2="32%"
                    stroke={state.BullseyeDevLine}
                    strokeWidth={lineStrokeWidth}

                />                
                <Line
                    x1="48.2%"
                    y1="32%"
                    x2="48.2%"
                    y2="20%"
                    stroke={state.PowerShotLine}
                    strokeWidth={lineStrokeWidth}

                />


                <Line
                    x1="68%"
                    y1="65%"
                    x2="48.2%"
                    y2="85%"
                    stroke={state.EagleEyeLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="90%"
                    y1="63%"
                    x2="48.2%"
                    y2="85%"
                    stroke={state.CriticalShotLine}
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
    OverdrawText: {
        position: 'absolute',
        left: "69%",
        top: "88%",
        zIndex: 10,
    },
    SteadyHandText: {
        position: 'absolute',
        left: "40%",
        top: "72%",
        zIndex: 10,
    },
    HuntersDisciplineText: {
        position: 'absolute',
        left: "58%",
        top: "47.5%",
        zIndex: 10,
    },
    QuickShotText: {
        position: 'absolute',
        left: "18%",
        top: "32%",
        zIndex: 10,
    },    
    RangerText: {
        position: 'absolute',
        left: "60.5%",
        top: "35%",
        zIndex: 10,
    },
    BullseyeText: {
        position: 'absolute',
        left: "43%",
        top: "27%",
        zIndex: 10,
    },
    PowerShotText: {
        position: 'absolute',
        left: "8%",
        top: "57%",
        zIndex: 10,
    },

    EagleEyeText: {
        position: 'absolute',
        left: "23.5%",
        top: "77%",
        zIndex: 10,
    },
    CriticalShotText: {
        position: 'absolute',
        left: "74%",
        top: "73%",
        zIndex: 10,
    },
    PerkText: {
        color: 'white',
        fontSize: 12,
    }
});

export default ArcheryTree;