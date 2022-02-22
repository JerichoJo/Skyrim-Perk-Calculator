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

const ConjurationTree = () => {
    const navigation = useNavigation();
    const [state, setState] = useSetState({
        noviceConjuration: 0,
        conjurationDualCasting: 0,
        conjurationDualCastingLine: 'black',
        noviceConjurationLine: 'black',
        necromancy: 0,
        necromancyLine:'black',
        darkSouls: 0,
        darkSoulsLine: 'black',
        twinSouls: 0,
        twinSoulsLine: 'black',
        mysticBinding: 0,
        mysticBindingLine: 'black',
        soulStealer: 0,
        soulStealerLine: 'black',
        oblivionBinding: 0,
        oblivionBindingLine: 'black',
        oblivionBindingLineLight: 'black',
        summoner: 0,
        summonerLine: 'black',
        atromancy: 0,
        atromancyLine: 'black',
        elementalPotency: 0,
        elementalPotencyLine: 'black',
        apprenticeConjuration: 0,
        apprenticeConjurationLine: 'black',
        adeptConjuration: 0,
        adeptConjurationLine: 'black',
        expertConjuration: 0,
        expertConjurationLine: 'black',
        masterConjuration: 0,
        masterConjurationLine: 'black',

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
        if (state.oblivionBinding == 1) {
            TrackLevel(100);
        } else if (state.masterConjuration == 1) {
            TrackLevel(90);
        } else if (state.expertConjuration == 1) {
            TrackLevel(80);
        } else if (state.elementalPotency == 1) {
            TrackLevel(70);
        } else if (state.conjurationDualCasting == 1) {
            TrackLevel(60);
        } else if (state.atromancy == 1) {
            TrackLevel(50);
        } else if (state.summoner == 1) {
            TrackLevel(30);
        } else if (state.noviceConjuration == 1) {
            TrackLevel(0);
        }
    }, [TrackLevel, state]);

    useEffect(() => {
        CheckLevel();
    }, [CheckLevel]);

    const CheckIfNoviceConjurationPressed = (button) => {
        if (
            state.summoner == 1 ||
            state.conjurationDualCasting == 1 ||
            state.apprenticeConjuration == 1 ||
            state.necromancy == 1 ||
            state.mysticBinding == 1
        ) {
            // Do nothing....must un-select nodes above it first
        }
        else {
            setState({ noviceConjuration: button }); // Change button color back and forth
            state.noviceConjuration == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfConjurationDualCastingPressed = (button, line) => {
        if (state.noviceConjuration == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceConjuration: button });
            setState({ noviceConjurationLine: line });
            setState({ conjurationDualCasting: button });
            setState({ conjurationDualCastingLine: line });
            IncrementCounter(2);
        } else {
            setState({ conjurationDualCastingLine: line });
            setState({ conjurationDualCasting: button }); // Change the pressed button color back and forth
            state.conjurationDualCasting == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfMysticBindingPressed = (button, line) => {
        if (state.noviceConjuration == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceConjuration: button });
            setState({ noviceConjurationLine: line });
            setState({ mysticBinding: button });
            setState({ mysticBindingLine: line });
            IncrementCounter(2);
        }else if (state.soulStealer == 1) {
            // Do nothing....must un-select nodes above it first
        }        
        else {
            setState({ mysticBindingLine: line });
            setState({ mysticBinding: button }); // Change the pressed button color back and forth
            state.mysticBinding == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfNecromancyPressed = (buttonColor, lineColor) => {
        if (state.noviceConjuration == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceConjuration: buttonColor });
            setState({ noviceConjurationLine: lineColor });
            setState({ necromancy: buttonColor });
            setState({ necromancyLine: lineColor });

            IncrementCounter(2);
        } else if (state.darkSouls == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ necromancyLine: lineColor });
            setState({ necromancy: buttonColor }); // Change button color back and forth
            state.necromancy == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };

    const CheckIfDarkSoulsPressed = (buttonColor, lineColor) => {
        if (state.necromancy == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceConjuration: buttonColor });
            setState({ darkSouls: buttonColor });
            setState({ necromancy: buttonColor });
            setState({ darkSoulsLine: lineColor });
            setState({ necromancyLine: lineColor });
            if (state.noviceConjuration == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.twinSouls == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ darkSoulsLine: lineColor });
            setState({ darkSouls: buttonColor }); // Change the pressed button color back and forth
            state.darkSouls == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfSoulStealerPressed = (buttonColor, lineColor) => {
        if (state.mysticBinding == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceConjuration: buttonColor });
            setState({ soulStealer: buttonColor });
            setState({ mysticBinding: buttonColor });
            setState({ soulStealerLine: lineColor });
            setState({ mysticBindingLine: lineColor });
            if (state.noviceConjuration == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.oblivionBinding == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ soulStealerLine: lineColor });
            setState({ soulStealer: buttonColor }); // Change the pressed button color back and forth
            state.soulStealer == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };

    const CheckIfTwinSoulsPressed = (buttonColor, lineColor) => {
        if (state.darkSouls == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceConjuration: buttonColor });
            setState({ darkSouls: buttonColor });
            setState({ necromancy: buttonColor });
            setState({ twinSouls: buttonColor });
            setState({ darkSoulsLine: lineColor });
            setState({ necromancyLine: lineColor });
            setState({ twinSouls: lineColor });
            if (state.noviceConjuration == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.elementalPotency == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ twinSoulsLine: lineColor });
            setState({ twinSouls: buttonColor }); // Change the pressed button color back and forth
            state.twinSouls == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };

    const CheckIfSummonerPressed = (buttonColor, lineColor) => {
        if (state.noviceConjuration == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceConjuration: buttonColor });
            setState({ noviceConjurationLine: lineColor });
            setState({ summoner: buttonColor });
            setState({ summonerLine: lineColor });

            IncrementCounter(2);
        } else if (state.atromancy == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ summonerLine: lineColor });
            setState({ summoner: buttonColor }); // Change button color back and forth
            state.summoner == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfAtromancyPressed = (buttonColor, lineColor) => {
        if (state.summoner == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ noviceConjuration: buttonColor });
            setState({ atromancy: buttonColor });
            setState({ summoner: buttonColor });
            setState({ atromancyLine: lineColor });
            setState({ summonerLine: lineColor });
            if (state.noviceConjuration == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.elementalPotency == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ atromancyLine: lineColor });
            setState({ atromancy: buttonColor }); // Change the pressed button color back and forth
            state.atromancy == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfElementalPotencyPressed = (buttonColor, lineColor) => {
        if (state.atromancy == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ elementalPotency: buttonColor });
            setState({ atromancy: buttonColor });
            setState({ summoner: buttonColor });
            setState({ noviceConjuration: buttonColor });
            setState({ elementalPotencyLine: lineColor });
            setState({ atromancyLine: lineColor });
            setState({ summonerLine: lineColor });
            if (state.oblivionBinding == 1) {
                setState({ oblivionBindingLineLight: lineColor });
            }
            if (state.summoner == 1) {
                IncrementCounter(2);
            } else if (state.noviceConjuration == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else {
            setState({ elementalPotencyLine: lineColor });
            setState({ elementalPotency: buttonColor }); // Change the pressed button color back and forth
            state.elementalPotency == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
            if (state.oblivionBinding == 1) {
                setState({ oblivionBindingLineLight: lineColor });
            }

        }
    };
    const CheckIfApprenticeConjurationPressed = (buttonColor, lineColor) => {
        if (state.noviceConjuration == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ apprenticeConjuration: buttonColor });
            setState({ noviceConjuration: buttonColor });
            setState({ apprenticeConjurationLine: lineColor });
            IncrementCounter(2);
        } else if (state.adeptConjuration == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ apprenticeConjurationLine: lineColor });
            setState({ apprenticeConjuration: buttonColor }); // Change the pressed button color back and forth
            state.apprenticeConjuration == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfAdeptConjurationPressed = (buttonColor, lineColor) => {
        if (state.apprenticeConjuration == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ adeptConjuration: buttonColor });
            setState({ apprenticeConjuration: buttonColor });
            setState({ noviceConjuration: buttonColor });
            setState({ adeptConjurationLine: lineColor });
            setState({ apprenticeConjurationLine: lineColor });
            if (state.noviceConjuration == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.expertConjuration == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ adeptConjurationLine: lineColor });
            setState({ adeptConjuration: buttonColor }); // Change the pressed button color back and forth
            state.adeptConjuration == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfExpertConjurationPressed = (buttonColor, lineColor) => {
        if (state.adeptConjuration == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ expertConjuration: buttonColor });
            setState({ adeptConjuration: buttonColor });
            setState({ apprenticeConjuration: buttonColor });
            setState({ noviceConjuration: buttonColor });
            setState({ expertConjurationLine: lineColor });
            setState({ adeptConjurationLine: lineColor });
            setState({ apprenticeConjurationLine: lineColor });
            if (state.apprenticeConjuration == 1) {
                IncrementCounter(2);
            } else if (state.noviceConjuration == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
            }
        } else if (state.masterConjuration == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ expertConjurationLine: lineColor });
            setState({ expertConjuration: buttonColor }); // Change the pressed button color back and forth
            state.expertConjuration == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfMasterConjurationPressed = (buttonColor, lineColor) => {
        if (state.expertConjuration == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ masterConjuration: buttonColor });
            setState({ expertConjuration: buttonColor });
            setState({ adeptConjuration: buttonColor });
            setState({ apprenticeConjuration: buttonColor });
            setState({ noviceConjuration: buttonColor });
            setState({ masterConjurationLine: lineColor });
            setState({ expertConjurationLine: lineColor });
            setState({ adeptConjurationLine: lineColor });
            setState({ apprenticeConjurationLine: lineColor });
            if (state.adeptConjuration == 1) {
                IncrementCounter(2);
            } else if (state.apprenticeConjuration == 1) {
                IncrementCounter(3);
            } else if (state.noviceConjuration == 1) {
                IncrementCounter(4);
            } else {
                IncrementCounter(5);
            }
        } else if (state.oblivionBinding == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ masterConjurationLine: lineColor });
            setState({ masterConjuration: buttonColor }); // Change the pressed button color back and forth
            state.masterConjuration == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfOblivionBindingPressed = (buttonColor, lineColor) => {
        if (state.soulStealer == 0) {
            setState({ oblivionBinding: buttonColor });
            setState({ soulStealer: buttonColor });
            setState({ mysticBinding: buttonColor });
            setState({ noviceConjuration: buttonColor });
            setState({ oblivionBindingLine: lineColor });
            setState({ soulStealerLine: lineColor });
            setState({ mysticBindingLine: lineColor });
            setState({ noviceConjurationLine: lineColor });
            if (state.soulStealer == 1) {
                setState({ oblivionBindingLineLight: lineColor });
            }
            if (state.expertConjuration == 1) {
                IncrementCounter(2);
            } else if (state.adeptConjuration == 1) {
                IncrementCounter(3);
            } else if (state.apprenticeConjuration == 1) {
                IncrementCounter(4);
            } else if (state.noviceConjuration == 1) {
                IncrementCounter(5);
            } else {
                IncrementCounter(6);
            }
        } else {
            setState({ oblivionBindingLine: lineColor });
            setState({ oblivionBinding: buttonColor });
            state.oblivionBinding == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
            if (state.soulStealer == 1) {
                setState({ oblivionBindingLineLight: lineColor });
            }
        }
    };

    return (
        <View style={{ zIndex: 2 }}>
            <View style={styles.topText}>
                <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
                <Text style={styles.HomeScreenText}>Required Level: {RequiredLevel} </Text>
            </View>
            <View title='Novice Conjuration Blue' style={{
                position: 'absolute',
                left: "50%",
                top: "80%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Novice Conjuration Gold' style={{
                position: 'absolute',
                left: "50%",
                top: "80%",
                zIndex: 8,
                opacity: state.noviceConjuration

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("noviceConjurationModal")}
                    onPress={() => {
                        CheckIfNoviceConjurationPressed(
                            state.noviceConjuration == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.NoviceConjurationText}>
                <Text style={styles.PerkText}>Novice Conjuration</Text>
            </View>
            <View title='Conjuration Dual Casting Blue' style={{
                position: 'absolute',
                left: "23%",
                top: "64%",
                zIndex: 8,

            }}>

                <StarIconBlue />
            </View>
            <View title='Conjuration Dual Casting Gold' style={{
                position: 'absolute',
                left: "23%",
                top: "64%",
                zIndex: 8,
                opacity: state.conjurationDualCasting

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("conjurationDualCastingModal")}
                    onPress={() => {
                        CheckIfConjurationDualCastingPressed(
                            state.conjurationDualCasting == 0 ? 1 : 0,
                            state.conjurationDualCastingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ConjurationDualCastingText}>
                <Text style={styles.PerkText}>Conjuration Dual Casting</Text>
            </View>
            <View title='Necromancy Blue' style={{
                position: 'absolute',
                left: "17%",
                top: "42%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Necromancy Gold' style={{
                position: 'absolute',
                left: "17%",
                top: "42%",
                zIndex: 8,
                opacity: state.necromancy

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfNecromancyPressed(
                            state.necromancy == 0 ? 1 : 0,
                            state.necromancyLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.NecromancyText}>
                <Text style={styles.PerkText}>Necromancy</Text>
            </View>
            <View title='Dark Souls Blue' style={{
                position: 'absolute',
                left: "17%",
                top: "32.4%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Dark Souls Gold' style={{
                position: 'absolute',
                left: "17%",
                top: "32.4%",
                zIndex: 8,
                opacity: state.darkSouls

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfDarkSoulsPressed(
                            state.darkSouls == 0 ? 1 : 0,
                            state.darkSoulsLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.DarkSoulsText}>
                <Text style={styles.PerkText}>Dark Souls</Text>
            </View>
            <View title='Twin Souls Blue' style={{
                position: 'absolute',
                left: "20%",
                top: "24.4%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Twin Souls Gold' style={{
                position: 'absolute',
                left: "20%",
                top: "24.4%",
                zIndex: 8,
                opacity: state.twinSouls

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfDarkSoulsPressed(
                            state.darkSouls == 0 ? 1 : 0,
                            state.darkSoulsLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.TwinSoulsText}>
                <Text style={styles.PerkText}>Twin Souls</Text>
            </View>

            <View title='Mystic Binding Blue' style={{
                position: 'absolute',
                left: "52%",
                top: "63%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Mystic Binding Gold' style={{
                position: 'absolute',
                left: "52%",
                top: "63%",
                zIndex: 8,
                opacity: state.mysticBinding

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfMysticBindingPressed(
                            state.mysticBinding == 0 ? 1 : 0,
                            state.mysticBindingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.MysticBindingText}>
                <Text style={styles.PerkText}>Mystic Binding</Text>
            </View>
            <View title='Soul Stealer Blue' style={{
                position: 'absolute',
                left: "54%",
                top: "46%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Soul Stealer Gold' style={{
                position: 'absolute',
                left: "54%",
                top: "46%",
                zIndex: 8,
                opacity: state.soulStealer

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfSoulStealerPressed(
                            state.soulStealer == 0 ? 1 : 0,
                            state.soulStealerLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.SoulStealerText}>
                <Text style={styles.PerkText}>Soul Stealer</Text>
            </View>

            <View title='Summoner Blue' style={{
                position: 'absolute',
                left: "2%",
                top: "60%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Summoner Gold' style={{
                position: 'absolute',
                left: "2%",
                top: "60%",
                zIndex: 8,
                opacity: state.summoner

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfSummonerPressed(
                            state.summoner == 0 ? 1 : 0,
                            state.summonerLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.SummonerText}>
                <Text style={styles.PerkText}>Summoner</Text>
            </View>
            
            <View title='Atromancy Blue' style={{
                position: 'absolute',
                left: "-3%",
                top: "43%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            
            <View title='Atromancy Gold' style={{
                position: 'absolute',
                left: "-3%",
                top: "43%",
                zIndex: 8,
                opacity: state.atromancy

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfAtromancyPressed(
                            state.atromancy == 0 ? 1 : 0,
                            state.atromancyLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AtromancyText}>
                <Text style={styles.PerkText}>Atromancy</Text>
            </View>
            <View title='Elemental Potency Blue' style={{
                position: 'absolute',
                left: "2%",
                top: "34%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Elemental Potency Gold' style={{
                position: 'absolute',
                left: "2%",
                top: "34%",
                zIndex: 8,
                opacity: state.elementalPotency

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfElementalPotencyPressed(
                            state.elementalPotency == 0 ? 1 : 0,
                            state.elementalPotencyLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ElementalPotencyText}>
                <Text style={styles.PerkText}>Elemental Potency</Text>
            </View>
            <View title='Oblivion Binding Blue' style={{
                position: 'absolute',
                left: "50%",
                top: "38%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Oblivion Binding Gold' style={{
                position: 'absolute',
                left: "50%",
                top: "38%",
                zIndex: 8,
                opacity: state.oblivionBinding

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfOblivionBindingPressed(
                            state.oblivionBinding == 0 ? 1 : 0,
                            state.oblivionBindingLine == 'black' ? 'gold' : 'black',
                            state.oblivionBindingLineLight == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.OblivionBindingText}>
                <Text style={styles.PerkText}>Oblivion Binding</Text>
            </View>
            <View title='Master Conjuration Blue' style={{
                position: 'absolute',
                left: "55%",
                top: "28%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Master Conjuration Gold' style={{
                position: 'absolute',
                left: "55%",
                top: "28%",
                zIndex: 8,
                opacity: state.masterConjuration

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfMasterConjurationPressed(
                            state.masterConjuration == 0 ? 1 : 0,
                            state.masterConjurationLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.MasterConjurationText}>
                <Text style={styles.PerkText}>Master Conjuration</Text>
            </View>
            <View title='Expert Conjuration Blue' style={{
                position: 'absolute',
                left: "72%",
                top: "38%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Expert Conjuration Gold' style={{
                position: 'absolute',
                left: "72%",
                top: "38%",
                zIndex: 8,
                opacity: state.expertConjuration

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfExpertConjurationPressed(
                            state.expertConjuration == 0 ? 1 : 0,
                            state.expertConjurationLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ExpertConjurationText}>
                <Text style={styles.PerkText}>Expert Conjuration</Text>
            </View>
            <View title='Adept Conjuration Blue' style={{
                position: 'absolute',
                left: "75%",
                top: "48%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Adept Conjuration Gold' style={{
                position: 'absolute',
                left: "75%",
                top: "48%",
                zIndex: 8,
                opacity: state.adeptConjuration

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfAdeptConjurationPressed(
                            state.adeptConjuration == 0 ? 1 : 0,
                            state.adeptConjurationLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AdeptConjurationText}>
                <Text style={styles.PerkText}>Adept Conjuration</Text>
            </View>
            <View title='Apprentice Conjuration Blue' style={{
                position: 'absolute',
                left: "70%",
                top: "59%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Apprentice Conjuration Gold' style={{
                position: 'absolute',
                left: "70%",
                top: "59%",
                zIndex: 8,
                opacity: state.apprenticeConjuration

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfApprenticeConjurationPressed(
                            state.apprenticeConjuration == 0 ? 1 : 0,
                            state.apprenticeConjurationLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ApprenticeConjurationText}>
                <Text style={styles.PerkText}>Apprentice Conjuration</Text>
            </View>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} >

                <Line
                    x1="60.3%"
                    y1="85.2%"
                    x2="34%"
                    y2="70%"
                    stroke={state.conjurationDualCastingLine}
                    strokeWidth={lineStrokeWidth}
                />

                <Line
                    x1="60.2%"
                    y1="85.3%"
                    x2="28.5%"
                    y2="48.7%"
                    stroke={state.necromancyLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="27%"
                    y1="48.3%"
                    x2="27%"
                    y2="38.7%"
                    stroke={state.darkSoulsLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="27%"
                    y1="38.3%"
                    x2="27%"
                    y2="38.7%"
                    stroke={state.twinSoulsLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="60.2%"
                    y1="85.3%"
                    x2="62.5%"
                    y2="68.7%"
                    stroke={state.mysticBindingLine}
                    strokeWidth={lineStrokeWidth}

                />

                <Line
                    x1="64.2%"
                    y1="52.3%"
                    x2="63%"
                    y2="67.7%"
                    stroke={state.soulStealerLine}
                    strokeWidth={lineStrokeWidth}

                />  

                <Line
                    x1="60.2%"
                    y1="85.3%"
                    x2="12.5%"
                    y2="65.7%"
                    stroke={state.summonerLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="12.4%"
                    y1="65.4%"
                    x2="8%"
                    y2="48.6%"
                    stroke={state.atromancyLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="8%"
                    y1="47.5%"
                    x2="11.8%"
                    y2="40.5%"
                    stroke={state.elementalPotencyLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="35.3%"
                    y1="39%"
                    x2="53%"
                    y2="39%"
                    stroke={state.oblivionBinding.LineLight}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="64.5%"
                    y1="51.3%"
                    x2="61%"
                    y2="44%"
                    stroke={state.oblivionBindingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="65%"
                    y1="33.5%"
                    x2="82%"
                    y2="43%"
                    stroke={state.masterConjurationLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="83%"
                    y1="43%"
                    x2="85%"
                    y2="52%"
                    stroke={state.expertConjurationLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="85%"
                    y1="54.5%"
                    x2="80%"
                    y2="65%"
                    stroke={state.adeptConjurationLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="80.2%"
                    y1="65.4%"
                    x2="60.3%"
                    y2="85.9%"
                    stroke={state.apprenticeConjurationLine}
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
    NoviceConjurationText: {
        position: 'absolute',
        left: "25%",
        top: "83%",
        zIndex: 10,
    },
    ConjurationDualCastingText: {
        position: 'absolute',
        left: "20%",
        top: "73%",
        zIndex: 10,
    },
    NecromancyText:{
        position: 'absolute',
        left: "19%",
        top: "50%",
        zIndex: 10,
    },
    DarkSoulsText:{
        position: 'absolute',
        left: "20.5%",
        top: "40%",
        zIndex: 10,
    },
    TwinSoulsText:{
        position: 'absolute',
        left: "23.5%",
        top: "25%",
        zIndex: 10,
    },
    SummonerText: {
        position: 'absolute',
        left: "1%",
        top: "70%",
        zIndex: 10,
    },
    MysticBindingText: {
        position: 'absolute',
        left: "55%",
        top: "71%",
        zIndex: 10,
    },
    SoulStealerText: {
        position: 'absolute',
        left: "55%",
        top: "54%",
        zIndex: 10,
    },
    AtromancyText: {
        position: 'absolute',
        left: "3%",
        top: "52%",
        zIndex: 10,
    },
    ElementalPotencyText: {
        position: 'absolute',
        left: "4%",
        top: "34%",
        zIndex: 10,
    },
    OblivionBindingText: {
        position: 'absolute',
        left: "46%",
        top: "46%",
        zIndex: 10,
    },
    MasterConjurationText: {
        position: 'absolute',
        left: "50%",
        top: "30%",
        zIndex: 10,
    },
    ExpertConjurationText: {
        position: 'absolute',
        left: "72%",
        top: "45%",
        zIndex: 10,
    },
    AdeptConjurationText: {
        position: 'absolute',
        left: "70%",
        top: "56%",
        zIndex: 10,
    },
    ApprenticeConjurationText: {
        position: 'absolute',
        left: "65%",
        top: "67%",
        zIndex: 10,
    },

    PerkText: {
        color: 'white',
        fontSize: 12,
    }
});

export default ConjurationTree;