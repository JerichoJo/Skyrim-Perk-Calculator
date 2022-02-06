import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./assets/src/HomeScreen";


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Group>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
            </Stack.Group>

        </Stack.Navigator>
    );
};

export default StackNavigator;