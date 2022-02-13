import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, Dimensions, LogBox, View } from 'react-native';
import { useState } from 'react';
LogBox.ignoreLogs(["Require cycle:"])
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from "./assets/src/HomeScreen";
import { DrawerContent } from './assets/src/Components/Modals/DrawerNav';


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
        headerShown: true,
        headerTransparent: true,
        headerTintColor:'white',
        headerTitleAlign:'center',
        headerTitle:'All Active Perks: ' + AllActivePerks,
        headerRight: () => {
          <Text
            style={{
              color:'white',
              zIndex: 8
            }}
          >{AllActivePerks}</Text>
        },
        drawerStyle: {
          borderColor:'white',
          borderWidth: 1,
          backgroundColor: 'slateblue',
          width: 225,
          shadowColor: 'black',
          borderRadius: 5,

        }
      }}
      >
        <Drawer.Screen name='All Active Perks: ' component={HomeScreen}/>
      
      </Drawer.Navigator>

    </NavigationContainer>

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
