import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import Svg, { G, Path, Circle, Line } from 'react-native-svg';
import {
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    Button,
    StyleSheet,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import {MaterialCommunityIcons } from '@expo/vector-icons';
import StarIconBlue from './StarIconBlue';
import StarIconGold from './StarIconGold';



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

const SmithingTree = ({
    IncrementAll,
    DecrementAll,
    UpdateCurrentLevel,
}) => {
    const [state, setState] = useSetState({
        basicSmithing: 0,
        arcaneSmithing: 0,
        arcaneSmithingLine: 'black',
        elvinSmithing: 'transparent',
        elvinSmithingLine: 'black',
        advancedSmithing: 'transparent',
        advancedSmithingLine: 'black',
        glassSmithing: 'transparent',
        glassSmithingLine: 'black',
        dwarvenSmithing: 'transparent',
        dwarvenSmithingLine: 'black',
        orcishSmithing: 'transparent',
        orcishSmithingLine: 'black',
        ebonySmithing: 'transparent',
        ebonySmithingLine: 'black',
        daedricSmithing: 'transparent',
        daedricSmithingLine: 'black',
        dragonSmithing: 'transparent',
        dragonSmithingLine: 'black',
        dragonSmithingLineLight: 'black',
        middleLine: 'transparent',
        middleLineLine: 'black',
    });

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isMenuVisible, setIsMenuVisible] = React.useState(false);

    const [count, setCount] = useState(0);

    const [ActivePerks, SetActivePerks] = useState(0);
    const [RequiredLevel, SetRequiredLevel] = useState(0);

    const IncrementCounter = (numActivePerks = 0) => {
        SetActivePerks(ActivePerks + numActivePerks);
    };
    const DecrementCounter = (numActivePerks = 0) => {
        if (ActivePerks === 0) {
            return;
        }
        SetActivePerks(ActivePerks - numActivePerks);
    };

    const TrackLevel = useCallback((level) => {
        SetRequiredLevel(level);
    }, []);

    const circleRadius = '12';
    const circleStrokeWidth = '10';
    const lineStrokeWidth = '2';

    const CheckLevel = useCallback(() => {
        if (state.dragonSmithing == 'black') {
            TrackLevel(100);
        } else if (state.daedricSmithing == 'black') {
            TrackLevel(90);
        } else if (state.ebonySmithing == 'black') {
            TrackLevel(80);
        } else if (state.glassSmithing == 'black') {
            TrackLevel(70);
        } else if (state.arcaneSmithing == 1) {
            TrackLevel(60);
        } else if (state.advancedSmithing == 'black') {
            TrackLevel(50);
        } else if (state.elvinSmithing == 'black') {
            TrackLevel(30);
        } else if (state.basicSmithing == 1 ) {
            TrackLevel(0);
        }
    }, [TrackLevel, state]);

    useEffect(() => {
        CheckLevel();
    }, [CheckLevel]);

    const CheckIfBasicSmithPressed = (button) => {
        if (
            state.elvinSmithing == 1 ||
            state.arcaneSmithing == 1 ||
            state.dwarvenSmithing == 1
        ) {
            // Do nothing....must un-select nodes above it first
        } 
        else {          
            setState({ basicSmithing: button }); // Change button color back and forth
            state.basicSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfArcaneSmithPressed = (button, line) => {
        if (state.basicSmithing == 0) {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ basicSmithing: button });
            setState({ basicSmithingLine: line });
            setState({ arcaneSmithing: button });
            setState({ arcaneSmithingLine: line });
            IncrementCounter(2);
        } else {
            setState({ arcaneSmithingLine: line });
            state.arcaneSmithingLine == 'black'
            setState({ arcaneSmithing: button }); // Change the pressed button color back and forth
            state.arcaneSmithing == 0
                ? IncrementCounter(1)
                : DecrementCounter(1);
        }
    };

    const CheckIfElvinSmithPressed = (buttonColor, lineColor) => {
        if (state.basicSmithing == 'transparent') {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ basicSmithing: buttonColor });
            setState({ basicSmithingLine: lineColor });
            setState({ elvinSmithing: buttonColor });
            setState({ elvinSmithingLine: lineColor });

            IncrementCounter(2);
        } else if (state.advancedSmithing == 'black') {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ elvinSmithing: buttonColor }); // Change button color back and forth
            state.elvinSmithing == 'transparent'
                ? IncrementCounter(1)
                : DecrementCounter(1);
            setState({ elvinSmithingLine: lineColor });
            state.elvinSmithingLine == 'black'
        }
    };
    const CheckIfAdvanceSmithingPressed = (buttonColor, lineColor) => {
        if (state.elvinSmithing == 'transparent') {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ basicSmithing: buttonColor });
            setState({ advancedSmithing: buttonColor });
            setState({ elvinSmithing: buttonColor });
            setState({ basicSmithingLine: lineColor });
            setState({ advancedSmithingLine: lineColor });
            setState({ elvinSmithingLine: lineColor });
            if (state.basicSmithing == 'black') {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else if (state.glassSmithing == 'black') {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ advancedSmithing: buttonColor }); // Change the pressed button color back and forth
            state.advancedSmithing == 'transparent'
                ? IncrementCounter(1)
                : DecrementCounter(1);
            setState({ advancedSmithingLine: lineColor }); // Change the pressed button color back and forth
            state.advancedSmithing == 'black'
        }
    };
    const CheckIfGlassSmithingPressed = (buttonColor, lineColor) => {
        if (state.advancedSmithing == 'transparent') {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ glassSmithing: buttonColor });
            setState({ advancedSmithing: buttonColor });
            setState({ elvinSmithing: buttonColor });
            setState({ basicSmithing: buttonColor });
            setState({ glassSmithingLine: lineColor });
            setState({ advancedSmithingLine: lineColor });
            setState({ elvinSmithingLine: lineColor });
            setState({ basicSmithingLine: lineColor });
            if (state.basicSmithing == 'black') {
                IncrementCounter(2);
            } else {
                IncrementCounter(3);
            }
        } else {
            setState({ glassSmithing: buttonColor }); // Change the pressed button color back and forth
            state.glassSmithing == 'transparent'
                ? IncrementCounter(1)
                : DecrementCounter(1);
            setState({ glassSmithingLine: lineColor }); // Change the pressed button color back and forth
            state.glassSmithing == 'black'
        }
    };
    const CheckIfDwarvenSmithingPressed = (buttonColor, lineColor) => {
        if (state.basicSmithing == 'transparent') {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ dwarvenSmithing: buttonColor });
            setState({ basicSmithing: buttonColor });
            setState({ dwarvenSmithingLine: lineColor });
            setState({ basicSmithingLine: lineColor });
            IncrementCounter(2);
        } else if (state.orcishSmithing == 'black') {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ dwarvenSmithing: buttonColor }); // Change the pressed button color back and forth
            setState({ dwarvenSmithingLine: lineColor });
        }
    };
    const CheckIfOrcishSmithingPressed = (buttonColor, lineColor) => {
        if (state.dwarvenSmithing == 'transparent') {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ orcishSmithing: buttonColor });
            setState({ dwarvenSmithing: buttonColor });
            setState({ basicSmithing: buttonColor });
            setState({ orcishSmithingLine: lineColor });
            setState({ dwarvenSmithingLine: lineColor });
            setState({ basicSmithingLine: lineColor });
        } else if (state.ebonySmithing == 'black') {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ orcishSmithing: buttonColor }); // Change the pressed button color back and forth
            setState({ orcishSmithingLine: lineColor });
        }
    };
    const CheckIfEbonySmithingPressed = (buttonColor, lineColor) => {
        if (state.orcishSmithing == 'transparent') {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ ebonySmithing: buttonColor });
            setState({ orcishSmithing: buttonColor });
            setState({ dwarvenSmithing: buttonColor });
            setState({ basicSmithing: buttonColor });
            setState({ ebonySmithingLine: lineColor });
            setState({ orcishSmithingLine: lineColor });
            setState({ dwarvenSmithingLine: lineColor });
            setState({ basicSmithingLine: lineColor });
        } else if (state.daedricSmithing == 'black') {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ ebonySmithing: buttonColor }); // Change the pressed button color back and forth
            setState({ ebonySmithingLine: lineColor });
        }
    };
    const CheckIfDaedricSmithingPressed = (buttonColor, lineColor) => {
        if (state.ebonySmithing == 'transparent') {
            // Change the colors of the buttons below it if they have not been pressed
            setState({ daedricSmithing: buttonColor });
            setState({ ebonySmithing: buttonColor });
            setState({ orcishSmithing: buttonColor });
            setState({ dwarvenSmithing: buttonColor });
            setState({ basicSmithing: buttonColor });
            setState({ daedricSmithingLine: lineColor });
            setState({ ebonySmithingLine: lineColor });
            setState({ orcishSmithingLine: lineColor });
            setState({ dwarvenSmithingLine: lineColor });
            setState({ basicSmithingLine: lineColor });
        } else if (state.dragonSmithing == 'black') {
            // Do nothing....must un-select nodes above it first
        } else {
            setState({ daedricSmithing: buttonColor }); // Change the pressed button color back and forth
            setState({ daedricSmithingLine: lineColor });
        }
    };
    const CheckIfDragonSmithingPressed = (buttonColor, lineColor) => {
        if (state.daedricSmithing == 'transparent') {
            setState({ dragonSmithing: buttonColor });
            setState({ daedricSmithing: buttonColor });
            setState({ ebonySmithing: buttonColor });
            setState({ orcishSmithing: buttonColor });
            setState({ dwarvenSmithing: buttonColor });
            setState({ basicSmithing: buttonColor });
            setState({ dragonSmithingLine: lineColor });
            setState({ daedricSmithingLine: lineColor });
            setState({ ebonySmithingLine: lineColor });
            setState({ orcishSmithingLine: lineColor });
            setState({ dwarvenSmithingLine: lineColor });
            setState({ basicSmithingLine: lineColor });
        } else {
            setState({ dragonSmithing: buttonColor });
            setState({ dragonSmithingLine: lineColor });
        }
    };
    const CheckFinalMiddleLine = (buttonColor) => {
        if (state.glassSmithing == 'black' && state.dragonSmithing == 'black') {
            setState({ middleLine: buttonColor });
        }
    };  

    return (
        <View style={{ zIndex: 2 }}>
            <View style={styles.bottomText}>
                <Text style={styles.HomeScreenText}>Active Perks: {ActivePerks} </Text>
                <Text style={styles.HomeScreenText}>All Active Perks: { }</Text>
            </View>

            <View title='Basic Smithing Blue' style= {{
                        position: 'absolute',
                        top: "69%",
                        left: "25%",
                        zIndex: 8,

            }}>
                <TouchableOpacity 
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfBasicSmithPressed(
                            state.basicSmithing == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconBlue />
                </TouchableOpacity>
            </View>                          
            <View title='Basic Smithing Gold' style= {{
                        position: 'absolute',
                        top: "69%",
                        left: "25%",
                        zIndex: 8,
                        opacity: state.basicSmithing

            }}>
                <TouchableOpacity 
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfBasicSmithPressed(
                            state.basicSmithing == 0 ? 1 : 0,
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>     
            <View title='Arcane Smithing Blue' style= {{
                        position: 'absolute',
                        top: "50%",
                        left: "29.5%",
                        zIndex: 8,

            }}>
                <TouchableOpacity 
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfArcaneSmithPressed(
                            state.arcaneSmithing == 0 ? 1 : 0,
                            state.arcaneSmithingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconBlue />
                </TouchableOpacity>
            </View>                          
            <View title='Arcane Smithing Gold' style= {{
                        position: 'absolute',
                        top: "50%",
                        left: "29.5%",
                        zIndex: 8,
                        opacity: state.arcaneSmithing

            }}>
                <TouchableOpacity 
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfArcaneSmithPressed(
                            state.arcaneSmithing == 0 ? 1 : 0,
                            state.arcaneSmithingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <StarIconGold />
                </TouchableOpacity>
            </View>  
            <View title='Elven Smithing' style= {{
                        position: 'absolute',
                        top: "52%",
                        left: "1%",
                        zIndex: 8
            }}>
                <TouchableOpacity style={{position: 'absolute'}}
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfElvinSmithPressed(
                            state.elvinSmithing == 'transparent' ? 'black' : 'transparent',
                            state.elvinSmithingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <MaterialCommunityIcons name="star-four-points-outline" size={60} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute'}}                      
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfElvinSmithPressed(
                            state.elvinSmithing == 'transparent' ? 'black' : 'transparent',
                            state.elvinSmithingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <MaterialCommunityIcons name="star-four-points" size={60} color= {state.elvinSmithing} />
                </TouchableOpacity>
            </View>
            <View title='Advanced Smithing' style= {{
                        position: 'absolute',
                        top: "45%",
                        left: "7%",
                        zIndex: 8
            }}>
                <TouchableOpacity style={{position: 'absolute'}}
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfAdvanceSmithingPressed(
                            state.advancedSmithing == 'transparent' ? 'black' : 'transparent',
                            state.advancedSmithingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <MaterialCommunityIcons name="star-four-points-outline" size={60} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute'}}                      
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfAdvanceSmithingPressed(
                            state.advancedSmithing == 'transparent' ? 'black' : 'transparent',
                            state.advancedSmithingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <MaterialCommunityIcons name="star-four-points" size={60} color= {state.advancedSmithing} />
                </TouchableOpacity>
            </View>
            <View title='Glass Smithing' style= {{
                        position: 'absolute',
                        top: "36%",
                        left: "27%",
                        zIndex: 8
            }}>
                <TouchableOpacity style={{position: 'absolute'}}
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfGlassSmithingPressed(
                            state.glassSmithing == 'transparent' ? 'black' : 'transparent',
                            state.glassSmithingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <MaterialCommunityIcons name="star-four-points-outline" size={60} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute'}}                      
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfGlassSmithingPressed(
                            state.glassSmithing == 'transparent' ? 'black' : 'transparent',
                            state.glassSmithingLine == 'black' ? 'gold' : 'black'
                        );
                    }}>
                    <MaterialCommunityIcons name="star-four-points" size={60} color= {state.glassSmithing} />
                </TouchableOpacity>
            </View>
            <View title='Dragon Smithing' style= {{
                        position: 'absolute',
                        top: "36%",
                        left: "47%",
                        zIndex: 8
            }}>
                <TouchableOpacity style={{position: 'absolute'}}
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfDragonSmithingPressed(
                            state.dragonSmithing == 'transparent' ? 'black' : 'transparent',
                            state.dragonSmithingLine == 'black' ? 'gold' : 'black',
                        );
                    }}>
                    <MaterialCommunityIcons name="star-four-points-outline" size={60} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute'}}                      
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfDragonSmithingPressed(
                            state.dragonSmithing == 'transparent' ? 'black' : 'transparent',
                            state.dragonSmithingLine == 'black' ? 'gold' : 'black',
                        );
                    }}>
                    <MaterialCommunityIcons name="star-four-points" size={60} color= {state.dragonSmithing} />
                </TouchableOpacity>
            </View>
            <View title='Daedric Smithing' style= {{
                        position: 'absolute',
                        top: "41%",
                        left: "67%",
                        zIndex: 8
            }}>
                <TouchableOpacity style={{position: 'absolute'}}
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfDaedricSmithingPressed(
                            state.daedricSmithing == 'transparent' ? 'black' : 'transparent',
                            state.daedricSmithingLine == 'black' ? 'gold' : 'black',
                        );
                    }}>
                    <MaterialCommunityIcons name="star-four-points-outline" size={60} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute'}}                      
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfDaedricSmithingPressed(
                            state.daedricSmithing == 'transparent' ? 'black' : 'transparent',
                            state.daedricSmithingLine == 'black' ? 'gold' : 'black',
                        );
                    }}>
                    <MaterialCommunityIcons name="star-four-points" size={60} color= {state.daedricSmithing} />
                </TouchableOpacity>
            </View> 
            <View title='Ebony Smithing' style= {{
                        position: 'absolute',
                        top: "52%",
                        left: "85%",
                        zIndex: 8
            }}>
                <TouchableOpacity style={{position: 'absolute'}}
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfEbonySmithingPressed(
                            state.ebonySmithing == 'transparent' ? 'black' : 'transparent',
                            state.ebonySmithingLine == 'black' ? 'gold' : 'black',
                        );
                    }}>
                    <MaterialCommunityIcons name="star-four-points-outline" size={60} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute'}}                      
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfEbonySmithingPressed(
                            state.ebonySmithing == 'transparent' ? 'black' : 'transparent',
                            state.ebonySmithingLine == 'black' ? 'gold' : 'black',
                        );
                    }}>
                    <MaterialCommunityIcons name="star-four-points" size={60} color= {state.ebonySmithing} />
                </TouchableOpacity>
            </View>  
            <View title='Orcish Smithing' style= {{
                        position: 'absolute',
                        top: "52%",
                        left: "71%",
                        zIndex: 8
            }}>
                <TouchableOpacity style={{position: 'absolute'}}
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfOrcishSmithingPressed(
                            state.orcishSmithing == 'transparent' ? 'black' : 'transparent',
                            state.orcishSmithingLine == 'black' ? 'gold' : 'black',
                        );
                    }}>
                    <MaterialCommunityIcons name="star-four-points-outline" size={60} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute'}}                      
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfOrcishSmithingPressed(
                            state.orcishSmithing == 'transparent' ? 'black' : 'transparent',
                            state.orcishSmithingLine == 'black' ? 'gold' : 'black',
                        );
                    }}>
                    <MaterialCommunityIcons name="star-four-points" size={60} color= {state.orcishSmithing} />
                </TouchableOpacity>
            </View>    
            <View title='Orcish Smithing' style= {{
                        position: 'absolute',
                        top: "62%",
                        left: "52%",
                        zIndex: 8
            }}>
                <TouchableOpacity style={{position: 'absolute'}}
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfDwarvenSmithingPressed(
                            state.dwarvenSmithing == 'transparent' ? 'black' : 'transparent',
                            state.dwarvenSmithingLine == 'black' ? 'gold' : 'black',
                        );
                    }}>
                    <MaterialCommunityIcons name="star-four-points-outline" size={60} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute'}}                      
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        CheckIfDwarvenSmithingPressed(
                            state.dwarvenSmithing == 'transparent' ? 'black' : 'transparent',
                            state.dwarvenSmithingLine == 'black' ? 'gold' : 'black',
                        );
                    }}>
                    <MaterialCommunityIcons name="star-four-points" size={60} color= {state.dwarvenSmithing} />
                </TouchableOpacity>
            </View>                                                                                                         
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} >

                <Line 
                    x1="35.3%"
                    y1="79.2%"
                    x2="40%"
                    y2="60%"
                    stroke={state.arcaneSmithingLine}
                    strokeWidth={lineStrokeWidth}
                />

                <Line
                    x1="34.2%"
                    y1="79.3%"
                    x2="8.5%"
                    y2="55.7%"
                    stroke={state.elvinSmithingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="8.3%"
                    y1="54.4%"
                    x2="13.5%"
                    y2="48.6%"
                    stroke={state.advancedSmithingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="15%"
                    y1="47.5%"
                    x2="32.8%"
                    y2="39.5%"
                    stroke={state.glassSmithingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="35.3%"
                    y1="39%"
                    x2="53%"
                    y2="39%"
                    stroke={state.dragonSmithingLineLight}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="55.5%"
                    y1="39.3%"
                    x2="74%"
                    y2="45%"
                    stroke={state.dragonSmithingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="75%"
                    y1="45.5%"
                    x2="92%"
                    y2="55%"
                    stroke={state.daedricSmithingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="91%"
                    y1="55%"
                    x2="80%"
                    y2="55%"
                    stroke={state.ebonySmithingLine}
                    strokeWidth={lineStrokeWidth}

                />
                <Line
                    x1="79%"
                    y1="55.5%"
                    x2="60%"
                    y2="65%"
                    stroke={state.orcishSmithingLine}
                    strokeWidth={lineStrokeWidth}
                />
                <Line
                    x1="59.2%"
                    y1="65.4%"
                    x2="36.3%"
                    y2="79.9%"
                    stroke={state.dwarvenSmithingLine}
                    strokeWidth={lineStrokeWidth}
                />

                {/* MODAL POPUP */}
                <Modal
                    animationType="slide"
                    transparent
                    backdropColor="black"
                    onBackdropPress={() => {
                        setIsModalVisible(false);
                    }}
                    visible={isModalVisible}>
                    <View
                        style={{
                            backgroundColor: 'firebrick',
                            margin: 5,
                            alignSelf: 'auto',

                            justifyContent: 'center',
                            padding: 30,
                            borderRadius: 8,
                            borderWidth: 2,
                        }}>
                        <Text>Skill: blah blah</Text>
                        <Text>Skill: more skill blah</Text>
                        {/* +/- BUTTONS*/}
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <TouchableOpacity
                                    style={{
                                        alignSelf: 'flex-end',
                                        padding: 10,
                                    }}
                                    onPress={() => {
                                        setCount(count + 1);
                                    }}>
                                    <AntDesign name="plus" size={24} color="black" />
                                </TouchableOpacity>
                            </View>

                            <Text style={{ padding: 10 }}>{count}</Text>
                            <View>
                                <TouchableOpacity
                                    style={{
                                        alignSelf: 'flex-start',
                                        padding: 10,
                                    }}
                                    onPress={() => {
                                        setCount(count - 1);
                                    }}>
                                    <AntDesign name="minus" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </Svg>
            
        </View>
    );
};

const styles = StyleSheet.create({
    HomeScreenText: {
        color: 'white',
    },
    bottomText: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: "80%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    Icon: {
        position: 'absolute',
    },
});

export default SmithingTree;
