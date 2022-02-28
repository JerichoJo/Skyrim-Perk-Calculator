import * as React from 'react';
import {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
  Button,
} from 'react';
import Svg, { Line } from 'react-native-svg';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import Modal from 'react-native-modal';
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

const OneHandedTree = () => {
  const navigation = useNavigation();
  const [state, setState] = useSetState({
    armsman: 0,
    bladesman: 0,
    bladesmanLine: 'white',
    bonebreaker: 0,
    bonebreakerLine: 'white',
    dualFlurry: 0,
    dualFlurryLine: 'white',
    dualSavagery: 0,
    dualSavageryLine: 'white',
    fightingStance: 0,
    fightingStanceLine: 'white',
    criticalCharge: 0,
    criticalChargeLine: 'white',
    savageStrike: 0,
    savageStrikeLine: 'white',
    paralyzingStrike: 0,
    paralyzingStrikeLine: 'white',
    hackAndSlash: 0,
    hackAndSlashLine: 'white',
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
    if (state.armsman == 1) {
      TrackLevel(80);
    } else if (state.bladesman == 1) {
      TrackLevel(90);
    } else if (state.bonebreaker == 1) {
      TrackLevel(90);
    } else if (state.dualFlurry == 1) {
      TrackLevel(50);
    } else if (state.dualSavagery == 1) {
      TrackLevel(70);
    } else if (state.fightingStance == 1) {
      TrackLevel(20);
    } else if (state.criticalCharge == 1) {
      TrackLevel(50);
    } else if (state.savageStrike == 1) {
      TrackLevel(50);
    } else if (state.paralyzingStrike == 1) {
      TrackLevel(100);
    } else if (state.hackAndSlash == 1) {
      TrackLevel(90);
    }
  }, [TrackLevel, state]);

  useEffect(() => {
    CheckLevel();
  }, [CheckLevel]);

  const CheckIfArmsmanPressed = (buttonColor) => {
    if (
      state.hackAndSlash == 1 ||
      state.fightingStance == 1 ||
      state.bonebreaker == 1 ||
      state.bladesman == 1 ||
      state.dualFlurry == 1
    ) {
      // Do nothing....must un-select nodes above it first
    } else {
      setState({ armsman: buttonColor }); // Change button color back and forth
      state.armsman == 0 ? IncrementCounter(1) : DecrementCounter(1);
    }
  };
  const checkIfHackAndSlashPressed = (buttonColor, lineColor) => {
    if (state.armsman == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ armsman: buttonColor });
      setState({ hackAndSlash: buttonColor });
      setState({ hackAndSlashLine: lineColor });
    } else {
      setState({ hackAndSlash: buttonColor }); // Change the pressed button color back and forth
      setState({ hackAndSlashLine: lineColor });
      state.hackAndSlash == 0 ? IncrementCounter(1) : DecrementCounter(1);
    }
  };

  const CheckIfBoneBreakerPressed = (buttonColor, lineColor) => {
    if (state.armsman == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ armsman: buttonColor });
      setState({ bonebreaker: buttonColor });
      setState({ bonebreakerLine: lineColor });
    } else {
      setState({ bonebreaker: buttonColor }); // Change button color back and forth
      setState({ bonebreakerLine: lineColor });
    }
  };

  const CheckIfBladesmanPressed = (buttonColor, lineColor) => {
    if (state.armsman == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ armsman: buttonColor });
      setState({ bladesman: buttonColor });
      setState({ bladesmanLine: lineColor });
    } else {
      setState({ bladesman: buttonColor }); // Change the pressed button color back and forth
      setState({ bladesmanLine: lineColor });
    }
  };
  const checkIfDualFlurryPressed = (buttonColor, lineColor) => {
    if (state.armsman == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ armsman: buttonColor });
      setState({ dualFlurry: buttonColor });
      setState({ dualFlurryLine: lineColor });
    } else if (state.dualSavagery == 1) {
      // Nothing
    } else {
      setState({ dualFlurry: buttonColor }); // Change the pressed button color back and forth
      setState({ dualFlurryLine: lineColor });
    }
  };

  const checkIfDualSavageryChecked = (buttonColor, lineColor) => {
    if (state.dualFlurry == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ armsman: buttonColor });
      setState({ dualFlurry: buttonColor });
      setState({ dualFlurryLine: lineColor });
      setState({ dualSavagery: buttonColor });
      setState({ dualSavageryLine: lineColor });
    } else {
      setState({ dualSavagery: buttonColor }); // Change the pressed button color back and forth
      setState({ dualSavageryLine: lineColor });
    }
  };

  const checkIfFightingStancePressed = (buttonColor, lineColor) => {
    if (state.armsman == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ armsman: buttonColor });
      setState({ fightingStance: buttonColor });
      setState({ fightingStanceLine: lineColor });
    } else if (state.savageStrike == 1 || state.criticalCharge == 1 ) {
      // Do nothing....must un-select nodes above it first
    } else {
      setState({ fightingStance: buttonColor });
      setState({ fightingStanceLine: lineColor }); // Change the pressed button color back and forth
    }
  };

  const checkIfSavageStrikePressed = (buttonColor, lineColor) => {
    if (state.fightingStance == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ armsman: buttonColor });
      setState({ fightingStance: buttonColor });
      setState({ fightingStanceLine: lineColor });
      setState({ savageStrike: buttonColor });
      setState({ savageStrikeLine: lineColor });
    } else if (state.paralyzingStrike == 1) {
      // Do nothing....must un-select nodes above it first
    } else {
      setState({ savageStrike: buttonColor });
      setState({ savageStrikeLine: lineColor }); // Change the pressed button color back and forth
    }
  };

  const checkIfCriticalChargePressed = (buttonColor, lineColor) => {
    if (state.criticalCharge == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ armsman: buttonColor });
      setState({ fightingStance: buttonColor });
      setState({ fightingStanceLine: lineColor });
      setState({ criticalCharge: buttonColor });
      setState({ criticalChargeLine: lineColor });
    } else if (state.paralyzingStrike == 1) {
      // Do nothing....must un-select nodes above it first
    } else {
      setState({ criticalCharge: buttonColor }); // Change the pressed button color back and forth
      setState({ criticalChargeLine: lineColor });
    }
  };
  const checkIfParalyzingStrikePressed = (buttonColor, lineColor) => {
    if (state.savageStrike == 0 || state.criticalCharge == 0) {
      setState({ armsman: buttonColor });
      setState({ fightingStance: buttonColor });
      setState({ fightingStanceLine: lineColor });
      setState({ savageStrike: buttonColor });
      setState({ savageStrikeLine: lineColor });
      setState({ criticalCharge: buttonColor });
      setState({ criticalChargeLine: lineColor });
      setState({ paralyzingStrike: buttonColor });
      setState({ paralyzingStrikeLine: lineColor });
    } else {
      setState({ paralyzingStrike: buttonColor });
      setState({ paralyzingStrikeLine: lineColor });
    }
  };
      return (
        <View style={{ zIndex: 2 }}>
            <View style={styles.topText}>
                <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
                <Text style={styles.HomeScreenText}>Required Level: {RequiredLevel} </Text>
            </View>
            <View title='Armsman Blue' style={{
                position: 'absolute',
                left: "19%",
                top: "75%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Armsman Gold' style={{
                position: 'absolute',
                left: "19%",
                top: "75%",
                zIndex: 8,
                opacity: state.armsman

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("Other Stuff")}
                    onPress={() => {
                        CheckIfArmsmanPressed(
                            state.armsman == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Hack and Slash Blue' style={{
                position: 'absolute',
                left: "5%",
                top: "60%",
                zIndex: 8,

            }}>

                <StarIconBlue />
            </View>
            <View title='Hack and Slash Gold' style={{
                position: 'absolute',
                left: "5%",
                top: "60%",
                zIndex: 8,
                opacity: state.hackAndSlash

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        checkIfHackAndSlashPressed(
                            state.hackAndSlash == 0 ? 1 : 0,
                            state.hackAndSlashLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Bladesman Blue' style={{
                position: 'absolute',
                left: "51%",
                top: "58%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Bladesman Gold' style={{
                position: 'absolute',
                left: "51%",
                top: "58%",
                zIndex: 8,
                opacity: state.bladesman

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfBladesmanPressed(
                            state.bladesman == 0 ? 1 : 0,
                            state.bladesmanLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Bone Breaker Blue' style={{
                position: 'absolute',
                left: "34%",
                top: "58%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Bone Breaker Gold' style={{
                position: 'absolute',
                left: "34%",
                top: "58%",
                zIndex: 8,
                opacity: state.bonebreaker

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfBoneBreakerPressed(
                            state.bonebreaker == 0 ? 1 : 0,
                            state.bonebreaker == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Fighting Stance Blue' style={{
                position: 'absolute',
                left: "18.5%",
                top: "54.5%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Fighting Stance Gold' style={{
                position: 'absolute',
                left: "18.5%",
                top: "54.5%",
                zIndex: 8,
                opacity: state.fightingStance

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        checkIfFightingStancePressed(
                            state.fightingStance == 0 ? 1 : 0,
                            state.fightingStanceLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Critical Charge Blue' style={{
                position: 'absolute',
                left: "34%",
                top: "40%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Critical Charge Gold' style={{
                position: 'absolute',
                left: "34%",
                top: "40%",
                zIndex: 8,
                opacity: state.criticalCharge

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        checkIfCriticalChargePressed(
                            state.criticalCharge == 0 ? 1 : 0,
                            state.criticalChargeLine == 'white' ? 'gold' : 'white',
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Savage Strike Blue' style={{
                position: 'absolute',
                left: "4%",
                top: "40%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Savage Strike Gold' style={{
                position: 'absolute',
                left: "4%",
                top: "40%",
                zIndex: 8,
                opacity: state.savageStrike

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        checkIfSavageStrikePressed(
                            state.savageStrike == 0 ? 1 : 0,
                            state.savageStrikeLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Paralyzing Strike Blue' style={{
                position: 'absolute',
                left: "16%",
                top: "25%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Paralyzing Strike Gold' style={{
                position: 'absolute',
                left: "16%",
                top: "25%",
                zIndex: 8,
                opacity: state.paralyzingStrike

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        checkIfParalyzingStrikePressed(
                            state.paralyzingStrike == 0 ? 1 : 0,
                            state.paralyzingStrikeLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Dual Flurry Blue' style={{
                position: 'absolute',
                left: "69%",
                top: "65%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Dual Flurry Gold' style={{
                position: 'absolute',
                left: "69%",
                top: "65%",
                zIndex: 8,
                opacity: state.dualFlurry

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        checkIfDualFlurryPressed(
                            state.dualFlurry == 0 ? 1 : 0,
                            state.dualFlurry == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
                      <View title='Dual Savagery Blue' style={{
                position: 'absolute',
                left: "59%",
                top: "40%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Dual Savagery Gold' style={{
                position: 'absolute',
                left: "59%",
                top: "40%",
                zIndex: 8,
                opacity: state.dualSavagery

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        checkIfDualSavageryChecked(
                            state.dualSavagery == 0 ? 1 : 0,
                            state.dualSavagery == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.DualSavageryText}>
                <Text style={styles.PerkText}>Dual Savagery</Text>
            </View>
      <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
        <Line // Armsman to Hack and Slash
          x1="15%"
          y1="65%"
          x2="27%"
          y2="79%"
          stroke={state.hackAndSlashLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Armsmen to Bladesman
          x1="62%"
          y1="63%"
          x2="33.3%"
          y2="79%"
          stroke={state.bladesmanLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Armsman to Bone Breaker
          x1="45%"
          y1="63%"
          x2="33%"
          y2="79%"
          stroke={state.bonebreakerLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Armsman to Fighting Stance
          x1="30%"
          y1="60%"
          x2="30%"
          y2="79%"
          stroke={state.fightingStanceLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Fighting Stance to Critical Charge
          x1="45%"
          y1="46%"
          x2="33%"
          y2="59%"
          stroke={state.criticalChargeLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Fighting Stance to Savage Strike
          x1="15%"
          y1="45%"
          x2="27%"
          y2="59%"
          stroke={state.savageStrikeLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Savage Strike to Paralyzing Strike
          x1="27%"
          y1="30%"
          x2="15%"
          y2="44%"
          stroke={state.paralyzingStrikeLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Critical Charge to Paralyzing Strike
          x1="27%"
          y1="30%"
          x2="45%"
          y2="44%"
          stroke={state.paralyzingStrikeLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Armsman to Dual Flurry
          x1="80%"
          y1="70%"
          x2="34%"
          y2="80%"
          stroke={state.dualFlurryLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Dual Flurry to Dual Savagery
          x1="70%"
          y1="45%"
          x2="80%"
          y2="69%"
          stroke={state.dualSavageryLine}
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
    ArmsmanText: {
        position: 'absolute',
        left: "25%",
        top: "83%",
        zIndex: 10,
    },
    BladesmanText: {
        position: 'absolute',
        left: "33%",
        top: "55%",
        zIndex: 10,
    },
    BoneBreakerText: {
        position: 'absolute',
        left: "13%",
        top: "53%",
        zIndex: 10,
    },
    DualFlurryText: {
        position: 'absolute',
        left: "20%",
        top: "46%",
        zIndex: 10,
    },
    DualSavageryText: {
        position: 'absolute',
        left: "24%",
        top: "34%",
        zIndex: 10,
    },
    FightingStanceText: {
        position: 'absolute',
        left: "44%",
        top: "34%",
        zIndex: 10,
    },
    CriticalChargeText: {
        position: 'absolute',
        left: "64%",
        top: "40%",
        zIndex: 10,
    },
    SavageStrikeText: {
        position: 'absolute',
        left: "82%",
        top: "50%",
        zIndex: 10,
    },
    ParalyzingStrikeText: {
        position: 'absolute',
        left: "70%",
        top: "50%",
        zIndex: 10,
    },
    HackAndSlashText: {
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

export default OneHandedTree;