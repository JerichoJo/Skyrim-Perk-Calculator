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
// the next one you should change is the apprenticeAlt variable....it needs to replace all of the apprenticeAlt variables
const AlterationTree = () => {
    const navigation = useNavigation();
    const [ActivePerks, SetActivePerks] = useState(0);
    const [RequiredLevel, SetRequiredLevel] = useState(0);
    const [MageArmorLevel, SetMageArmorLevel] = useState(0);
    const [MagicResisLevel, SetMagicResisLevel] = useState(0);
    const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);
    const [state, setState] = useSetState({
        noviceAlt: 0,
        altDualCasting: 0,
        altDualCastingLine: 'black',
        apprenticeAlt: 0,
        apprenticeAltLine: 'black',
        mageArmor: 0,
        mageArmorLine: 'black',
        magicResis: 0,
        magicResisLine: 'black',
        adeptAlt: 0,
        adeptAltLine: 'black',
        stability: 0,
        stabilityLine: 'black',
        expertAlt: 0,
        expertAltLine: 'black',
        atronach: 0,
        atronachLine: 'black',
        masterAlt: 0,
        masterAltLine: 'black',
    });

    const IncMageArmorCounter = (numActiveMageArmor) => {
        if (MageArmorLevel < 3) {
            SetMageArmorLevel(MageArmorLevel + numActiveMageArmor)
        }
        else {
            SetMageArmorLevel(0) // return to 0 after the perk is maxed out
        }
    }

    // function to control the mage armor perk count (0/3)
    const IncMageArmorCountCall = (buttonColor, lineColor) => {
        if (MageArmorLevel == 0) {
            setState({ mageArmorLine: lineColor });
            setState({ mageArmor: buttonColor }); // Change the pressed button color back and forth
            IncrementCounter(1); // increment active perks by 1 on first click
            IncMageArmorCounter(1); // increment basic smith by 1 on first click
        } else if (MageArmorLevel == 3) {
            setState({ mageArmorLine: lineColor });
            setState({ mageArmor: buttonColor }); // Change the pressed button color back and forth
            IncMageArmorCounter(1); // Increment by one so that it goes back to 0 
            DecrementCounter(3); // decrease active perks back down 3 because it is set back to 0

        } else {
            IncrementCounter(1);
            IncMageArmorCounter(1) // increment by 1 after it perk is active
        }

    }

    const IncMagicResistanceCounter = (numActiveMagicResis) => {
        if (MagicResisLevel < 3) {
            SetMagicResisLevel(MagicResisLevel + numActiveMagicResis)
        }
        else {
            SetMagicResisLevel(0) // return to 0 after the perk is maxed out
        }
    }

    // function to control the Magic Resistance perk count (0/3)
    const IncMagicResisCountCall = (buttonColor, lineColor) => {
        if (MagicResisLevel == 0) {
            setState({ magicResisLine: lineColor });
            setState({ magicResis: buttonColor }); // Change the pressed button color back and forth
            IncrementCounter(1); // increment active perks by 1 on first click
            IncMagicResistanceCounter(1); // increment basic smith by 1 on first click
        } else if (MagicResisLevel == 3) {
            setState({ magicResisLine: lineColor });
            setState({ magicResis: buttonColor }); // Change the pressed button color back and forth
            IncMagicResistanceCounter(1); // Increment by one so that it goes back to 0 
            DecrementCounter(3); // decrease active perks back down 3 because it is set back to 0

        } else {
            IncrementCounter(1);
            IncMagicResistanceCounter(1) // increment by 1 after it perk is active
        }

    }

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
        if (state.masterAlt == 1) {
            TrackLevel(100);
        } else if (state.atronach == 1) {
            TrackLevel(90);
        } else if (state.expertAlt == 1) {
            TrackLevel(80);
        } else if (state.magicResis == 1) {
            TrackLevel(70);
        } else if (state.altDualCasting == 1) {
            TrackLevel(60);
        } else if (state.mageArmor == 1) {
            TrackLevel(50);
        } else if (state.masterAlt == 1) {
            TrackLevel(20);
        } else if (state.noviceAlt == 1) {
            TrackLevel(0);
        }
    }, [TrackLevel, state]);

    useEffect(() => {
        CheckLevel();
    }, [CheckLevel]);




    const CheckIfNoviceAltPressed = (button) => {
        if (
            state.altDualCasting == 1 ||
            state.apprenticeAlt == 1
        ) {
            // Do nothing....must un-select nodes above it first
        }
        else {
            setState({ noviceAlt: button }); // Change button color back and forth
            state.noviceAlt == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfAltDualCastingPressed = (button, line) => {
        if (state.noviceAlt == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceAlt: button });
            setState({ altDualCasting: button });
            setState({ altDualCastingLine: line });
            IncrementCounter(2);
        } else {
            setState({ altDualCastingLine: line });
            setState({ altDualCasting: button }); // Change the pressed button color back and forth
            state.altDualCasting == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfApprenticeAltPressed = (buttonColor, lineColor) => {
        if (state.noviceAlt == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceAlt: buttonColor });
            setState({ apprenticeAlt: buttonColor });
            setState({ apprenticeAltLine: lineColor });
            IncrementCounter(2);
        } else if (state.mageArmor == 1 || state.adeptAlt == 1 || state.magicResis == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ apprenticeAltLine: lineColor });
            setState({ apprenticeAlt: buttonColor }); // Change button color back and forth
            state.apprenticeAlt == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfMageArmorPressed = (buttonColor, lineColor) => {
        if (state.apprenticeAlt == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceAlt: buttonColor });
            setState({ apprenticeAlt: buttonColor });
            setState({ apprenticeAltLine: lineColor });
            setState({ mageArmor: buttonColor });
            setState({ mageArmorLine: lineColor });

            IncMageArmorCountCall(buttonColor, lineColor); // function to control the marge armor perk count (0/3)

            if (state.noviceAlt == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else {
            IncMageArmorCountCall(buttonColor, lineColor); // function to control the marge armor perk count (0/3)
        }
    };
    const CheckIfMagicResisPressed = (buttonColor, lineColor) => {
        if (state.apprenticeAlt == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceAlt: buttonColor });
            setState({ apprenticeAlt: buttonColor });
            setState({ apprenticeAltLine: lineColor });
            setState({ magicResis: buttonColor });
            setState({ magicResisLine: lineColor });
            IncMagicResisCountCall(buttonColor, lineColor); // function to control the Magic Resistance perk count (0/3)

            if (state.noviceAlt == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }

        } else {
            IncMagicResisCountCall(buttonColor, lineColor); // function to control the Magic Resistance perk count (0/3)

        }
    };
    const CheckIfAdeptAltPressed = (buttonColor, lineColor) => {
        if (state.apprenticeAlt == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceAlt: buttonColor });
            setState({ apprenticeAlt: buttonColor });
            setState({ adeptAlt: buttonColor });
            setState({ apprenticeAltLine: lineColor });
            setState({ adeptAltLine: lineColor });
            if (state.noviceAlt == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.stability == 1 || state.expertAlt == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ adeptAltLine: lineColor });
            setState({ adeptAlt: buttonColor }); // Change the pressed button color back and forth
            state.adeptAlt == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfStabilityPressed = (buttonColor, lineColor) => {
        if (state.adeptAlt == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceAlt: buttonColor });
            setState({ apprenticeAlt: buttonColor });
            setState({ adeptAlt: buttonColor });
            setState({ stability: buttonColor });
            setState({ apprenticeAltLine: lineColor });
            setState({ adeptAltLine: lineColor });
            setState({ stabilityLine: lineColor });
            if (state.apprenticeAlt == 1) {
                IncrementCounter(2);
            } else if (state.noviceAlt == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }

        } else {
            setState({ stabilityLine: lineColor });
            setState({ stability: buttonColor }); // Change the pressed button color back and forth
            state.stability == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfExpertAltPressed = (buttonColor, lineColor) => {
        if (state.adeptAlt == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceAlt: buttonColor });
            setState({ apprenticeAlt: buttonColor });
            setState({ adeptAlt: buttonColor });
            setState({ expertAlt: buttonColor });
            setState({ apprenticeAltLine: lineColor });
            setState({ adeptAltLine: lineColor });
            setState({ expertAltLine: lineColor });
            if (state.apprenticeAlt == 1) {
                IncrementCounter(2);
            } else if (state.noviceAlt == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else if (state.masterAlt == 1 || state.atronach == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ expertAltLine: lineColor });
            setState({ expertAlt: buttonColor }); // Change the pressed button color back and forth
            state.expertAlt == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfAtronachPressed = (buttonColor, lineColor) => {
        if (state.expertAlt == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceAlt: buttonColor });
            setState({ apprenticeAlt: buttonColor });
            setState({ adeptAlt: buttonColor });
            setState({ expertAlt: buttonColor });
            setState({ atronach: buttonColor });
            setState({ apprenticeAltLine: lineColor });
            setState({ adeptAltLine: lineColor });
            setState({ expertAltLine: lineColor });
            setState({ atronachLine: lineColor });
            if (state.adeptAlt == 1) {
                IncrementCounter(2);
            } else if (state.apprenticeAlt == 1) {
                IncrementCounter(3);
            } else if (state.noviceAlt == 1) {
                IncrementCounter(4);
            } else {
                IncrementCounter(5);
            }
        } else {
            setState({ atronachLine: lineColor });
            setState({ atronach: buttonColor }); // Change the pressed button color back and forth
            state.atronach == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfMasterAltPressed = (buttonColor, lineColor) => {
        if (state.expertAlt == 0) {
            setState({ noviceAlt: buttonColor });
            setState({ apprenticeAlt: buttonColor });
            setState({ adeptAlt: buttonColor });
            setState({ expertAlt: buttonColor });
            setState({ masterAlt: buttonColor });
            setState({ apprenticeAltLine: lineColor });
            setState({ adeptAltLine: lineColor });
            setState({ expertAltLine: lineColor });
            setState({ masterAltLine: lineColor });
            if (state.adeptAlt == 1) {
                IncrementCounter(2);
            } else if (state.apprenticeAlt == 1) {
                IncrementCounter(3);
            } else if (state.noviceAlt == 1) {
                IncrementCounter(4);
            } else {
                IncrementCounter(5);
            }
        } else {
            setState({ masterAltLine: lineColor });
            setState({ masterAlt: buttonColor });
            state.masterAlt == 0
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
            <View title='Novice Alteration Blue' style={{
                position: 'absolute',
                left: "40%",
                top: "80%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Novice Alteration Gold' style={{
                position: 'absolute',
                left: "40%",
                top: "80%",
                zIndex: 8,
                opacity: state.noviceAlt

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("NoviceAlterationModal")}
                    onPress={() => {
                        CheckIfNoviceAltPressed(
                            state.noviceAlt == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.NoviceAltText}>
                <Text style={styles.PerkText}>Novice Alteration</Text>
            </View>
            <View title='Alteration Dual Casting Blue' style={{
                position: 'absolute',
                left: "18%",
                top: "65%",
                zIndex: 8,

            }}>

                <StarIconBlue />
            </View>
            <View title='Alteration Dual Casting Gold' style={{
                position: 'absolute',
                left: "18%",
                top: "65%",
                zIndex: 8,
                opacity: state.altDualCasting

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("AlterationDualCastingModal")}
                    onPress={() => {
                        CheckIfAltDualCastingPressed(
                            state.altDualCasting == 0 ? 1 : 0,
                            state.altDualCastingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AlterationDualCastingText}>
                <Text style={styles.PerkText}>Alteration Dual Casting</Text>
            </View>
            <View title='Apprentice Alteration Blue' style={{
                position: 'absolute',
                left: "45%",
                top: "60%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Apprentice Alteration Gold' style={{
                position: 'absolute',
                left: "45%",
                top: "60%",
                zIndex: 8,
                opacity: state.apprenticeAlt

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ApprenticeAlterationModal")}
                    onPress={() => {
                        CheckIfApprenticeAltPressed(
                            state.apprenticeAlt == 0 ? 1 : 0,
                            state.apprenticeAltLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ApprenticeAltText}>
                <Text style={styles.PerkText}>Apprentice Alteration</Text>
            </View>
            <View title='Mage Armor Blue' style={{
                position: 'absolute',
                left: "20%",
                top: "46%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Mage Armor Gold' style={{
                position: 'absolute',
                left: "20%",
                top: "46%",
                zIndex: 8,
                opacity: state.mageArmor

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("MageArmorModal")}
                    onPress={() => {
                        CheckIfMageArmorPressed(
                            state.mageArmor == 0 ? 1 : 0,
                            state.mageArmorLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.MageArmorText}>
                <Text style={styles.PerkText}>Mage Armor ({MageArmorLevel}/3)</Text>
            </View>
            <View title='Magic Resistance Blue' style={{
                position: 'absolute',
                left: "70%",
                top: "46%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Magic Resistance Gold' style={{
                position: 'absolute',
                left: "70%",
                top: "46%",
                zIndex: 8,
                opacity: state.magicResis

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("MagicResistanceModal")}
                    onPress={() => {
                        CheckIfMagicResisPressed(
                            state.magicResis == 0 ? 1 : 0,
                            state.magicResisLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.MagicResisText}>
                <Text style={styles.PerkText}>Magic Resistance ({MagicResisLevel}/3)</Text>

            </View>

            <View title='Adept Alteration Blue' style={{
                position: 'absolute',
                left: "40%",
                top: "40%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Adept Alteration Gold' style={{
                position: 'absolute',
                left: "40%",
                top: "40%",
                zIndex: 8,
                opacity: state.adeptAlt

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("AdeptAlterationModal")}
                    onPress={() => {
                        CheckIfAdeptAltPressed(
                            state.adeptAlt == 0 ? 1 : 0,
                            state.adeptAltLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AdeptAltText}>
                <Text style={styles.PerkText}>Adept Alteration</Text>
            </View>

            <View title='Stability Blue' style={{
                position: 'absolute',
                left: "25%",
                top: "32%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Stability Gold' style={{
                position: 'absolute',
                left: "25%",
                top: "32%",
                zIndex: 8,
                opacity: state.stability

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("StabilityModal")}
                    onPress={() => {
                        CheckIfStabilityPressed(
                            state.stability == 0 ? 1 : 0,
                            state.stabilityLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.StabilityText}>
                <Text style={styles.PerkText}>Stability</Text>
            </View>

            <View title='Expert Alteration Blue' style={{
                position: 'absolute',
                left: "56%",
                top: "32%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Expert Alteration Gold' style={{
                position: 'absolute',
                left: "56%",
                top: "32%",
                zIndex: 8,
                opacity: state.expertAlt

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ExpertAlterationModal")}
                    onPress={() => {
                        CheckIfExpertAltPressed(
                            state.expertAlt == 0 ? 1 : 0,
                            state.expertAltLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ExpertAltText}>
                <Text style={styles.PerkText}>Expert Alteration</Text>
            </View>


            <View title='Atronach Blue' style={{
                position: 'absolute',
                left: "10%",
                top: "20%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Atronach Gold' style={{
                position: 'absolute',
                left: "10%",
                top: "20%",
                zIndex: 8,
                opacity: state.atronach

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("AtronachModal")}
                    onPress={() => {
                        CheckIfAtronachPressed(
                            state.atronach == 0 ? 1 : 0,
                            state.atronachLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AtronachText}>
                <Text style={styles.PerkText}>Atronach</Text>
            </View>


            <View title='Master Alteration Blue' style={{
                position: 'absolute',
                left: "78%",
                top: "23%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Master Alteration Gold' style={{
                position: 'absolute',
                left: "78%",
                top: "23%",
                zIndex: 8,
                opacity: state.masterAlt

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("MasterAlterationModal")}
                    onPress={() => {
                        CheckIfMasterAltPressed(
                            state.masterAlt == 0 ? 1 : 0,
                            state.masterAltLine == 'black' ? 'gold' : 'black',
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.MasterAltText}>
                <Text style={styles.PerkText}>Master Alteration</Text>
            </View>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} >

                <Line
                    x1="50%"
                    y1="85%"
                    x2="29%"
                    y2="70%"
                    stroke={state.altDualCastingLine}
                    strokeWidth={lineStrokeWidth}
                />

                <Line
                    x1="51%"
                    y1="85%"
                    x2="56%"
                    y2="65%"
                    stroke={state.apprenticeAltLine}
                    strokeWidth={lineStrokeWidth}
                />

                <Line
                    x1="56%"
                    y1="65%"
                    x2="32%"
                    y2="52%"
                    stroke={state.mageArmorLine}
                    strokeWidth={lineStrokeWidth}

                />

                <Line
                    x1="57%"
                    y1="65%"
                    x2="81%"
                    y2="51%"
                    stroke={state.magicResisLine}
                    strokeWidth={lineStrokeWidth}

                />

                <Line
                    x1="56%"
                    y1="65%"
                    x2="51%"
                    y2="45%"
                    stroke={state.adeptAltLine}
                    strokeWidth={lineStrokeWidth}

                />

                <Line
                    x1="51%"
                    y1="45%"
                    x2="38%"
                    y2="38%"
                    stroke={state.stabilityLine}
                    strokeWidth={lineStrokeWidth}

                />

                <Line
                    x1="51%"
                    y1="45%"
                    x2="67%"
                    y2="37%"
                    stroke={state.expertAltLine}
                    strokeWidth={lineStrokeWidth}

                />

                <Line
                    x1="67%"
                    y1="37%"
                    x2="21%"
                    y2="25%"
                    stroke={state.atronachLine}
                    strokeWidth={lineStrokeWidth}

                />

                <Line
                    x1="67%"
                    y1="37%"
                    x2="87%"
                    y2="29%"
                    stroke={state.masterAltLine}
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
    NoviceAltText: {
        position: 'absolute',
        left: "55%",
        top: "83%",
        zIndex: 10,
    },
    AlterationDualCastingText: {
        position: 'absolute',
        left: "10%",
        top: "72%",
        zIndex: 10,
    },
    ApprenticeAltText: {
        position: 'absolute',
        left: "60%",
        top: "65%",
        zIndex: 10,
    },
    MageArmorText: {
        position: 'absolute',
        left: "20%",
        top: "54%",
        zIndex: 10,
    },
    MagicResisText: {
        position: 'absolute',
        left: "63%",
        top: "54%",
        zIndex: 10,
    },
    AdeptAltText: {
        position: 'absolute',
        left: "45%",
        top: "48%",
        zIndex: 10,
    },
    StabilityText: {
        position: 'absolute',
        left: "20%",
        top: "35%",
        zIndex: 10,
    },
    ExpertAltText: {
        position: 'absolute',
        left: "68%",
        top: "38%",
        zIndex: 10,
    },
    AtronachText: {
        position: 'absolute',
        left: "4%",
        top: "25%",
        zIndex: 10,
    },
    MasterAltText: {
        position: 'absolute',
        left: "60%",
        top: "26%",
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

export default AlterationTree;