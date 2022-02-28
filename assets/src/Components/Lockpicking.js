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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ActivePerks, SetActivePerks] = useState(0);
  const [RequiredLevel, SetRequiredLevel] = useState(0);
  const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);
  const [state, setState] = useSetState({
    noviceLocks: 0,
    apprenticeLocks: 0,
    apprenticeLocksLine: 'white',
    quickHands: 0,
    quickHandsLine: 'white',
    waxKey: 0,
    waxKeyLine: 'white',
    adeptlocks: 0,
    adeptLocksLine: 'white',
    expertLocks: 0,
    expertLocksLine: 'white',
    goldenTouch: 0,
    goldenTouchLine: 'white',
    treasureHunter: 0,
    treasureHunterLine: 'white',
    locksmith: 0,
    locksmithLine: 'white',
    unbreakable: 0,
    unbreakableLine: 'white',
    masterLocks: 0,
    masterLocksLine: 'white',
  });

  let resetAllTrees;
  const resetLockpickingPerks = () => {
    setState({ shieldWall: 0 });
    setState({ deflectArrows: 0 });
    setState({ delectArrowsLine: 'white' });
    setState({ elementalProtection: 0 });
    setState({ elementalProtectionLine: 'white' });
    setState({ blockRunner: 0 });
    setState({ blockRunnerLine: 'white' });
    setState({ powerBash: 0 });
    setState({ powerBashLine: 'white' });
    setState({ disarmingBash: 0 });
    setState({ disarmingBashLine: 'white' });
    setState({ shieldCharge: 0 });
    setState({ shieldChargeLine: 'white' });
    setState({ quickReflexes: 0 });
    setState({ quickReflexesLine: 'white' });
    SetRequiredLevel(0);
  }

  const resetActivePerks = () => {
    resetLockpickingPerks();
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
        resetLockpickingPerks();
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
                      <View
                style={styles.resetButtonContainer}>
                <TouchableOpacity style={styles.resetButton} onPress={() => resetActivePerks()}>
                    <Text style={{ color: "white", fontWeight: "bold", }}> Reset Lockpicking Perks</Text>
                </TouchableOpacity> 
            </View> 
            <View style={styles.topText}>
                <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
                <Text style={styles.HomeScreenText}>Required Level: { RequiredLevel}</Text>
            </View>
            <View title='Novice Locks Blue' style={{
                position: 'absolute',
                left: "40%",
                top: "75%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Novice Locks Gold' style={{
                position: 'absolute',
                left: "40%",
                top: "75%",
                zIndex: 8,
                opacity: state.noviceLocks

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("NoviceLocksModal")}
                    onPress={() => {
                        checkIfNoviceLocksPressed(
                            state.noviceLocks == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.NoviceLocksText}>
                <Text style={styles.PerkText}>Novice Locks</Text>
            </View>
            <View title='Apprentice Locks Blue' style={{
                position: 'absolute',
                left: "49%",
                top: "64%",
                zIndex: 8,

            }}>

                <StarIconBlue />
            </View>
            <View title='Apprentice Locks Gold' style={{
                position: 'absolute',
                left: "49%",
                top: "64%",
                zIndex: 8,
               opacity: state.apprenticeLocks

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ApprenticeLocksModal")}
                    onPress={() => {
                        checkIfApprenticeLockpickingPressed(
                            state.apprenticeLocks == 0 ? 1 : 0,
                            state.apprenticeLocksLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ApprenticeLocksText}>
                <Text style={styles.PerkText}>Apprentice Locks</Text>
            </View>
            <View title='Quick Hands Blue' style={{
                position: 'absolute',
                left: "25%",
                top: "59%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Quick Hands Gold' style={{
                position: 'absolute',
                left: "25%",
                top: "59%",
                zIndex: 8,
                opacity: state.quickHands

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("QuickHandsModal")}
                    onPress={() => {
                        checkIfQuickHandsPressed(
                            state.quickHands == 0 ? 1 : 0,
                            state.quickHandsLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.QuickHandsText}>
                <Text style={styles.PerkText}>Quick Hands</Text>
            </View>
            <View title='Wax Key Blue' style={{
                position: 'absolute',
                left: "6%",
                top: "55%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Wax Key Gold' style={{
                position: 'absolute',
                left: "6%",
                top: "55%",
                zIndex: 8,
                opacity: state.waxKey

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("WaxKeyModal")}
                    onPress={() => {
                        CheckIfWaxKeyPressed(
                            state.waxKey == 0 ? 1 : 0,
                            state.waxKeyLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.WaxKeyText}>
                <Text style={styles.PerkText}>Wax Key</Text>
            </View>
            <View title='Adept Locks Blue' style={{
                position: 'absolute',
                left: "59%",
                top: "52%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Adept Locks Gold' style={{
                position: 'absolute',
                left: "59%",
                top: "52%",
                zIndex: 8,
                opacity: state.adeptlocks

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("AdeptLocksModal")}
                    onPress={() => {
                        checkIfAdeptLocksPressed(
                            state.adeptLocks == 0 ? 1 : 0,
                            state.adeptLocksLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.AdeptLocksText}>
                <Text style={styles.PerkText}>Adept Locks</Text>
            </View>
            <View title='Golden Touch Blue' style={{
                position: 'absolute',
                left: "33%",
                top: "50%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Golden Touch Gold' style={{
                position: 'absolute',
                left: "33%",
                top: "50%",
                zIndex: 8,
                opacity: state.goldenTouch

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("GoldenTouchModal")}
                    onPress={() => {
                        CheckIfGoldenTouchPressed(
                            state.goldenTouch == 0 ? 1 : 0,
                            state.goldenTouchLine == 'white' ? 'gold' : 'white',
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.GoldenTouchText}>
                <Text style={styles.PerkText}>Golden Touch</Text>
            </View>
            <View title='Treasure Hunter Blue' style={{
                position: 'absolute',
                left: "10%",
                top: "49%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Treasure Hunter Gold' style={{
                position: 'absolute',
                left: "10%",
                top: "49%",
                zIndex: 8,
                opacity: state.treasureHunter

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("TreasureHunterModal")}
                    onPress={() => {
                        CheckIfTreasureHunterPressed(
                            state.treasureHunter == 0 ? 1 : 0,
                            state.treasureHunterLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.TreasureHunterText}>
                <Text style={styles.PerkText}>Treasure Hunter</Text>
            </View>
            <View title='Expert Locks Blue' style={{
                position: 'absolute',
                left: "57%",
                top: "38%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Expert Locks Gold' style={{
                position: 'absolute',
                left: "57%",
                top: "38%",
                zIndex: 8,
                opacity: state.expertLocks

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("ExpertLocksModal")}
                    onPress={() => {
                        CheckIfExpertLocksPressed(
                            state.expertLocks == 0 ? 1 : 0,
                            state.expertLocksLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.ExpertLocksText}>
                <Text style={styles.PerkText}>Expert Locks</Text>
            </View>
            <View title='Locksmith Blue' style={{
                position: 'absolute',
                left: "31.5%",
                top: "39%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Locksmith Gold' style={{
                position: 'absolute',
                left: "31.5%",
                top: "39%",
                zIndex: 8,
                opacity: state.locksmith

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("LocksmithModal")}
                    onPress={() => {
                        CheckIfLocksmithPressed(
                            state.locksmith == 0 ? 1 : 0,
                            state.locksmithLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.LocksmithText}>
                <Text style={styles.PerkText}>Locksmith</Text>
            </View>
                      <View title='Unbreakable Blue' style={{
                position: 'absolute',
                left: "11%",
                top: "38%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Unbreakable Gold' style={{
                position: 'absolute',
                left: "11%",
                top: "38%",
                zIndex: 8,
                opacity: state.unbreakable

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("UnbreakableModal")}
                    onPress={() => {
                        CheckIfUnbreakablePressed(
                            state.unbreakable == 0 ? 1 : 0,
                            state.unbreakableLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.UnbreakableText}>
                <Text style={styles.PerkText}>Unbreakable</Text>
            </View>
          <View title='Master Locks Blue' style={{
                position: 'absolute',
                left: "57%",
                top: "29%",
                zIndex: 8,

            }}>
                <StarIconBlue />
            </View>
            <View title='Master Locks Gold' style={{
                position: 'absolute',
                left: "57%",
                top: "29%",
                zIndex: 8,
                opacity: state.masterLocks

            }}>
                <TouchableOpacity
                    onLongPress={() => navigation.navigate("MasterLocksModal")}
                    onPress={() => {
                        CheckMasterLocksPressed(
                            state.masterLocks == 0 ? 1 : 0,
                            state.masterLocksLine == 'white' ? 'gold' : 'white'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>
            <View style={styles.MasterLocksText}>
                <Text style={styles.PerkText}>Master Locks</Text>
            </View>
      <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
        <Line // Novice Locks to Apprentice Locks
          x1="61%"
          y1="68%"
          x2="52%"
          y2="79%"
          stroke={state.apprenticeLocksLine}
          strokeWidth={lineStrokeWidth}
        />

        <Line // Apprentice Locks to Quick Hands
          x1="38%"
          y1="63.5%"
          x2="60%"
          y2="68.3%"
          stroke={state.quickHandsLine}
          strokeWidth={lineStrokeWidth}
        />

        <Line // Quick Hands to Wax Key
          x1="19%"
          y1="59.5%"
          x2="36%"
          y2="63%"
          stroke={state.waxKeyLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Apprentice Locks to Adept Locks
          x1="70.5%"
          y1="56%"
          x2="61%"
          y2="68.5%"
          stroke={state.adeptLocksLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Adept Locks to Golden Touch
          x1="44%"
          y1="54.2%"
          x2="69%"
          y2="56%"
          stroke={state.goldenTouchLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Golden Touch to Treasure Hunter
          x1="20%"
          y1="53%"
          x2="43%"
          y2="54%"
          stroke={state.treasureHunterLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Adept Locks to Expert Locks
          x1="68%"
          y1="41%"
          x2="70%"
          y2="56%"
          stroke={state.adeptLocksLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Expert Locks to Locksmith
          x1="44%"
          y1="42.7%"
          x2="67%"
          y2="42%"
          stroke={state.locksmithLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Locksmith to Unbreakable
          x1="23%"
          y1="41.9%"
          x2="42%"
          y2="42.5%"
          stroke={state.unbreakableLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Expert Locks to Master Locks
          x1="68%"
          y1="32%"
          x2="68%"
          y2="41%"
          stroke={state.masterLocksLine}
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
        left: "55%",
        top: "81%",
        zIndex: 10,
    },
    ApprenticeLocksText: {
        position: 'absolute',
        left: "59%",
        top: "72%",
        zIndex: 10,
    },
    QuickHandsText: {
        position: 'absolute',
        left: "31%",
        top: "68%",
        zIndex: 10,
    },
    WaxKeyText: {
        position: 'absolute',
        left: "10%",
        top: "65%",
        zIndex: 10,
    },
    AdeptLocksText: {
        position: 'absolute',
        left: "72%",
        top: "59%",
        zIndex: 10,
    },
    GoldenTouchText: {
        position: 'absolute',
        left: "37%",
        top: "50%",
        zIndex: 10,
    },
    TreasureHunterText: {
        position: 'absolute',
        left: "10%",
        top: "49%",
        zIndex: 10,
    },
    ExpertLocksText: {
        position: 'absolute',
        left: "77%",
        top: "43%",
        zIndex: 10,
    },
    LocksmithText: {
        position: 'absolute',
        left: "37%",
        top: "38%",
        zIndex: 10,
    },
    UnbreakableText: {
        position: 'absolute',
        left: "10%",
        top: "37%",
        zIndex: 10,
    },

    MasterLocksText: {
      position: 'absolute',
      left: "60%",
      top: "28%",
      zIndex: 10,
    },

    PerkText: {
      color: 'white',
      fontSize: 12,
  }
});

export default LockpickingTree;
