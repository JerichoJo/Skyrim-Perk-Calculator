import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  logo: {
    width: 85,
    height: 85,
  },
});

class StarIconGold extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../images/Icons/Gold_Star.png')}
        />
      </View>
    );
  }
}

export default StarIconGold;