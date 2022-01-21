
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './assets/src/HomeScreen';

const navigator = createStackNavigator (
  {
    Home: HomeScreen

}, 
{
    initialRouteName: 'Home',

    defaultNavigationOptions:{
      cardStyle: {backgroundColor: 'transparent'},
      headerShown: false,

    },
    
      navigationOptions: {
        headerShown: false,

    }
}
);

export default createAppContainer(navigator);
