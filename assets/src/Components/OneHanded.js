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
  const navigation = useNavigation();
  const [ActivePerks, SetActivePerks] = useState(0);
  const [RequiredLevel, SetRequiredLevel] = useState(0);
  const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);
  const [armsmanLevel, setArmsmanLevel] = useState(0);
  const [hackAndSlashLevel, setHackAndSlashLevel] = useState(0);
  const [dualFlurryLevel, setDualFlurryLevel] = useState(0);
  const [bonebreakerLevel, setBoneBreakerLevel] = useState(0);
  const [bladesmanLevel, setBladesmanLevel] = useState(0);

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
    setHackAndSlashLevel(0);
    setArmsmanLevel(0);
    setBladesmanLevel(0);
    setDualFlurryLevel(0);
    setBoneBreakerLevel(0);
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
    if (state.paralyzingStrike == 1) {
      TrackLevel(100);
    }
    if (state.armsman == 1 && armsmanLevel == 1) {
      TrackLevel(0);
    } else if (state.fightingStance == 1) {
      TrackLevel(20);
    } else if (state.armsman == 1 && armsmanLevel == 2) {
      TrackLevel(20);
    } else if (state.hackAndSlash == 1 && hackAndSlashLevel == 1) {
      TrackLevel(30);
    } else if (state.dualFlurry == 1 && dualFlurryLevel == 1) {
      TrackLevel(30);
    } else if (state.bonebreaker == 1 && bonebreakerLevel == 1) {
      TrackLevel(30);
    } else if (state.bladesman == 1 && bladesmanLevel == 1) {
      TrackLevel(30);
    } else if (state.armsman == 1 && armsmanLevel == 3) {
      TrackLevel(40);
    } else if (state.savageStrike == 1) {
      TrackLevel(50);
    } else if (state.dualFlurry == 1 && dualFlurryLevel == 2) {
      TrackLevel(50);
    } else if (state.criticalCharge == 1) {
      TrackLevel(50);
    } else if (state.armsman == 1 && armsmanLevel == 4) {
      TrackLevel(60);
    } else if (state.dualSavagery == 1) {
      TrackLevel(70);
    } else if (state.armsman == 1 && armsmanLevel == 5) {
      TrackLevel(80);
    } else if (state.hackAndSlash == 1 && hackAndSlashLevel == 3) {
      TrackLevel(90);
    } else if (state.bonebreaker == 1 && bonebreakerLevel == 3) {
      TrackLevel(90);
    } else if (state.bladesman == 1 && bladesmanLevel == 3) {
      TrackLevel(90);
    }

  }, [state]);

  useEffect(() => {
    CheckLevel();
  }, [CheckLevel]);

  const CheckIfArmsmanPressed = (buttonColor) => { // Armsman 5 increments
    if (
      state.hackAndSlash == 1 ||
      state.fightingStance == 1 ||
      state.bonebreaker == 1 ||
      state.bladesman == 1 ||
      state.dualFlurry == 1
    ) {
      // Do nothing....must un-select nodes above it first
    } else {
      IncArmsmanCountCall(buttonColor);
    }
  };
  const IncArmsmanCounter = (numActiveArmsman) => {
    if (armsmanLevel < 5) {
      setArmsmanLevel(armsmanLevel + numActiveArmsman)
    }
    else {
      setArmsmanLevel(0) // return to 0 after the perk is maxed out
    }
  }
  // function to control the armsman 0/5
  const IncArmsmanCountCall = (buttonColor) => {
    if (armsmanLevel == 0) {
      setState({ armsman: buttonColor }); // Change the pressed button color back and forth
      IncrementCounter(1); // increment active perks by 1 on first click
      IncArmsmanCounter(1); // increment basic smith by 1 on first click
    } else if (armsmanLevel == 5) {
      setState({ armsman: buttonColor }); // Change the line color back and forth
      IncArmsmanCounter(1); // Increment by one so that it goes back to 0 
      DecrementCounter(5); // decrease active perks back down 3 because it is set back to 0

    } else {
      IncrementCounter(1);
      IncArmsmanCounter(1) // increment by 1 after it perk is active
    }

  }
  const checkIfHackAndSlashPressed = (buttonColor, lineColor) => {
    if (state.armsman == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ armsman: buttonColor });
      setState({ hackAndSlashLine: lineColor });
      setState({ hackAndSlash: buttonColor });
      if (hackAndSlashLevel == 2) {
        DecrementCounter(1);
        setHackAndSlashLevel(1);
      } else {
        if (state.armsman == 0) {
          IncrementCounter(2);
          IncHackAndSlashCounter(1);

        } else {
          IncrementCounter(1);
          IncAugmentedFrostCounter(1);
        }
      }
      // Button handled in the perk function
    } else {

      IncHackAndSlashCountCall(buttonColor, lineColor);
    }
  };
  const IncHackAndSlashCounter = (numActiveHackAndSlash) => {
    if (hackAndSlashLevel < 3) {
      setHackAndSlashLevel(hackAndSlashLevel + numActiveHackAndSlash)
    }
    else {
      setHackAndSlashLevel(0); // return to 0 after the perk is maxed out
    }
  }
  // function to control the hack and slash 0/3
  const IncHackAndSlashCountCall = (buttonColor, lineColor) => {
    if (hackAndSlashLevel == 0) {
      setState({ hackAndSlash: buttonColor });
      setState({ hackAndSlashLine: lineColor });
      IncHackAndSlashCounter(1);
    } else if (hackAndSlashLevel == 3) {
      setState({ hackAndSlash: buttonColor });
      setState({ hackAndSlashLine: lineColor });
      IncHackAndSlashCounter(1);
      DecrementCounter(1);
    } else {
      IncrementCounter(1);
      IncHackAndSlashCounter(1);
    }
  }
  const CheckIfBoneBreakerPressed = (buttonColor, lineColor) => {
    if (state.armsman == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ armsman: buttonColor });
      setState({ bonebreakerLine: lineColor });
      setState({ bonebreaker: buttonColor });
      if (bonebreakerLevel == 2) {
        DecrementCounter(1);
        setBoneBreakerLevel(1);
      } else {
        if (state.armsman == 0) {
          IncrementCounter(2);
          IncBonebreakerCounter(1);

        } else {
          IncrementCounter(1);
          IncBonebreakerCounter(1);
        }
      }
      // Button handled in the perk function
    } else {
      IncBonebreakerCountCall(buttonColor, lineColor);
    }
  };
  const IncBonebreakerCounter = (numActiveBoneBreaker) => {
    if (bonebreakerLevel < 3) {
      setBoneBreakerLevel(bonebreakerLevel + numActiveBoneBreaker)
    }
    else {
      setBoneBreakerLevel(0); // return to 0 after the perk is maxed out
    }
  }

  // function to control the bonebreaker 0/3
  const IncBonebreakerCountCall = (buttonColor, line) => {
    if (bonebreakerLevel == 0) {
      setState({ bonebreaker: buttonColor }); // Change the pressed button color back and forth
      setState({ bonebreakerLine: line }); // Change the pressed button color back and forth
      IncrementCounter(1); // increment active perks by 1 on first click
      IncBonebreakerCounter(1); // increment basic smith by 1 on first click
    } else if (bonebreakerLevel == 3) {
      setState({ bonebreaker: buttonColor }); // Change the line color back and forth
      setState({ bonebreakerLine: line }); // Change the line color back and forth
      IncBonebreakerCounter(1); // Increment by one so that it goes back to 0 
      DecrementCounter(3); // decrease active perks back down 3 because it is set back to 0

    } else {
      IncrementCounter(1);
      IncBonebreakerCounter(1) // increment by 1 after it perk is active
    }

  }
  const CheckIfBladesmanPressed = (buttonColor, lineColor) => {
    if (state.armsman == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ armsman: buttonColor });
      setState({ bladesmanLevel: lineColor });
      setState({ bladesman: buttonColor });
      if (bladesmanLevel == 2) {
        DecrementCounter(1);
        setBladesmanLevel(1);
      } else {
        if (state.bladesman == 0) {
          IncrementCounter(2);
          IncBladesmanCounter(1);

        } else {
          IncrementCounter(1);
          IncBladesmanCounter(1);
        }
      }
      // Button handled in the perk function
    } else {

      IncBladesmanCountCall(buttonColor, lineColor);
    }
  };
  const IncBladesmanCounter = (numActiveBladesman) => {
    if (bladesmanLevel < 3) {
      setBladesmanLevel(bladesmanLevel + numActiveBladesman)
    }
    else {
      setBladesmanLevel(0); // return to 0 after the perk is maxed out
    }
  }
  // function to control the Bladesman 0/3
  const IncBladesmanCountCall = (buttonColor, line) => {
    if (bladesmanLevel == 0) {
      setState({ bladesman: buttonColor }); // Change the pressed button color back and forth
      setState({ bladesmanLine: line }); // Change the pressed button color back and forth
      IncrementCounter(1); // increment active perks by 1 on first click
      IncBladesmanCounter(1); // increment basic smith by 1 on first click
    } else if (bladesmanLevel == 3) {
      setState({ bladesman: buttonColor }); // Change the line color back and forth
      setState({ bladesmanLine: line }); // Change the line color back and forth
      IncBladesmanCounter(1); // Increment by one so that it goes back to 0 
      DecrementCounter(3); // decrease active perks back down 3 because it is set back to 0

    } else {
      IncrementCounter(1);
      IncBladesmanCounter(1) // increment by 1 after it perk is active
    }
  }
  const checkIfDualFlurryPressed = (buttonColor, lineColor) => {
    if (state.armsman == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ armsman: buttonColor });
      setState({ dualFlurryLine: lineColor });
      setState({ dualFlurry: buttonColor });
      if (dualFlurryLevel == 2) {
        DecrementCounter(1);
        setDualFlurryLevel(1);
      } else {
        if (state.armsman == 0) {
          IncrementCounter(2);
          IncDualFlurryCounter(1);

        } else {
          IncrementCounter(1);
          IncDualFlurryCounter(1);
        }
      }
      // Button handled in the perk function
    } else if (state.dualSavagery == 1) {
      // do nothing
    }
    else {
      IncDualFlurryCountCall(buttonColor, lineColor);
    }
  };
  // function to control the Dual Flurry Perk Counter
  const IncDualFlurryCounter = (numActiveDualFlurry) => {

    if (dualFlurryLevel < 2) {

    if (dualFlurryLevel < 3) {

      setDualFlurryLevel(dualFlurryLevel + numActiveDualFlurry)
    }
    else {
      setDualFlurryLevel(0); // return to 0 after the perk is maxed out
    }
  }
  // function to control the hack and slash 0/3
  const IncDualFlurryCountCall = (buttonColor, lineColor) => {
    if (dualFlurryLevel == 0) {
      setState({ dualFlurry: buttonColor });
      setState({ dualFlurryLine: lineColor });
      IncDualFlurryCounter(1);
    } else if (dualFlurryLevel == 2) {
      setState({ dualFlurry: buttonColor });
      setState({ dualFlurryLine: lineColor });
      IncDualFlurryCounter(1);
      DecrementCounter(1);
    } else {
      IncrementCounter(1);
      IncDualFlurryCounter(1);
    }
  }
  const checkIfDualSavageryChecked = (buttonColor, lineColor) => {
    if (state.dualFlurry == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ armsman: buttonColor });
      setState({ dualFlurry: buttonColor });
      setState({ dualFlurryLine: lineColor });
      setState({ dualSavagery: buttonColor });
      setState({ dualSavageryLine: lineColor });
      setDualFlurryLevel(1);
      if (state.armsman == 1) {
        IncrementCounter(2);
      } else {
        IncrementCounter(3);
      }
    } else {
      setState({ dualSavagery: buttonColor }); // Change the pressed button color back and forth
      setState({ dualSavageryLine: lineColor });
      state.dualSavagery == 0 ? IncrementCounter(1) : DecrementCounter(1);
    }
  };
  const checkIfFightingStancePressed = (buttonColor, lineColor) => {
    if (state.armsman == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ armsman: buttonColor });
      setState({ fightingStance: buttonColor });
      setState({ fightingStanceLine: lineColor });
      IncrementCounter(2);
    } else if (state.savageStrike == 1 || state.criticalCharge == 1) {
      // Do nothing....must un-select nodes above it first
    } else {
      setState({ fightingStance: buttonColor });
      setState({ fightingStanceLine: lineColor }); // Change the pressed button color back and forth
      state.fightingStance == 0 ? IncrementCounter(1) : DecrementCounter(1);
    }
  };

  const checkIfSavageStrikePressed = (buttonColor, lineColor, lineColor2) => {
    if (state.fightingStance == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ armsman: buttonColor });
      setState({ fightingStance: buttonColor });
      setState({ fightingStanceLine: lineColor });
      setState({ savageStrike: buttonColor });
      setState({ savageStrikeLine: lineColor });
      if (state.armsman == 1) {
        IncrementCounter(2);
      } else {
        IncrementCounter(3);
      }
    } else if (state.paralyzingStrike == 1 && state.criticalCharge == 0) {
      // Do nothing....must un-select nodes above it first
    } else if (state.paralyzingStrike == 1 && state.criticalCharge == 1) {
      setState({ savageStrike: buttonColor });
      setState({ savageStrikeLine: lineColor });
      setState({ paralyzingStrikeLineLeft: lineColor2 });
    } else {
      setState({ savageStrike: buttonColor });
      setState({ savageStrikeLine: lineColor }); // Change the pressed button color back and forth
      state.fightingStance = 0 ? IncrementCounter(1) : DecrementCounter(1);
    }
  };

  const checkIfCriticalChargePressed = (buttonColor, lineColor, lineColor2) => {
    if (state.fightingStance == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ armsman: buttonColor });
      setState({ fightingStance: buttonColor });
      setState({ fightingStanceLine: lineColor });
      setState({ criticalCharge: buttonColor });
      setState({ criticalChargeLine: lineColor });
      if (state.armsman == 1) {
        IncrementCounter(2);
      } else {
        IncrementCounter(3);
      }
      // Set Armsman level
    } else if (state.paralyzingStrike == 1 && state.savageStrike == 0) {
      // Do nothing....must un-select nodes above it first
    } else if (state.paralyzingStrike == 1 && state.savageStrike == 1) {
      setState({ criticalChargeLine: lineColor });
      setState({ criticalCharge: buttonColor });
      setState({ paralyzingStrikeLineRight: lineColor2 })

    } else {
      setState({ criticalCharge: buttonColor });
      setState({ criticalChargeLine: lineColor });
      state.criticalCharge == 0 ? IncrementCounter(1) : DecrementCounter(1);
    }
  };
  const checkIfParalyzingStrikePressed = (buttonColor, lineColor, lineColor2) => {
    if (state.savageStrike == 0 && state.criticalCharge == 0) {
      setState({ paralyzingStrike: buttonColor });
      setState({ paralyzingStrikeLineLeft: lineColor });
      setState({ savageStrike: buttonColor });
      setState({ savageStrikeLine: lineColor });
      setState({ fightingStance: buttonColor });
      setState({ fightingStanceLine: lineColor });
      setState({ armsman: buttonColor });
      if (state.fightingStance == 1) {
        IncrementCounter(2);
      } else if (state.armsman == 1) {
        IncrementCounter(3);
      } else {
        IncrementCounter(4);
      }
    }
    else if (state.savageStrike == 1 && state.criticalCharge == 0) {
      setState({ paralyzingStrike: buttonColor });
      setState({ paralyzingStrikeLineLeft: lineColor });
      state.paralyzingStrike == 0 ? IncrementCounter(1) : DecrementCounter(1);
    }
    else if (state.savageStrike == 0 && state.criticalCharge == 1) {
      setState({ paralyzingStrike: buttonColor });
      setState({ paralyzingStrikeLineRight: lineColor2 });
      state.paralyzingStrike == 0 ? IncrementCounter(1) : DecrementCounter(1);
    }
    else if (state.savageStrike == 1 && state.criticalCharge == 1) {
      setState({ paralyzingStrike: buttonColor });
      setState({ paralyzingStrikeLineLeft: lineColor });
      setState({ paralyzingStrikeLineRight: lineColor2 });
      state.paralyzingStrike == 0 ? IncrementCounter(1) : DecrementCounter(1);
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
        <Text style={styles.PerkText}>Armsman ({armsmanLevel}/5)</Text>
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
        <Text style={styles.PerkText}>Hack and Slash ({hackAndSlashLevel}/3)</Text>
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
        <Text style={styles.PerkText}>Bladesman ({bladesmanLevel}/3)</Text>
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
        <Text style={styles.PerkText}>Bone Breaker ({bonebreakerLevel}/3)</Text>
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
              state.paralyzingStrikeLineRight == 'white' ? 'gold' : 'white'
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
              state.savageStrikeLine == 'white' ? 'gold' : 'white',
              state.paralyzingStrikeLineLeft == 'white' ? 'gold' : 'white'
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
        <Text style={styles.PerkText}>Dual Flurry ({dualFlurryLevel}/2)</Text>
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