import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./assets/src/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from '@expo/vector-icons';
import tree from './assets/src/Components/index';
import Modal from "./assets/src/Components/Modals/Modal";
//import { createDrawerNavigator } from "@react-navigation/drawer";


// const Stack = createNativeStackNavigator();

// const StackNavigator = () => (

//     <Stack.Navigator screenOptions={{ headerShown: false }}>

//         <Stack.Screen name="HomeScreen" component={HomeScreen} />


//     </Stack.Navigator>
// );

const ModalNav = createBottomTabNavigator();
const ModalNavScreen = () => (
    <ModalNav.Navigator screenOptions={{ headerShown: false }} tabBarOptions={{ activeBackgroundColor: "grey" }} >

        <ModalNav.Screen name="Homescreen" component={HomeScreen} options={{ tabBarIcon: () => <AntDesign name="home" size={40} /> }} />

        <ModalNav.Screen name="Modal" component={Modal} options={{ tabBarIcon: () => <AntDesign name="bars" size={40} /> }} />

    </ModalNav.Navigator>
);

// const AppTabs = createBottomTabNavigator();
// const AppTabScreen = () => (
//     <AppTabs.Navigator screenOptions={{ headerShown: false }} tabBarOptions={{ activeBackgroundColor: "grey" }} >


//         <AppTabs.Screen name="Nav" component={StackNavigator} options={{ tabBarIcon: () => <AntDesign name="bars" size={40} /> }} />

//     </AppTabs.Navigator>
// );

// const AppDrawer = createDrawerNavigator();
// const AppDrawerScreen = () => (
//     <AppDrawer.Navigator>
//         <AppDrawer.Screen name="tabs" component={AppTabScreen} />
//     </AppDrawer.Navigator>
// )

export default () => (
    <NavigationContainer>
        <ModalNavScreen />
    </NavigationContainer>
);