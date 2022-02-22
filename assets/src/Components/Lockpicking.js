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

const LockpickingTree = () => {
  const navigation = useNavigation();
  const [state, setState] = useSetState({
    noviceLocks: 0,
    apprenticeLocks: 0,
    apprenticeLocksLine: 'black',
    quickHands: 0,
    quickHandsLine: 'black',
    waxKey: 0,
    waxKeyLine: 'black',
    adeptlocks: 0,
    adeptLocksLine: 'black',
    expertLocks: 0,
    expertLocksLine: 'black',
    goldenTouch: 0,
    goldenTouchLine: 'black',
    treasureHunter: 0,
    treasureHunterLine: 'black',
    locksmith: 0,
    locksmithLine: 'black',
    unbreakable: 0,
    unbreakableLine: 'black',
    masterLocks: 0,
    masterLocksLine: 'black',
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
    if (state.masterLocks == 1) {
      TrackLevel(100);
    } else if (state.unbreakable == 1) {
      TrackLevel(100);
    } else if (state.locksmith == 1) {
      TrackLevel(80);
    } else if (state.expertLocks == 1) {
      TrackLevel(75);
    } else if (state.treasureHunter == 1) {
      TrackLevel(70);
    } else if (state.goldenTouch == 1) {
      TrackLevel(60);
    } else if (state.adeptLocks == 1) {
      TrackLevel(50);
    } else if (state.waxKey == 1) {
      TrackLevel(50);
    } else if (state.quickHands == 1) {
      TrackLevel(40);
    } else if (state.apprenticeLocks == 1) {
      TrackLevel(25);
    } else if (state.noviceLocks == 1) {
      TrackLevel(0);
    } }, 
    [TrackLevel, state]);

  useEffect(() => {
    CheckLevel();
  }, [CheckLevel]);


  const checkIfNoviceLocksPressed = (buttonColor) => {
    if (
      state.apprenticeLocks ==  1
    ) {
      // Do nothing....must un-select nodes above it first
    } else {
      setState({ noviceLocks: buttonColor }); // Change button color back and forth

      state.noviceLocks == 0
        ? IncrementCounter(1)
        : DecrementCounter(1);
    }
  };

  const checkIfApprenticeLockpickingPressed = (buttonColor, lineColor) => {
    if (state.noviceLocks == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ noviceLocks: buttonColor });
      setState({ apprenticeLocks: buttonColor });
      setState({ apprenticeLocksLine: lineColor });
      IncrementCounter(2);
    } else {
      setState({ apprenticeLocks: buttonColor }); // Change the pressed button color back and forth
      setState({ apprenticeLocksLine: lineColor });
      state.arcaneSmithing == 0
        ? IncrementCounter(1)
        : DecrementCounter(1);
    }
  };

  const checkIfQuickHandsPressed = (buttonColor, lineColor) => {
    if (state.apprenticeLocks == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ noviceLocks: buttonColor });
      setState({ apprenticeLocks: buttonColor });
      setState({ apprenticeLocksLine: lineColor });
      setState({ quickHands: buttonColor });
      setState({ quickHandsLine: lineColor });
      IncrementCounter(2);
    } else if (state.waxKey == 1) {
      // Do nothing....must un-select nodes above it first
    } else {
      setState({ quickHands: buttonColor }); // Change button color back and forth
      setState({ quickHandsLine: lineColor });
      state.quickHands == 0
        ? IncrementCounter(1)
        : DecrementCounter(1);
    }
  };
  const CheckIfWaxKeyPressed = (buttonColor, lineColor) => {
    if (state.quickHands == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ noviceLocks: buttonColor });
      setState({ apprenticeLocks: buttonColor });
      setState({ apprenticeLocksLine: lineColor });
      setState({ quickHands: buttonColor });
      setState({ quickHandsLine: lineColor });
      setState({ waxKey: buttonColor });
      setState({ waxKeyLine: lineColor });
    } else {
      setState({ waxKey: buttonColor }); // Change the pressed button color back and forth
      setState({ waxKeyLine: lineColor });
      state.advancedSmithing == 0
        ? IncrementCounter(1)
        : DecrementCounter(1);
    }
  };
  const checkIfAdeptLocksPressed = (buttonColor, lineColor) => {
    if (state.apprenticeLocks == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ noviceLocks: buttonColor });
      setState({ apprenticeLocks: buttonColor });
      setState({ apprenticeLocksLine: lineColor });
      setState({ adeptLocks: buttonColor });
      setState({ adeptLocksLine: lineColor });
    } else {
      setState({ adeptLocks: buttonColor }); // Change the pressed button color back and forth
      setState({ adeptLocksLine: lineColor });
    }
  };
  const CheckIfGoldenTouchPressed = (buttonColor, lineColor) => {
    if (state.adeptLocks == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ noviceLocks: buttonColor });
      setState({ apprenticeLocks: buttonColor });
      setState({ apprenticeLocksLine: lineColor });
      setState({ adeptLocks: buttonColor });
      setState({ adeptLocksLine: lineColor });
      setState({ goldenTouch: buttonColor });
      setState({ goldenTouchLine: lineColor });
    } else if (state.treasureHunter == 1) {
      // Do nothing....must un-select nodes above it first
    } else {
      setState({ goldenTouch: lineColor });
      setState({ goldenTouchLine: lineColor }); // Change the pressed button color back and forth
    }
  };

  const CheckIfTreasureHunterPressed = (buttonColor, lineColor) => {
    if (state.goldenTouch == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ noviceLocks: buttonColor });
      setState({ apprenticeLocks: buttonColor });
      setState({ apprenticeLocksLine: lineColor });
      setState({ adeptlocks: buttonColor });
      setState({ adeptLocksLine: lineColor });
      setState({ goldenTouch: buttonColor });
      setState({ goldenTouchLine: lineColor });
      setState({ treasureHunter: buttonColor });
      setState({ treasureHunterLine: lineColor });
    } else {
      setState({ treasureHunterLine: lineColor });
      setState({ treasureHunter: buttonColor }); // Change the pressed button color back and forth
    }
  };
  const CheckIfExpertLocksPressed = (buttonColor, lineColor) => {
    if (state.adeptLocks == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ noviceLocks: buttonColor });
      setState({ apprenticeLocks: buttonColor });
      setState({ apprenticeLocksLine: lineColor });
      setState({ adeptLocks: buttonColor });
      setState({ adeptLocksLine: lineColor });
      setState({ expertLocks: buttonColor });
      setState({ expertLocksLine: lineColor });
    } else if (state.locksmith == 1) {
      // Do nothing....must un-select nodes above it first
    } else {
      setState({ expertLocks: buttonColor });
      setState({ expertLocksLine: lineColor }); // Change the pressed button color back and forth
    }
  };
  const CheckIfLocksmithPressed = (buttonColor, lineColor) => {
    if (state.expertLocks == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ noviceLocks: buttonColor });
      setState({ apprenticeLocks: buttonColor });
      setState({ apprenticeLocksLine: lineColor });
      setState({ adeptLocks: buttonColor });
      setState({ adeptLocksLine: lineColor });
      setState({ expertLocks: buttonColor });
      setState({ expertLocksLine: lineColor });
      setState({ locksmith: buttonColor });
      setState({ locksmithLine: lineColor });
    } else if (state.dragonSmithing == 1) {
      // Do nothing....must un-select nodes above it first
    } else {
      setState({ locksmith: buttonColor });
      setState({ locksmithLine: lineColor }); // Change the pressed button color back and forth
    }
  };
  const CheckIfUnbreakablePressed = (buttonColor, lineColor) => {
    if (state.locksmith == 0) {
      setState({ noviceLocks: buttonColor });
      setState({ apprenticeLocks: buttonColor });
      setState({ apprenticeLocksLine: lineColor });
      setState({ adeptLocks: buttonColor });
      setState({ adeptLocksLine: lineColor });
      setState({ expertLocks: buttonColor });
      setState({ expertLocksLine: lineColor });
      setState({ locksmith: buttonColor });
      setState({ locksmithLine: lineColor });
      setState({ unbreakable: buttonColor });
      setState({ unbreakableLine: lineColor });
    } else {
      setState({ unbreakable: buttonColor });
      setState({ unbreakableLine: lineColor });
    }
  };

  const CheckMasterLocksPressed = (buttonColor, lineColor) => {
    if (state.expertLocks == 0) {
      setState({ noviceLocks: buttonColor });
      setState({ apprenticeLocks: buttonColor });
      setState({ apprenticeLocksLine: lineColor });
      setState({ adeptlocks: buttonColor });
      setState({ adeptLocksLine: lineColor });
      setState({ expertLocks: buttonColor });
      setState({ expertLocksLine: lineColor });
      setState({ masterLocks: buttonColor });
      setState({ masterLocksLine: lineColor });
    } else {
      setState({ masterLocks: buttonColor });
      setState({ masterLocksLine: lineColor });
    }
  };

      return (
        <View style={{ zIndex: 2 }}>
            <View style={styles.bottomText}>
                <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
                <Text style={styles.HomeScreenText}>All Active Perks: { }</Text>
            </View>
            <View title='Novice Locks Blue' style={{
                position: 'absolute',
                left: "50%",
                top: "80%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Novice Locks Gold' style={{
                position: 'absolute',
                left: "50%",
                top: "80%",
                zIndex: 8,
                opacity: state.noviceLocks

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("Other Stuff")}
                    onPress={() => {
                        checkIfNoviceLocksPressed(
                            state.noviceLocks == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Apprentice Locks Blue' style={{
                position: 'absolute',
                left: "60%",
                top: "68%",
                zIndex: 8,

            }}>

                <StarIconBlue />
            </View>
            <View title='Apprentice Locks Gold' style={{
                position: 'absolute',
                left: "60%",
                top: "68%",
                zIndex: 8,
                opacity: state.apprenticeLocks

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        checkIfApprenticeLockpickingPressed(
                            state.apprenticeLocks == 0 ? 1 : 0,
                            state.apprenticeLocksLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Quick Hands Blue' style={{
                position: 'absolute',
                left: "36%",
                top: "61%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Quick Hands Gold' style={{
                position: 'absolute',
                left: "36%",
                top: "61%",
                zIndex: 8,
                opacity: state.quickHands

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        checkIfQuickHandsPressed(
                            state.quickHands == 0 ? 1 : 0,
                            state.quickHandsLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Wax Key Blue' style={{
                position: 'absolute',
                left: "18%",
                top: "57.5%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Wax Key Gold' style={{
                position: 'absolute',
                left: "18%",
                top: "57.5%",
                zIndex: 8,
                opacity: state.waxKey

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfWaxKeyPressed(
                            state.waxKey == 0 ? 1 : 0,
                            state.waxKeyLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Adept Locks Blue' style={{
                position: 'absolute',
                left: "70.5%",
                top: "54%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Adept Locks Gold' style={{
                position: 'absolute',
                left: "70.5%",
                top: "54%",
                zIndex: 8,
                opacity: state.adeptlocks

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        checkIfAdeptLocksPressed(
                            state.adeptLocks == 0 ? 1 : 0,
                            state.adeptLocksLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Golden Touch Blue' style={{
                position: 'absolute',
                left: "43%",
                top: "52%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Golden Touch Gold' style={{
                position: 'absolute',
                left: "43%",
                top: "52%",
                zIndex: 8,
                opacity: state.goldenTouch

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfGoldenTouchPressed(
                            state.goldenTouch == 0 ? 1 : 0,
                            state.goldenTouchLine == 'black' ? 'gold' : 'black',
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Treasure Hunter Blue' style={{
                position: 'absolute',
                left: "20%",
                top: "51%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Treasure Hunter Gold' style={{
                position: 'absolute',
                left: "20%",
                top: "51%",
                zIndex: 8,
                opacity: state.treasureHunter

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfTreasureHunterPressed(
                            state.treasureHunter == 0 ? 1 : 0,
                            state.treasureHunterLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Expert Locks Blue' style={{
                position: 'absolute',
                left: "68%",
                top: "40%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Expert Locks Gold' style={{
                position: 'absolute',
                left: "68%",
                top: "40%",
                zIndex: 8,
                opacity: state.expertLocks

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfExpertLocksPressed(
                            state.expertLocks == 0 ? 1 : 0,
                            state.expertLocksLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View title='Locksmith Blue' style={{
                position: 'absolute',
                left: "44%",
                top: "40%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Locksmith Gold' style={{
                position: 'absolute',
                left: "44%",
                top: "40%",
                zIndex: 8,
                opacity: state.locksmith

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfLocksmithPressed(
                            state.locksmith == 0 ? 1 : 0,
                            state.locksmithLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
                      <View title='Unbreakable Blue' style={{
                position: 'absolute',
                left: "25%",
                top: "39%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Unbreakable Gold' style={{
                position: 'absolute',
                left: "25%",
                top: "39%",
                zIndex: 8,
                opacity: state.unbreakable

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfUnbreakablePressed(
                            state.unbreakable == 0 ? 1 : 0,
                            state.unbreakableLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>

          <View title='Master Locks Blue' style={{
                position: 'absolute',
                left: "68%",
                top: "30%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Master Locks Gold' style={{
                position: 'absolute',
                left: "68%",
                top: "30%",
                zIndex: 8,
                opacity: state.masterLocks

            }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckMasterLocksPressed(
                            state.masterLocks == 0 ? 1 : 0,
                            state.masterLocksLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.LockpickingTree}>
                <Text style={styles.PerkText}>Lockpicking Tree</Text>
            </View>
      <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
        <Line // Novice Locks to Apprentice Locks
          x1="60%"
          y1="68%"
          x2="51%"
          y2="79%"
          stroke={state.apprenticeLocks}
          strokeWidth={lineStrokeWidth}
        />

        <Line // Apprentice Locks to Quick Hands
          x1="38%"
          y1="62%"
          x2="57%"
          y2="67%"
          stroke={state.apprenticeLocks}
          strokeWidth={lineStrokeWidth}
        />

        <Line // Quick Hands to Wax Key
          x1="20%"
          y1="58%"
          x2="33.5%"
          y2="60.5%"
          stroke={state.waxKey}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Apprentice Locks to Adept Locks
          x1="70%"
          y1="55%"
          x2="60%"
          y2="67%"
          stroke={state.adeptLocks}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Adept Locks to Golden Touch
          x1="45%"
          y1="52%"
          x2="68%"
          y2="54%"
          stroke={state.goldenTouch}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Golden Touch to Treasure Hunter
          x1="20%"
          y1="51%"
          x2="40%"
          y2="52%"
          stroke={state.treasureHunter}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Adept Locks to Expert Locks
          x1="68%"
          y1="40%"
          x2="70%"
          y2="53%"
          stroke={state.adeptLocks}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Expert Locks to Locksmith
          x1="44%"
          y1="40%"
          x2="66%"
          y2="40%"
          stroke={state.locksmith}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Locksmith to Unbreakable
          x1="24%"
          y1="39%"
          x2="40%"
          y2="40%"
          stroke={state.unbreakable}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Expert Locks to Master Locks
          x1="68%"
          y1="30%"
          x2="68%"
          y2="39%"
          stroke={state.masterLocks}
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
    NoviceLocksText: {
        position: 'absolute',
        left: "25%",
        top: "83%",
        zIndex: 10,
    },
    ApprenticeLocksText: {
        position: 'absolute',
        left: "33%",
        top: "55%",
        zIndex: 10,
    },
    QuickHandsText: {
        position: 'absolute',
        left: "13%",
        top: "53%",
        zIndex: 10,
    },
    WaxKeyText: {
        position: 'absolute',
        left: "20%",
        top: "46%",
        zIndex: 10,
    },
    AdeptLocksText: {
        position: 'absolute',
        left: "24%",
        top: "34%",
        zIndex: 10,
    },
    GoldenTouchText: {
        position: 'absolute',
        left: "44%",
        top: "34%",
        zIndex: 10,
    },
    TreasureHunterText: {
        position: 'absolute',
        left: "64%",
        top: "40%",
        zIndex: 10,
    },
    ExpertLocksText: {
        position: 'absolute',
        left: "82%",
        top: "50%",
        zIndex: 10,
    },
    LocksmithText: {
        position: 'absolute',
        left: "70%",
        top: "50%",
        zIndex: 10,
    },
    UnbreakableText: {
        position: 'absolute',
        left: "50%",
        top: "60%",
        zIndex: 10,
    },

    MasterLocksText: {
        color: 'white',
        fontSize: 12,
    }
});

export default LockpickingTree;
