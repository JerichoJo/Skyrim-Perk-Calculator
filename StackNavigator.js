import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, Dimensions, LogBox, View } from 'react-native';
import { useState } from 'react';
LogBox.ignoreLogs(["Require cycle:"]);
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./assets/src/HomeScreen";
import { DrawerContent } from './assets/src/Components/Modals/DrawerNav';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import modals from './assets/src/Components/Modals/index';

const Drawer = createDrawerNavigator();
const ModalNav = createNativeStackNavigator();

export const AllActivePerkss = React.createContext(0);

function Modal() {
    return (

        <ModalNav.Navigator screenOptions={{ headerShown: false }}  >

            <ModalNav.Screen name="Homescreen" component={HomeScreen} />

            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >

                <ModalNav.Screen name="BasicSmithingModal" component={modals.BasicSmithingModal} />
                <ModalNav.Screen name="ArcaneSmithingModal" component={modals.ArcaneSmithingModal} />

            </ModalNav.Group>

        </ModalNav.Navigator>
    );
}

function Drawers() {
    const [AllActivePerks, SetAllActivePerks] = useState(0);
    return (
        <AllActivePerkss.Provider value={[AllActivePerks, SetAllActivePerks]}>
            <Drawer.Navigator
                drawerContent={props => <DrawerContent {...props} />}
                initialRouteName='HomeScreen'
                screenOptions={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerTitle: 'All Active Perks: ' + AllActivePerks,
                    headerRight: () => {
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: '600',
                                fontSize: 18,
                            }}
                        >{AllActivePerks}</Text>
                    },
                    drawerStyle: {
                        borderColor: 'white',
                        borderWidth: 1,
                        backgroundColor: 'slateblue',
                        width: 225,
                        shadowColor: 'black',
                        borderRadius: 5,

                    }
                }}
            >

                <Drawer.Screen name='BasicSmithingModal ' component={Modal} />

            </Drawer.Navigator>
        </AllActivePerkss.Provider>

    );
}

export default () => (

    <NavigationContainer>
        <Drawers />
    </NavigationContainer>

);
