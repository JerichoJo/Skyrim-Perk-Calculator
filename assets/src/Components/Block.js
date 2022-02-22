import * as React from 'react';
import { useState, useCallback, useEffect, useContext, useRef, Button } from 'react';
import Svg, { Line } from 'react-native-svg';
import {
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
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
const BlockTree = () => {
  const navigation = useNavigation();
  const [state, setState] = useSetState({
    shieldWall: 0,
    deflectArrows: 0,
    delectArrowsLine: 'black',
    elementalProtection: 0,
    elementalProtectionLine: 'black',
    blockRunner: 0,
    blockRunnerLine: 'black',
    powerBash: 0,
    powerBashLine: 'black',
    disarmingBash: 0,
    disarmingBashLine: 'black',
    shieldCharge: 0,
    shieldChargeLine: 'black',
    quickReflexes: 0,
    quickReflexesLine: 'black',
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
    if (state.quickReflexes == 1) {
      TrackLevel(30);
    } else if (state.shieldCharge == 1) {
      TrackLevel(100);
    } else if (state.disarmingBash == 1) {
      TrackLevel(70);
    } else if (state.deadlyBash == 1) {
      TrackLevel(50);
    } else if (state.powerBash == 1) {
      TrackLevel(30);
    } else if (state.blockRunner == 'red') {
      TrackLevel(70);
    } else if (state.elementalProtection == 'red') {
      TrackLevel(50);
    } else if (state.deflectArrows == 'red') {
      TrackLevel(30);
    } else if (state.shieldWall == 'red') {
      TrackLevel(80);
    }
  }, [TrackLevel, state]);

  useEffect(() => {
    CheckLevel();
  }, [CheckLevel]);

  // Shield Wall Button
  const CheckIfShieldWallPressed = (button) => {
    if (
      state.powerBash == 1 ||
      state.deflectArrows == 1 ||
      state.quickReflexes == 1
    ) {
      // Do Nothing
    } else {
      setState({ shieldWall: button });
      state.shieldWall == '0' ? IncrementCounter(1) : DecrementCounter(1);
    }
  };

  // Quick Reflexes Button
  const CheckIfQuickReflexesPressed = (button, line) => {
    if (state.shieldWall == 0) {
      setState({ shieldWall: button });
      setState({ quickReflexes: button });
      setState({ quickReflexesLine: line });
      IncrementCounter(1);
    } else {
      setState({ quickReflexes: button });
      setState({ quickReflexesLine: line });
      state.quickReflexes == 0 ? IncrementCounter(1) : DecrementCounter(1);
    }
  };

  const CheckIfPowerBashPressed = (buttonColor, lineColor) => {
    if (state.shieldWall == 0) {
      setState({ shieldWall: buttonColor });
      setState({ powerBash: buttonColor });
      setState({ powerBashLine: lineColor });
    } else if (state.deadlyBash == 1) {
      // Do Nothing
    } else {
      setState({ powerBash: buttonColor });
      setState({ powerBashLine: lineColor });
      state.powerBash == 0 ? IncrementCounter(1) : DecrementCounter(1);
    }
  };
  // Deflect Arrows Button
  const CheckIfDeflectArrowsPressed = (buttonColor, lineColor) => {
    if (state.shieldWall == 0) {
      setState({ shieldWall: buttonColor });
      setState({ deflectArrows: buttonColor });
      setState({ deflectArrowsLine: lineColor });
    } else if (state.elementalProtection == 1) {
      // Do Nothing
    } else {
      setState({ deflectArrows: buttonColor });
      setState({ deflectArrowsLine: lineColor });
      state.deflectArrows == 0 ? IncrementCounter(1) : DecrementCounter(1);
    }
  };
  // Elemental Protection Button
  const CheckIfElementalProtectionPressed = (buttonColor, lineColor) => {
    if (state.deflectArrows == 0) {
      setState({ shieldWall: buttonColor });
      setState({ deflectArrows: buttonColor });
      setState({ deflectArrowsLine: lineColor });
      setState({ elementalProtection: buttonColor });
      setState({ elementalProtectionLine: lineColor });
    } else if (state.blockRunner == 1) {
      // Do Nothing
    } else {
      setState({ elementalProtection: buttonColor });
      setState({ elementalProtectionLine: lineColor });
    }
  };

  // Block Runner Button
  const CheckIfBlockRunnerPressed = (buttonColor, lineColor) => {
    if (state.elementalProtection == 0) {
      setState({ shieldWall: buttonColor });
      setState({ deflectArrows: buttonColor });
      setState({ deflectArrowsLine: lineColor });
      setState({ elementalProtection: buttonColor });
      setState({ elementalProtectionLine: lineColor });
      setState({ blockRunner: buttonColor });
      setState({ blockRunnerLine: lineColor });
    } else if (state.shieldCharge == 1) {
      // Do Nothing
    } else {
      setState({ blockRunner: buttonColor });
      setState({ blockRunnerLine: lineColor });
    }
  };

  const CheckIfDeadlyBashPressed = (buttonColor, lineColor) => {
    if (state.powerBash == 0) {
      setState({ shieldWall: buttonColor });
      setState({ powerBash: buttonColor });
      setState({ powerBashLine: lineColor });
      setState({ deadlyBash: buttonColor });
      setState({ deadlyBashLine: lineColor });
    } else if (state.disarmingBash == 1) {
      // Do Nothing
    } else {
      setState({ deadlyBash: buttonColor });
      setState({ deadlyBashLine: lineColor });
    }
  };

  const CheckIfDisarmingBashPressed = (buttonColor, lineColor) => {
    if (state.deadlyBash == 0) {
      setState({ shieldWall: buttonColor });
      setState({ powerBash: buttonColor });
      setState({ powerBashLine: buttonColor });
      setState({ deadlyBash: buttonColor });
      setState({ deadlyBashLine: lineColor });
      setState({ disarmingBash: buttonColor });
      setState({ disarmingBashLine: lineColor });
    } else if (state.shieldCharge === 1) {
      // Do Nothing
    } else {
      setState({ disarmingBash: buttonColor });
      setState({ disarmingBashLine: lineColor });
    }
  };

  const checkIfShieldChargePressed = (buttonColor, lineColor) => {
    if (state.blockRunner || state.disarmingBash == 0) {
      // Base
      setState({ shieldWall: buttonColor });
      // Left Side
      setState({ deflectArrows: buttonColor });
      setState({ deflectArrowsLine: lineColor });
      setState({ elementalProtection: buttonColor });
      setState({ elementalProtectionLine: lineColor });
      setState({ blockRunner: buttonColor });
      setState({ blockRunnerLine: lineColor });
      // Right Side
      setState({ powerBash: buttonColor });
      setState({ powerBashLine: lineColor });
      setState({ deadlyBash: buttonColor });
      setState({ deadlyBashLine: lineColor });
      setState({ disarmingBash: buttonColor });
      setState({ disarmingBashLine: lineColor });
      setState({ shieldCharge: buttonColor });
      // Shield Charge lines are block runner and disarming bash
    } else {
      setState({ shieldCharge: buttonColor });
    }
  };
    return (
        <View style={{ zIndex: 2 }}>
            <View style={styles.topText}>
                <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
                <Text style={styles.HomeScreenText}>All Active Perks: { }</Text>
            </View>
            <View title='Shield Wall Blue' style={{
                position: 'absolute',
                left: "50%",
                top: "80%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Shield Wall Gold' style={{
                position: 'absolute',
                left: "50%",
                top: "80%",
                zIndex: 8,
                opacity: state.shieldWall

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("Other Stuff")}
                    onPress={() => {
                        CheckIfShieldWallPressed(
                            state.shieldWall == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Quick Reflexes Blue' style={{
                position: 'absolute',
                left: "30%",
                top: "55%",
                zIndex: 8,

            }}>

                <StarIconBlue />
            </View>
            <View title='Quick Reflexes Gold' style={{
                position: 'absolute',
                left: "30%",
                top: "55%",
                zIndex: 8,
                opacity: state.quickReflexes

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfQuickReflexesPressed(
                            state.arcaneSmithing == 0 ? 1 : 0,
                            state.arcaneSmithingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Deflect Arrows Blue' style={{
                position: 'absolute',
                left: "70%",
                top: "80%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Deflect Arrows Gold' style={{
                position: 'absolute',
                left: "20%",
                top: "70%",
                zIndex: 8,
                opacity: state.deflectArrows

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfDeflectArrowsPressed(
                            state.deflectArrows == 0 ? 1 : 0,
                            state.deflectArrowsLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Elemental Protection Blue' style={{
                position: 'absolute',
                left: "22.5%",
                top: "54%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Elemental Protection Gold' style={{
                position: 'absolute',
                left: "22.5%",
                top: "54%",
                zIndex: 8,
                opacity: state.elementalProtection

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfElementalProtectionPressed(
                            state.elementalProtection == 0 ? 1 : 0,
                            state.elementalProtectionLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Block Runner Blue' style={{
                position: 'absolute',
                left: "30%",
                top: "44%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Block Runner Gold' style={{
                position: 'absolute',
                left: "30%",
                top: "44%",
                zIndex: 8,
                opacity: state.blockRunner

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfBlockRunnerPressed(
                            state.blockRunner == 0 ? 1 : 0,
                            state.blockRunnerLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Shield Charge Blue' style={{
                position: 'absolute',
                left: "54%",
                top: "43%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Shield Charge Gold' style={{
                position: 'absolute',
                left: "54%",
                top: "43%",
                zIndex: 8,
                opacity: state.shieldCharge

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        checkIfShieldChargePressed(
                            state.shieldCharge == 0 ? 1 : 0,
                            state.shieldChargeLine == 'black' ? 'gold' : 'black',
                            state.shieldChargeLineLight == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Disarming Bash Blue' style={{
                position: 'absolute',
                left: "80%",
                top: "44%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Disarming Bash Gold' style={{
                position: 'absolute',
                left: "80%",
                top: "44%",
                zIndex: 8,
                opacity: state.disarmingBash

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfDisarmingBashPressed(
                            state.disarmingBash == 0 ? 1 : 0,
                            state.disarmingBashLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Deadly Bash Blue' style={{
                position: 'absolute',
                left: "85%",
                top: "53%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Deadly Bash Gold' style={{
                position: 'absolute',
                left: "85%",
                top: "53%",
                zIndex: 8,
                opacity: state.deadlyBash

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfDeadlyBashPressed(
                            state.deadlyBash == 0 ? 1 : 0,
                            state.deadlyBashLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Power Bash Blue' style={{
                position: 'absolute',
                left: "86%",
                top: "67%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Power Bash Gold' style={{
                position: 'absolute',
                left: "86%",
                top: "67%",
                zIndex: 8,
                opacity: state.powerBash

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfPowerBashPressed(
                            state.powerBash == 0 ? 1 : 0,
                            state.powerBashLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} >

        <Line // Shield Wall to Deflect Arrows
          x1="20%"
          y1="70%"
          x2="48%"
          y2="79%"
          stroke={state.deflectArrows}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Deflect Arrows to Elemental Protection
          x1="22.5%"
          y1="55%"
          x2="20%"
          y2="69%"
          stroke={state.elementalProtection}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Elemental Protection to Block Runner
          x1="29%"
          y1="45%"
          x2="23%"
          y2="53%"
          stroke={state.powerBash}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Block Runner to Shield Charge
          x1="52%"
          y1="43%"
          x2="32%"
          y2="43.5%"
          stroke={state.shieldCharge}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Shield Charge to Disarming Bash
          x1="78%"
          y1="44%"
          x2="56%"
          y2="43%"
          stroke={state.disarmingBash}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Disarming Bash to Deadly Bash
          x1="85%"
          y1="53%"
          x2="81%"
          y2="45%"
          stroke={state.deadlyBash}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Deadly Bash to Power Bash
          x1="86%"
          y1="67%"
          x2="85%"
          y2="54%"
          stroke={state.powerBash}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Shield wall to power bash
          x1="51.5%"
          y1="79%"
          x2="86%"
          y2="68%"
          stroke={state.shieldWall}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Shield wall to Quick Reflexes
          x1="45%"
          y1="66%"
          x2="50%"
          y2="79%"
          stroke={state.quickReflexes}
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
    ShieldWallText: {
        position: 'absolute',
        left: "25%",
        top: "83%",
        zIndex: 10,
    },
    DeflectArrowsText: {
        position: 'absolute',
        left: "33%",
        top: "55%",
        zIndex: 10,
    },
    ElementalProtectionText: {
        position: 'absolute',
        left: "13%",
        top: "53%",
        zIndex: 10,
    },
    BlockRunnerText: {
        position: 'absolute',
        left: "20%",
        top: "46%",
        zIndex: 10,
    },
    PowerBashText: {
        position: 'absolute',
        left: "24%",
        top: "34%",
        zIndex: 10,
    },
    DeadlyBashText: {
        position: 'absolute',
        left: "44%",
        top: "34%",
        zIndex: 10,
    },
    DisarmingBashText: {
        position: 'absolute',
        left: "64%",
        top: "40%",
        zIndex: 10,
    },
    ShieldChargeText: {
        position: 'absolute',
        left: "82%",
        top: "50%",
        zIndex: 10,
    },
    QuickReflexesText: {
        position: 'absolute',
        left: "70%",
        top: "50%",
        zIndex: 10,
    },
    PerkText: {
        color: 'white',
        fontSize: 12,
    }
});

export default BlockTree;
