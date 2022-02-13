import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, Dimensions, LogBox, View } from 'react-native';
import { useState } from 'react';
LogBox.ignoreLogs(["Require cycle:"])
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from "./assets/src/HomeScreen";
import DrawerNav, { DrawerContent } from './assets/src/Components/Modals/DrawerNav';

const { width } = Dimensions.get('window');
// creating drawer nav
const Drawer = createDrawerNavigator(); 

export const AllActivePerkss = React.createContext(0);

export default function App() {

  const [AllActivePerks, SetAllActivePerks] = useState(0);
  

  return (
    
    <AllActivePerkss.Provider value={[AllActivePerks, SetAllActivePerks]}>
    
    
    <NavigationContainer>
      <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />} 
      initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: 'lightblue',
          width: 200
        }
      }}
      >
        <Drawer.Screen name='HomeScreen' component={HomeScreen}/>
      
      </Drawer.Navigator>

    </NavigationContainer>

    
    <Text style={styles.otherText} >All Active Perks: {AllActivePerks}</Text>  
    

    </AllActivePerkss.Provider>

  );
}

const styles = {
  otherText: {
    width,
    color: '#fff',
    fontSize: 15,

    position: 'absolute',
    bottom: '94%',
    textAlign: 'center',
    zIndex: 3,
  },
  headerProps: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    

    
  }

};
