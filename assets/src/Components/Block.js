import * as React from 'react';
import { useState, useCallback, useEffect, useContext } from 'react';
import Svg, { Line } from 'react-native-svg';
import {
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    StyleSheet,
    Button,
    Alert
} from 'react-native';
import StarIconBlue from './StarIconBlue';
import StarIconGold from './StarIconGold';
import { AllActivePerkss } from '../../../StackNavigator';
import { useNavigation } from '@react-navigation/native';
import ActivityIndicatorViewNativeComponent from 'react-native/Libraries/Components/ActivityIndicator/ActivityIndicatorViewNativeComponent';

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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ActivePerks, SetActivePerks] = useState(0);
    const [shieldWallLevel, setShieldWallLevel] = useState(0);
    const [RequiredLevel, SetRequiredLevel] = useState(0);
    const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);
    let resetAllTrees;
    const lineStrokeWidth = '2';
    const [state, setState] = useSetState({
        shieldWall: 0,
        quickReflexes: 0,
        quickReflexesLine: 'white',
        deflectArrows: 0,
        deflectArrowsLine: 'white',
        elementalProtection: 0,
        elementalProtectionLine: 'white',
        blockRunner: 0,
        blockRunnerLine: 'white',
        powerBash: 0,
        powerBashLine: 'white',
        deadlyBash: 0,
        deadlyBashLine: 'white',
        disarmingBash: 0,
        disarmingBashLine: 'white',
        shieldCharge: 0,
        shieldChargeLine: 'white', //Block to shield
        shieldChargeLine2: 'white', // Disarming to shield
    });

    const resetBlock2Perks = () => { // Change
        setState({ shieldWall: 0 });
        setState({ quickReflexes: 0 });
        setState({ quickReflexesLine: 'white' });
        setState({ deflectArrows: 0 });
        setState({ deflectArrowsLine: 'white' });
        setState({ elementalProtection: 0 });
        setState({ elementalProtectionLine: 'white' });
        setState({ blockRunner: 0 });
        setState({ blockRunnerLine: 'white' });
        setState({ powerBash: 0 });
        setState({ powerBashLine: 'white' });
        setState({ deadlyBash: 0 });
        setState({ deadlyBashLine: 'white' });
        setState({ disarmingBash: 0 });
        setState({ disarmingBashLine: 'white' });
        setState({ shieldCharge: 0 });
        setState({ shieldChargeLine: 'white' }); // block to shield
        setState({ shieldChargeLine2: 'white' }); // disarming to shield
        SetRequiredLevel(0);
        setShieldWallLevel(0);
    }

    const resetActivePerks = () => {
        resetBlock2Perks();
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
            resetBlock2Perks();
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


    const CheckLevel = useCallback(() => {
        if (state.shieldCharge == 1) {
            TrackLevel(100);
        } else if (state.blockRunner == 1 || state.disarmingBash == 1) {
            TrackLevel(70);
        } else if (state.elementalProtection == 1 || state.deadlyBash == 1) {
            TrackLevel(60);
        } else if (state.advancedSmithing == 1) {
            TrackLevel(50);
        } else if (state.deflectArrows == 1 || state.powerBash == 1 || state.quickReflexes == 1) {
            TrackLevel(30);
        } else if (state.shieldWall == 1 && shieldWallLevel == 5) {
            TrackLevel(80);
        } else if (state.shieldWall == 1 && shieldWallLevel == 4) {
            TrackLevel(60);
        } else if (state.shieldWall == 1 && shieldWallLevel == 3) {
            TrackLevel(40);
        } else if (state.shieldWall == 1 && shieldWallLevel == 2) {
            TrackLevel(20);
        } else if (state.shieldWall == 1 && shieldWallLevel == 1) {
            TrackLevel(0);
        } else {
            TrackLevel(0)
        }
    }, [state]);

    useEffect(() => {
        CheckLevel();
    }, [CheckLevel]);

    const CheckIfShieldWallPressed = (button) => {
        if (
            state.deflectArrows == 1 ||
            state.quickReflexes == 1 ||
            state.powerBash == 1
        ) {
            // Do nothing....must un-select nodes above it first
            if (shieldWallLevel == 5) {
                DecrementCounter(4);
                setShieldWallLevel(1);
            } else {
                IncrementCounter(1);
                IncShieldWallCountCall(1);
            } 
        } else {
           IncShieldWallCountCall(button);
        }
    };
    const IncShieldWallCounter = (numActiveShieldWall) => {
        if (shieldWallLevel < 5) {
            setShieldWallLevel(shieldWallLevel + numActiveShieldWall)
        }
    }
    // Controls shield wall perk count -> 0/5 increments
    const IncShieldWallCountCall = (buttonColor) => {
        if (shieldWallLevel == 0) {
            setState({shieldWall: buttonColor});
            IncrementCounter(1);
            IncShieldWallCounter(1);
        } else if (shieldWallLevel == 5) {
            setState({shieldWall: buttonColor});
            IncShieldWallCounter(1); // Increment by one
            DecrementCounter(5); 
        } else {
            IncrementCounter(1);
            IncShieldWallCounter(1); //Increment Shield Wall Perks by 1
        }

    }


    const CheckIfQuickReflexesPressed = (button, line) => {
        if (state.shieldWall == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ shieldWall: button });
            setState({ quickReflexes: button });
            setState({ quickReflexesLine: line });
            setShieldWallLevel(1);
            IncrementCounter(2);
        } else {
            setState({ quickReflexesLine: line });
            setState({ quickReflexes: button }); // Change the pressed button color back and forth
            state.quickReflexes == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfDeflectArrowsPressed = (buttonColor, lineColor) => {
        if (state.shieldWall == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ shieldWall: buttonColor });
            setState({ deflectArrows: buttonColor });
            setState({ deflectArrowsLine: lineColor });
            setShieldWallLevel(1);
            IncrementCounter(2);
        } else if (state.elementalProtection == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ deflectArrowsLine: lineColor });
            setState({ deflectArrows: buttonColor }); // Change button color back and forth
            state.deflectArrows == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfElementalProtectionPressed = (buttonColor, lineColor) => {
        if (state.deflectArrows == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ shieldWall: buttonColor });
            setState({ deflectArrows: buttonColor });
            setState({ elementalProtection: buttonColor });
            setState({ deflectArrowsLine: lineColor });
            setState({ elementalProtectionLine: lineColor });
            if (state.shieldWall == 1) {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
                //setShieldWallLevel(1);
            }
        } else if (state.blockRunner == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ elementalProtectionLine: lineColor });
            setState({ elementalProtection: buttonColor }); // Change the pressed button color back and forth
            state.elementalProtection == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    
    const CheckIfBlockRunnerPressed = (buttonColor, lineColor) => {
        if (state.elementalProtection == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ shieldWall: buttonColor });
            setState({ deflectArrows: buttonColor });
            setState({ elementalProtection: buttonColor });
            setState({ blockRunner: buttonColor });
            setState({ deflectArrowsLine: lineColor });
            setState({ elementalProtectionLine: lineColor });
            setState({ blockRunnerLine: lineColor });
            if (state.shieldCharge == 1) {
                setState({ shieldChargeLine: lineColor });
            }
            if (state.deflectArrows == 1) {
                IncrementCounter(2);
            } else if (state.shieldWall == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
                setShieldWallLevel(1);
            }
        } else if (state.shieldCharge == 1 && state.disarmingBash == 0) {
            // Do nothing....must un-select nodes above it first
        } else if (state.shieldCharge == 1 && state.disarmingBash == 1) {
            setState({ shieldChargeLine: lineColor });
            setState({ blockRunnerLine: lineColor });
            setState({ blockRunner: buttonColor }); // Change the pressed button color back and forth
            state.blockRunner == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        } else {
            setState({ blockRunnerLine: lineColor });
            setState({ blockRunner: buttonColor }); // Change the pressed button color back and forth
            state.blockRunner == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };
    const CheckIfPowerBashPressed = (buttonColor, lineColor) => {
        if (state.shieldWall == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ shieldWall: buttonColor });
            setState({ powerBash: buttonColor });
            setState({ powerBashLine: lineColor });
            IncrementCounter(2);
            setShieldWallLevel(1);
        } else if (state.deadlyBash == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ powerBashLine: lineColor });
            setState({ powerBash: buttonColor }); // Change the pressed button color back and forth
            state.powerBash == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    const CheckIfDeadlyBashPressed = (buttonColor, lineColor) => {
        if (state.powerBash == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ shieldWall: buttonColor });
            setState({ powerBash: buttonColor });
            setState({ deadlyBash: buttonColor });
            setState({ powerBashLine: lineColor });
            setState({ deadlyBashLine: lineColor });
            if (state.deadlyBash == 1) {
                IncrementCounter(2);
            } else if (state.shieldWall == 0) {
                setShieldWallLevel(1);
            } else {
                IncrementCounter(3);
            }
        } else if (state.disarmingBash == 1) {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ deadlyBashLine: lineColor });
            setState({ deadlyBash: buttonColor }); // Change the pressed button color back and forth
            state.deadlyBash == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);

        }
    };
    
    const CheckIfDisarmingBashPressed = (buttonColor, lineColor, lineColor2) => {
        if (state.deadlyBash == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ shieldWall: buttonColor });
            setState({ powerBash: buttonColor });
            setState({ deadlyBash: buttonColor });
            setState({ disarmingBash: buttonColor });
            setState({ powerBashLine: lineColor });
            setState({ deadlyBashLine: lineColor });
            setState({ disarmingBashLine: lineColor });
            if (state.shieldCharge == 1) {
                setState({ shieldChargeLine2: lineColor2 });
            }
            if (state.powerBash == 1) {
                IncrementCounter(1);
            } else if (state.shieldWall == 1) {
                IncrementCounter(3);
            } else {
                IncrementCounter(4);
                setShieldWallLevel(1);
            }
        } else if (state.shieldCharge == 1 && state.blockRunner == 0) {
            // Do nothing....must un-select nodes above it first
        } else if (state.shieldCharge == 1 && state.blockRunner == 1) {
            setState({ shieldChargeLine2: lineColor2 });
            setState({ disarmingBashLine: lineColor });
            setState({ disarmingBash: buttonColor }); // Change the pressed button color back and forth
            state.disarmingBash == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        } else {
            setState({ disarmingBashLine: lineColor });
            setState({ disarmingBash: buttonColor }); // Change the pressed button color back and forth
            state.disarmingBash == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const checkIfShieldChargePressed = (buttonColor, line, line2) => {
        if (state.blockRunner == 1 && state.disarmingBash == 0){ // Fill left line and shield charge icon only
            setState({ shieldChargeLine: line });
            setState({ shieldCharge: buttonColor });
            state.shieldCharge == 0
            ? IncrementCounter(1)
            : DecrementCounter(1);

        }
        if (state.blockRunner == 0 && state.disarmingBash == 1){ // Fill right line and shield charge icon only
            setState({ shieldChargeLine2: line2 });
            setState({ shieldCharge: buttonColor });
            state.shieldCharge == 0
            ? IncrementCounter(1)
            : DecrementCounter(1);
        }
        if (state.blockRunner == 1 && state.disarmingBash == 1){ // Fill left line and shield charge icon only
            setState({ shieldChargeLine: line });
            setState({ shieldCharge: buttonColor });
            setState({ shieldChargeLine2: line2 });
            state.shieldCharge == 0
            ? IncrementCounter(1)
            : DecrementCounter(1);
        }
        if (state.blockRunner == 0 && state.disarmingBash == 0) {
            setState({ shieldChargeLine2: line2 });
            setState({ shieldCharge: buttonColor });
            setState({ disarmingBashLine: line });
            setState({ disarmingBash: buttonColor });
            setState({ deadlyBashLine: line });
            setState({ deadlyBash: buttonColor });
            setState({ powerBashLine: line });
            setState({ powerBash: buttonColor });
            setState({ shieldWall: buttonColor });
            IncrementCounter(5);
        }
    }
    return (
        <View style={{ zIndex: 2 }}>
          <View
            style={styles.resetButtonContainer}>
            <TouchableOpacity style={styles.resetButton} onPress={() => resetActivePerks()}>
              <Text style={{ color: "white", fontWeight: "bold", }}> Reset Block Perks</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.topText}>
            <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
            <Text style={styles.HomeScreenText}>Required Level: { RequiredLevel}</Text>
          </View>
          <View title='Shield Wall Blue' style={{
            position: 'absolute',
            left: "39%",
            top: "74%",
            zIndex: 8,
    
          }}>
            <StarIconBlue />
          </View>
          <View title='Shield Wall Gold' style={{
            position: 'absolute',
            left: "39%",
            top: "74%",
            zIndex: 8,
            opacity: state.shieldWall
    
          }}>
            <TouchableOpacity
              onLongPress={() => navigation.navigate("ShieldWallModal")}
              onPress={() => {
                CheckIfShieldWallPressed(
                  state.shieldWall == 0 ? 1 : 0,
                );
              }}>
              <StarIconGold />
            </TouchableOpacity>
          </View>
          <View style={styles.ShieldWallText}>
            <Text style={styles.PerkText}>Shield Wall ({shieldWallLevel}/5)</Text>
          </View>
          <View title='Quick Reflexes Blue' style={{
            position: 'absolute',
            left: "34%",
            top: "60%",
            zIndex: 8,
    
          }}>
    
            <StarIconBlue />
          </View>
          <View title='Quick Reflexes Gold' style={{
            position: 'absolute',
            left: "34%",
            top: "60%",
            zIndex: 8,
            opacity: state.quickReflexes
    
          }}>
            <TouchableOpacity
              onLongPress={() => navigation.navigate("QuickReflexesModal")}
              onPress={() => {
                CheckIfQuickReflexesPressed(
                  state.quickReflexes == 0 ? 1 : 0,
                  state.quickReflexesLine == 'white' ? 'gold' : 'white'
                );
              }}>
              <StarIconGold />
            </TouchableOpacity>
          </View>
          <View style={styles.QuickReflexesText}>
            <Text style={styles.PerkText}>Quick Reflexes</Text>
          </View>
          <View title='Deflect Arrows Blue' style={{
            position: 'absolute',
            left: "9%",
            top: "65%",
            zIndex: 8,
    
          }}>
            <StarIconBlue />
          </View>
          <View title='Deflect Arrows Gold' style={{
            position: 'absolute',
            left: "9%",
            top: "65%",
            zIndex: 8,
            opacity: state.deflectArrows
    
          }}>
            <TouchableOpacity
              onLongPress={() => navigation.navigate("DeflectArrows")}
              onPress={() => {
                CheckIfDeflectArrowsPressed(
                  state.deflectArrows == 0 ? 1 : 0,
                  state.deflectArrowsLine == 'white' ? 'gold' : 'white'
                );
              }}>
              <StarIconGold />
            </TouchableOpacity>
          </View>
          <View style={styles.DeflectArrowsText}>
            <Text style={styles.PerkText}>Deflect Arrows</Text>
          </View>
          <View title='Elemental Protection Blue' style={{
            position: 'absolute',
            left: "11%",
            top: "49%",
            zIndex: 8,
    
          }}>
            <StarIconBlue />
          </View>
          <View title='Elemental Protection Gold' style={{
            position: 'absolute',
            left: "11%",
            top: "49%",
            zIndex: 8,
            opacity: state.elementalProtection
    
          }}>
            <TouchableOpacity
              onLongPress={() => navigation.navigate("ElementalProtectionModal")}
              onPress={() => {
                CheckIfElementalProtectionPressed(
                  state.elementalProtection == 0 ? 1 : 0,
                  state.elementalProtectionLine == 'white' ? 'gold' : 'white'
                );
              }}>
              <StarIconGold />
            </TouchableOpacity>
          </View>
          <View style={styles.ElementalProtectionText}>
            <Text style={styles.PerkText}>Elemental Protection</Text>
          </View>
          <View title='Block Runner Blue' style={{
            position: 'absolute',
            left: "20%",
            top: "39%",
            zIndex: 8,
    
          }}>
            <StarIconBlue />
          </View>
          <View title='Block Runner Gold' style={{
            position: 'absolute',
            left: "20%",
            top: "39%",
            zIndex: 8,
            opacity: state.blockRunner
    
          }}>
            <TouchableOpacity
              onLongPress={() => navigation.navigate("BlockRunnerModal")}
              onPress={() => {
                CheckIfBlockRunnerPressed(
                  state.blockRunner == 0 ? 1 : 0,
                  state.blockRunnerLine == 'white' ? 'gold' : 'white'
                );
              }}>
              <StarIconGold />
            </TouchableOpacity>
          </View>
          <View style={styles.BlockRunnerText}>
            <Text style={styles.PerkText}>Block Runner</Text>
          </View>
          <View title='Shield Charge Blue' style={{
            position: 'absolute',
            left: "43%",
            top: "38%",
            zIndex: 8,
    
          }}>
            <StarIconBlue />
          </View>
          <View title='Shield Charge Gold' style={{
            position: 'absolute',
            left: "43%",
            top: "38%",
            zIndex: 8,
            opacity: state.shieldCharge
    
          }}>
            <TouchableOpacity
              onLongPress={() => navigation.navigate("ShieldChargeModal")}
              onPress={() => {
                checkIfShieldChargePressed(
                  state.shieldCharge == 0 ? 1 : 0,
                  state.shieldChargeLine == 'white' ? 'gold' : 'white',
                  state.shieldChargeLine2 == 'white' ? 'gold' : 'white'
                );
              }}>
              <StarIconGold />
            </TouchableOpacity>
          </View>
          <View style={styles.ShieldChargeText}>
            <Text style={styles.PerkText}>Shield Charge</Text>
          </View>
          <View title='Disarming Bash Blue' style={{
            position: 'absolute',
            left: "68%",
            top: "39%",
            zIndex: 8,
    
          }}>
            <StarIconBlue />
          </View>
          <View title='Disarming Bash Gold' style={{
            position: 'absolute',
            left: "68%",
            top: "39%",
            zIndex: 8,
            opacity: state.disarmingBash
    
          }}>
            <TouchableOpacity
              onLongPress={() => navigation.navigate("DisarmingBashModal")}
              onPress={() => {
                CheckIfDisarmingBashPressed(
                  state.disarmingBash == 0 ? 1 : 0,
                  state.disarmingBashLine == 'white' ? 'gold' : 'white'
                );
              }}>
              <StarIconGold />
            </TouchableOpacity>
          </View>
          <View style={styles.DisarmingBashText}>
            <Text style={styles.PerkText}>Disarming Bash</Text>
          </View>
          <View title='Deadly Bash Blue' style={{
            position: 'absolute',
            left: "74%",
            top: "48%",
            zIndex: 8,
    
          }}>
            <StarIconBlue />
          </View>
          <View title='Deadly Bash Gold' style={{
            position: 'absolute',
            left: "74%",
            top: "48%",
            zIndex: 8,
            opacity: state.deadlyBash
    
          }}>
            <TouchableOpacity
              onLongPress={() => navigation.navigate("DeadlyBashModal")}
              onPress={() => {
                CheckIfDeadlyBashPressed(
                  state.deadlyBash == 0 ? 1 : 0,
                  state.deadlyBashLine == 'white' ? 'gold' : 'white'
                );
              }}>
              <StarIconGold />
            </TouchableOpacity>
          </View>
          <View style={styles.DeadlyBashText}>
            <Text style={styles.PerkText}>Deadly Bash</Text>
          </View>
          <View title='Power Bash Blue' style={{
            position: 'absolute',
            left: "74%",
            top: "63%",
            zIndex: 8,
    
          }}>
            <StarIconBlue />
          </View>
          <View title='Power Bash Gold' style={{
            position: 'absolute',
            left: "74%",
            top: "63%",
            zIndex: 8,
            opacity: state.powerBash
    
          }}>
            <TouchableOpacity
              onLongPress={() => navigation.navigate("PowerBashModal")}
    
              onPress={() => {
                CheckIfPowerBashPressed(
                  state.powerBash == 0 ? 1 : 0,
                  state.powerBashLine == 'white' ? 'gold' : 'white'
                );
              }}>
              <StarIconGold />
            </TouchableOpacity>
          </View>
          <View style={styles.PowerBashText}>
            <Text style={styles.PerkText}>Power Bash</Text>
          </View>
          <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} >
    
            <Line // Shield Wall to Deflect Arrows
              x1="20%"
              y1="70%"
              x2="48%"
              y2="79%"
              stroke={state.deflectArrowsLine}
              strokeWidth={lineStrokeWidth}
            />
            <Line // Deflect Arrows to Elemental Protection
              x1="22.5%"
              y1="55%"
              x2="20%"
              y2="69%"
              stroke={state.elementalProtectionLine}
              strokeWidth={lineStrokeWidth}
            />
            <Line // Elemental Protection to Block Runner
              x1="29%"
              y1="45%"
              x2="23%"
              y2="53%"
              stroke={state.blockRunnerLine}
              strokeWidth={lineStrokeWidth}
            />
            <Line // Block Runner to Shield Charge
              x1="52%"
              y1="43%"
              x2="32%"
              y2="43.5%"
              stroke={state.shieldChargeLine}
              strokeWidth={lineStrokeWidth}
            />
            <Line // Shield Charge to Disarming Bash
              x1="78%"
              y1="44%"
              x2="56%"
              y2="43%"
              stroke={state.shieldChargeLine2}
              strokeWidth={lineStrokeWidth}
            />
            <Line // Disarming Bash to Deadly Bash
              x1="85%"
              y1="53%"
              x2="81%"
              y2="45%"
              stroke={state.disarmingBashLine}
              strokeWidth={lineStrokeWidth}
            />
            <Line // Deadly Bash to Power Bash
              x1="86%"
              y1="67%"
              x2="85%"
              y2="54%"
              stroke={state.deadlyBashLine}
              strokeWidth={lineStrokeWidth}
            />
            <Line // Shield wall to power bash
              x1="51.5%"
              y1="79%"
              x2="86%"
              y2="68%"
              stroke={state.powerBashLine}
              strokeWidth={lineStrokeWidth}
            />
            <Line // Shield wall to Quick Reflexes
              x1="45%"
              y1="66%"
              x2="50%"
              y2="79%"
              stroke={state.quickReflexesLine}
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
      ShieldWallText: {
        position: 'absolute',
        left: "41%",
        top: "82%",
        zIndex: 10,
      },
      DeflectArrowsText: {
        position: 'absolute',
        left: "5%",
        top: "73%",
        zIndex: 10,
      },
      ElementalProtectionText: {
        position: 'absolute',
        left: "7%",
        top: "57%",
        zIndex: 10,
      },
      BlockRunnerText: {
        position: 'absolute',
        left: "7%",
        top: "43%",
        zIndex: 10,
      },
      PowerBashText: {
        position: 'absolute',
        left: "73%",
        top: "73%",
        zIndex: 10,
      },
      DeadlyBashText: {
        position: 'absolute',
        left: "75%",
        top: "57%",
        zIndex: 10,
      },
      DisarmingBashText: {
        position: 'absolute',
        left: "70%",
        top: "47%",
        zIndex: 10,
      },
      ShieldChargeText: {
        position: 'absolute',
        left: "45%",
        top: "37%",
        zIndex: 10,
      },
      QuickReflexesText: {
        position: 'absolute',
        left: "40%",
        top: "60%",
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
export default BlockTree;