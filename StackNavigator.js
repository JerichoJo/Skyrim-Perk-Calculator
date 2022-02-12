import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./assets/src/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from '@expo/vector-icons';
import tree from './assets/src/Components/index';
import OtherStuff from "./assets/src/Components/Modals/OtherStuff";
//import { createDrawerNavigator } from "@react-navigation/drawer";


const Stack = createBottomTabNavigator();
const ModalNavScreen = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }} >

        <Stack.Screen name="Homescreen" component={HomeScreen} options={{ tabBarIcon: () => <AntDesign name="home" size={40} /> }} />

        <Stack.Screen name="Other Stuff" component={OtherStuff} options={{ tabBarIcon: () => <AntDesign name="bars" size={40} /> }} />

    </Stack.Navigator>
);

export default () => (
    <NavigationContainer>
        <ModalNavScreen />
    </NavigationContainer>
);