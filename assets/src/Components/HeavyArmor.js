import * as React from 'react';
import { useState } from 'react';
import Svg, { Circle, Line } from 'react-native-svg';
import { View, Text } from 'react-native';

const HeavyArmor = () => {
    const [button1Color, setButton1Color] = useState('blue');
    const [button2Color, setButton2Color] = useState('blue');
    const [button3Color, setButton3Color] = useState('blue');
    const [button4Color, setButton4Color] = useState('blue');
    const [button5Color, setButton5Color] = useState('blue');
    const [button6Color, setButton6Color] = useState('blue');
    const [button7Color, setButton7Color] = useState('blue');
    const [button8Color, setButton8Color] = useState('blue');

    const [count, setCount] = useState(0);

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
    const checkIfPressed4 = (button4ColorProp) => {
        if ((button1Color && button2Color && button3Color) == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setButton1Color(button4ColorProp);
            setButton2Color(button4ColorProp);
            setButton3Color(button4ColorProp);
            setButton4Color(button4ColorProp);
        } else {
            setButton4Color(button4ColorProp); // Change button color back and forth
        }
    };
    const checkIfPressed5 = (button5ColorProp) => {
        if ((button1Color &&
            button2Color &&
            button3Color &&
            button4Color) == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setButton1Color(button5ColorProp);
            setButton2Color(button5ColorProp);
            setButton3Color(button5ColorProp);
            setButton4Color(button5ColorProp);
            setButton5Color(button5ColorProp);
        } else {
            setButton5Color(button5ColorProp); // Change button color back and forth
        }
    };
    const checkIfPressed6 = (button6ColorProp) => {
        if ((button1Color &&
            button2Color &&
            button3Color &&
            button4Color &&
            button5Color) == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setButton1Color(button6ColorProp);
            setButton2Color(button6ColorProp);
            setButton3Color(button6ColorProp);
            setButton4Color(button6ColorProp);
            setButton5Color(button6ColorProp);
            setButton6Color(button6ColorProp);
        } else {
            setButton6Color(button6ColorProp); // Change button color back and forth
        }
    };
    const checkIfPressed7 = (button7ColorProp) => {
        if ((button1Color &&
            button2Color &&
            button3Color &&
            button4Color &&
            button5Color &&
            button6Color) == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setButton1Color(button7ColorProp);
            setButton2Color(button7ColorProp);
            setButton3Color(button7ColorProp);
            setButton4Color(button7ColorProp);
            setButton5Color(button7ColorProp);
            setButton6Color(button7ColorProp);
            setButton7Color(button7ColorProp);
        } else {
            setButton7Color(button7ColorProp); // Change button color back and forth
        }
    };
    const checkIfPressed8 = (button8ColorProp) => {
        if ((button1Color &&
            button2Color &&
            button3Color &&
            button4Color &&
            button5Color &&
            button6Color &&
            button7Color &&
            button8Color) == 'blue') {
            // Change the colors of the buttons below it if they have not been pressed
            setButton1Color(button8ColorProp);
            setButton2Color(button8ColorProp);
            setButton3Color(button8ColorProp);
            setButton4Color(button8ColorProp);
            setButton5Color(button8ColorProp);
            setButton6Color(button8ColorProp);
            setButton7Color(button8ColorProp);
            setButton8Color(button8ColorProp);
        } else {
            setButton7Color(button8ColorProp); // Change button color back and forth
        }
    };



    return (
        <View>
            <Svg height="900" width="500">
                {/* LINE 1 FROM BOTTOM ON RIGHT SIDE */}
                <Line
                    x1="350"
                    y1="475"
                    x2="250"
                    y2="600"
                    stroke={button1Color}
                    id="line1"
                    strokeWidth="3"
                    onPress={() => {
                        checkIfPressed1(button1Color == 'blue' ? 'red' : 'blue');
                        incrementCount();
                    }}
                />
                {/* 1ST CENTER CIRCLE */}
                <Circle
                    cx="250"
                    cy="600"
                    r="8"
                    fill={button1Color}
                    onPress={() => {
                        checkIfPressed1(button1Color == 'blue' ? 'red' : 'blue');
                        incrementCount();
                    }}
                />
                {/* LINE 2 FROM BOTTOM ON RIGHT SIDE */}
                <Line
                    x1="370"
                    y1="375"
                    x2="350"
                    y2="475"
                    stroke={button2Color}
                    strokeWidth="3"
                    onPress={() => {
                        checkIfPressed2(button2Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                {/* 2ND CIRCLE UP RIGHT SIDE (INCLUDES CENTER IN COUNT) */}
                <Circle
                    cx="350"
                    cy="475"
                    r="8"
                    fill={button2Color}
                    onPress={() => {
                        checkIfPressed2(button2Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                {/* LINE 3 FROM BOTTOM ON RIGHT SIDE */}
                <Line
                    x1="400"
                    y1="300"
                    x2="370"
                    y2="375"
                    stroke={button3Color}
                    strokeWidth="3"
                    onPress={() => {
                        checkIfPressed3(button3Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                {/* 3RD CIRCLE UP RIGHT SIDE (INCLUDES CENTER IN COUNT) */}
                <Circle
                    cx="370"
                    cy="375"
                    r="8"
                    fill={button3Color}
                    onPress={() => {
                        checkIfPressed3(button3Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                {/* LINE 4 FROM BOTTOM ON RIGHT SIDE */}
                <Line
                    x1="370"
                    y1="200"
                    x2="400"
                    y2="295"
                    stroke={button4Color}
                    strokeWidth="3"
                    onPress={() => {
                        checkIfPressed4(button4Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                {/* 4TH CIRCLE UP RIGHT SIDE (INCLUDES CENTER IN COUNT) */}
                <Circle
                    cx="400"
                    cy="300"
                    r="8"
                    fill={button4Color}
                    onPress={() => {
                        checkIfPressed4(button4Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                <Circle
                    cx="370"
                    cy="200"
                    r="8"
                    fill={button5Color}
                    onPress={() => {
                        checkIfPressed5(button5Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                <Line
                    x1="150"
                    y1="510"
                    x2="247"
                    y2="600"
                    stroke={button5Color}
                    strokeWidth="3"
                    onPress={() => {
                        checkIfPressed5(button5Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                <Circle
                    cx="150"
                    cy="510"
                    r="8"
                    fill={button6Color}
                    onPress={() => {
                        checkIfPressed6(button6Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                <Line
                    x1="100"
                    y1="400"
                    x2="150" // 
                    y2="510"
                    stroke={button7Color}
                    strokeWidth="3"
                    onPress={() => {
                        checkIfPressed7(button7Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                <Circle
                    cx="150"
                    cy="510"
                    r="8"
                    fill={button7Color}
                    onPress={() => {
                        checkIfPressed7(button7Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                <Line
                    x1="110"
                    y1="300"
                    x2="100" // 
                    y2="400"
                    stroke={button8Color}
                    strokeWidth="3"
                    onPress={() => {
                        checkIfPressed8(button8Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                <Circle
                    cx="100"
                    cy="400"
                    r="8"
                    fill={button8Color}
                    onPress={() => {
                        checkIfPressed8(button8Color == 'blue' ? 'red' : 'blue');
                    }}
                />
                <Circle
                    cx="110"
                    cy="300"
                    r="8"
                    fill={button8Color}
                    onPress={() => {
                        checkIfPressed8(button8Color == 'blue' ? 'red' : 'blue');
                    }}
                />
            </Svg>
        </View>
    );
}

export default HeavyArmor;
