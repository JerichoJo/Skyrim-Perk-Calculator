import * as React from 'react';
import { useState } from 'react';
import Svg, { Circle, Line } from 'react-native-svg';
import { View } from 'react-native';

const SmithingTree = () => {
    const [button1Color, setButton1Color] = useState('blue');
    const [button2Color, setButton2Color] = useState('blue');
    const [button3Color, setButton3Color] = useState('blue');

    const [count, setCount] = useState(0);

    const circleRadius = '8';
    const circleStrokeWidth = '4';
    const lineStrokeWidth = '5'

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
                    cx="200"
                    cy="700"
                    r={circleRadius}
                    stroke={button1Color}
                    strokeWidth={circleStrokeWidth}
                    fill="white"
                    onPress={() => {
                        checkIfPressed1(button1Color == 'blue' ? 'red' : 'blue');
                        incrementCount();
                    }}
                />


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
