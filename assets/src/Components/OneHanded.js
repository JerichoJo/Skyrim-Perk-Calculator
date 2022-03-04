import * as React from 'react';
import {
  useState,
  useCallback,
  useEffect,
  useContext,
} from 'react';
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

const OneHandedTree = () => {
  const navigation = useNavigation();
  const [ActivePerks, SetActivePerks] = useState(0);
  const [RequiredLevel, SetRequiredLevel] = useState(0);
  const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);
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
    paralyzingStrikeLineLeft: 'white',
    paralyzingStrikeLineRight: 'white',
    hackAndSlash: 0,
    hackAndSlashLine: 'white',
  });

  let resetAllTrees;
  const resetOneHandedPerks = () => {

    setState({ armsman: 0 });
    setState({ bladesman: 0 });
    setState({ bladesmanLine: 'white' });
    setState({ bonebreaker: 0 });
    setState({ bonebreakerLine: 'white' });
    setState({ dualFlurry: 0 });
    setState({ dualFlurryLine: 'white' });
    setState({ dualSavagery: 0 });
    setState({ dualSavageryLine: 'white' });
    setState({ fightingStance: 0 });
    setState({ fightingStanceLine: 'white' });
    setState({ criticalCharge: 0 });
    setState({ criticalChargeLine: 'white' });
    setState({ savageStrike: 0 });
    setState({ savageStrikeLine: 'white' });
    setState({ paralyzingStrike: 0 });
    setState({ paralyzingStrikeLineLeft: 'white' });
    setState({ paralyzingStrikeLineRight: 'white' });
    setState({ hackAndSlash: 0 });
    setState({ hackAndSlashLine: 'white' });
    SetRequiredLevel(0);
  }

  const resetActivePerks = () => {
    resetOneHandedPerks();
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
      resetOneHandedPerks();
      SetActivePerks(0);
    }
  }, [resetAllTrees]);

// Use this to control Re-renders for resetting AllActivePerks with useEffect();
if (AllActivePerks == 0) {
    resetAllTrees = 1;
} else {
    resetAllTrees = 0;
}

// Each time AllActiverPerks hits 0, re-render and reset all the nodes....AllActivePerks is set to 0 in DrawerNav.js via a button
useEffect(() => {
    if (resetAllTrees == 1) {
        resetOneHandedPerks();
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
  }, [state]);

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
      state.bonebreaker == 0 ? IncrementCounter(1) : DecrementCounter(1)
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
      state.bladesman == 0? IncrementCounter(1) : DecrementCounter(1)
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
    } else if (state.savageStrike == 1 || state.criticalCharge == 1) {
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

  const checkIfCriticalChargePressed = (buttonColor, lineColor, lineColor2) => {
    if (state.criticalCharge == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ armsman: buttonColor });
      setState({ fightingStance: buttonColor });
      setState({ fightingStanceLine: lineColor });
      setState({ criticalCharge: buttonColor });
      setState({ criticalChargeLine: lineColor });
      if (state.paralyzingStrike == 1) {
        setState({ paralyzingStrikeLineLeft: lineColor });
      } 
      if (state.fightingStance == 1) {
        IncrementCounter(2);
      } else if (state.armsman == 1) {
        IncrementCounter(3);
      } else {
        IncrementCounter(4);
        // Set Armsman level
      }
    } else if (state.paralyzingStrike == 1 && state.savageStrike == 0 ) {
      // Do nothing....must un-select nodes above it first
    } else if (state.paralyzingStrike == 1 && state.savageStrike == 1) {
      setState({ criticalChargeLine: lineColor });
      setState({ critcal: lineColor });

    } else if (state.paralyzingStrike && state.criticalCharge == 1) {
      setState({ criticalCharge: buttonColor }); // Change the pressed button color back and forth
      setState({ criticalChargeLine: lineColor });
      setState({ paralyzingStrike: lineColor });
      state.criticalCharge == 0 ? IncrementCounter(1) : DecrementCounter(1);
    } else {
      setState({ criticalCharge: buttonColor });
      setState({ criticalChargeLine: lineColor });
      state.criticalCharge == 0 ? IncrementCounter(1) : DecrementCounter(1);
    }
  };
  const checkIfParalyzingStrikePressed = (buttonColor, lineColor, lineColor2) => {
    if (state.savageStrike == 1 && state.criticalCharge == 0) {
      setState({ paralyzingStrike: buttonColor });
      setState({ paralyzingStrikeLineLeft: lineColor });
      setState({ savageStrike: buttonColor });
      setState({ savageStrikeLine: lineColor });
      setState({ fightingStance: buttonColor });
      setState({ fightingStanceLine: lineColor });
      setState({ armsman: buttonColor });
    } else if (state.savageStrike == 0 && state.criticalCharge == 1) {
      setState({ paralyzingStrike: buttonColor });
      setState({ paralyzingStrikeLineRight: lineColor2 });
      setState({ criticalCharge: buttonColor });
      setState({ criticalChargeLine: lineColor });
      setState({ fightingStance: buttonColor });
      setState({ fightingStanceLine: lineColor });
      setState({ armsman: buttonColor });
    } else if (state.savageStrike == 1 && state.criticalCharge == 1) {
      setState({ paralyzingStrike: buttonColor });
      setState({ paralyzingStrikeLineLeft: lineColor });
      setState({ paralyzingStrikeLineRight: lineColor2 });
    } else {
      setState({ paralyzingStrike: buttonColor });
      setState({ paralyzingStrikeLineRight: lineColor2 });
      setState({ criticalCharge: buttonColor });
      setState({ criticalChargeLine: lineColor });
      setState({ fightingStance: buttonColor });
      setState({ fightingStanceLine: lineColor });
      setState({ armsman: buttonColor });
    }
  }

  return (
    <View style={{ zIndex: 2 }}>
      <View
        style={styles.resetButtonContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={() => resetActivePerks()}>
          <Text style={{ color: "white", fontWeight: "bold", }}> Reset One-Handed Perks</Text>
        </TouchableOpacity>
      </View>
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
          onLongPress={() => navigation.navigate("ArmsmanModal")}
          onPress={() => {
            CheckIfArmsmanPressed(
              state.armsman == 0 ? 1 : 0,
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.ArmsmanText}>
        <Text style={styles.PerkText}>Armsman</Text>
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
          onLongPress={() => navigation.navigate("HackAndSlashModal")}
          onPress={() => {
            checkIfHackAndSlashPressed(
              state.hackAndSlash == 0 ? 1 : 0,
              state.hackAndSlashLine == 'white' ? 'gold' : 'white'
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.HackAndSlashText}>
        <Text style={styles.PerkText}>Hack and Slash</Text>
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
          onLongPress={() => navigation.navigate("BladesmanModal")}
          onPress={() => {
            CheckIfBladesmanPressed(
              state.bladesman == 0 ? 1 : 0,
              state.bladesmanLine == 'white' ? 'gold' : 'white'
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.BladesmanText}>
        <Text style={styles.PerkText}>Bladesman</Text>
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
          onLongPress={() => navigation.navigate("BoneBreakerModal")}
          onPress={() => {
            CheckIfBoneBreakerPressed(
              state.bonebreaker == 0 ? 1 : 0,
              state.bonebreakerLine == 'white' ? 'gold' : 'white'
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.BoneBreakerText}>
        <Text style={styles.PerkText}>Bone Breaker</Text>
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
          onLongPress={() => navigation.navigate("FightingStanceModal")}
          onPress={() => {
            checkIfFightingStancePressed(
              state.fightingStance == 0 ? 1 : 0,
              state.fightingStanceLine == 'white' ? 'gold' : 'white'
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.FightingStanceText}>
        <Text style={styles.PerkText}>Fighting Stance</Text>
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
          onLongPress={() => navigation.navigate("CriticalChargeModal")}
          onPress={() => {
            checkIfCriticalChargePressed(
              state.criticalCharge == 0 ? 1 : 0,
              state.criticalChargeLine == 'white' ? 'gold' : 'white',
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.CriticalChargeText}>
        <Text style={styles.PerkText}>Critical Charge</Text>
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
          onLongPress={() => navigation.navigate("SavageStrikeModal")}
          onPress={() => {
            checkIfSavageStrikePressed(
              state.savageStrike == 0 ? 1 : 0,
              state.savageStrikeLine == 'white' ? 'gold' : 'white'
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.SavageStrikeText}>
        <Text style={styles.PerkText}>Savage Strike</Text>
      </View>
      <View title='Paralyzing Strike Blue' style={{
        position: 'absolute',
        left: "20%",
        top: "25%",
        zIndex: 8,

      }}>
        <StarIconBlue />
      </View>
      <View title='Paralyzing Strike Gold' style={{
        position: 'absolute',
        left: "20%",
        top: "25%",
        zIndex: 8,
        opacity: state.paralyzingStrike

      }}>
        <TouchableOpacity
          onLongPress={() => navigation.navigate("ParalyzingStrikeModal")}
          onPress={() => {
            checkIfParalyzingStrikePressed(
              state.paralyzingStrike == 0 ? 1 : 0,
              state.paralyzingStrikeLineLeft == 'white' ? 'gold' : 'white',
              state.paralyzingStrikeLineRight == 'white' ? 'gold' : 'white'
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.ParalyzingStrikeText}>
        <Text style={styles.PerkText}>Paralyzing Strike</Text>
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
          onLongPress={() => navigation.navigate("DualFlurryModal")}
          onPress={() => {
            checkIfDualFlurryPressed(
              state.dualFlurry == 0 ? 1 : 0,
              state.dualFlurryLine == 'white' ? 'gold' : 'white'
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.DualFlurryText}>
        <Text style={styles.PerkText}>Dual Flurry</Text>
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
          onLongPress={() => navigation.navigate("DualSavageryModal")}
          onPress={() => {
            checkIfDualSavageryChecked(
              state.dualSavagery == 0 ? 1 : 0,
              state.dualSavageryLine == 'white' ? 'gold' : 'white'
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
          x1="16%"
          y1="65%"
          x2="30%"
          y2="80%"
          stroke={state.hackAndSlashLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Armsmen to Bladesman
          x1="62%"
          y1="63%"
          x2="31%"
          y2="80%"
          stroke={state.bladesmanLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Armsman to Bone Breaker
          x1="45%"
          y1="63%"
          x2="31.5%"
          y2="80%"
          stroke={state.bonebreakerLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Armsman to Fighting Stance
          x1="30%"
          y1="60%"
          x2="31%"
          y2="80%"
          stroke={state.fightingStanceLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Fighting Stance to Critical Charge
          x1="45%"
          y1="46%"
          x2="31%"
          y2="59%"
          stroke={state.criticalChargeLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Fighting Stance to Savage Strike
          x1="15%"
          y1="45%"
          x2="29%"
          y2="59%"
          stroke={state.savageStrikeLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Savage Strike to Paralyzing Strike
          x1="31%"
          y1="30%"
          x2="15%"
          y2="44%"
          stroke={state.paralyzingStrikeLineLeft}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Critical Charge to Paralyzing Strike
          x1="31%"
          y1="30%"
          x2="45%"
          y2="44%"
          stroke={state.paralyzingStrikeLineRight}
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
  ArmsmanText: {
    position: 'absolute',
    left: "24%",
    top: "83%",
    zIndex: 10,
  },
  BladesmanText: {
    position: 'absolute',
    left: "60%",
    top: "65%",
    zIndex: 10,
  },
  BoneBreakerText: {
    position: 'absolute',
    left: "40%",
    top: "57%",
    zIndex: 10,
  },
  DualFlurryText: {
    position: 'absolute',
    left: "70%",
    top: "74%",
    zIndex: 10,
  },
  DualSavageryText: {
    position: 'absolute',
    left: "59%",
    top: "39%",
    zIndex: 10,
  },
  FightingStanceText: {
    position: 'absolute',
    left: "2%",
    top: "57.2%",
    zIndex: 10,
  },
  CriticalChargeText: {
    position: 'absolute',
    left: "47%",
    top: "48%",
    zIndex: 10,
  },
  SavageStrikeText: {
    position: 'absolute',
    left: "7%",
    top: "40%",
    zIndex: 10,
  },
  ParalyzingStrikeText: {
    position: 'absolute',
    left: "17%",
    top: "25%",
    zIndex: 10,
  },
  HackAndSlashText: {
    position: 'absolute',
    left: "2%",
    top: "70%",
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

export default OneHandedTree;