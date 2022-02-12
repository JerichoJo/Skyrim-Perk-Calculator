import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, Dimensions, LogBox } from 'react-native';
import StackNavigator from './StackNavigator';
import { useState } from 'react';
LogBox.ignoreLogs(["Require cycle:"])

const { width } = Dimensions.get('window');

export const AllActivePerkss = React.createContext(0);

export default function App() {

  const [AllActivePerks, SetAllActivePerks] = useState(0);

  return (
    <AllActivePerkss.Provider value={[AllActivePerks, SetAllActivePerks]}>

      <StackNavigator />

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
};
