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
const DestructionTree = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ActivePerks, SetActivePerks] = useState(0);
  const [RequiredLevel, SetRequiredLevel] = useState(0);
  const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);
  const [state, setState] = useSetState({
    noviceDestruction: 0,
    apprenticeDestruction: 0,
    apprenticeDestructionLine: 'white',
    adeptDestruction: 0,
    adeptDestructionLine: 'white',
    expertDestruction: 0,
    expertDestructionLine: 'white',
    masterDestruction: 0,
    masterDestructionLine: 'white',
    runeMaster: 0,
    runeMasterLine: 'white',
    augmentedFlames: 0,
    augmentedFlamesLine: 'white',
    intenseFlames: 0,
    intenseFlamesLine: 'white',
    augmentedFrost: 0,
    augmentedFrostLine: 'white',
    deepFreeze: 0,
    deepFreezeLine: 'white',
    augmentedShock: 0,
    augmentedShockLine: 'white',
    disintegrate: 0,
    disintegrateLine: 'white',
    destructionDualCasting: 0,
    destructionDualCastingLine: 'white',
    impact: 0,
    impactLine: 'white',
  });


  let resetAllTrees;
  const resetDestructionPerks = () => {
    setState({ noviceDestruction: 0 });
    setState({ apprenticeDestruction: 0 });
    setState({ apprenticeDestructionLine: 'white' });
    setState({ adeptDestruction: 0 });
    setState({ adeptDestructionLine: 'white' });
    setState({ expertDestruction: 0 });
    setState({ expertDestructionLine: 'white' });
    setState({ masterDestruction: 0 });
    setState({ masterDestructionLine: 'white' });
    setState({ runeMaster: 0 });
    setState({ runeMasterLine: 'white' });
    setState({ augmentedFlames: 0 });
    setState({ augmentedFlamesLine: 'white' });
    setState({ intenseFlames: 0 });
    setState({ intenseFlamesLine: 'white' });
    setState({ augmentedFrost: 0 });
    setState({ augmentedFrostLine: 'white' });
    setState({ deepFreeze: 0 });
    setState({ deepFreezeLine: 'white' });
    setState({ augmentedShock: 0 });
    setState({ augmentedShockLine: 'white' });
    setState({ disintegrate: 0 });
    setState({ disintegrateLine: 'white' });
    setState({ destructionDualCasting: 0 });
    setState({ destructionDualCastingLine: 'white' });
    setState({ impact: 0 });
    setState({ impactLine: 'white' });
    SetRequiredLevel(0);
  }

  const resetActivePerks = () => {
    resetDestructionPerks();
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
      resetDestructionPerks();
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
    if (state.noviceDestruction == 1) {
      TrackLevel(0);
    } else if (state.apprenticeDestruction == 1) {
      TrackLevel(25);
    } else if (state.adeptDestruction == 1) {
      TrackLevel(50);
    } else if (state.expertDestruction == 1) {
      TrackLevel(75);
    } else if (state.masterDestruction == 1) {
      TrackLevel(100);
    } else if (state.runeMaster == 1) {
      TrackLevel(40);
    } else if (state.augmentedFlames == 1) {
      TrackLevel(60);
    } else if (state.intenseFlames == 1) {
      TrackLevel(50);
    } else if (state.augmentedFrost == 1) {
      TrackLevel(60);
    } else if (state.deepFreeze == 1) {
      TrackLevel(60);
    } else if (state.augmentedShock == 1) {
      TrackLevel(60);
    } else if (state.disintegrate == 1) {
      TrackLevel(70);
    } else if (state.destructionDualCasting == 1) {
      TrackLevel(20);
    } else if (state.impact == 1) {
      TrackLevel(40);
    }
  }, [TrackLevel, state]);

  useEffect(() => {
    CheckLevel();
  }, [CheckLevel]);

  const checkIfNoviceDestructionPressed = (buttonColor) => {
    if (
      state.augmentedFlames == 1 ||
      state.augmentedFrost == 1 ||
      state.augmentedShock == 1 ||
      state.apprenticeDestruction == 1 ||
      state.destructionDualCasting == 1
    ) {
      // Do nothing....must un-select nodes above it first
    } else {
      setState({ noviceDestruction: buttonColor }); // Change button color back and forth
    }
  };

  const checkIfAugmentedFlamesPressed = (buttonColor, lineColor) => {
    if (state.noviceDestruction == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ noviceDestruction: buttonColor });
      setState({ augmentedFlames: buttonColor });
      setState({ augmentedFlamesLine: lineColor });
    } else if (state.intenseFlames == 1) {
      // Nothing
    } else {
      setState({ augmentedFlames: buttonColor }); // Change the pressed button color back and forth
      setState({ augmentedFlamesLine: buttonColor });
    }
  };

  const checkIntenseFlamesPressed = (buttonColor, lineColor) => {
    if (state.augmentedFlames == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ noviceDestruction: buttonColor });
      setState({ augmentedFlames: buttonColor });
      setState({ augmentedFlamesLine: lineColor });
      setState({ intenseFlames: buttonColor });
      setState({ intenseFlamesLine: lineColor });
    } else {
      setState({ intenseFlames: buttonColor });
      setState({ intenseFlamesLine: lineColor }); // Change button color back and forth
    }
  };
  const checkIfAugmentedFrostPressed = (buttonColor, lineColor) => {
    if (state.noviceDestruction == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ noviceDestruction: buttonColor });
      setState({ augmentedFrost: buttonColor });
      setState({ augmentedFrostLine: lineColor });
    } else if (state.deepFreeze == 1) {
      // Do nothing....must un-select nodes above it first
    } else {
      setState({ augmentedFrost: buttonColor }); // Change the pressed button color back and forth
      setState({ augmentedFrostLine: lineColor });
    }
  };
  const checkIfDeepFreezePressed = (buttonColor, lineColor) => {
    if (state.augmentedFrost == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ noviceDestruction: buttonColor });
      setState({ augmentedFrost: buttonColor });
      setState({ augmentedFrostLine: lineColor });
      setState({ deepFreeze: buttonColor });
      setState({ deepFreezeLine: lineColor });
    } else {
      setState({ deepFreeze: buttonColor }); // Change the pressed button color back and forth
      setState({ deepFreezeLine: lineColor });
    }
  };
  const checkIfAugmentedShockPressed = (buttonColor, lineColor) => {
    if (state.noviceDestruction == '0') {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ noviceDestruction: buttonColor });
      setState({ augmentedShock: buttonColor });
      setState({ augmentedShockLine: lineColor });
    } else if (state.disintegrate == 1) {
      // Do nothing....must un-select nodes above it first
    } else {
      setState({ augmentedShock: buttonColor }); // Change the pressed button color back and forth
      setState({ augmentedShockLine: lineColor });
    }
  };
  const checkIfDisintegratePressed = (buttonColor, lineColor) => {
    if (state.augmentedShockLine == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ noviceDestruction: buttonColor });
      setState({ augmentedShock: buttonColor });
      setState({ augmentedShockLine: lineColor });
      setState({ disintegrate: buttonColor });
      setState({ disintegrateLine: buttonColor });
    } else {
      setState({ disintegrate: buttonColor });
      setState({ disintegrateLine: lineColor }); // Change the pressed button color back and forth
    }
  };
  const checkIfDestructionDualPressed = (buttonColor, lineColor) => {
    if (state.noviceDestruction == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ noviceDestruction: buttonColor });
      setState({ destructionDualCasting: buttonColor });
      setState({ destructionDualCastingLine: lineColor });
    } else if (state.impact == 1) {
      // Do nothing....must un-select nodes above it first
    } else {
      setState({ destructionDualCastingLine: lineColor }); // Change the pressed button color back and forth
      setState({ destructionDualCasting: buttonColor });
    }
  };
  const checkIfImpactPressed = (buttonColor, lineColor) => {
    if (state.destructionDualCasting == 0) {
      setState({ noviceDestruction: buttonColor });
      setState({ destructionDualCasting: buttonColor });
      setState({ destructionDualCastingLine: lineColor });
      setState({ impact: buttonColor });
      setState({ impactLine: lineColor });
    } else {
      setState({ impact: buttonColor });
      setState({ impactLine: lineColor });
    }
  };
  const checkIfApprenticeDestructionPressed = (buttonColor, lineColor) => {
    if (state.noviceDestruction == 0) {
      // Change the colors of the buttons below it if they have not been pressed
      setState({ noviceDestruction: buttonColor });
      setState({ apprenticeDestruction: buttonColor });
      setState({ apprenticeDestructionLine: lineColor });
    } else if (state.runeMaster == 1 || state.adeptDestruction == 1) {
      // Do nothing....must un-select nodes above it first
    } else {
      setState({ apprenticeDestruction: buttonColor });
      setState({ apprenticeDestructionLine: lineColor }); // Change the pressed button color back and forth
    }
  };
  const checkIfRuneMasterPressed = (buttonColor, lineColor) => {
    if (state.apprenticeDestruction == 0) {
      setState({ noviceDestruction: buttonColor });
      setState({ apprenticeDestruction: buttonColor });
      setState({ apprenticeDestructionLine: lineColor });
      setState({ runeMaster: buttonColor });
      setState({ runeMasterLine: lineColor });
    } else {
      setState({ runeMaster: buttonColor });
      setState({ runeMasterLine: lineColor });
    }
  };
  const checkIfAdeptDestructionPressed = (buttonColor, lineColor) => {
    if (state.apprenticeDestruction == 0) {
      setState({ noviceDestruction: buttonColor });
      setState({ apprenticeDestruction: buttonColor });
      setState({ apprenticeDestructionLine: lineColor });
      setState({ adeptDestruction: buttonColor });
      setState({ adeptDestructionLine: lineColor });
    } else {
      setState({ adeptDestruction: buttonColor });
      setState({ adeptDestructionLine: lineColor });
    }
  };
  const checkIfExpertDestructionPressed = (buttonColor, lineColor) => {
    if (state.adeptDestruction == 0) {
      setState({ noviceDestruction: buttonColor });
      setState({ apprenticeDestruction: buttonColor });
      setState({ apprenticeDestructionLine: lineColor });
      setState({ adeptDestruction: buttonColor });
      setState({ adeptDestructionLine: lineColor });
      setState({ expertDestruction: buttonColor });
      setState({ expertDestructionLine: lineColor });
    } else {
      setState({ expertDestruction: buttonColor });
      setState({ expertDestructionLine: lineColor });
    }
  };
  const checkIfMasterDestructionPressed = (buttonColor, lineColor) => {
    if (state.expertDestruction == 0) {
      setState({ noviceDestruction: buttonColor });
      setState({ apprenticeDestruction: buttonColor });
      setState({ apprenticeDestructionLine: lineColor });
      setState({ expertDestruction: buttonColor });
      setState({ expertDestructionLine: lineColor });
      setState({ masterDestruction: buttonColor });
      setState({ masterDestructionLine: lineColor });
    } else {
      setState({ masterDestruction: buttonColor });
      setState({ masterDestructionLine: lineColor });
    }
  };
  return (
    <View style={{ zIndex: 2 }}>
      <View
        style={styles.resetButtonContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={() => resetActivePerks()}>
          <Text style={{ color: "white", fontWeight: "bold", }}> Reset Destruction Perks</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.topText}>
        <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
        <Text style={styles.HomeScreenText}>All Active Perks: {RequiredLevel}</Text>
      </View>
      <View title='Novice Destruction Blue' style={{
        position: 'absolute',
        left: "24.5%",
        top: "74.5%",
        zIndex: 8,

      }}>
        <StarIconBlue />
      </View>
      <View title='Novice Destruction Gold' style={{
        position: 'absolute',
        left: "24.5%",
        top: "74.5%",
        zIndex: 8,
        opacity: state.noviceDestruction

      }}>
        <TouchableOpacity
          onLongPress={() => navigation.navigate("NoviceDestructionModal")}
          onPress={() => {
            checkIfNoviceDestructionPressed(
              state.noviceDestruction == 0 ? 1 : 0,
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.NoviceDestructionText}>
        <Text style={styles.PerkText}>Novice Destruction</Text>
      </View>
      <View title='Apprentice Destruction Blue' style={{
        position: 'absolute',
        left: "48%",
        top: "55%",
        zIndex: 8,

      }}>

        <StarIconBlue />
      </View>
      <View title='Apprentice Destruction Gold' style={{
        position: 'absolute',
        left: "48%",
        top: "55%",
        zIndex: 8,
        opacity: state.apprenticeDestruction

      }}>
        <TouchableOpacity
          onLongPress={() => navigation.navigate("ApprenticeDestructionModal")}
          onPress={() => {
            checkIfApprenticeDestructionPressed(
              state.apprenticeDestruction == 0 ? 1 : 0,
              state.apprenticeDestructionLine == 'white' ? 'gold' : 'white'
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.ApprenticeDestructionText}>
        <Text style={styles.PerkText}>Apprentice Destruction</Text>
      </View>
      <View title='Adept Destruction Blue' style={{
        position: 'absolute',
        left: "46%",
        top: "41%",
        zIndex: 8,

      }}>
        <StarIconBlue />
      </View>
      <View title='Adept Destruction Gold' style={{
        position: 'absolute',
        left: "46%",
        top: "41%",
        zIndex: 8,
        opacity: state.adeptDestruction

      }}>
        <TouchableOpacity
          onLongPress={() => navigation.navigate("AdeptDestructionModal")}

          onPress={() => {
            checkIfAdeptDestructionPressed(
              state.adeptDestruction == 0 ? 1 : 0,
              state.adeptDestructionLine == 'white' ? 'gold' : 'white'
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.AdeptDestructionText}>
        <Text style={styles.PerkText}>Adept Destruction</Text>
      </View>
      <View title='Expert Destruction Blue' style={{
        position: 'absolute',
        left: "51%",
        top: "30%",
        zIndex: 8,

      }}>
        <StarIconBlue />
      </View>
      <View title='Expert Destruction Gold' style={{
        position: 'absolute',
        left: "51%",
        top: "30%",
        zIndex: 8,
        opacity: state.expertDestruction

      }}>
        <TouchableOpacity
          onLongPress={() => navigation.navigate("ExpertDestructionModal")}

          onPress={() => {
            checkIfExpertDestructionPressed(
              state.expertDestruction == 0 ? 1 : 0,
              state.expertDestructionLine == 'white' ? 'gold' : 'white'
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.ExpertDestructionText}>
        <Text style={styles.PerkText}>Expert Destruction</Text>
      </View>
      <View title='Master Destruction Blue' style={{
        position: 'absolute',
        left: "50%",
        top: "20%",
        zIndex: 8,

      }}>
        <StarIconBlue />
      </View>
      <View title='Master Destruction Gold' style={{
        position: 'absolute',
        left: "50%",
        top: "20%",
        zIndex: 8,
        opacity: state.masterDestruction

      }}>
        <TouchableOpacity
          onLongPress={() => navigation.navigate("MasterDestructionModal")}

          onPress={() => {
            checkIfMasterDestructionPressed(
              state.masterDestruction == 0 ? 1 : 0,
              state.masterDestructionLine == 'white' ? 'gold' : 'white'
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.MasterDestructionText}>
        <Text style={styles.PerkText}>Master Destruction</Text>
      </View>
      <View title='Rune Master Blue' style={{
        position: 'absolute',
        left: "62%",
        top: "45%",
        zIndex: 8,

      }}>
        <StarIconBlue />
      </View>
      <View title='Rune Master Gold' style={{
        position: 'absolute',
        left: "62%",
        top: "45%",
        zIndex: 8,
        opacity: state.runeMaster

      }}>
        <TouchableOpacity
          onLongPress={() => navigation.navigate("RuneMasterModal")}

          onPress={() => {
            checkIfRuneMasterPressed(
              state.runeMaster == 0 ? 1 : 0,
              state.runeMasterLine == 'white' ? 'gold' : 'white',
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.RuneMasterText}>
        <Text style={styles.PerkText}>Rune Master</Text>
      </View>
      <View title='Augmented Flames Blue' style={{
        position: 'absolute',
        left: "-1%",
        top: "55%",
        zIndex: 8,

      }}>
        <StarIconBlue />
      </View>
      <View title='Augmented Flames Gold' style={{
        position: 'absolute',
        left: "-1%",
        top: "55%",
        zIndex: 8,
        opacity: state.augmentedFlames

      }}>
        <TouchableOpacity
          onLongPress={() => navigation.navigate("AugmentedFlamesModal")}

          onPress={() => {
            checkIfAugmentedFlamesPressed(
              state.augmentedFlames == 0 ? 1 : 0,
              state.augmentedFlamesLine == 'white' ? 'gold' : 'white'
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.AugmentedFlamesText}>
        <Text style={styles.PerkText}>Augmented{"\n"}Flames</Text>
      </View>
      <View title='Intense Flames Blue' style={{
        position: 'absolute',
        left: "-2%",
        top: "45%",
        zIndex: 8,

      }}>
        <StarIconBlue />
      </View>
      <View title='Intense Flames Gold' style={{
        position: 'absolute',
        left: "-2%",
        top: "45%",
        zIndex: 8,
        opacity: state.intenseFlames

      }}>
        <TouchableOpacity
          onLongPress={() => navigation.navigate("IntenseFlamesModal")}
          onPress={() => {
            checkIntenseFlamesPressed(
              state.intenseFlames == 0 ? 1 : 0,
              state.intenseFlamesLine == 'white' ? 'gold' : 'white'
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.IntenseFlamesText}>
        <Text style={styles.PerkText}>Intense{"\n"}Flames</Text>
      </View>
      <View title='Augmented Frost Blue' style={{
        position: 'absolute',
        left: "13%",
        top: "49%",
        zIndex: 8,

      }}>
        <StarIconBlue />
      </View>
      <View title='Augmented Frost Gold' style={{
        position: 'absolute',
        left: "13%",
        top: "49%",
        zIndex: 8,
        opacity: state.augmentedFrost

      }}>
        <TouchableOpacity
          onLongPress={() => navigation.navigate("AugmentedFrostModal")}

          onPress={() => {
            checkIfAugmentedFrostPressed(
              state.augmentedFrost == 0 ? 1 : 0,
              state.augmentedFrostLine == 'white' ? 'gold' : 'white'
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.AugmentedFrostText}>
        <Text style={styles.PerkText}>Augmented Frost</Text>
      </View>
      <View title='Augmented Shock Blue' style={{
        position: 'absolute',
        left: "29%",
        top: "44%",
        zIndex: 8,

      }}>
        <StarIconBlue />
      </View>
      <View title='Augmented Shock Gold' style={{
        position: 'absolute',
        left: "29%",
        top: "44%",
        zIndex: 8,
        opacity: state.augmentedShock

      }}>
        <TouchableOpacity
          onLongPress={() => navigation.navigate("AugmentedShockModal")}

          onPress={() => {
            checkIfAugmentedShockPressed(
              state.augmentedShock == 0 ? 1 : 0,
              state.augmentedShockLine == 'white' ? 'gold' : 'white'
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.AugmentedShockText}>
        <Text style={styles.PerkText}>Augmented Shock</Text>
      </View>
      <View title='Disintegrate Blue' style={{
        position: 'absolute',
        left: "29%",
        top: "30%",
        zIndex: 8,

      }}>
        <StarIconBlue />
      </View>
      <View title='Disintegrate Gold' style={{
        position: 'absolute',
        left: "29%",
        top: "30%",
        zIndex: 8,
        opacity: state.disintegrate

      }}>
        <TouchableOpacity
          onLongPress={() => navigation.navigate("DisintegrateModal")}

          onPress={() => {
            checkIfDisintegratePressed(
              state.disintegrate == 0 ? 1 : 0,
              state.disintegrateLine == 'white' ? 'gold' : 'white'
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.DisintegrateText}>
        <Text style={styles.PerkText}>Disintegrate</Text>
      </View>
      <View title='Destruction Dual Casting Blue' style={{
        position: 'absolute',
        left: "59%",
        top: "64%",
        zIndex: 8,

      }}>
        <StarIconBlue />
      </View>
      <View title='Destruction Dual Casting Gold' style={{
        position: 'absolute',
        left: "59%",
        top: "64%",
        zIndex: 8,
        opacity: state.destructionDualCasting

      }}>
        <TouchableOpacity
          onLongPress={() => navigation.navigate("DestructionDualCastingModal")}

          onPress={() => {
            checkIfDestructionDualPressed(
              state.destructionDualCasting == 0 ? 1 : 0,
              state.destructionDualCastingLine == 'white' ? 'gold' : 'white'
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.DestructionDualCastingText}>
        <Text style={styles.PerkText}>Destruction{"\n"}Dual Casting</Text>
      </View>
      <View title='Impact Blue' style={{
        position: 'absolute',
        left: "69%",
        top: "55%",
        zIndex: 8,

      }}>
        <StarIconBlue />
      </View>
      <View title='Impact Gold' style={{
        position: 'absolute',
        left: "69%",
        top: "55%",
        zIndex: 8,
        opacity: state.impact

      }}>
        <TouchableOpacity
          onLongPress={() => navigation.navigate("ImpactModal")}

          onPress={() => {
            checkIfImpactPressed(
              state.impact == 0 ? 1 : 0,
              state.impactLine == 'white' ? 'gold' : 'white'
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.ImpactText}>
        <Text style={styles.PerkText}>Impact</Text>
      </View>
      <View title='Deep Freeze Blue' style={{
        position: 'absolute',
        left: "14%",
        top: "35%",
        zIndex: 8,

      }}>
        <StarIconBlue />
      </View>
      <View title='Deep Freeze Gold' style={{
        position: 'absolute',
        left: "14%",
        top: "35%",
        zIndex: 8,
        opacity: state.deepFreeze

      }}>
        <TouchableOpacity
          onLongPress={() => navigation.navigate("DeepFreezeModal")}

          onPress={() => {
            checkIfDeepFreezePressed(
              state.deepFreeze == 0 ? 1 : 0,
              state.deepFreezeLine == 'white' ? 'gold' : 'white'
            );
          }}>
          <StarIconGold />
        </TouchableOpacity>
      </View>
      <View style={styles.DeepFreezeText}>
        <Text style={styles.PerkText}>Deep Freeze</Text>
      </View>
      <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} >

        <Line // Novice Destruction to Apprentice Destruction
          x1="35.3%"
          y1="79.2%"
          x2="60%"
          y2="60%"
          stroke={state.apprenticeDestructionLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Apprentice to Adept Destruction
          x1="60%"
          y1="59%"
          x2="57%"
          y2="46%"
          stroke={state.adeptDestructionLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Adept to Expert Destruction
          x1="57%"
          y1="44%"
          x2="62.5%"
          y2="36%"
          stroke={state.expertDestructionLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Expert Destruction to Master Destruction
          x1="62.5%"
          y1="34%"
          x2="61%"
          y2="26%"
          stroke={state.masterDestructionLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Apprentice Destruction to Rune Master
          x1="61%"
          y1="59%"
          x2="74%"
          y2="50%"
          stroke={state.runeMasterLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Novice Destruction to Augmented flames
          x1="10%"
          y1="60%"
          x2="34%"
          y2="79%"
          stroke={state.augmentedFlamesLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Augmented Flames to Intense Flames
          x1="10%"
          y1="59%"
          x2="9%"
          y2="50%"
          stroke={state.intenseFlamesLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Novice Destruction to Augmented Frost
          x1="24%"
          y1="55%"
          x2="35%"
          y2="79%"
          stroke={state.augmentedFrostLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Augmented Frost to Deep Freeze
          x1="25%"
          y1="53.5%"
          x2="25%"
          y2="40%"
          stroke={state.deepFreezeLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Novice Destruction to Augmented Shock
          x1="40.2%"
          y1="50%"
          x2="35%"
          y2="79%"
          stroke={state.augmentedShockLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Augmented Shock to Disintegrate
          x1="40.2%"
          y1="35%"
          x2="40%"
          y2="48%"
          stroke={state.augmentedShockLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Novice Destruction to Destruction Dual Casting
          x1="70.2%"
          y1="70%"
          x2="37%"
          y2="79%"
          stroke={state.destructionDualCastingLine}
          strokeWidth={lineStrokeWidth}
        />
        <Line // Destruction Dual Casting to Impact
          x1="80%"
          y1="60%"
          x2="71%"
          y2="69%"
          stroke={state.impactLine}
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
  NoviceDestructionText: {
    position: 'absolute',
    left: "25%",
    top: "83%",
    zIndex: 10,
  },
  ApprenticeDestructionText: {
    position: 'absolute',
    left: "40%",
    top: "63%",
    zIndex: 10,
  },
  AdeptDestructionText: {
    position: 'absolute',
    left: "48%",
    top: "42%",
    zIndex: 10,
  },
  ExpertDestructionText: {
    position: 'absolute',
    left: "51%",
    top: "31%",
    zIndex: 10,
  },
  MasterDestructionText: {
    position: 'absolute',
    left: "48%",
    top: "20%",
    zIndex: 10,
  },
  RuneMasterText: {
    position: 'absolute',
    left: "74%",
    top: "45%",
    zIndex: 10,
  },
  AugmentedFlamesText: {
    position: 'absolute',
    left: "2%",
    top: "63%",
    zIndex: 10,
  },
  IntenseFlamesText: {
    position: 'absolute',
    left: "3%",
    top: "43%",
    zIndex: 10,
  },
  AugmentedFrostText: {
    position: 'absolute',
    left: "13%",
    top: "56%",
    zIndex: 10,
  },
  DeepFreezeText: {
    position: 'absolute',
    left: "10%",
    top: "35%",
    zIndex: 10,
  },
  AugmentedShockText: {
    position: 'absolute',
    left: "28%",
    top: "52%",
    zIndex: 10,
  },
  DisintegrateText: {
    position: 'absolute',
    left: "30%",
    top: "30%",
    zIndex: 10,
  },
  DestructionDualCastingText: {
    position: 'absolute',
    left: "68%",
    top: "72%",
    zIndex: 10,
  },
  ImpactText: {
    position: 'absolute',
    left: "79%",
    top: "55%",
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

export default DestructionTree;
