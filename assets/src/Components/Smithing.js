import * as React from 'react';
import { useState } from 'react';
import Svg, { Circle, Line } from 'react-native-svg';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Modal from "react-native-modal";

const SmithingTree = () => {
    const [button1Color, setButton1Color] = useState('blue');
    const [button2Color, setButton2Color] = useState('blue');
    const [button3Color, setButton3Color] = useState('blue');

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isMenuVisible, setIsMenuVisible] = React.useState(false);

    const [count, setCount] = useState(0);

    const circleRadius = '8';
    const circleStrokeWidth = '4';
    const lineStrokeWidth = '5';

    const incrementCount = () => {
        setCount(count + 1);
        console.log(count);
    };

    const checkIfPressed1 = (button1ColorProp) => {
        if ((button2Color || button3Color) == 'red') {
            //Leave color of lines the same because the ones above it are chosen
        } else {
            setButton1Color(button1ColorProp); // Change button color back and forth
        }
    };

    const checkIfPressed2 = (button2ColorProp) => {
        if (button1Color == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setButton1Color(button2ColorProp);
            setButton2Color(button2ColorProp);
        } else if (button3Color == 'red') {
            //Leave color of lines the same because the ones above it are chosen
        } else {
            setButton2Color(button2ColorProp); // Change button color back and forth
        }
    };

    const checkIfPressed3 = (button3ColorProp) => {
        if ((button1Color && button2Color) == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setButton1Color(button3ColorProp);
            setButton2Color(button3ColorProp);
            setButton3Color(button3ColorProp);
        } else {
            setButton3Color(button3ColorProp); // Change button color back and forth
        }
    };

    return (
        <View>
            <Svg height="900" width="500">
                <Circle
                    cx="100"
                    cy="700"
                    r={circleRadius}
                    stroke={button1Color}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onLongPress={() => {
                        setIsModalVisible(true);
                    }}
                    onPress={() => {
                        checkIfPressed1(button1Color == 'blue' ? 'red' : 'blue');
                        incrementCount();
                    }}
                />
                {/* MODAL POPUP */}
                <Modal
                    animationType='slide'
                    transparent
                    backdropColor='black'
                    onBackdropPress={() => {
                        setIsModalVisible(false)
                    }}
                    
                    visible={isModalVisible}
                    >
                        <View style={{backgroundColor:"firebrick", 
                            margin: 5, 
                            alignSelf:'auto',
                            
                            justifyContent: 'center',
                            padding:30, 
                            borderRadius: 8, 
                            borderWidth:2
                            }}>
                            <Text>Skill: blah blah</Text>
                            <Text>Skill: more skill blah</Text>
                            {/* +/- BUTTONS*/}
                            <View style={{flexDirection:'row'}}>
                            <View>
                            <TouchableOpacity 
                                style={{
                                    alignSelf:'flex-end',
                                    padding:10
                                }}
                                onPress={() => {
                                    setCount(count + 1);
                                }}
                            >
                                <AntDesign name="plus" size={24} color="black" />

                            </TouchableOpacity>
                            </View>

                            <Text style={{padding:10}}>{count}</Text>
                            <View>
                            <TouchableOpacity 
                                style={{
                                    alignSelf:'flex-start',
                                    padding:10
                                }}
                                onPress={() => {
                                    setCount(count - 1);
                                }}
                            >
                                <AntDesign name="minus" size={24} color="black" />

                            </TouchableOpacity>
                            </View>
                            </View>
                        </View>

                </Modal>

                <Circle
                    cx="80"
                    cy="550"
                    r={circleRadius}
                    stroke={button2Color}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onPress={() => {
                        checkIfPressed2(button2Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                

                <Line
                    x1="150"
                    y1="300"
                    x2="150"
                    y2="400"
                    stroke={button2Color}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfPressed2(button2Color == 'blue' ? 'red' : 'blue');
                    }}
                />

                <Circle
                    cx="110"
                    cy="470"
                    r={circleRadius}
                    stroke={button3Color}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onLongPress={() => {
                      setIsMenuVisible(true)  
                    }}
                    onPress={() => {
                        checkIfPressed3(button3Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                <Circle
                    cx="180"
                    cy="430"
                    r={circleRadius}
                    stroke={button3Color}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onPress={() => {
                        checkIfPressed3(button3Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                <Circle
                    cx="250"
                    cy="430"
                    r={circleRadius}
                    stroke={button3Color}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onPress={() => {
                        checkIfPressed3(button3Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                <Circle
                    cx="320"
                    cy="450"
                    r={circleRadius}
                    stroke={button3Color}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onPress={() => {
                        checkIfPressed3(button3Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                <Circle
                    cx="400"
                    cy="500"
                    r={circleRadius}
                    stroke={button3Color}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onPress={() => {
                        checkIfPressed3(button3Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                <Circle
                    cx="400"
                    cy="500"
                    r={circleRadius}
                    stroke={button3Color}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onPress={() => {
                        checkIfPressed3(button3Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                <Line
                    x1="200"
                    y1="200"
                    x2="150"
                    y2="300"
                    stroke={button3Color}
                    strokeWidth={lineStrokeWidth}
                    onPress={() => {
                        checkIfPressed3(button3Color == 'blue' ? 'red' : 'blue');
                    }}
                />

            </Svg>
        </View>
    );
}

export default SmithingTree;
